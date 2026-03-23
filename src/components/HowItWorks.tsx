"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TerminalSquare, Cuboid, Download } from "lucide-react";

const steps = [
  {
    icon: TerminalSquare,
    title: "1. Describe",
    desc: "Type exactly what you need. Dimensions, features, materials. Plain English.",
  },
  {
    icon: Cuboid,
    title: "2. Generate",
    desc: "Real parametric B-Rep geometry. Not meshes. Not approximations.",
  },
  {
    icon: Download,
    title: "3. Export",
    desc: "Clean STEP files. Opens in SolidWorks, Fusion 360, CATIA. Every time.",
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(stepsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative w-full py-32 px-6 bg-black/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 hologram-text">
          Three steps. <br className="md:hidden" />Zero frustration.
        </h2>
        <p className="text-gray-400 font-mono mb-20 max-w-2xl mx-auto">
          We built an agent that deeply understands mechanical constraints and generates production-ready parts from your text descriptions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                ref={(el) => { stepsRef.current[idx] = el; }}
                className="glass-panel p-8 rounded-xl text-left hover:border-[#10B981]/50 transition-colors group relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#10B981] group-hover:text-[#10B981] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm font-mono text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {step.desc}
                </p>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
