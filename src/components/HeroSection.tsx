"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { getAssetPath } from "@/utils/assets";

interface HeroSectionProps {
  onWatchShowreel?: () => void;
  onViewProjects: () => void;
}

export default function HeroSection({ onViewProjects }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const hasEndedRef = useRef(false);

  // Resolve responsive video source on mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const src = isMobile 
      ? getAssetPath("/assets/back-video-mobile.mp4") 
      : getAssetPath("/assets/back-video.mp4");
    setVideoSrc(src);
  }, []);

  const handlePlayVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      playPromiseRef.current = video.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch((error) => {
          console.log("Play failed, trying muted:", error);
          if (video) {
            video.muted = true;
            setIsMuted(true);
            playPromiseRef.current = video.play();
            playPromiseRef.current
              .then(() => {
                setIsPlaying(true);
                isPlayingRef.current = true;
              })
              .catch((err) => {
                console.log("Muted play failed too:", err);
              });
          }
        });
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        handlePlayVideo();
      } else {
        video.pause();
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    }
  };

  // Scroll Play/Pause logic
  useEffect(() => {
    let isPausedByScroll = false;

    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      const shouldPause = window.scrollY > 10;

      if (shouldPause && !isPausedByScroll) {
        isPausedByScroll = true;
        // If there's a pending play promise, wait for it before pausing
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              if (video && !video.paused) {
                video.pause();
              }
            })
            .catch(() => {
              if (video && !video.paused) {
                video.pause();
              }
            });
        } else if (!video.paused) {
          video.pause();
        }
      } else if (!shouldPause && isPausedByScroll) {
        isPausedByScroll = false;
        if (!video.ended && !hasEndedRef.current) {
          playPromiseRef.current = video.play();
          playPromiseRef.current.catch((err) => {
            console.log("Autoplay interrupted or failed:", err);
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


  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);

      // Force play synchronously on unmute to prevent mobile browsers from pausing
      if (!nextMuted) {
        video.play().catch((err) => {
          console.log("Play failed on unmute:", err);
          // Fallback to muted if play fails
          video.muted = true;
          setIsMuted(true);
        });
      }
    }
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    hasEndedRef.current = true;
    setIsPlaying(false);
    isPlayingRef.current = false;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }
  };

  const handleReplayIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = isMuted; // Preserve current user mute preference on replay
      playPromiseRef.current = video.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch((err) => console.log("Replay failed:", err));
      setHasEnded(false);
      hasEndedRef.current = false;
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full md:h-screen overflow-hidden z-20 bg-black"
    >
      {/* Background loop video playing once */}
      <video
        ref={videoRef}
        key={videoSrc}
        className="w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover z-0 pointer-events-auto cursor-pointer"
        src={videoSrc || undefined}
        poster={getAssetPath("/assets/back-video-thumbnail.jpg")}
        playsInline
        preload="metadata"
        muted={isMuted}
        onEnded={handleVideoEnded}
        onClick={handleVideoClick}
      />

      {/* Play Button Overlay shown when video is paused/not started */}
      {!isPlaying && !hasEnded && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/45 backdrop-blur-[2px] transition-all duration-300">
          <button
            onClick={handlePlayVideo}
            className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-primary-purple text-white shadow-[0_0_30px_rgba(124,58,237,0.85)] border border-primary-purple/50 hover:scale-105 hover:bg-primary-purple/95 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Play intro video"
          >
            <Play className="w-5 h-5 md:w-7 md:h-7 ml-0.5 md:ml-1 text-white animate-pulse" fill="white" />
          </button>
        </div>
      )}

      {/* Replay Overlay shown when the intro video ends */}
      {hasEnded && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/45 backdrop-blur-[2px] transition-all duration-300">
          <button
            onClick={handleReplayIntro}
            className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-primary-purple text-white shadow-[0_0_30px_rgba(124,58,237,0.85)] border border-primary-purple/50 hover:scale-105 hover:bg-primary-purple/95 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Replay intro video"
          >
            <Play className="w-5 h-5 md:w-7 md:h-7 ml-0.5 md:ml-1 text-white animate-pulse" fill="white" />
          </button>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div 
        onClick={onViewProjects}
        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 flex items-center gap-2 md:gap-4.5 cursor-pointer group text-white/95 hover:text-white transition-colors duration-300 select-none"
      >
        <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/40 bg-black/35 group-hover:border-white group-hover:bg-white/10 [box-shadow:0_0_10px_rgba(255,255,255,0.25)] group-hover:[box-shadow:0_0_20px_rgba(255,255,255,0.65)] transition-all duration-300 shadow-md">
          <svg 
            className="w-4 h-4 md:w-5.5 md:h-5.5 text-white animate-bounce mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span className="hidden sm:inline-block text-xs md:text-sm font-black uppercase tracking-wider text-white [text-shadow:0_0_10px_rgba(255,255,255,0.85)] group-hover:[text-shadow:0_0_20px_rgba(255,255,255,1)] group-hover:translate-x-1 transition-all duration-300">
          scroll down for website
        </span>
      </div>

      {/* Floating Sound Toggle Button */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex items-center gap-3">
        <button
          onClick={handleToggleMute}
          className="flex items-center justify-center gap-1.5 md:gap-2.5 p-2.5 md:px-4.5 md:py-3 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg backdrop-blur-md group cursor-pointer scale-100 hover:scale-105 active:scale-95"
          aria-label={isMuted ? "Unmute background video" : "Mute background video"}
        >
          <div className="relative w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-zinc-400 group-hover:text-white transition-colors" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-primary-purple transition-colors" />
            )}
          </div>
          <span className="hidden sm:inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest select-none">
            {isMuted ? "Sound Off" : "Sound On"}
          </span>
          
          {/* Animated visualizer bars when unmuted */}
          {!isMuted && (
            <div className="flex items-end gap-0.5 md:gap-0.75 h-2 md:h-3 ml-0.5 md:ml-1">
              <span className="w-0.5 h-1.5 md:h-2 bg-primary-purple rounded-full animate-[equalizer-1_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 md:h-3 bg-primary-purple rounded-full animate-[equalizer-2_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-1 md:h-1.5 bg-primary-purple rounded-full animate-[equalizer-3_0.8s_ease-in-out_infinite]" />
            </div>
          )}
        </button>
      </div>
    </section>
  );
}
