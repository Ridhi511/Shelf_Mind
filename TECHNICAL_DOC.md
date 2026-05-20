# Shelf_Minds — Technical Documentation

# System Overview

Shelf_Minds is a full-stack AI commerce intelligence platform built using a multi-agent architecture.

The system analyzes Shopify stores by scraping structured content, processing it through specialized AI agents, and generating analytics, recommendations, and AI-optimized improvements.

---

# High-Level Architecture

```text
Frontend (React + Vite)
        ↓
Express Backend API
        ↓
Store Scraping Layer
        ↓
Multi-Agent AI Processing
        ↓
Scoring Engine
        ↓
Recommendation + Fix Generation
        ↓
Frontend Analytics Dashboard
```

# Frontend Architecture
Technologies Used
React
Vite
Tailwind CSS
Framer Motion
Recharts
Axios
# Frontend Responsibilities

The frontend handles:

user input
API communication
loading states
analytics rendering
radar charts
recommendation visualization
AI fix rendering
animations and UI transitions

The frontend was designed with a premium dashboard-oriented UX to create a more enterprise-grade feel.

# Frontend Components
# Hero Section

Contains:

product positioning
animated AI commerce visual
store URL input
analysis trigger button
Agent Cards

Displays:

verdicts
confidence scores
strengths
weaknesses
AI-generated takeaways

Each agent card is independently rendered using reusable component structures.

 # Radar Analytics Section

Uses Recharts to visualize:

Trust
Pricing
Sustainability
Transparency
Product Clarity

This improves interpretability and dashboard clarity.

 # Priority Recommendation Section

Displays:

AI-generated issues
impact scores
recommendation priority levels
 # AI Fix Generator

Displays:

original messaging
AI-improved messaging
copywriting optimization suggestions

This transforms passive analysis into actionable outputs.

 # Backend Architecture
Technologies Used
Node.js
Express.js
Axios
Cheerio
Groq SDK
Llama 3.3 70B Versatile
 # Backend Responsibilities

The backend handles:

scraping website content
AI prompt construction
multi-agent orchestration
scoring calculations
recommendation generation
AI fix generation
JSON response formatting
error handling

  # API Flow
  #Request Flow
-User submits Shopify store URL
-Frontend sends request to backend API
-Backend scraper extracts structured content
-AI agents analyze extracted store data
-Scoring engine computes weighted score
-Recommendations and fixes are generated
-Structured JSON response returned
-Frontend renders analytics dashboard

# Scraping Pipeline

The scraper extracts:

page title
meta description
headings
paragraphs
structured textual context

#Example extracted data:

{
  title,
  metaDescription,
  headings,
  paragraphs
}

This ensures the AI agents receive grounded context instead of only a raw URL.

# Why Scraping Was Important

Without scraping, the platform would effectively become a basic prompt wrapper.

By extracting structured store context:

outputs become more reliable,
recommendations become more contextual,
and the system behaves more like real AI infrastructure.
Multi-Agent AI System

Shelf_Minds uses multiple specialized AI agents.

Each agent receives:

extracted store context,
dedicated instructions,
specialized evaluation criteria,
and structured output requirements.

This creates modularity and explainability.

# Budget Agent
Responsibilities

Evaluates:

affordability
pricing clarity
discounts
bundles
value perception
premium positioning
# Trust Agent
Responsibilities

Evaluates:

reviews
guarantees
transparency
shipping confidence
return policy clarity
customer trust signals
# Eco Agent
Responsibilities

Evaluates:

sustainability messaging
eco claims
environmental branding
ethical positioning
greenwashing risk
Prompt Engineering Strategy

Each AI agent uses:

dedicated prompts,
isolated evaluation goals,
structured JSON outputs.

Example structure:

{
  "verdict": "",
  "confidence": 0,
  "strengths": [],
  "weaknesses": []
}

This creates:

cleaner outputs,
modular architecture,
easier scaling,
better consistency.
# AI Representation Scoring Engine

The overall score is generated using weighted confidence aggregation.

Example:

const overallScore = Math.round(
  (
    budgetAgent.confidence * 0.3 +
    trustAgent.confidence * 0.4 +
    ecoAgent.confidence * 0.3
  )
);
# Why Weighted Scoring?

Instead of allowing the LLM to randomly generate overall scores, we intentionally implemented deterministic weighted scoring.

# Benefits:

consistency,
explainability,
more believable analytics,
reduced output randomness.
# Radar Analytics System

The backend generates radar chart data dynamically:

radarData: [
  {
    category: "Trust",
    score: trustAgent.confidence,
  },
  {
    category: "Pricing",
    score: budgetAgent.confidence,
  }
]

Frontend visualizes this using Recharts.

This creates:

easier comparison,
faster interpretation,
stronger dashboard feel.

# AI Fix Generator

The AI Fix Generator transforms weak store messaging into improved AI-optimized content.

Example:

Original:
“Returns accepted.”

Improved:
“Enjoy hassle-free 30-day returns with free exchanges and instant refund tracking.”

# Why AI Fixes Matter

Most AI analysis tools only identify problems.

Shelf_Minds also proposes:

improvements,
optimized messaging,
actionable copywriting fixes.

This increases practical business value.

# Recommendation Engine

The recommendation engine generates:

issue descriptions,
estimated impact,
priority levels.

Example:

{
  "issue": "Improve shipping transparency",
  "impact": "+12 Trust Score",
  "priority": "HIGH"
}
# Error Handling
Invalid URLs

Handled through:

validation,
try-catch blocks,
fallback API responses.
LLM JSON Parsing Errors

LLM responses sometimes include markdown formatting.

Before parsing:

const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

This prevents JSON parsing failures.

# API Failure Handling

Fallback response:

res.status(500).json({
  success: false,
  message: "Analysis failed"
});
# #CORS Handling

Backend uses CORS middleware:

app.use(cors());

This allows deployed frontend-backend communication.

# Deployment Architecture
Frontend

Hosted on:

Vercel

Benefits:

fast deployment,
automatic GitHub integration,
optimized React hosting.
Backend

Hosted on:

Render

Benefits:

easy Node.js deployment,
environment variable support,
automatic redeployment.
Environment Variables

Sensitive API keys are stored using environment variables:

GROQ_API_KEY=your_key_here

This prevents secrets from being hardcoded into the repository.


# Performance Considerations

The system was designed to remain lightweight and modular.

Key optimizations:

reusable React components,
async API processing,
modular AI execution,
lightweight scraping logic,
minimal frontend bundle complexity.
Limitations

# Current limitations include:

no authentication system,
no persistent database,
limited dynamic website scraping,
no historical analytics,
slight variability in AI outputs.
Future Technical Improvements

# Planned future improvements include:

distributed agent execution,
vector database integration,
historical analytics tracking,
Shopify API integration,
competitor benchmarking,
AI discoverability scoring,
advanced scraping infrastructure,
AI memory systems.
# Conclusion

Shelf_Minds was intentionally designed as a structured AI commerce intelligence platform rather than a simple language-model wrapper.

Its combination of:

scraping,
multi-agent orchestration,
weighted scoring,
analytics visualization,
recommendation systems,
and AI-generated fixes

creates a scalable foundation for future AI-commerce infrastructure.
