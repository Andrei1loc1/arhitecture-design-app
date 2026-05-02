import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ConceptSection from "@/components/ConceptSection";
import TeamSection from "@/components/TeamSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import FloorPlan from "@/components/demo/FloorPlan";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4eee3]">
      <Navbar />
      <Hero />
      <ConceptSection />
      <TeamSection />
      <PricingSection/>
      <FloorPlan/>
      <Footer/>
    </main>
  );
}
