"use client";

import React from "react";
import { Mail } from "lucide-react";
import { YoutubeIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerLinks = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "why-me", label: "Why Choose Me" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Testimonials" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://youtube.com", icon: YoutubeIcon, label: "YouTube" },
    { href: "https://instagram.com/akshay_potter96/", icon: InstagramIcon, label: "Instagram" },
    { href: "https://www.linkedin.com/in/akshay-kumbhar-219685183/", icon: LinkedinIcon, label: "LinkedIn" },
    { href: "mailto:akshaykumbhar96@gmail.com", icon: Mail, label: "Email" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 px-6 lg:px-12 bg-secondary-bg border-t border-white/5 flex flex-col gap-8 w-full">
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Brand Logo */}
        <div className="flex flex-col gap-2">
          <div 
            onClick={() => onNavigate("home")} 
            className="text-lg font-black tracking-widest text-white cursor-pointer bg-gradient-to-r from-primary-purple to-pink-accent bg-clip-text text-transparent"
          >
            AK.CREATIVE
          </div>
          <p className="text-xs text-zinc-500 font-semibold max-w-[200px]">
            Award-winning video editing and AI ads creation services.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>

      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-white/5" />

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
        <span>© {year} AK.CREATIVE. All Rights Reserved.</span>
        <span>Designed with Vercel & Framer Aesthetics</span>
      </div>
    </footer>
  );
}
