"use client";

import React from "react";

export default function ClientLogos() {
  const brands = [
    "Vogue Trends",
    "GUDUP Juices",
    "Sunburn Festival",
    "Apex Solutions",
    "Oakridge Academy",
    "PowerHouse Gym",
    "CareFirst Hospital",
    "Tastebuds Grill",
    "Netflix Clone",
    "Amazon Prime",
  ];

  // Repeat the list to ensure seamless marquee wrapping
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section id="marquee" className="py-6 border-y border-white/5 bg-secondary-bg/20 overflow-hidden w-full relative">
      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex w-max items-center animate-infinite-marquee gap-16 select-none">
        {marqueeItems.map((brand, idx) => (
          <div
            key={idx}
            className="text-lg font-black tracking-widest text-zinc-600 hover:text-white transition-colors duration-300 uppercase cursor-default"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
