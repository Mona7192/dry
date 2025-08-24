// app/page.tsx
import HeroSection from "@/components/HeroSection";
import ServicesSection from '@/components/ServicesSection';
import StepsSection from '@/components/Sections/StepsSection';
import PricingSection from '@/components/Pricing/PricingSection';
import FeaturesSection from '@/components/Features/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WelcomeOfferSection from '@/components/WelcomeOfferSection';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StepsSection />
      <PricingSection />
      <FeaturesSection />
      <TestimonialsSection />
      <WelcomeOfferSection />
    </>
  );
}

