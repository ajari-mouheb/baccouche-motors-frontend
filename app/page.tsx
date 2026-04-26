import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { PresentationSection } from "@/components/home/presentation-section";
import { ServicesSection } from "@/components/home/services-section";
import { VehicleCtaSection } from "@/components/home/vehicle-cta-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TestDriveCtaSection } from "@/components/home/test-drive-cta-section";
import { ShowroomSection } from "@/components/home/showroom-section";
import { NewsSection } from "@/components/home/news-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PresentationSection />
      <ServicesSection />
      <VehicleCtaSection />
      <TestimonialsSection />
      <TestDriveCtaSection />
      <ShowroomSection />
      <NewsSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}
