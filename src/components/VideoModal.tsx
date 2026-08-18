"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({ isOpen, videoUrl, onClose, title }: VideoModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl rounded-card overflow-hidden bg-card-bg border border-white/10 shadow-2xl z-10 scale-95 animate-in fade-in zoom-in-95 duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white hover:scale-105 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls
              playing
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload"
                  }
                }
              } as any}
            />
          ) : (
            <div className="text-zinc-500 font-medium">No video source provided</div>
          )}
        </div>
      </div>
    </div>
  );
}
