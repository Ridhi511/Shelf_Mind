import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        { url }
      );

      console.log(response.data);

      setResult(response.data.data);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-10">
        Shelf_Minds
      </h1>

      <input
        type="text"
        placeholder="Enter Shopify Store URL"
        className="w-full max-w-xl p-4 rounded-lg text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-5 bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze Store"}
      </button>

      {result && (
        <div className="mt-10 w-full max-w-3xl bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-3xl font-bold mb-4">
            {result.verdict || "No Verdict"}
          </h2>

          <p className="mb-6">
            Confidence Score:
            {" "}
            {result.confidence || 0}%
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Strengths
            </h3>

            <ul className="list-disc pl-5">
              {(result.strengths || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Weaknesses
            </h3>

            <ul className="list-disc pl-5">
              {(result.weaknesses || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;