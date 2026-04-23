import { Client } from "@gradio/client";

// Move connection to module scope for warm-start reuse
const clientPromise = Client.connect("Sam-veda/bengali-llm-space");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await clientPromise;

    const { prompt, system_prompt, temperature, top_p, max_new_tokens } = req.body;

    const result = await client.predict("/generate", [
      system_prompt || "You are a helpful assistant.",
      prompt,
      temperature || 0.7,
      top_p || 0.9,
      max_new_tokens || 96 // Default reduced for stability
    ]);

    const output = Array.isArray(result.data)
      ? result.data[0]
      : result.data;

    res.status(200).json({ response: output });

  } catch (err) {
    res.status(500).json({
      error: "Gradio call failed",
      details: err.message
    });
  }
}
