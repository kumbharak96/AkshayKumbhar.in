"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  client: string;
  category: string; // The primary category matches the tab filter
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

interface ProjectsSectionProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export default function ProjectsSection({ onPlayVideo }: ProjectsSectionProps) {
  const tabs = [
    "All",
    "AI Ads",
    "Commercial",
    "Education",
    "Healthcare",
    "Gym",
    "Food",
    "Real Estate",
    "Travel",
    "Reels",
    "Cinematic",
  ];

  const [activeTab, setActiveTab] = useState("All");

  const projects: Project[] = [
    {
      id: "gudup",
      name: "GUDUP Healthy Drink",
      client: "GUDUP Juices",
      category: "AI Ads",
      duration: "00:45",
      description: "AI-generated commercial advertising healthy, refreshing juices with custom graphics.",
      thumbnail: "/assets/dataset-cover.jpg",
      videoUrl: "/assets/Video1.mp4",
    },
    {
      id: "gym-promo",
      name: "Gym Advertisement",
      client: "PowerHouse Gym",
      category: "Gym",
      duration: "01:00",
      description: "High-octane gym promo featuring cinematic action shots and motivational music overlay.",
      thumbnail: "/assets/profile background.jpg",
      videoUrl: "/assets/Video1.mp4",
    },
    {
      id: "restaurant-commercial",
      name: "Restaurant Commercial",
      client: "Tastebuds Grill",
      category: "Food",
      duration: "00:30",
      description: "Mouth-watering closeups of signature dishes, chef cooking sequences, and ambient fine dining.",
      thumbnail: "/assets/AMAZON-1200x537-1.png",
      videoUrl: "/assets/back-video.mp4",
    },
    {
      id: "school-promotion",
      name: "School Promotion Film",
      client: "Oakridge Academy",
      category: "Education",
      duration: "02:15",
      description: "Warm, promotional walkthrough highlighting academics, student activities, and modern sports fields.",
      thumbnail: "/assets/Linkedin-Marketing-Guide-no-text.jpg",
      videoUrl: "/assets/Video1.mp4",
    },
    {
      id: "corporate-video",
      name: "Corporate Video",
      client: "Apex Solutions",
      category: "Commercial",
      duration: "03:00",
      description: "Corporate summary detailing the company's mission, employee culture, and custom software dashboard.",
      thumbnail: "/assets/dataset-cover.jpg",
      videoUrl: "/assets/back-video.mp4",
    },
    {
      id: "travel-film",
      name: "Travel Film - Iceland",
      client: "Personal Project",
      category: "Travel",
      duration: "02:30",
      description: "Cinematic scenery sweep of active volcanoes, glacier rivers, and towering mountain summits.",
      thumbnail: "/assets/profile background.jpg",
      videoUrl: "/assets/back-video.mp4",
    },
    {
      id: "real-estate",
      name: "Real Estate Luxury Tour",
      client: "Elite Heights Realty",
      category: "Real Estate",
      duration: "01:45",
      description: "Luxury villa walkthrough focusing on architectural details, lighting layouts, and stabilization shots.",
      thumbnail: "/assets/instagram-logo.jpg",
      videoUrl: "/assets/Video1.mp4",
    },
    {
      id: "medical-ad",
      name: "Medical Advertisement",
      client: "CareFirst Hospital",
      category: "Healthcare",
      duration: "01:00",
      description: "Reassuring medical commercial showcasing state-of-the-art diagnostic facilities and caring pediatric staff.",
      thumbnail: "/assets/AMAZON-1200x537-1.png",
      videoUrl: "/assets/Video1.mp4",
    },
    {
      id: "festival-reel",
      name: "Festival Promo Reel",
      client: "Sunburn Music Festival",
      category: "Reels",
      duration: "00:30",
      description: "Fast-cut energy-heavy reel covering mainstage DJs, audience crowds, and light show highlights.",
      thumbnail: "/assets/instagram-logo.jpg",
      videoUrl: "/assets/back-video.mp4",
    },
    {
      id: "fashion-reel",
      name: "Vogue Transition Reel",
      client: "StyleUp Fashion",
      category: "Reels",
      duration: "00:15",
      description: "Modern fashion outfit transitions utilizing speed ramp zooms and beat-matched audio cuts.",
      thumbnail: "/assets/dataset-cover.jpg",
      videoUrl: "/assets/back-video.mp4",
    },
    {
      id: "fashion-commercial",
      name: "Fashion Commercial",
      client: "Vogue Trends",
      category: "Cinematic",
      duration: "01:15",
      description: "Aesthetic cinematic commercial detailing the upcoming seasonal clothing line and catalog.",
      thumbnail: "/assets/profile background.jpg",
      videoUrl: "/assets/Video1.mp4",
    },
  ];

  // Filter projects by active tab
  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
            Featured Work
          </h2>
          <p className="text-sm text-zinc-400 font-medium">
            Discover a curated collection of high-performance video products.
          </p>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/5 mask-gradient-x">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap
              ${activeTab === tab
                ? "bg-primary-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="columns-1 md:columns-2 xl:columns-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isReel = project.category === "Reels";
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => onPlayVideo(project.videoUrl, project.name)}
                className="break-inside-avoid group glass-card rounded-card overflow-hidden cursor-pointer relative mb-6 flex flex-col"
              >
                {/* Media Card Aspect ratio */}
                <div className={`relative ${isReel ? "aspect-[9/16]" : "aspect-video"} overflow-hidden`}>
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Autoplay Preview Video on hover (silent local file if present) */}
                  <video
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />

                  {/* Duration Overlay */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 border border-white/5 text-[10px] font-bold text-zinc-300">
                    {project.duration} Min
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/45 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-primary-purple backdrop-blur-md border border-white/20 group-hover:border-primary-purple shadow-lg scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play size={18} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest bg-zinc-900 border border-white/5 px-2.5 py-0.5 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">{project.client}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-primary-purple transition-colors duration-200 flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
