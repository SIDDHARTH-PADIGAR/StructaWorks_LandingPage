import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <Demo />
      <Capabilities />
      <Testimonials />
      <Waitlist />
      <Footer />
    </main>
  );
}
