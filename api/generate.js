export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const hfRes = await fetch(
      "https://sam-veda-bengali-llm-space.hf.space/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
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

    res.status(200).json({
      response: data.response || data.generated_text || data.output,
    });

  } catch (err) {
    res.status(500).json({
      error: "Request failed",
      details: err.message,
    });
  }
}
