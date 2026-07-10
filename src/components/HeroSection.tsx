"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Eye, Briefcase, Users, Calendar } from "lucide-react";

interface HeroSectionProps {
  onWatchShowreel: () => void;
  onViewProjects: () => void;
}

export default function HeroSection({ onWatchShowreel, onViewProjects }: HeroSectionProps) {
  const stats = [
    { value: "120+", label: "Projects Completed", icon: Briefcase },
    { value: "12M+", label: "Views Generated", icon: Eye },
    { value: "60+", label: "Happy Clients", icon: Users },
    { value: "4+", label: "Years Experience", icon: Calendar },
  ];

  const floatingSoftwares = [
    { name: "Premiere", color: "from-blue-600 to-indigo-700", x: "-10%", y: "-5%" },
    { name: "After Effects", color: "from-indigo-600 to-purple-800", x: "75%", y: "-15%" },
    { name: "DaVinci", color: "from-orange-500 to-red-600", x: "-20%", y: "65%" },
    { name: "Photoshop", color: "from-blue-500 to-cyan-600", x: "80%", y: "60%" },
    { name: "Illustrator", color: "from-amber-600 to-orange-500", x: "40%", y: "-25%" },
    { name: "Runway Gen-2", color: "from-zinc-700 to-zinc-900", x: "15%", y: "80%" },
  ];

  return (
    <section id="home" className="py-8 lg:py-16 flex flex-col gap-12 lg:gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-xs font-black tracking-widest text-primary-purple uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-purple animate-pulse" />
            Video Editor & AI Ads Creator
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-white"
          >
            I Create{" "}
            <span className="bg-gradient-to-r from-primary-purple via-blue-accent to-pink-accent bg-clip-text text-transparent">
              Videos
            </span>
            <br />
            That Grow Brands.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg leading-relaxed max-w-xl font-medium"
          >
            I create cinematic edits, AI commercials, promotional videos, motion graphics, Instagram reels, YouTube content, and social media campaigns that captivate and convert.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <button
              onClick={onWatchShowreel}
              className="flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-black text-white cursor-pointer
                bg-gradient-to-r from-primary-purple to-secondary-purple hover:from-secondary-purple hover:to-primary-purple
                shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.5)]
                transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <Play size={16} fill="white" />
              <span>Watch Showreel</span>
            </button>
            <button
              onClick={onViewProjects}
              className="flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-black text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Showcase Video & Floating Tech */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Glass background layout decor */}
          <div className="absolute w-72 h-72 rounded-full bg-primary-purple/10 blur-[100px] -z-10" />
          <div className="absolute w-60 h-60 rounded-full bg-blue-accent/10 blur-[100px] -z-10" />

          {/* Main Video Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onWatchShowreel}
            className="relative w-full aspect-[16/9] rounded-card overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group cursor-pointer"
          >
            {/* Background silent loop video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4s]"
              src="/assets/back-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Video overlay mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-primary-purple backdrop-blur-md border border-white/20 group-hover:border-primary-purple shadow-xl group-hover:scale-110 active:scale-95 transition-all duration-300">
                <Play size={24} fill="white" className="text-white ml-1 group-hover:fill-white" />
              </div>
            </div>

            {/* Video metadata bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Featured Work</span>
                <span className="text-sm font-semibold text-white">Akshay Showreel 2026</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-black/60 border border-white/5 backdrop-blur-sm text-xs font-bold text-zinc-300">
                02:14 Min
              </div>
            </div>

            {/* Timeline progress line */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-purple via-blue-accent to-pink-accent w-[35%] group-hover:w-[100%] transition-all duration-700" />
          </motion.div>

          {/* Floating Software Badges */}
          {floatingSoftwares.map((software, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                delay: idx * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                left: software.x,
                top: software.y,
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-md text-[10px] font-bold text-zinc-300 shadow-md pointer-events-none select-none"
            >
              <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${software.color}`} />
              <span>{software.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics counters block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-card glass-panel border border-white/5 shadow-xl">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/5 text-primary-purple">
                  <Icon size={16} />
                </div>
                <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
