"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Clock, ListVideo } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import Image from "next/image";

interface VideoPlaylistItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string; // Video to load in modal
  desc: string;
}

interface YoutubeSectionProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export default function YoutubeSection({ onPlayVideo }: YoutubeSectionProps) {
  const playlist: VideoPlaylistItem[] = [
    {
      id: "yt-1",
      title: "Advanced After Effects Motion Tracking & Compositing Guide",
      duration: "14:20",
      views: "185K views",
      thumbnail: "/assets/dataset-cover.jpg",
      videoUrl: "/assets/Video1.mp4",
      desc: "Detailed workflow showcasing 3D tracking camera rigs, green screen replacement, and realistic shadows."
    },
    {
      id: "yt-2",
      title: "Color Space Setup & Cinematic Tone Mapping in DaVinci Resolve",
      duration: "18:05",
      views: "320K views",
      thumbnail: "/assets/profile background.jpg",
      videoUrl: "/assets/back-video.mp4",
      desc: "Masterclass detailing DaVinci Color Managed setups, matching Log profiles, and applying stylized custom grades."
    },
    {
      id: "yt-3",
      title: "AI Commercial Production Workflow: Sora + Kling + Gen-3",
      duration: "10:15",
      views: "95K views",
      thumbnail: "/assets/AMAZON-1200x537-1.png",
      videoUrl: "/assets/Video1.mp4",
      desc: "Walkthrough of script writing in ChatGPT, synthesizing hyper-realistic shots, and pacing the edit."
    },
    {
      id: "yt-4",
      title: "High-Retention Instagram Reels Editing Tutorial",
      duration: "12:40",
      views: "142K views",
      thumbnail: "/assets/instagram-logo.jpg",
      videoUrl: "/assets/back-video.mp4",
      desc: "How to edit engaging shorts utilizing speed ramps, zoom transitions, sound effects, and auto-captioning tools."
    }
  ];

  const [activeItem, setActiveItem] = useState<VideoPlaylistItem>(playlist[0]);

  return (
    <section id="youtube" className="py-8 lg:py-16 flex flex-col gap-10">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple flex items-center gap-3">
          <YoutubeIcon className="text-red-500" size={32} />
          <span>YouTube Content & Tutorials</span>
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          Educational showcases and industry video editing tutorials.
        </p>
      </div>

      {/* Grid Dashboard Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Featured Player Block */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div
            onClick={() => onPlayVideo(activeItem.videoUrl, activeItem.title)}
            className="group relative aspect-video rounded-card overflow-hidden border border-white/10 bg-zinc-950 shadow-xl cursor-pointer"
          >
            {/* Background Thumbnail */}
            <Image
              src={activeItem.thumbnail}
              alt={activeItem.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />

            {/* Dark Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all duration-300">
                <Play size={22} fill="white" className="text-white ml-0.5" />
              </div>
            </div>

            {/* Duration Tag */}
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 border border-white/5 text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Clock size={12} />
              <span>{activeItem.duration} Min</span>
            </div>

            {/* Stats row bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-zinc-400 font-bold">
              <span className="bg-red-600/10 border border-red-500/20 text-red-500 px-3 py-1 rounded-full uppercase tracking-wider">Featured Video</span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {activeItem.views}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white leading-snug">
              {activeItem.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              {activeItem.desc}
            </p>
          </div>
        </div>

        {/* Right Side: Playlist Selector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300">
            <ListVideo size={16} className="text-primary-purple" />
            <span>Showcase Playlist</span>
          </div>

          <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            {playlist.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`
                    flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? "bg-primary-purple/10 border-primary-purple/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : "bg-card-bg/30 border-white/5 hover:border-white/10 hover:bg-card-bg/50"
                    }
                  `}
                >
                  {/* Micro Thumbnail */}
                  <div className="relative w-20 aspect-video rounded-lg overflow-hidden border border-white/5 shrink-0 bg-black">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[8px] font-bold text-white">
                      {item.duration}
                    </div>
                  </div>

                  {/* Meta Text */}
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-zinc-300"}`}>
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
