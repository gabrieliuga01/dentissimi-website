import AboutSection from "@/components/AboutSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactSection from "@/components/ContactSection";
import FirstVisitSection from "@/components/FirstVisitSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <FirstVisitSection />
      <BeforeAfterSlider />
      <ContactSection />
    </main>
  );
}
