"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-6 mt-12 flex justify-center items-center">
      <div className="max-w-7xl w-full px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Web Scraping App. Built with Next.js.
      </div>
    </footer>
  );
}
