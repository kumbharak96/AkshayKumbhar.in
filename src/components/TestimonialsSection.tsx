"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
}

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials: Testimonial[] = [
    {
      name: "Liam Sterling",
      role: "Creative Director",
      company: "Velo Brands",
      review: "Akshay did an incredible job on our product promos. His AI ads workflow is incredibly fast and the pacing is perfect. Our campaigns saw a 3x lift in CTR.",
      rating: 5,
      avatar: "/assets/profile background.jpg" // placeholder fallback
    },
    {
      name: "Sarah Connor",
      role: "Marketing Lead",
      company: "Lift Gyms",
      review: "His editing style has helped our Instagram channel double in organic views. The transition reels are extremely engaging and audience retention has spiked.",
      rating: 5,
      avatar: "/assets/profile background.jpg"
    },
    {
      name: "David Miller",
      role: "Founder",
      company: "GUDUP Drinks",
      review: "Akshay's edit for GUDUP was an absolute hit. The color grading matches the premium luxury feel of our brand. Will work with him on all future launches.",
      rating: 5,
      avatar: "/assets/profile background.jpg"
    },
    {
      name: "Jessica Vance",
      role: "Director of Marketing",
      company: "Apex Real Estate",
      review: "We got a stunning, professional cinematic walkthrough of our luxury listings. The stabilizing and call-out motion graphics labels are absolutely perfect.",
      rating: 5,
      avatar: "/assets/profile background.jpg"
    }
  ];

  return (
    <section id="testimonials" className="py-8 lg:py-16 flex flex-col gap-10 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl font-black text-white tracking-tight relative pl-4 border-l-4 border-primary-purple">
            Client Testimonials
          </h2>
          <p className="text-sm text-zinc-400 font-medium">
            Read stories of successful brand partnerships and views generated.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0"
            >
              <div className="h-full p-6 sm:p-8 rounded-card bg-card-bg/40 border border-white/5 backdrop-blur-md flex flex-col justify-between gap-6 relative group hover:border-white/10 transition-all duration-300">
                {/* Quote Icon Overlay */}
                <div className="absolute top-6 right-6 text-primary-purple/10 group-hover:text-primary-purple/20 transition-colors">
                  <MessageSquareQuote size={40} />
                </div>

                {/* Rating & Review */}
                <div className="flex flex-col gap-4">
                  {/* Stars */}
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                    "{test.review}"
                  </p>
                </div>

                {/* Profile Meta row */}
                <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                  {/* Small Avatar circle */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-zinc-950">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Name and Position */}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white tracking-wide">
                      {test.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mt-0.5">
                      {test.role}, <span className="text-primary-purple">{test.company}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
