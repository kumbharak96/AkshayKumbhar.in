"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, Calendar, Check, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1500);
  };

  const contactButtons = [
    {
      label: "Email Me",
      icon: Mail,
      href: "mailto:akshaykumbhar96@gmail.com",
      color: "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
    },
    {
      label: "WhatsApp",
      icon: PhoneCall,
      href: "https://wa.me/918605537395", // Mock WhatsApp link using user's number or standard format
      color: "border-emerald-500/20 hover:border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-400 hover:text-emerald-350"
    },
    {
      label: "Book Meeting",
      icon: Calendar,
      href: "https://calendly.com",
      color: "border-primary-purple/20 hover:border-primary-purple/30 bg-primary-purple/10 hover:bg-primary-purple/15 text-primary-purple hover:text-primary-purple/80"
    }
  ];

  return (
    <section id="contact" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Container Card */}
      <div className="relative p-8 sm:p-12 rounded-card overflow-hidden border border-white/5 bg-secondary-bg/40 shadow-2xl flex flex-col gap-10">
        
        {/* Background Glowing Lights */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-purple/10 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-pink-accent/5 blur-[80px] -z-10" />

        {/* Header Block */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl"
          >
            Let's Create Something{" "}
            <span className="bg-gradient-to-r from-primary-purple via-blue-accent to-pink-accent bg-clip-text text-transparent">
              Amazing
            </span>{" "}
            Together.
          </motion.h2>
          <p className="text-sm text-zinc-400 font-medium max-w-lg">
            Have a project in mind? Reach out via direct channels or leave a message below.
          </p>
        </div>

        {/* Split Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest pl-1">Direct Channels</span>
            <div className="flex flex-col gap-3">
              {contactButtons.map((btn, i) => {
                const Icon = btn.icon;
                return (
                  <a
                    key={i}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3.5 py-4 px-6 rounded-xl border text-sm font-black transition-all duration-300 ${btn.color}`}
                  >
                    <Icon size={16} />
                    <span>{btn.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-card bg-card-bg/40 border border-white/5 flex flex-col gap-6">
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Send Message</span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter name"
                    className="py-3 px-4 rounded-xl bg-secondary-bg border border-white/5 text-sm text-white focus:outline-none focus:border-primary-purple transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    className="py-3 px-4 rounded-xl bg-secondary-bg border border-white/5 text-sm text-white focus:outline-none focus:border-primary-purple transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="py-3 px-4 rounded-xl bg-secondary-bg border border-white/5 text-sm text-white focus:outline-none focus:border-primary-purple transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`
                  flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-black text-white cursor-pointer transition-all duration-300
                  ${isSubmitted 
                    ? "bg-emerald-600 border border-emerald-500 shadow-lg" 
                    : "bg-gradient-to-r from-primary-purple to-secondary-purple hover:from-secondary-purple hover:to-primary-purple shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                  }
                  ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
                `}
              >
                {isSubmitting ? (
                  <>
                    <span>Sending Message...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check size={16} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
