"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This would save me at least an hour every day. The STEP files just work.",
    author: "Rohan M.",
    role: "Senior Mechanical Engineer, Pune"
  },
  {
    quote: "Finally something built for how engineers actually think. Not how software companies think we think.",
    author: "Priya K.",
    role: "Hardware Startup Founder, Bangalore"
  },
  {
    quote: "I used this for my final year project. Generated a flanged connector in 30 seconds that would have taken me 2 hours in SolidWorks.",
    author: "Arjun S.",
    role: "Mechanical Engineering Student, NIT"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center hologram-text">
          Engineers who get it.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="glass-panel p-8 rounded-2xl relative"
            >
              <Quote className="w-8 h-8 text-[#10B981]/40 mb-6" />
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">&quot;{t.quote}&quot;</p>
              <div className="border-t border-white/10 pt-6">
                <div className="font-bold text-white group-hover:text-[#10B981] transition-colors">{t.author}</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
