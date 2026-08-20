"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Target, Eye, Bookmark } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  desc: string;
}

export default function StatsSection() {
  const stats: StatItem[] = [
    {
      value: "120+",
      label: "Commercial Projects",
      icon: Award,
      desc: "Delivered video assets matching tight brand guidelines."
    },
    {
      value: "60+",
      label: "Satisfied Clients",
      icon: Target,
      desc: "Partnerships across international gyms, schools, and brands."
    },
    {
      value: "12M+",
      label: "Views Generated",
      icon: Eye,
      desc: "Organic virality achieved across YouTube, Reels, and ads."
    },
    {
      value: "15+",
      label: "Corporate Brands",
      icon: Bookmark,
      desc: "Collaboration with premium enterprises and marketing agencies."
    }
  ];

  return (
    <section id="stats" className="py-8 lg:py-16 flex flex-col gap-10">
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="p-4 sm:p-6 rounded-card bg-card-bg/40 border border-white/5 backdrop-blur-md flex flex-col gap-2 group hover:border-white/10 transition-all duration-300"
            >
              {/* Icon wrapper */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-purple group-hover:bg-primary-purple group-hover:text-white transition-colors duration-300">
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              </div>

              {/* Counter Value */}
              <div className="flex flex-col gap-0.5 mt-1 sm:mt-2">
                <span className="font-mono text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-zinc-300 uppercase tracking-widest mt-0.5 sm:mt-1">
                  {stat.label}
                </span>
              </div>

              {/* Desc */}
              <p className="text-[9px] sm:text-xs text-zinc-500 leading-normal sm:leading-relaxed font-semibold">
                {stat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
