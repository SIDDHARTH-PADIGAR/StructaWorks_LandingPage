"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial animation
    gsap.fromTo(".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "glass-panel py-4 border-b border-white/5" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="nav-item flex items-center gap-2">
          <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }} className="font-black text-2xl tracking-tight text-white hover:text-[#10B981] transition-colors cursor-pointer">
            StructaWorks
          </span>
        </div>
        
        <div className="nav-item invisible md:visible flex items-center gap-6">
          <Link href="#problem" className="text-sm text-gray-400 hover:text-white transition-colors">Problem</Link>
          <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</Link>
          <Link href="#demo" className="text-sm text-gray-400 hover:text-white transition-colors">Demo</Link>
        </div>

        <div className="nav-item">
          <Link href="#waitlist">
            <button className="px-5 py-2 text-sm font-medium rounded bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981] hover:text-black transition-all duration-300">
              Join Waitlist
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
