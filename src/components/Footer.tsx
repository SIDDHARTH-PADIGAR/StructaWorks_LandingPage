import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-[#10B981]/20 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }} className="font-black text-xl tracking-tight text-white hover:text-[#10B981] transition-colors cursor-pointer">
            StructaWorks
          </span>
        </div>

        <div className="text-sm font-mono text-gray-500">
          © 2026 StructaWorks. All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-sm font-mono text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <a href="#" className="hover:text-[#10B981] transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#10B981] transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
