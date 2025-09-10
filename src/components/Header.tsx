"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-6 shadow-lg flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Web Scraping App</h1>
        <nav className="flex gap-6">
          <a href="/" className="hover:underline font-semibold">Home</a>
          <a href="/laptops" className="hover:underline font-semibold">Laptops</a>
          <a href="/linkedin-jobs" className="hover:underline font-semibold">Jobs</a>
        </nav>
      </div>
    </header>
  );
}
