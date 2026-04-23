# Bengali LLM — Real Backend Integration Plan (Updated)

## Background

The current frontend is a high-fidelity **UI prototype** with no real server communication. The AI response is a hardcoded string returned after a fake 1500ms `setTimeout`.

The goal is to replace this with a real pipeline that routes through a Vercel serverless function to the deployed Hugging Face Space.

**Live model endpoint:**
`https://sam-veda-bengali-llm-space.hf.space/generate`

```
Before:  React UI → setTimeout (fake) → hardcoded response  
After:   React UI → /api/generate (Vercel) → HF Space → real response
```

---

## ⚠️ Critical Constraints (READ FIRST)

### 1. CPU Deployment Reality

* Model runs on CPU → slow inference
* Expect:

  * First request: **10–60s (cold start)**
  * Normal requests: **2–8s**

### 2. Hugging Face Free Tier

* Sleeps after inactivity
* Limited memory
* Occasional failures/timeouts

### 3. CORS Requirement

> MUST use `/api/generate` proxy
> Direct browser calls to HF will fail

---

## Proposed Changes

---

# Phase 1 — Vercel API Route (Proxy)

## [NEW] `/api/generate.js`

```js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const hfRes = await fetch(
      "https://sam-veda-bengali-llm-space.hf.space/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      return res.status(hfRes.status).json({
        error: "HF upstream error",
        details: errText,
      });
    }

    const data = await hfRes.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: "HF request failed",
      details: err.message,
    });
  }
}
```

---

# Phase 2 — Replace Mock Logic

## [MODIFY] `ChatPage.tsx`

### 🔴 REMOVE

* Entire `setTimeout`
* Hardcoded responses

---

### 🟢 ADD (Final Version)

```ts
const handleSend = useCallback(async (text: string) => {
  if (!text.trim() || loading || !activeSession) return;

  const userMsg: Message = { role: 'user', text };

  // Update session with user message
  setSessions(prev => prev.map(s => {
    if (s.id === activeSessionId) {
      const newMessages = [...s.messages, userMsg];

      let newTitle = s.title;
      if (s.messages.length === 1 && (s.title === 'নতুন চ্যাট' || s.title === 'New Chat')) {
        newTitle = text.slice(0, 25) + (text.length > 25 ? '...' : '');
      }

      return {
        ...s,
        messages: newMessages,
        title: newTitle,
        timestamp: Date.now()
      };
    }
    return s;
  }));

  setInput('');
  setLoading(true);

  // ⚡ Limit history (IMPORTANT for CPU model)
  const history = activeSession.messages
    .slice(-6)
    .map(m => `${m.role === 'user' ? 'user' : 'assistant'}: ${m.text}`)
    .join('\n');

  const fullPrompt = `${history}\nuser: ${text}`;

  // ⏱ Timeout handling
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        prompt: fullPrompt,
        system_prompt: 'You are a Bengali-first assistant. Prefer Bengali unless user uses English.',
        max_new_tokens: 128, // ⚡ reduced for speed
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const data = await res.json();

    const aiText =
      data.response ||
      data.generated_text ||
      data.output ||
      '⚠️ Empty response from model.';

    setSessions(prev => prev.map(s =>
      s.id === activeSessionId
        ? {
            ...s,
            messages: [...s.messages, { role: 'ai', text: aiText }],
            timestamp: Date.now(),
          }
        : s
    ));

  } catch (err) {
    const errorText =
      err.name === 'AbortError'
        ? '⚠️ Request timed out. Model may be waking up.'
        : '⚠️ মডেলে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।';

    setSessions(prev => prev.map(s =>
      s.id === activeSessionId
        ? {
            ...s,
            messages: [...s.messages, { role: 'ai', text: errorText }],
          }
        : s
    ));

  } finally {
    clearTimeout(timeout);
    setLoading(false);
  }

}, [loading, activeSessionId, activeSession]);
```

---

# Phase 3 — Conversation Memory

✔ Already implemented above
✔ Limited to last **6 messages** for performance

---

# Phase 4 — UX Enhancements

## 1. Model Wake Indicator

```ts
const [isWakingUp, setIsWakingUp] = useState(false);

const wakeUpTimer = setTimeout(() => setIsWakingUp(true), 3000);

// clear in finally
clearTimeout(wakeUpTimer);
setIsWakingUp(false);
```

### UI:

```tsx
{loading && isWakingUp && (
  <Typography sx={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.7 }}>
    ⚡ বাংলা মডেল জেগে উঠছে… (first request may take ~30s)
  </Typography>
)}
```

---

## 2. Disable Send Button

Already handled:

```tsx
disabled={loading || !input.trim()}
```

---

## 3. Auto Scroll

Already implemented ✅

---

# Phase 5 — Debugging

| Issue               | Cause            | Fix                 |
| ------------------- | ---------------- | ------------------- |
| 404 `/api/generate` | API not deployed | Check Vercel        |
| CORS error          | Direct HF call   | Use proxy           |
| Slow first response | Cold start       | Normal              |
| Empty response      | Wrong key        | `console.log(data)` |
| Timeout             | CPU model        | Retry               |

---

# Phase 6 — Optional Upgrades

## 🔥 Retry Logic

Auto retry once if request fails

## 🔥 Streaming (Advanced)

* Requires SSE
* Skip for now

## 🔥 Better Prompting

```
You are a Bengali cultural assistant.
Respond in Bengali unless user uses English.
Be natural and helpful.
```

---

# Files Summary

| File               | Action             |
| ------------------ | ------------------ |
| `/api/generate.js` | CREATE             |
| `ChatPage.tsx`     | MODIFY             |
| `package.json`     | (optional) Node 18 |

---

# Verification Plan

## Test Flow

1. Deploy to Vercel
2. Open app
3. Send message:

   ```
   বাংলায় recursion ব্যাখ্যা করো
   ```
4. Expect:

   * Loader shows
   * Wake message (if slow)
   * Real response appears

---

# Final Architecture

```
React (Vite UI)
   ↓
/api/generate (Vercel)
   ↓
Hugging Face Space (CPU)
   ↓
LLM Response
```

---

# Final Notes

* This is a **CPU-constrained system** → optimize for UX, not speed
* Keep prompts short
* Expect occasional failures (retry UX is key)

---

# End Goal

A fully functional Bengali AI chat system with:

✔ persistent sessions
✔ real model responses
✔ context awareness
✔ production-ready architecture
