import React from "react";

export const Navigation = () => {
  return (
    <nav
        className="w-full bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-start gap-6 py-4 px-4 font-body-text text-black">
        <a href="https://www.sedkiy.dev/" className="no-underline text-black" aria-label="Weather - Home">
          Weather
        </a>
        <a href="https://www.sedkiy.dev" target="_blank" rel="noopener noreferrer" className="no-underline text-black hover:opacity-80 transition-opacity" aria-label="Sedkiy portfolio (opens in new tab)">
          About
        </a>
      </div>
    </nav>
  );
};