import { Client } from "@gradio/client";

// Using the full URL can sometimes resolve configuration issues on serverless environments
const SPACE_URL = "https://sam-veda-bengali-llm-space.hf.space";
const clientPromise = Client.connect(SPACE_URL);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await clientPromise;

    const { prompt, system_prompt, temperature, top_p, max_new_tokens } = req.body;

    // Based on app.py analysis, the generate_reply function is the first event (index 0).
    // The inputs are: [system_prompt, user_query, temperature, top_p, max_new_tokens]
    
    const result = await client.predict(0, [
      system_prompt || "You are a helpful assistant.",
      prompt,
      temperature || 0.7,
      top_p || 0.9,
      max_new_tokens || 96
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
