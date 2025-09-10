"use client";
import React from "react";

export default function LaptopsClient({ products, onSubmit, loading, error, categories, subcategories, filter, setFilter, category, setCategory, subcategory, setSubcategory }: any) {
  return (
    <>
      <h1 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow">
        Laptop Price Scraper
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <input
          type="url"
          placeholder="Enter Jumia laptops URL..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          required
          className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          disabled={loading}
        >
          {loading ? "Scraping..." : "Scrape"}
        </button>
      </form>
      {products.length > 0 && (
        <div className="w-full flex flex-col gap-4 ">
          <div className="flex gap-4 items-center mb-2">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none transition"
            >
              <option value="all">All Categories</option>
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {subcategories.length > 0 && (
              <select
                value={subcategory}
                onChange={e => setSubcategory(e.target.value)}
                className="border-2 border-blue-200 focus:border-blue-500 rounded px-3 py-2 outline-none transition"
              >
                <option value="all">All Subcategories</option>
                {subcategories.map((sub: string) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            )}
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products
              .filter((p: any) => {
                const name = p.name.toLowerCase();
                let matchCat = category === "all" || p.category === category;
                let matchSub = subcategory === "all" || (p.subcategory && p.subcategory === subcategory);
                return matchCat && matchSub && name.includes(filter.toLowerCase());
              })
              .map((p: any, i: number) => (
                <div
                  key={i}
                  className="group border-2 border-blue-100 rounded-xl p-6 bg-white shadow-lg flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 duration-200"
                >
                  <div className="w-32 h-32 flex items-center justify-center mb-2 overflow-hidden rounded-lg bg-gray-100">
                    <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105 duration-200" />
                  </div>
                  <div className="font-bold mb-1 text-center text-gray-800 group-hover:text-blue-700 transition">{p.name}</div>
                  <div className="text-blue-700 font-extrabold text-lg group-hover:text-blue-900 transition">{p.price}</div>
                  {p.category && (
                    <div className="text-xs text-gray-500 mt-1">Category: {p.category}</div>
                  )}
                  {p.subcategory && (
                    <div className="text-xs text-gray-400">Subcategory: {p.subcategory}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      {error && <div className="text-red-600 mt-2">Error: {error}</div>}
    </>
  );
}
