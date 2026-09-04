"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Play } from "lucide-react";
import { getAssetPath } from "@/utils/assets";

interface ReelItem {
  id: string;
  title: string;
  videoUrl: string;
  likes: string;
  comments: string;
}

interface ReelsSectionProps {
  onPlayReel: (videoUrl: string, title: string) => void;
}

function ReelCard({
  reel,
  idx,
  onPlayReel,
}: {
  reel: ReelItem;
  idx: number;
  onPlayReel: (videoUrl: string, title: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Attempt unmuted play on hover
      playPromiseRef.current = videoRef.current.play();
      playPromiseRef.current.catch((err) => {
        console.log("Hover unmuted reel play failed, falling back to muted:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          playPromiseRef.current = videoRef.current.play().catch((mutedErr) => {
            console.log("Hover muted reel play failed:", mutedErr);
          });
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (video) video.pause();
          })
          .catch(() => {
            if (video) video.pause();
          });
      } else {
        video.pause();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onClick={() => onPlayReel(reel.videoUrl, reel.title)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[9/16] w-full rounded-[38px] border-8 border-zinc-800 bg-black shadow-2xl overflow-hidden group cursor-pointer"
    >
      {/* Camera Notch decoration */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-zinc-800 z-30 flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-black mr-2" />
        <span className="w-4 h-1 rounded-full bg-black/40" />
      </div>

      {/* Loop Video inside phone */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Gradient cover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />

      {/* Social interaction tags (Likes/Comments overlay) */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1 text-white text-[10px] font-bold">
          <div className="w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-pink-accent group-hover:border-pink-accent transition-colors">
            <Heart size={14} fill="white" className="text-white" />
          </div>
          <span>{reel.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white text-[10px] font-bold">
          <div className="w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-blue-accent group-hover:border-blue-accent transition-colors">
            <MessageCircle size={14} fill="white" className="text-white" />
          </div>
          <span>{reel.comments}</span>
        </div>
      </div>

      {/* Video Play Trigger Indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
          <Play size={18} fill="white" className="text-white ml-0.5" />
        </div>
      </div>

      {/* Phone footer overlay content */}
      <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col gap-1 text-left">
        <span className="text-[10px] text-zinc-400 font-bold tracking-wider">@akshay_kumbhar</span>
        <p className="text-xs text-white font-bold truncate max-w-[80%]">
          {reel.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function ReelsSection({ onPlayReel }: ReelsSectionProps) {
  const reels: ReelItem[] = [
    {
      id: "reel-1",
      title: "Instagram Reel 1",
      videoUrl: getAssetPath("/assets/reel-1.mp4"),
      likes: "45.2K",
      comments: "2.1K"
    },
    {
      id: "reel-2",
      title: "Instagram Reel 2",
      videoUrl: getAssetPath("/assets/reel-2.mp4"),
      likes: "38.6K",
      comments: "1.8K"
    },
    {
      id: "reel-3",
      title: "Vogue Catalog Fall Transition",
      videoUrl: getAssetPath("/assets/Video1.mp4"),
      likes: "32.1K",
      comments: "2.4K"
    },
    {
      id: "reel-4",
      title: "Iceland Glacier Run Cinematic",
      videoUrl: getAssetPath("/assets/back-video.mp4"),
      likes: "45.0K",
      comments: "3.1K"
    }
  ];

  return (
    <section id="reels" className="py-8 lg:py-16 flex flex-col gap-10">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
          Instagram Reels & Shorts
        </h2>
        <p className="text-sm text-zinc-400 font-medium">
          Vertical short-form creations optimized for high virality and engagement metrics.
        </p>
      </div>

      {/* Horizontal Scroll Layout */}
      <div className="flex gap-8 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
        {reels.map((reel, idx) => (
          <div
            key={reel.id}
            className="flex-shrink-0 w-[260px] snap-start"
          >
            <ReelCard reel={reel} idx={idx} onPlayReel={onPlayReel} />
          </div>
        ))}
      </div>
    </section>
  );
}
