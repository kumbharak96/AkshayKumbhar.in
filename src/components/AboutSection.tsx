"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Eye, Compass, Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple flex items-center gap-3">
          <User className="text-primary-purple" size={28} />
          <span>About Me</span>
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          The creator and editor behind the high-growth video assets.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left: Professional Photo */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Decorative gradients */}
          <div className="absolute w-64 h-64 rounded-full bg-primary-purple/15 blur-[80px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] max-w-[340px] rounded-card overflow-hidden border border-white/10 bg-zinc-950 p-1.5 shadow-2xl group"
          >
            <div className="relative w-full h-full rounded-card overflow-hidden">
              <Image
                src="/assets/1674758970005.jpeg"
                alt="Akshay Kumbhar Professional Photo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* Right: Copy (Story, Experience, Vision) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-display text-2xl font-black text-white leading-snug">
              Designing Visual Narratives That Spark Attention.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              Hi, I'm Akshay Kumbhar. For over 4 years, I have worked as a professional Video Editor, Motion Designer, and AI Ads Creator. I specialize in taking raw, flat footage or conceptual script hooks and transforming them into cinematic, high-retention commercial assets.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              By merging traditional high-end editing suites (Premiere, After Effects, DaVinci Resolve) with state-of-the-art generative AI systems, I deliver production-ready assets rapidly without sacrificing visual detail.
            </p>
          </motion.div>

          {/* Cards for Experience / Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-card bg-card-bg/30 border border-white/5 backdrop-blur-md flex flex-col gap-3 group hover:border-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-purple/10 flex items-center justify-center text-primary-purple">
                <Compass size={16} />
              </div>
              <h4 className="text-sm font-black text-white">Creative Journey</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                4+ years crafting social media campaigns, television spots, and promotional sequences.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-card bg-card-bg/30 border border-white/5 backdrop-blur-md flex flex-col gap-3 group hover:border-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-accent/10 flex items-center justify-center text-pink-accent">
                <Heart size={16} />
              </div>
              <h4 className="text-sm font-black text-white">Visual Vision</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Merging artistic cinematic cuts with AI capabilities to push the boundaries of modern media ads.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
