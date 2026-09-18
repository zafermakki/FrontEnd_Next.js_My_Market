import Header from "@/components/main/Header";
import Hero from "@/components/main/Hero";
import HowItWorks from "@/components/main/HowItWorks";
import CTA from "@/components/main/CTA";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Hero />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}