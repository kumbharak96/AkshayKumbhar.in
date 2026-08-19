"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assets";
import { 
  Home, 
  Play, 
  Briefcase, 
  Wrench, 
  HelpCircle, 
  TrendingUp, 
  MessageSquare, 
  Award, 
  Mail, 
  X
} from "lucide-react";
import { YoutubeIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isVisible?: boolean;
}

export default function Sidebar({ activeSection, onNavigate, isOpen, onClose, isVisible = true }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "showreel", label: "Showreel", icon: Play },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "services", label: "Services", icon: Wrench },
    { id: "why-me", label: "Why Choose Me", icon: HelpCircle },
    { id: "process", label: "My Process", icon: TrendingUp },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "skills", label: "Skills", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { href: "https://youtube.com", icon: YoutubeIcon, label: "YouTube" },
    { href: "https://instagram.com/akshay_potter96/", icon: InstagramIcon, label: "Instagram" },
    { href: "https://www.linkedin.com/in/akshay-kumbhar-219685183/", icon: LinkedinIcon, label: "LinkedIn" },
    { 
      href: "https://behance.net", 
      label: "Behance",
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 13h-7v1h7v-1zm-10.2-2.6c.5-.4.8-1 .8-1.7 0-1.6-1.2-2.7-3.2-2.7H3v14h6.5c2.3 0 3.7-1.3 3.7-3.3 0-1.5-.9-2.7-2.4-3.1 1.1-.4 1.6-1.5 1.6-2.6v-.6zm-5.8-2.6h3.1c1.1 0 1.6.4 1.6 1.1s-.5 1.2-1.6 1.2H6V7.8zm3.5 8.4H6v-2.8h3.5c1.1 0 1.7.5 1.7 1.4 0 .9-.6 1.4-1.7 1.4zm10.7-3.4c-1.8 0-3.3 1.4-3.3 3.5 0 2.2 1.5 3.5 3.3 3.5 1.7 0 2.9-1.1 3.2-2.5h-1.6c-.3.5-.8.9-1.6.9-.9 0-1.6-.6-1.7-1.6h5c.1-.3.1-.6.1-.9 0-2.1-1.4-3.4-3.4-3.4zm-1.7 2.2c.1-.9.7-1.5 1.6-1.5.9 0 1.5.6 1.6 1.5h-3.2z" />
        </svg>
      )
    },
    { href: "mailto:akshaykumbhar96@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <>
      {/* Sidebar overlay for mobile drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 
        w-[280px] bg-background lg:bg-background/40 border-r border-white/5 lg:backdrop-blur-md
        flex flex-col p-6 overflow-y-auto no-scrollbar
        transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : isVisible ? "lg:translate-x-0 -translate-x-full" : "-translate-x-full"}
      `}>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors lg:hidden cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Profile info block */}
        <div className="flex flex-col items-center text-center mt-4 mb-8">
          <div className="relative w-32 h-32 rounded-full p-1 mb-4 group transition-all duration-500 hover:[box-shadow:0_0_25px_rgba(124,58,237,0.75)]">
            {/* Border ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-purple/35 group-hover:border-primary-purple/60 transition-all duration-500" />
            {/* Gradient spinner ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-purple via-blue-accent to-pink-accent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]" />
            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary-bg z-10">
              <Image
                src={getAssetPath("/assets/Profile-pic.png")}
                alt="Akshay Kumbhar"
                fill
                className="object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>
          <h2 className="font-display text-xl font-black text-white tracking-wide">
            Akshay Kumbhar
          </h2>
          <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-white/5">
            Video Editor & Ai Creator
          </p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 flex flex-col gap-1.5 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer group
                  ${isActive 
                    ? "bg-primary-purple/10 border-l-2 border-primary-purple text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] [text-shadow:0_0_8px_rgba(124,58,237,0.5)]" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:[text-shadow:0_0_8px_rgba(255,255,255,0.55)]"
                  }
                `}
              >
                <Icon 
                  size={18} 
                  className={isActive 
                    ? "text-primary-purple [filter:drop-shadow(0_0_5px_rgba(124,58,237,0.5))]" 
                    : "text-zinc-500 group-hover:text-white group-hover:[filter:drop-shadow(0_0_5px_rgba(255,255,255,0.5))]"
                  } 
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Social Icons row */}
        <div className="flex justify-center items-center gap-4 py-4 border-t border-white/5">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {Icon ? <Icon size={19} /> : social.svg}
              </a>
            );
          })}
        </div>

        {/* Bottom Sidebar Action CTA */}
        <button
          onClick={() => onNavigate("contact")}
          className="w-full mt-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white text-center cursor-pointer
            bg-gradient-to-r from-primary-purple to-secondary-purple
            hover:from-secondary-purple hover:to-primary-purple
            shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]
            transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          Let's Work Together
        </button>
      </aside>
    </>
  );
}
