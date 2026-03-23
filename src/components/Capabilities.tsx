"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const parts = [
  "Brackets", "Flanges", "Enclosures", "Shafts", 
  "Worm Gears", "Turbine Blades", "Pipe Fittings", "Motor Mounts"
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Elegant character reveal for the title
    const titleText = titleRef.current?.innerText || "";
    if (titleRef.current) {
      titleRef.current.innerHTML = "";
      titleText.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }

    // Dynamic explosive grid entry
    gsap.fromTo(cardsRef.current,
      { y: 80, opacity: 0, scale: 0.8, rotationX: 15 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.9,
        stagger: { amount: 0.5, grid: [2, 4], from: "center" },
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Deep Scroll Parallax for the entire grid container
    gsap.to(gridRef.current, {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5 // 1.5 seconds of smoothing on the scrub
      }
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardsRef.current[idx], {
      rotationY: x * 0.15,
      rotationX: -y * 0.15,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (idx: number) => {
    gsap.to(cardsRef.current[idx], {
      rotationX: 0,
      rotationY: 0,
      ease: "power3.out",
      duration: 0.8
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-black mb-20 text-center hologram-text">
          Built for real mechanical work.
        </h2>
        
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 perspective-1000">
          {parts.map((part, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="glass-panel group relative aspect-square rounded-2xl p-6 flex flex-col justify-end overflow-hidden hover:border-[#10B981]/60 hover:bg-[#10B981]/5 transition-colors cursor-crosshair transform-gpu"
            >
              {/* Interactive glow backing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#10B981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Abstract wireframe representation via CSS */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110">
                <div className="w-24 h-24 border border-white/30 rounded-full group-hover:border-[#10B981] transition-all duration-700 pointer-events-none" style={{ animation: 'spin 15s linear infinite' }} />
                <div className="absolute w-16 h-16 border border-white/20 group-hover:border-[#059669]/60 group-hover:rotate-90 transition-all duration-1000 ease-out pointer-events-none" />
              </div>
              
              <div className="relative z-10 pointer-events-none">
                <h3 className="text-lg font-bold text-white group-hover:text-[#10B981] transition-colors">{part}</h3>
                <p className="text-xs text-gray-500 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                  Parametric bounds enforced
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
