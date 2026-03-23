"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase. For this to work, strictly need NEXT_PUBLIC_SUPABASE_URL and ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const professions = [
  "Student / Recent Graduate",
  "Mechanical Engineer",
  "Product Designer",
  "Hardware Startup Founder",
  "Researcher / Academic",
  "Hobbyist / Maker",
  "Other"
];

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState(professions[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Counter animation
    gsap.to(counterRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      innerHTML: 862,
      duration: 3,
      snap: { innerHTML: 1 },
      ease: "power2.out"
    });
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#10B981", "#ffffff"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#10B981", "#ffffff"]
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!supabase) {
      // Mock success if no supabase instance available
      setStatus("success");
      triggerConfetti();
      return;
    }

    setStatus("loading");
    
    try {
      const { error } = await supabase.from('waitlist').insert([
        { email, profession }
      ]);
      
      if (error) {
        if (error.code === '23505' || error.message.includes('duplicate')) {
          setStatus("duplicate");
        } else {
          setStatus("error");
          setErrorMsg(error.message);
        }
      } else {
        setStatus("success");
        triggerConfetti();
      }
    } catch (err: unknown) {
      setStatus("error");
      const e = err as Error;
      setErrorMsg(e.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="waitlist" ref={sectionRef} className="relative w-full py-32 px-6 bg-[#0a0a0a]/80 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6 hologram-text">
          Join the engineers who are done with blank canvases.
        </h2>
        <p className="text-gray-400 font-mono mb-12">
          Be first in line when we launch. No spam. Just early access.
        </p>

        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl max-w-xl mx-auto text-left relative overflow-hidden">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#10B981]/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#10B981]/50">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in.</h3>
              <p className="text-gray-400 font-mono">We&apos;ll reach out when we launch.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="elon@spacex.com"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10B981] transition-colors font-mono text-sm"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-300 mb-2">Profession</label>
                <select 
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10B981] transition-colors font-mono text-sm appearance-none"
                >
                  {professions.map(p => (
                    <option key={p} value={p} className="bg-[#0f0f0f] text-white">{p}</option>
                  ))}
                </select>
              </div>

              {status === "error" && <div className="text-red-400 text-sm mb-4 font-mono">{errorMsg}</div>}
              {status === "duplicate" && <div className="text-[#10B981] text-sm mb-4 font-mono">You&apos;re already on the list. We&apos;ll be in touch.</div>}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-[#10B981] text-black font-bold py-4 rounded-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 glow-btn"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </>
          )}
        </form>

        <div className="mt-12 inline-flex items-center gap-2 text-sm font-mono text-gray-500 py-2 px-4 rounded-full border border-white/5 bg-black/30 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-white hover:text-[#10B981] transition-colors hologram-text"><span ref={counterRef}>0</span></span> engineers already waiting
        </div>
      </div>
    </section>
  );
}
