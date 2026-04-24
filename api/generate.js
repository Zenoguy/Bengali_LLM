export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = {
      ...req.body,
      max_new_tokens: req.body.max_new_tokens ?? 160,
      temperature: req.body.temperature ?? 0.2,
      top_p: req.body.top_p ?? 0.8,
    };

    const hfRes = await fetch(
      "https://sam-veda-bengali-llm-space.hf.space/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!hfRes.ok) {
      const text = await hfRes.text();
      return res.status(hfRes.status).json({
        error: "HF upstream error",
        details: text,
      });
    }

    const data = await hfRes.json();

    function cleanText(text) {
      if (!text) return "";
      return text.replace(/\ufffd/g, "").trim();
    }

    res.status(200).json({
      response: cleanText(data.response || data.generated_text || data.output),
    });

  } catch (err) {
    res.status(500).json({
      error: "Request failed",
      details: err.message,
    });
  }
}
