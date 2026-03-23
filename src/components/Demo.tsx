"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Access env var only on client to avoid hydration mismatch if needed, 
    // or just use process.env.NEXT_PUBLIC_DEMO_VIDEO_ID
    setVideoId(process.env.NEXT_PUBLIC_DEMO_VIDEO_ID);

    gsap.fromTo(containerRef.current,
      { scale: 0.95, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
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
    <section id="demo" ref={sectionRef} className="relative w-full py-32 px-4 md:px-12 lg:px-24">
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto glass-panel p-2 md:p-4 rounded-3xl relative"
      >
        <div className="absolute inset-0 bg-[#10B981]/5 blur-xl rounded-3xl pointer-events-none" />
        <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-3xl pointer-events-none" />
        
        <div className="text-center mb-10 pt-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4 hologram-text">See it in action.</h2>
          <p className="text-gray-400 font-mono">From plain English to production-ready geometry in under 60 seconds.</p>
        </div>

        <div className="relative w-full aspect-video bg-black/80 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)] glow-btn">
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`}
              title="StructaWorks Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 scanlines">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
                <div className="w-4 h-4 bg-[#10B981] rounded-full animate-ping" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-2">Demo coming soon</h3>
              <p className="text-gray-500 font-mono max-w-sm">
                Join the waitlist to get notified first when we release the full interactive walkthrough.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
