"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({ isOpen, videoUrl, onClose, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<"video" | "reel">("video");

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Programmatic play on mount/url change - try unmuted first
  useEffect(() => {
    if (isOpen && videoUrl && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      setIsMuted(false);
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Autoplay unmuted failed, trying muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch((mutedErr) => {
              console.log("Muted autoplay also failed, requiring user click:", mutedErr);
              setIsPlaying(false);
            });
          }
        });
      }
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((err) => console.log("Play failed:", err));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      // If height is greater than width, it's portrait/vertical (reel)
      if (videoWidth && videoHeight && videoHeight > videoWidth) {
        setAspectRatio("reel");
      } else {
        setAspectRatio("video");
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
      {/* Background click closes video */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Player Container */}
      <div 
        className={`relative w-full rounded-card overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl z-10 transition-all duration-500 flex flex-col justify-center
          ${aspectRatio === "reel" ? "max-w-[340px] aspect-[9/16] h-[75vh]" : "max-w-4xl aspect-video"}
        `}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white hover:scale-105 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* Video Screen */}
        <div className="relative w-full h-full bg-black flex items-center justify-center group/player">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              onClick={() => togglePlay()}
            />
          ) : (
            <div className="text-zinc-500 font-medium">No video source provided</div>
          )}

          {/* Custom Controls Panel */}
          {videoUrl && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-4 pt-10 flex flex-col gap-3 z-20 transition-opacity duration-300">
              
              {/* Progress Timeline Seeker */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-zinc-300 select-none">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-purple"
                  style={{
                    background: `linear-gradient(to right, #7C3AED 0%, #7C3AED ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                  }}
                />
                <span className="text-[10px] font-mono text-zinc-300 select-none">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Playback Controls Row */}
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>

                <div className="flex items-center gap-1.5">
                  {title && (
                    <span className="hidden sm:inline text-xs font-semibold text-zinc-400 max-w-xs truncate mr-2">
                      {title}
                    </span>
                  )}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
