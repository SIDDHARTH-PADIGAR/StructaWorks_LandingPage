"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // In a real scenario we'd use SplitText, but for simplicity without premium plugins, 
    // we can just fade up the whole line or manually split in react.
    // We will do a simple stagger fade up.
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(btnGroupRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass-panel border border-[#10B981]/30 text-xs font-mono text-[#10B981]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          Waitlist is now open
        </div>

        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 hologram-text"
        >
          CAD. Finally <br className="hidden md:block" />speaks English.
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-12 font-mono"
        >
          Stop modeling. Start describing. 
          Your next mechanical part, generated in seconds.
        </p>
        
        <div ref={btnGroupRef} className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#waitlist" className="w-full sm:w-auto px-8 py-4 bg-[#10B981] text-black font-semibold rounded hover:bg-white hover:text-black transition-all glow-btn">
            Join the Waitlist
          </a>
          <a href="#demo" className="w-full sm:w-auto px-8 py-4 glass-panel text-white font-medium rounded hover:bg-white/10 transition-all border border-white/10">
            See it work
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
