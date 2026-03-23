"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(leftRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

    // Counter animation
    gsap.to(counterRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
      innerHTML: 62,
      duration: 2,
      snap: { innerHTML: 1 },
      ease: "power2.out",
    });

  }, []);

  return (
    <section id="problem" ref={sectionRef} className="relative w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center hologram-text">
          Every engineer knows the blank canvas.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div ref={leftRef} className="glass-panel p-10 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold mb-4 text-gray-300">The Problem</h3>
            <p className="text-gray-400 font-mono mb-8">
              Hours wasted navigating clunky UI, fighting constraints, and dealing with legacy CAD kernels that arbitrarily crash.
            </p>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-3 text-[#10B981]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Over-constrained sketches
              </div>
              <div className="flex items-center gap-3 text-[#10B981]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> StdFail_NotDone crashes
              </div>
              <div className="flex items-center gap-3 text-[#10B981]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Repetitive feature trees
              </div>
            </div>
          </div>

          <div ref={rightRef} className="glass-panel-accent p-10 rounded-2xl relative overflow-hidden border-[#10B981]/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#10B981]/10 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold mb-4 text-[#10B981] hologram-text">The Solution</h3>
            <p className="text-gray-300 font-mono mb-8">
              Describe what you need. Generate exact, parametric B-Rep geometry. Export as STEP. Done in seconds.
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="text-sm font-mono text-gray-400 mb-2">Average time saved per session</div>
              <div className="text-5xl font-black text-white hover:text-[#10B981] transition-colors hologram-text">
                <span ref={counterRef}>62</span> min
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
