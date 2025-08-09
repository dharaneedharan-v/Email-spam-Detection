"use client";

import { useState } from "react";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const API_BASE_URL = "https://emailspambackend.onrender.com";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ prediction: string; is_spam: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!message.trim()) {
      setError("Please enter a message to analyze.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ prediction: data.prediction, is_spam: data.is_spam });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Spam Classifier</h1>
      <p className="text-sm text-gray-500 mb-6">
        Paste your email or SMS text below to check if it's spam.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            rows={5}
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Analyze Message
        </button>
      </form>

      {loading && <Loader />}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      {result && <ResultCard prediction={result.prediction} isSpam={result.is_spam} />}
    </div>
  );
}
