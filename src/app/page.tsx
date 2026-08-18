"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";

// Import Components
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import CategoriesSection from "@/components/CategoriesSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseMe from "@/components/WhyChooseMe";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SkillsSection from "@/components/SkillsSection";
import ReelsSection from "@/components/ReelsSection";
import YoutubeSection from "@/components/YoutubeSection";
import ClientLogos from "@/components/ClientLogos";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Video Modal State
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    url: "",
    title: ""
  });

  // Sidebar show-hide on scroll Y
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Section Intersection Observer for Active Highlighting
  useEffect(() => {
    const sectionIds = ["home", "projects", "services", "why-me", "process", "testimonials", "skills", "about", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { 
          threshold: 0.15,
          rootMargin: "-80px 0px -40% 0px" // triggers when section is in upper-mid screen
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      setIsSidebarOpen(false);
      const offset = 90; // Navbar offset
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Video modal triggers
  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({
      isOpen: true,
      url,
      title
    });
  };

  const handleCloseVideo = () => {
    setVideoModal({
      isOpen: false,
      url: "",
      title: ""
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-white antialiased flex">
      {/* Left Sticky Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isVisible={showSidebar}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-[margin] duration-500 ease-in-out ${showSidebar ? "lg:ml-[280px]" : "lg:ml-0"}`}>
        
        {/* Section 1: Hero */}
        <HeroSection 
          onWatchShowreel={() => handleOpenVideo("/assets/Video1.mp4", "Akshay Kumbhar - Editing Showreel")}
          onViewProjects={() => handleNavigate("projects")}
        />

        {/* Scroll Body */}
        <main className="flex-1 px-6 lg:px-12 py-8 flex flex-col gap-12 sm:gap-20 max-w-7xl w-full mx-auto box-border">
          
          {/* Section 2: Projects Grid */}
          <ProjectsSection onPlayVideo={handleOpenVideo} />
          
          {/* Section 3: Specialty Categories */}
          <CategoriesSection />
          
          {/* Section 4: Services */}
          <ServicesSection onContactClick={() => handleNavigate("contact")} />
          
          {/* Section 5: Why Choose Me */}
          <WhyChooseMe />
          
          {/* Section 6: Workflow Process */}
          <ProcessSection />
          
          {/* Section 7: Client Testimonials */}
          <TestimonialsSection />
          
          {/* Section 8: Skills Progress */}
          <SkillsSection />
          
          {/* Section 9: Vertical Reels sliders */}
          <ReelsSection onPlayReel={handleOpenVideo} />
          
          {/* Section 10: Youtube Playlist videos */}
          <YoutubeSection onPlayVideo={handleOpenVideo} />
          
          {/* Section 11: Clients Infinite Marquee */}
          <ClientLogos />
          
          {/* Section 12: Extra statistics highlights */}
          <StatsSection />
          
          {/* Section 13: About Akshay */}
          <AboutSection />
          
          {/* Section 14: Contact CTAs */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Video Modal Lightbox popup */}
      <VideoModal
        isOpen={videoModal.isOpen}
        videoUrl={videoModal.url}
        onClose={handleCloseVideo}
        title={videoModal.title}
      />
    </div>
  );
}
