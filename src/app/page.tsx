"use client";
import React from "react";

export default function Home() {
  const [url, setUrl] = React.useState("");
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Basic Web Scraping App</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="url"
          placeholder="Enter a URL to scrape..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none transition"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition" disabled={loading}>
          {loading ? "Scraping..." : "Scrape"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">Error: {error}</div>}
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50 w-full max-w-md">
          <div><strong>Title:</strong> {result.title}</div>
          <div><strong>H1 tags:</strong>
            <ul className="list-disc ml-6">
              {result.h1s.map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
