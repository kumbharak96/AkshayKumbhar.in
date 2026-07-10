"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Tv, 
  Layers, 
  Video, 
  Smartphone, 
  Share2, 
  Building2, 
  GraduationCap, 
  Compass, 
  Heart, 
  Palette, 
  Flame 
} from "lucide-react";

interface Category {
  title: string;
  icon: React.ComponentType<any>;
  desc: string;
  glow: string; // Tailwind glow border color class
}

export default function CategoriesSection() {
  const categories: Category[] = [
    { title: "AI Ads", icon: Sparkles, desc: "High-conversion commercials synthesized with cutting-edge artificial intelligence.", glow: "group-hover:border-primary-purple group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]" },
    { title: "Commercial Ads", icon: Tv, desc: "Premium advertisement assets for television, web distribution, and broadcast media.", glow: "group-hover:border-blue-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    { title: "Motion Graphics", icon: Layers, desc: "Bespoke typography, 2D/3D dynamic keyframing, and custom UI mockup walkthrough animations.", glow: "group-hover:border-pink-accent group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
    { title: "Promotional Videos", icon: Video, desc: "Compelling brand product promos and event retrospectives engineered to increase sales.", glow: "group-hover:border-primary-purple group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]" },
    { title: "Instagram Reels", icon: Smartphone, desc: "Snappy, beat-matched short-form content customized for high-viral TikTok and Reels reach.", glow: "group-hover:border-pink-accent group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
    { title: "YouTube Videos", icon: Share2, desc: "High-retention storytelling videos featuring engaging sound designs and dynamic pacing.", glow: "group-hover:border-blue-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    { title: "Corporate Videos", icon: Building2, desc: "Professional corporate summaries detailing company missions, team highlights, and values.", glow: "group-hover:border-zinc-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]" },
    { title: "Educational Videos", icon: GraduationCap, desc: "Clear, visually annotated instructional guides, walkthrough tutorials, and course assets.", glow: "group-hover:border-primary-purple group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]" },
    { title: "Travel Films", icon: Compass, desc: "Cinematic destination guides capturing local culture, sweeps, and raw emotional scenery.", glow: "group-hover:border-blue-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    { title: "Wedding Films", icon: Heart, desc: "Emotional cinematic storytelling capturing precious marriage ceremonies and party highlights.", glow: "group-hover:border-pink-accent group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
    { title: "Color Grading", icon: Palette, desc: "Color correction, matching clips, and stylistic LUT tone mapping for commercial looks.", glow: "group-hover:border-primary-purple group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]" },
    { title: "VFX", icon: Flame, desc: "Green-screen compositing, digital asset tracking, simulated particles, and visual elements.", glow: "group-hover:border-blue-accent group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
  ];

  return (
    <section id="categories" className="py-8 lg:py-16 flex flex-col gap-10">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          Video Categories & Specialties
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          A breakdown of my visual content engineering capabilities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={idx}
              className={`group relative p-6 rounded-card bg-card-bg/40 border border-white/5 backdrop-blur-md transition-all duration-300 ${cat.glow}`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors duration-300 mb-4">
                <Icon size={20} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-extrabold text-white group-hover:text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
