
import { HeroSection } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/Categories";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustedBySection } from "@/components/trusted-by-section";
import ServicesExpertise from "@/components/services-expertise";
import { SurgicalHero } from "@/components/surgical-hero";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection/>
      <ServicesExpertise />
      <SurgicalHero />
      <TestimonialsSection />
      <TrustedBySection />
    </div>
  );
}
