"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileSearch, 
  FileText, 
  Scissors, 
  Move, 
  Volume2, 
  Palette, 
  MessageSquare, 
  Share 
} from "lucide-react";

interface Step {
  stage: string;
  title: string;
  icon: React.ComponentType<any>;
  desc: string;
}

export default function ProcessSection() {
  const steps: Step[] = [
    { stage: "01", title: "Planning", icon: FileSearch, desc: "We align on creative goals, target audience demographics, visual references, and final delivery guidelines." },
    { stage: "02", title: "Script & Storyboard", icon: FileText, desc: "Drafting the project's hook, structuring the script, and aligning voiceovers to visual storyboard layouts." },
    { stage: "03", title: "Video Editing", icon: Scissors, desc: "Assembling raw clips, removing dead space, and pacing the narrative to match musical timing perfectly." },
    { stage: "04", title: "Motion Graphics", icon: Move, desc: "Synthesizing custom visual annotations, typography transitions, kinetic titles, and tracking call-out labels." },
    { stage: "05", title: "Sound Design", icon: Volume2, desc: "Layering sound effects (SFX), leveling audio tracks, cleaning audio noise, and adjusting background audio dynamics." },
    { stage: "06", title: "Color Grading", icon: Palette, desc: "Correcting exposures, matching different cameras, and color stylization to achieve a cohesive, cinematic feel." },
    { stage: "07", title: "Review & Revisions", icon: MessageSquare, desc: "Sharing prototype drafts via Frame.io, integrating feedback, and polishing sequences for approval." },
    { stage: "08", title: "Final Export", icon: Share, desc: "Delivering fully compiled files in requested specs (MP4, ProRes, vertical/horizontal formats) ready to publish." },
  ];

  return (
    <section id="process" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          My Editing Process
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          A systematic frame-by-frame workflow engineered for consistent, top-tier delivery.
        </p>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l border-white/10 pl-6 ml-4 flex flex-col gap-8">
        
        {/* Timeline Path Line Indicator */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary-purple via-blue-accent to-pink-accent" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={idx}
              className="relative flex flex-col sm:flex-row gap-4 sm:items-start group"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-background border-2 border-primary-purple group-hover:border-pink-accent shadow-md transition-colors duration-300 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-purple group-hover:bg-pink-accent transition-colors" />
              </div>

              {/* Stage Counter */}
              <div className="text-2xl font-black text-primary-purple/30 group-hover:text-primary-purple transition-colors duration-300 tabular-nums">
                {step.stage}
              </div>

              {/* Box Info */}
              <div className="flex-1 p-5 rounded-card bg-card-bg/30 border border-white/5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center gap-4 group-hover:bg-card-bg/50 transition-colors duration-300">
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors duration-300 shrink-0">
                  <Icon size={18} />
                </div>
                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-black text-white">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
