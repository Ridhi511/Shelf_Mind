import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Groq from "groq-sdk";
import { scrapeStore } from "../utils/scraper.js";
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;
    const storeData = await scrapeStore(url);

    const storeContext = `
        STORE TITLE:
        ${storeData.title}

        META DESCRIPTION:
        ${storeData.metaDescription}

        HEADINGS:
        ${storeData.headings.join("\n")}

        CONTENT:
        ${storeData.paragraphs.join("\n")}
    `;

    const budgetPrompt = `
You are the Budget Agent.

Analyze this Shopify store from a pricing and value perspective.

Focus on:
- affordability
- pricing clarity
- discounts
- bundles
- value perception

${storeContext}

Return ONLY valid JSON:
Keep verdict VERY SHORT (2-4 words only).
{ 
  "verdict": "",
  "confidence": 0,
  "strengths": [],
  "weaknesses": []
}
`;

const trustPrompt = `
You are the Trust Agent.

Analyze this Shopify store from a customer trust perspective.

Focus on:
- reviews
- policies
- transparency
- guarantees
- shipping confidence

${storeContext}

Return ONLY valid JSON:
Keep verdict VERY SHORT (2-4 words only).
{
  "verdict": "",
  "confidence": 0,
  "strengths": [],
  "weaknesses": []
}
`;

const ecoPrompt = `
You are the Eco Agent.

Analyze this Shopify store from a sustainability perspective.

Focus on:
- sustainability
- certifications
- eco claims
- ethical branding
- environmental messaging

${storeContext}

Return ONLY valid JSON:
Keep verdict VERY SHORT (2-4 words only).
{

  "verdict": "",
  "confidence": 0,
  "strengths": [],
  "weaknesses": []
}
`;
    async function runAgent(prompt) {

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

  return JSON.parse(cleaned);
}

const budgetAgent =
  await runAgent(budgetPrompt);

const trustAgent =
  await runAgent(trustPrompt);

const ecoAgent =
  await runAgent(ecoPrompt);

const fixPrompt = `
You are an AI ecommerce optimization expert.

Based on this Shopify store data:

${storeContext}

Generate 3 improvements.

For each improvement provide:
- title
- original text
- improved text

Return ONLY valid JSON:

{
  "fixes": [
    {
      "title": "",
      "original": "",
      "improved": ""
    }
  ]
}
`;

const fixesResponse =
  await runAgent(fixPrompt);

  if (budgetAgent.confidence <= 1) {
  budgetAgent.confidence *= 100;
}

if (trustAgent.confidence <= 1) {
  trustAgent.confidence *= 100;
}

if (ecoAgent.confidence <= 1) {
  ecoAgent.confidence *= 100;
}

const overallScore = Math.round(
  (
    budgetAgent.confidence * 0.3 +
    trustAgent.confidence * 0.4 +
    ecoAgent.confidence * 0.3
  )
);

res.json({
  success: true,
  data: {
    budgetAgent,
    trustAgent,
    ecoAgent,
    overallScore,
    radarData: [
                {
                    category: "Trust",
                    score: trustAgent.confidence,
                },
                {
                    category: "Pricing",
                    score: budgetAgent.confidence,
                },
                {
                    category: "Sustainability",
                    score: ecoAgent.confidence,
                },
                {
                    category: "Transparency",
                    score: Math.round(
                    (trustAgent.confidence + ecoAgent.confidence) / 2
                    ),
                },
                {
                    category: "Product Clarity",
                    score: Math.round(
                    (budgetAgent.confidence + trustAgent.confidence) / 2
                    ),
                },
                ],
    recommendations: [
  {
    issue: "Improve shipping transparency",
    impact: "+12 Trust Score",
    priority: "HIGH"
  },
  {
    issue: "Strengthen sustainability proof",
    impact: "+9 Eco Score",
    priority: "HIGH"
  },
  {
    issue: "Clarify return policy visibility",
    impact: "+7 Trust Score",
    priority: "MEDIUM"
  }
],
    fixes: fixesResponse.fixes,
  }
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
