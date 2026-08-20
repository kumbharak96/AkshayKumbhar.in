"use client";

import React from "react";
import { Menu, ArrowUpRight, Download } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  onNavigate: (sectionId: string) => void;
  isVisible?: boolean;
}

export default function Navbar({ onMenuToggle, onNavigate, isVisible = true }: NavbarProps) {
  return (
    <header className={`
      sticky top-0 right-0 z-30 w-full h-20 bg-background/60 backdrop-blur-md border-b border-white/5 
      flex items-center justify-between px-6 lg:px-12 
      transition-all duration-500 ease-in-out
      ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
      max-lg:translate-y-0 max-lg:opacity-100 max-lg:pointer-events-auto
    `}>
      {/* Mobile Toggle & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>
        <div 
          onClick={() => onNavigate("home")} 
          className="text-lg font-black tracking-widest text-white cursor-pointer bg-gradient-to-r from-primary-purple to-pink-accent bg-clip-text text-transparent"
        >
          AK.CREATIVE
        </div>
      </div>

      {/* Top Navbar Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Download CV */}
        <a
          href="#"
          className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-sm"
        >
          <Download size={14} className="shrink-0" />
          <span className="hidden sm:inline">Download CV</span>
        </a>

        {/* Hire Me CTA */}
        <button
          onClick={() => onNavigate("contact")}
          className="flex items-center gap-1.5 p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-xs font-black text-black bg-white hover:bg-zinc-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 cursor-pointer transition-all duration-300"
        >
          <span className="hidden sm:inline">Hire Me</span>
          <span className="sm:hidden">Hire</span>
          <ArrowUpRight size={14} className="shrink-0" />
        </button>
      </div>
    </header>
  );
}
