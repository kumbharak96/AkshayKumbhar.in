"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { getAssetPath } from "@/utils/assets";

interface HeroSectionProps {
  onWatchShowreel: () => void;
  onViewProjects: () => void;
}

export default function HeroSection({ onWatchShowreel, onViewProjects }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  // Sync state with video element
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  // Attempt unmuted autoplay on initial load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing unmuted first
    video.muted = false;
    video.play()
      .then(() => {
        // Success! Update state
        setIsMuted(false);
      })
      .catch((error) => {
        // Blocked by browser autoplay policy. Play muted.
        console.log("Unmuted autoplay blocked, playing muted instead:", error);
        video.muted = true;
        setIsMuted(true);
        video.play().catch((err) => {
          console.log("Muted autoplay failed:", err);
        });
      });
  }, []);

  // Scroll Play/Pause logic
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      // Pause when scrolled down, play when scrolled back up (if not ended)
      if (window.scrollY > 50) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (video.paused && !video.ended) {
          video.play().catch((err) => {
            console.log("Autoplay interrupted:", err);
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Audio Unmute on first user interaction anywhere (if initial unmuted autoplay was blocked)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setIsMuted((muted) => {
        if (muted) {
          return false;
        }
        return muted;
      });
      // Remove listeners once triggered
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const handleVideoEnded = () => {
    setHasEnded(true);
  };

  const handleReplayIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => console.log("Replay failed:", err));
      setHasEnded(false);
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden z-20 bg-black"
    >
      {/* Background loop video playing once */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        src={getAssetPath("/assets/back-video.mp4")}
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleVideoEnded}
      />

      {/* Replay Overlay shown when the intro video ends */}
      {hasEnded && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/45 backdrop-blur-[2px] transition-all duration-300">
          <button
            onClick={handleReplayIntro}
            className="w-20 h-20 rounded-full flex items-center justify-center bg-primary-purple text-white shadow-[0_0_30px_rgba(124,58,237,0.85)] border border-primary-purple/50 hover:scale-105 hover:bg-primary-purple/95 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Replay intro video"
          >
            <Play size={28} fill="white" className="ml-1 text-white animate-pulse" />
          </button>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div 
        onClick={onViewProjects}
        className="absolute bottom-8 left-8 z-30 flex items-center gap-4.5 cursor-pointer group text-white/95 hover:text-white transition-colors duration-300 select-none"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/40 bg-black/35 group-hover:border-white group-hover:bg-white/10 [box-shadow:0_0_10px_rgba(255,255,255,0.25)] group-hover:[box-shadow:0_0_20px_rgba(255,255,255,0.65)] transition-all duration-300 shadow-md">
          <svg 
            className="w-5.5 h-5.5 text-white animate-bounce mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span className="text-sm md:text-base font-black uppercase tracking-wider text-white [text-shadow:0_0_10px_rgba(255,255,255,0.85)] group-hover:[text-shadow:0_0_20px_rgba(255,255,255,1)] group-hover:translate-x-1 transition-all duration-300">
          scroll down for website
        </span>
      </div>

      {/* Floating Sound Toggle Button */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted((prev) => !prev);
          }}
          className="flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-md group cursor-pointer scale-100 hover:scale-105 active:scale-95"
          aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isMuted ? (
              <VolumeX size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
            ) : (
              <Volume2 size={18} className="text-primary-purple transition-colors" />
            )}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest select-none">
            {isMuted ? "Sound Off" : "Sound On"}
          </span>
          
          {/* Animated visualizer bars when unmuted */}
          {!isMuted && (
            <div className="flex items-end gap-0.75 h-3 ml-1">
              <span className="w-0.5 h-2 bg-primary-purple rounded-full animate-[equalizer-1_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3 bg-primary-purple rounded-full animate-[equalizer-2_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-1.5 bg-primary-purple rounded-full animate-[equalizer-3_0.8s_ease-in-out_infinite]" />
            </div>
          )}
        </button>
      </div>
    </section>
  );
}
