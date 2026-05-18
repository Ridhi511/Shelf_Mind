import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Leaf,
  Wallet,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import RadarChartComponent from "./components/RadarChartComponent";

function AgentCard({ icon, title, tag, data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111111]/90 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {title}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              {tag}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-3xl font-bold mb-4 text-zinc-100">
        {data?.verdict}
      </h3>

      <p className="text-zinc-400 leading-relaxed mb-6">
        {title === "Budget Agent" &&
          "Evaluates pricing fairness, affordability, discounts, and overall value perception."}

        {title === "Trust Agent" &&
          "Analyzes reviews, transparency, delivery trust, and customer confidence signals."}

        {title === "Eco Agent" &&
          "Measures sustainability messaging, eco practices, and environmental credibility."}
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-zinc-400">
            Confidence
          </p>

          <p className="font-semibold text-lg">
            {data?.confidence}%
          </p>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-zinc-300 to-white"
            style={{
              width: `${data?.confidence || 0}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-green-400 text-xl font-semibold mb-4">
          Strengths
        </h4>

        <ul className="space-y-3">
          {(data?.strengths || []).map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-zinc-300"
            >
              <BadgeCheck
                size={18}
                className="text-green-400 mt-1"
              />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-red-400 text-xl font-semibold mb-4">
          Weaknesses
        </h4>

        <ul className="space-y-3">
          {(data?.weaknesses || []).map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-zinc-300"
            >
              <AlertCircle
                size={18}
                className="text-red-400 mt-1"
              />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
        <p className="text-zinc-500 text-sm mb-1">
          Overall Takeaway
        </p>

        <p className="text-zinc-200 leading-relaxed">
          {title === "Budget Agent" &&
            "Strong premium positioning, but affordability improvements could broaden customer reach."}

          {title === "Trust Agent" &&
            "Overall trust perception is positive, though shipping consistency could improve confidence."}

          {title === "Eco Agent" &&
            "Eco positioning exists, but stronger sustainability proof and transparency are needed."}
        </p>
      </div>
    </motion.div>
  );
}

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://shelf-mindapi.onrender.com/api/analyze",
        { url }
      );

      setResult(response.data.data);

    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* NAVBAR */}

        <div className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold tracking-tight">
            Shelf_Minds
          </h1>

          <button className="border border-white/10 bg-white/[0.03] px-5 py-3 rounded-2xl text-sm hover:bg-white/[0.06] transition">
            How It Works
          </button>
        </div>

        {/* HERO */}

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          <div>

            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full text-sm text-zinc-300 mb-8">
              <Sparkles size={16} />
              AI-Powered Store Intelligence
            </div>

            <h1 className="text-7xl font-bold leading-[1.05] mb-8">
              Understand.
              <br />
              Improve.
              <br />
              <span className="text-zinc-500">
                Grow with AI.
              </span>
            </h1>

            <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl">
              Shelf_Minds simulates multiple AI buyer personas
              to evaluate your Shopify store across pricing,
              trust, sustainability, and overall experience.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-zinc-300">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="font-medium">
                    Multi-Agent Simulation
                  </p>

                  <p className="text-zinc-500">
                    3 intelligent AI agents
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="font-medium">
                    Deep Store Analysis
                  </p>

                  <p className="text-zinc-500">
                    Trust, value & sustainability
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT VISUAL */}

         <div className="flex justify-center">

  <div className="relative">

    {/* glow */}

    <div className="
      absolute
      inset-0
      bg-indigo-500/10
      blur-3xl
      rounded-[50px]
      scale-110
    " />

    {/* main card */}

    <div className="
      relative
      w-[480px]
      h-[540px]
      rounded-[40px]
      border border-white/10
      bg-gradient-to-b
      from-[#111111]
      to-[#0a0a0a]
      backdrop-blur-2xl
      overflow-hidden
      shadow-[0_0_80px_rgba(99,102,241,0.15)]
      p-8
    ">

      {/* top label */}

      <div className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        border border-white/10
        bg-white/[0.03]
        text-sm
        text-zinc-300
        mb-8
      ">
        AI Commerce Intelligence
      </div>

      {/* score */}

      <div className="mb-10">

        <p className="text-zinc-500 mb-3">
          AI Representation Score
        </p>

        <div className="flex items-end gap-3">

          <h1 className="text-8xl font-bold leading-none">
            78
          </h1>

          <span className="text-3xl text-zinc-500 mb-2">
            /100
          </span>

        </div>
      </div>

      {/* progress bars */}

      <div className="space-y-6 mb-10">

        {/* trust */}

        <div>

          <div className="flex justify-between mb-2">

            <p className="text-zinc-400">
              Trust
            </p>

            <p className="text-zinc-300">
              90%
            </p>

          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">

            <div className="
              h-full
              w-[90%]
              rounded-full
              bg-gradient-to-r
              from-indigo-400
              to-indigo-300
            " />

          </div>
        </div>

        {/* budget */}

        <div>

          <div className="flex justify-between mb-2">

            <p className="text-zinc-400">
              Budget
            </p>

            <p className="text-zinc-300">
              75%
            </p>

          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">

            <div className="
              h-full
              w-[75%]
              rounded-full
              bg-gradient-to-r
              from-zinc-300
              to-white
            " />

          </div>
        </div>

        {/* eco */}

        <div>

          <div className="flex justify-between mb-2">

            <p className="text-zinc-400">
              Sustainability
            </p>

            <p className="text-zinc-300">
              68%
            </p>

          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">

            <div className="
              h-full
              w-[68%]
              rounded-full
              bg-gradient-to-r
              from-emerald-400
              to-emerald-300
            " />

          </div>
        </div>

      </div>

      {/* insight card */}

      <div className="
        bg-white/[0.03]
        border border-white/10
        rounded-3xl
        p-6
      ">

        <p className="text-zinc-500 text-sm mb-3">
          AI Insight
        </p>

        <p className="text-2xl font-semibold leading-relaxed">
          Strong trust perception with premium brand positioning.
        </p>

      </div>

      {/* floating badge */}

      <div className="
        absolute
        top-8
        right-8
        w-20
        h-20
        rounded-3xl
        bg-indigo-500/10
        border border-indigo-400/20
        backdrop-blur-xl
        flex items-center justify-center
        text-3xl
      ">
        ✦
      </div>

    </div>

  </div>

</div>
        </div>

        {/* SEARCH */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-16 backdrop-blur-xl">

          <h2 className="text-3xl font-semibold mb-3">
            Analyze Your Shopify Store
          </h2>

          <p className="text-zinc-500 mb-8">
            Enter your store URL and let our AI agents evaluate it from every angle.
          </p>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="https://yourstore.com"
              className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-6 py-5 text-lg outline-none focus:border-white/30 transition"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={handleAnalyze}
              className="bg-zinc-100 text-black px-8 py-5 rounded-2xl font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              {loading ? "Analyzing..." : "Analyze Store"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RESULTS */}

        {result && (
          <>
            <div className="mb-6">
              <h2 className="text-4xl font-bold mb-2">
                AI Agent Evaluation
              </h2>

              <p className="text-zinc-500 text-lg">
                Three specialized AI agents evaluated your store from different perspectives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

              <AgentCard
                title="Budget Agent"
                tag="Value Focused"
                icon={<Wallet className="text-zinc-200" />}
                data={result.budgetAgent}
              />

              <AgentCard
                title="Trust Agent"
                tag="Trust Focused"
                icon={<ShieldCheck className="text-zinc-200" />}
                data={result.trustAgent}
              />

              <AgentCard
                title="Eco Agent"
                tag="Sustainability Focused"
                icon={<Leaf className="text-zinc-200" />}
                data={result.ecoAgent}
              />

            </div>

            {/* BOTTOM SECTION */}

            <div className="grid lg:grid-cols-2 gap-8 mb-16">

              {/* SCORE */}

              <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">

                <h2 className="text-4xl font-bold mb-3">
                  AI Representation Score
                </h2>

                <p className="text-zinc-500 mb-10">
                  Overall score representing how well your store appeals to AI-driven shopping systems.
                </p>

                <RadarChartComponent
                  data={result.radarData}
                />

                <div className="mt-8 text-center">

                  <p className="text-zinc-500 text-sm mb-2">
                    Overall AI Representation Score
                  </p>

                  <h2 className="text-6xl font-bold">
                    {result.overallScore}

                    <span className="text-2xl text-zinc-500">
                      /100
                    </span>
                  </h2>

                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">

                  <h3 className="text-xl font-semibold mb-2">
                    What is this score?
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    The AI Representation Score is calculated out of 100 based on how effectively your store communicates value, trust, and sustainability to AI shopping agents.
                  </p>

                </div>
              </div>

              {/* FIXES */}

              <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">

                <h2 className="text-4xl font-bold mb-3">
                  Priority Fixes
                </h2>

                <p className="text-zinc-500 mb-10">
                  Top AI-recommended improvements to increase visibility and trust.
                </p>

                <div className="space-y-5">

                  {(result.recommendations || []).map(
                    (item) => (
                      <div>
  <p className="text-lg font-medium mb-2">
    {item.issue}
  </p>

  <p className="text-zinc-500 mb-4">
    Improving this area can increase your AI recommendation confidence and buyer trust.
  </p>

  <div className="flex items-center gap-3">

    <div className="bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full text-sm">
      {item.impact}
    </div>

    <div className="
      px-3 py-1 rounded-full text-sm
      border
      ${item.priority === 'HIGH'
        ? 'border-red-500/30 text-red-400 bg-red-500/5'
        : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'}
    ">
      {item.priority}
    </div>

  </div>
</div>
                    )
                  )}

                </div>
              </div>

            </div>
            {/* AI FIX GENERATOR */}

<div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 mb-16">

  <h2 className="text-4xl font-bold mb-3">
    AI Fix Generator
  </h2>

  <p className="text-zinc-500 mb-10">
    AI-generated improvements to strengthen your store messaging and trust signals.
  </p>

  <div className="space-y-6">

    {(result.fixes || []).map((fix, index) => (

      <div
        key={index}
        className="bg-black/30 border border-white/10 rounded-3xl p-6"
      >

        <h3 className="text-2xl font-semibold mb-6">
          {fix.title}
        </h3>

        {/* ORIGINAL */}

        <div className="mb-6">

          <p className="text-red-400 mb-2 font-medium">
            Original
          </p>

          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4 text-zinc-300">
            {fix.original}
          </div>
        </div>

        {/* IMPROVED */}

        <div>

          <p className="text-green-400 mb-2 font-medium">
            AI Improved Version
          </p>

          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4 text-zinc-200 leading-relaxed">
            {fix.improved}
          </div>
        </div>

      </div>
    ))}

  </div>
</div>
          </>
        )}

      </div>
      <div className="border-t border-white/10 pt-8 pb-4 text-center text-zinc-600 text-sm">
  Shelf_Minds • AI Commerce Intelligence Platform
</div>
    </div>
  );
}

export default App; 