"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { getAssetPath } from "@/utils/assets";

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

function ProjectCard({ 
  project, 
  onPlayVideo 
}: { 
  project: Project; 
  onPlayVideo: (videoUrl: string, title: string) => void; 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false; // Attempt to play with audio on hover
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current.catch((err) => {
        console.log("Hover unmuted video play failed, falling back to muted:", err);
        if (videoRef.current) {
          videoRef.current.muted = true; // Fallback to muted to prevent block
          playPromiseRef.current = videoRef.current.play().catch((mutedErr) => {
            console.log("Hover muted video play failed:", mutedErr);
          });
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      const video = videoRef.current;
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (video) {
              video.pause();
              video.load(); // Reset video state so poster is displayed again
            }
          })
          .catch(() => {
            if (video) {
              video.pause();
              video.load(); // Reset video state so poster is displayed again
            }
          });
      } else {
        video.pause();
        video.load(); // Reset video state so poster is displayed again
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      key={project.id}
      onClick={() => onPlayVideo(project.videoUrl, project.name)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group glass-card rounded-card overflow-hidden cursor-pointer relative flex flex-col w-full"
    >
      {/* Media Card Aspect ratio (9:16 for vertical ads) */}
      <div className="relative aspect-[9/16] overflow-hidden bg-zinc-950">
        {/* Preview Video, showing poster when not playing, falling back to first-frame if thumbnail is missing/placeholder */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.thumbnail || undefined}
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 bg-zinc-950"
          loop
          playsInline
          muted
          preload="metadata"
        />

        {/* Thumbnail Overlay to show when not hovered */}
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.name}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300 z-10
              ${isHovered ? "opacity-0 invisible" : "opacity-100 visible"}`}
          />
        )}

        {/* Duration Overlay */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 border border-white/5 text-[10px] font-bold text-zinc-300 z-20">
          {videoDuration !== null ? formatDuration(videoDuration) : project.duration}
        </div>

        {/* Play Button Overlay (hides on hover) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all duration-300 z-20">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-lg scale-100 group-hover:scale-90 opacity-100 group-hover:opacity-0 transition-all duration-300">
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Meta Content */}
      <div className="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[8px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-wider bg-zinc-900 border border-white/5 px-2 py-0.5 rounded-full whitespace-nowrap">
            {project.category}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-semibold truncate">{project.client}</span>
        </div>
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-primary-purple transition-colors duration-200 flex items-center justify-between gap-1">
            <span className="truncate">{project.name}</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
          </h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-2 leading-normal sm:leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
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
      id: "ai-ad-1",
      name: "AI Ad Commercial 1",
      client: "Client One",
      category: "AI Ads",
      duration: "00:15",
      description: "High-converting 9:16 vertical AI advertisement featuring fast-paced visual hooks.",
      thumbnail: getAssetPath("/assets/ai-ad-1-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-1.mp4"),
    },
    {
      id: "ai-ad-2",
      name: "AI Ad Commercial 2",
      client: "Client Two",
      category: "AI Ads",
      duration: "00:15",
      description: "Cinematic 9:16 video advertisement tailored for maximum social media engagement.",
      thumbnail: getAssetPath("/assets/ai-ad-2-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-2.mp4"),
    },
    {
      id: "ai-ad-3",
      name: "AI Ad Commercial 3",
      client: "Client Three",
      category: "AI Ads",
      duration: "00:15",
      description: "Vibrant product advertisement utilizing AI generative graphics and motion transitions.",
      thumbnail: getAssetPath("/assets/ai-ad-3-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-3.mp4"),
    },
    {
      id: "ai-ad-4",
      name: "AI Ad Commercial 4",
      client: "Client Four",
      category: "AI Ads",
      duration: "00:15",
      description: "Attention-grabbing hook-focused AI commercial for high click-through rates.",
      thumbnail: getAssetPath("/assets/ai-ad-4-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-4.mp4"),
    },
    {
      id: "ai-ad-5",
      name: "AI Ad Commercial 5",
      client: "Client Five",
      category: "AI Ads",
      duration: "00:15",
      description: "AI-generated aesthetic visual story designed for vertical mobile screens.",
      thumbnail: getAssetPath("/assets/ai-ad-5-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-5.mp4"),
    },
    {
      id: "ai-ad-6",
      name: "AI Ad Commercial 6",
      client: "Client Six",
      category: "AI Ads",
      duration: "00:15",
      description: "Dynamically edited product promotional video showcasing key benefits via AI visuals.",
      thumbnail: getAssetPath("/assets/ai-ad-6-thumb.jpeg"),
      videoUrl: getAssetPath("/assets/ai-ad-6-thumb.mp4"),
    },
  ];

  // Filter projects by active tab
  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category === activeTab);

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

      {/* Projects Grid / Empty State */}
      {filteredProjects.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onPlayVideo={onPlayVideo} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center border border-white/5 bg-secondary-bg/20 rounded-card backdrop-blur-sm">
          <p className="text-zinc-400 text-sm font-semibold tracking-wide">
            No projects in this category
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {"Check out the \"AI Ads\" tab for featured vertical video ads!"}
          </p>
        </div>
      )}
    </section>
  );
}
