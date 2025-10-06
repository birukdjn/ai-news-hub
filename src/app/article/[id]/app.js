"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ArticlePage() {
  const params = useSearchParams();
  const title = params.get("title");
  const [summary, setSummary] = useState("Generating summary...");

  useEffect(() => {
    async function fetchSummary() {
      const res = await fetch("/api/ai-summary?title=" + title);
      const data = await res.json();
      setSummary(data.summary);
    }
    fetchSummary();
  }, [title]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <h2 className="text-lg mb-3 text-gray-500">AI Summary:</h2>
      <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{summary}</p>
    </main>
  );
}
