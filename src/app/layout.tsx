import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import dynamic from "next/dynamic";

const SceneBackground = dynamic(() => import("@/components/SceneBackground"), { ssr: false });

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "StructaWorks | CAD. Finally speaks English.",
  description: "Text-to-CAD AI tool. Describe exactly what you need, generate precise B-Rep geometry in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400,900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmMono.variable} font-mono antialiased text-[#ededed] bg-[#050505] selection:bg-[#10B981]/30 selection:text-white`}>
        <LenisProvider>
          <SceneBackground />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
