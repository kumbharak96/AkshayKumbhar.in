"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Lightbulb, 
  CheckCircle, 
  Cpu, 
  Infinity as InfinityIcon, 
  Eye, 
  Smile 
} from "lucide-react";

interface Feature {
  title: string;
  icon: React.ComponentType<any>;
  desc: string;
  color: string;
}

export default function WhyChooseMe() {
  const features: Feature[] = [
    {
      title: "Fast Delivery",
      icon: Zap,
      desc: "Optimized pipelines ensure project drafts are delivered within tight marketing deadlines.",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Creative Ideas",
      icon: Lightbulb,
      desc: "Unique viral hooks, custom scripting, and visual styles designed specifically for your demographic.",
      color: "text-blue-accent bg-blue-accent/10 border-blue-accent/20"
    },
    {
      title: "High Quality",
      icon: CheckCircle,
      desc: "Pixel-perfect details, pristine sound design, and color-matched high-definition exports.",
      color: "text-primary-purple bg-primary-purple/10 border-primary-purple/20"
    },
    {
      title: "AI Powered Workflow",
      icon: Cpu,
      desc: "Leveraging state-of-the-art AI systems (Sora, Runway, Kling, ChatGPT) to boost speed and visuals.",
      color: "text-pink-accent bg-pink-accent/10 border-pink-accent/20"
    },
    {
      title: "Unlimited Creativity",
      icon: InfinityIcon,
      desc: "From 3D motion graphics to green-screen compositing, visual formatting has no limits.",
      color: "text-blue-accent bg-blue-accent/10 border-blue-accent/20"
    },
    {
      title: "Attention to Detail",
      icon: Eye,
      desc: "Pacing frame-by-frame adjustments, cleaning artifacts, and perfecting dynamic sound levels.",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Client Satisfaction",
      icon: Smile,
      desc: "Flexible revisions, direct communication, and a long record of successful brand partnerships.",
      color: "text-primary-purple bg-primary-purple/10 border-primary-purple/20"
    }
  ];

  return (
    <section id="why-me" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          Why Choose Me
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          Professional standards and creative methodology for driving engagement.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={idx}
              className="p-6 rounded-card bg-card-bg/40 border border-white/5 backdrop-blur-md flex flex-col gap-4 hover:border-white/10 hover:bg-card-bg/60 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feat.color}`}>
                <Icon size={18} />
              </div>

              {/* Copy */}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-extrabold text-white">{feat.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
