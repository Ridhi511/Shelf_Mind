import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    const prompt = `
    You are a Budget-Conscious AI Shopping Agent.

    Analyze this Shopify store URL:
    ${url}

    Return ONLY valid JSON:

    {
      "verdict": "",
      "confidence": 0,
      "strengths": [],
      "weaknesses": []
    }
    `;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

    const raw =
      completion.choices[0].message.content;

    const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const parsed = JSON.parse(cleaned);

    res.json({
      success: true,
      data: parsed,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
});

export default router;