"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Sparkles, MoveRight, Layers, Palette } from "lucide-react";

interface Service {
  title: string;
  icon: React.ComponentType<any>;
  desc: string;
  features: string[];
  gradient: string;
  glowColor: string;
}

export default function ServicesSection({ onContactClick }: { onContactClick: () => void }) {
  const services: Service[] = [
    {
      title: "Video Editing",
      icon: Film,
      desc: "Cinematic pacing, customized audio soundscapes, and visual storytelling that retains viewer attention.",
      features: ["Pacing & Continuity", "Immersive Sound Design", "Visual Effects Compositing"],
      gradient: "from-primary-purple to-secondary-purple",
      glowColor: "rgba(124, 58, 237, 0.2)"
    },
    {
      title: "AI Video Ads",
      icon: Sparkles,
      desc: "High-performing digital campaign commercials synthesized using advanced AI platforms for fast, viral results.",
      features: ["Script Writing & Voiceover", "AI Visual Synthesis", "Creative Hook Optimization"],
      gradient: "from-blue-accent to-indigo-500",
      glowColor: "rgba(59, 130, 246, 0.2)"
    },
    {
      title: "Motion Graphics",
      icon: Layers,
      desc: "Bespoke typography, animated logo components, call-out tracking, lower thirds, and UI walkthrough simulations.",
      features: ["Animated Typography", "Bespoke Logo Motion", "UI Mockup Walkthroughs"],
      gradient: "from-pink-accent to-rose-500",
      glowColor: "rgba(236, 72, 153, 0.2)"
    },
    {
      title: "Color Grading",
      icon: Palette,
      desc: "Color correction, exposure balance, matching multiple camera models, and custom LUT color stylization.",
      features: ["Color Correction & Balance", "Matching Camera Profiles", "Cinematic Stylized Grades"],
      gradient: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.2)"
    }
  ];

  return (
    <section id="services" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          Services Offered
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          Premium creative services tailored for high-growth brands and campaigns.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              style={{
                boxShadow: `0 0 30px rgba(0,0,0,0.3)`
              }}
              whileHover={{
                y: -5,
                boxShadow: `0 10px 40px ${service.glowColor}`,
                borderColor: "rgba(255, 255, 255, 0.15)"
              }}
              className="relative p-8 rounded-card bg-card-bg/50 border border-white/5 backdrop-blur-md flex flex-col justify-between gap-6 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Service 0{idx + 1}</span>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-2 mt-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button 
                onClick={onContactClick}
                className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider group-hover:gap-3 transition-all duration-300 w-fit cursor-pointer mt-2"
              >
                <span>Book Service</span>
                <MoveRight size={14} className="text-zinc-500 group-hover:text-white" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
