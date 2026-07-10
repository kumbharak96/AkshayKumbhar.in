"use client";

import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // percentage
  category: "Creative Suite" | "AI Platforms" | "Workflow Tools";
}

export default function SkillsSection() {
  const skills: Skill[] = [
    { name: "Adobe Premiere Pro", level: 95, category: "Creative Suite" },
    { name: "Adobe After Effects", level: 90, category: "Creative Suite" },
    { name: "DaVinci Resolve", level: 85, category: "Creative Suite" },
    { name: "Adobe Photoshop", level: 90, category: "Creative Suite" },
    { name: "Adobe Illustrator", level: 80, category: "Creative Suite" },
    { name: "CapCut Pro", level: 95, category: "Workflow Tools" },
    { name: "Canva Pro", level: 90, category: "Workflow Tools" },
    { name: "Runway Gen-2/Gen-3", level: 85, category: "AI Platforms" },
    { name: "Kling AI", level: 80, category: "AI Platforms" },
    { name: "Google Veo / Sora", level: 75, category: "AI Platforms" },
    { name: "ChatGPT / Midjourney", level: 95, category: "AI Platforms" },
  ];

  const categories = ["Creative Suite", "AI Platforms", "Workflow Tools"] as const;

  return (
    <section id="skills" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          Software & AI Stack
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          Professional suite and AI interfaces used to engineer high-retention marketing assets.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-card bg-card-bg/30 border border-white/5 backdrop-blur-md flex flex-col gap-6"
          >
            {/* Category header */}
            <h3 className="text-base font-black text-white border-b border-white/5 pb-3">
              {cat}
            </h3>

            {/* Progress bars */}
            <div className="flex flex-col gap-5">
              {skills
                .filter((s) => s.category === cat)
                .map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-bold text-zinc-300">
                      <span>{skill.name}</span>
                      <span className="text-primary-purple">{skill.level}%</span>
                    </div>
                    {/* Bar background */}
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary-purple via-blue-accent to-pink-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
