# Shelf_Mind
Shelf_Minds is an AI-powered commerce intelligence platform that helps Shopify brands understand how AI shopping systems perceive, evaluate, and recommend their stores.

As AI-driven commerce evolves, platforms like ChatGPT, Gemini, and Perplexity are becoming the new discovery layer for products and brands. Shelf_Minds helps merchants optimize their storefronts for this future.

# Problem Statement

Most ecommerce stores today are optimized only for human visitors through SEO, UI design, and marketing strategies.

However, AI recommendation systems evaluate stores differently. They analyze:

pricing clarity
trust signals
policy transparency
sustainability messaging
customer confidence
overall brand communication

Currently, merchants have no visibility into how AI systems interpret their stores.

Shelf_Minds solves this problem by simulating multiple AI buyer personas and generating actionable AI-readiness insights.

# Features
# Multi-Agent AI Analysis

Shelf_Minds uses multiple specialized AI agents:

Budget Agent
Trust Agent
Eco Agent

Each agent independently evaluates the store from a different perspective.

# AI Representation Score

A weighted score out of 100 representing how effectively the store communicates with AI-driven shopping systems.

# Radar Analytics Dashboard

Visual representation of:

Trust
Pricing
Sustainability
Transparency
Product Clarity

# AI Fix Generator

Generates improved AI-optimized versions of weak store messaging.

Example:

Original: "Returns accepted"

Improved: "Enjoy hassle-free 30-day returns with instant refund tracking and free exchanges."

# Priority Recommendations

AI-generated recommendations with:

issue
impact score
priority level

# Tech Stack
 # Frontend
React
Vite
Tailwind CSS
Framer Motion
Recharts

 # Backend
Node.js
Express.js
Cheerio
Axios
AI
Groq API
Llama 3.3 70B Versatile

# Deployment
Vercel (Frontend)
Render (Backend)

# Backend Setup
cd backend
npm install

Create .env
GROQ_API_KEY=your_key_here

Run backend:npm run dev

# Frontend Setup
cd frontend
npm install
npm run dev
