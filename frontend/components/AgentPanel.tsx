"use client";

import { useState } from "react";

type Stage = "input" | "planning" | "execution" | "result";

type Props = {
  setStage: (stage: Stage) => void;
};

export default function AgentPanel({ setStage }: Props) {

  const [stage, setLocalStage] = useState<Stage>("input");
  const [url, setUrl] = useState("");
  const [claims, setClaims] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [score] = useState(63);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: ""
  });

  const scoreColor =
    score > 75 ? "bg-green-500" :
    score > 50 ? "bg-yellow-500" :
    "bg-red-500";

  function startAudit() {

    if (!url) {
      alert("Please enter a URL");
      return;
    }

    setLocalStage("planning");
    setStage("planning");

    setTimeout(() => {

      setLocalStage("execution");
      setStage("execution");

      setProduct({
        name: "Eco Running Shoe",
        brand: "GreenFit",
        category: "Footwear"
      });

      setClaims([
        "Organic Cotton Material",
        "Carbon Neutral Shipping",
        "Recyclable Packaging"
      ]);

      setFlags([
        "Uses vague term 'eco-friendly'",
        "Carbon neutral claim not verified",
        "No certification proof found"
      ]);

    }, 2000);

    setTimeout(() => {

      setLocalStage("result");
      setStage("result");

    }, 5000);
  }

  function resetAudit() {
    setUrl("");
    setClaims([]);
    setFlags([]);
    setProduct({ name: "", brand: "", category: "" });
    setLocalStage("input");
    setStage("input");
  }

  /* ---------------- INPUT ---------------- */

  if (stage === "input") {
    return (

      <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl">

        <h1 className="text-2xl font-bold mb-2">
          Sustainability Audit
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Paste a product URL and our AI agent will analyze sustainability claims.
        </p>

        <div className="flex gap-3">

          <input
            placeholder="Paste product URL..."
            className="flex-1 border px-4 py-3 rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={startAudit}
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Analyze
          </button>

        </div>

      </div>
    );
  }

  /* ---------------- PLANNING ---------------- */

  if (stage === "planning") {
    return (

      <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl">

        <h2 className="font-bold text-lg mb-2">
          Agent Planning
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Auditing: {url}
        </p>

        <div className="space-y-3">

          <div className="border p-3 rounded animate-pulse">
            🔍 Extracting sustainability claims
          </div>

          <div className="border p-3 rounded animate-pulse">
            📜 Identifying certifications
          </div>

          <div className="border p-3 rounded animate-pulse">
            🌐 Searching third-party evidence
          </div>

        </div>

      </div>
    );
  }

  /* ---------------- EXECUTION ---------------- */

  if (stage === "execution") {
    return (

      <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl">

        <h2 className="font-bold text-lg mb-2">
          Agent Working
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Auditing: {url}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          AI agent analyzing sustainability...
        </div>

        <div className="w-full bg-gray-200 rounded h-2 mb-6">
          <div className="bg-black h-2 rounded w-2/3 animate-pulse"></div>
        </div>

        <div className="space-y-3">

          <div className="border p-3 rounded animate-pulse">
            ✔ Claims extracted
          </div>

          <div className="border p-3 rounded animate-pulse">
            ⏳ Checking certification registry
          </div>

          <div className="border p-3 rounded animate-pulse">
            ⏳ Fetching NGO reports
          </div>

        </div>

      </div>
    );
  }

  /* ---------------- RESULT ---------------- */

  if (stage === "result") {
    return (

      <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl">

        <h2 className="text-xl font-bold mb-6">
          Sustainability Result
        </h2>

        {/* SCORE */}

        <div className="border p-5 rounded-lg mb-8 bg-gray-50">

          <div className="text-4xl font-bold mb-2">
            {score} / 100
          </div>

          <div className="w-full bg-gray-200 h-3 rounded mb-2">
            <div
              className={`${scoreColor} h-3 rounded`}
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="text-sm font-medium text-yellow-600">
            Verdict: Conditional
          </div>

        </div>

        {/* PRODUCT */}

        <h3 className="font-semibold mb-2">
          Product Info
        </h3>

        <div className="border p-4 rounded mb-8">

          <p className="font-medium">
            {product.name}
          </p>

          <p className="text-sm text-gray-500">
            Brand: {product.brand}
          </p>

          <p className="text-sm text-gray-500">
            Category: {product.category}
          </p>

        </div>

        {/* CLAIMS */}

        <h3 className="font-semibold mb-2">
          Detected Claims
        </h3>

        <div className="space-y-2 mb-8">

          {claims.map((claim, index) => (
            <div key={index} className="border p-3 rounded">
              {claim}
            </div>
          ))}

        </div>

        {/* FLAGS */}

        <h3 className="font-semibold mb-2">
          Greenwashing Flags
        </h3>

        <div className="space-y-2 mb-8">

          {flags.map((flag, index) => (
            <div
              key={index}
              className="border border-red-300 bg-red-50 text-red-700 p-3 rounded"
            >
              🚨 {flag}
            </div>
          ))}

        </div>

        {/* BREAKDOWN */}

        <h3 className="font-semibold mb-2">
          Score Breakdown
        </h3>

        <div className="space-y-1 text-sm mb-8">

          <div className="text-green-600">
            + Transparency Report
          </div>

          <div className="text-green-600">
            + Ethical Sourcing Mention
          </div>

          <div className="text-red-600">
            - No Verified Certification
          </div>

          <div className="text-red-600">
            - Vague Sustainability Claims
          </div>

        </div>

        <button
          onClick={resetAudit}
          className="border px-5 py-2 rounded hover:bg-gray-100 transition"
        >
          Run Another Audit
        </button>

        <p className="text-xs text-gray-400 mt-8">
          AI-generated sustainability audit (demo)
        </p>

      </div>
    );
  }

  return null;
}