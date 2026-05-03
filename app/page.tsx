import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ConceptSection from "@/components/ConceptSection";
import TeamSection from "@/components/TeamSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import FloorPlan from "@/components/demo/FloorPlan";
import SplashCursor from "@/components/SplashCursor"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4eee3]">
        <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE={false}
            COLOR="#e9ddba"
        />
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
