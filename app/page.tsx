import { HeroSection } from "@/components/home/hero-section";
import { PresentationSection } from "@/components/home/presentation-section";
import { ServicesSection } from "@/components/home/services-section";
import { VehicleCtaSection } from "@/components/home/vehicle-cta-section";
import { TestDriveCtaSection } from "@/components/home/test-drive-cta-section";
import { ShowroomSection } from "@/components/home/showroom-section";
import { NewsSection } from "@/components/home/news-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PresentationSection />
      <ServicesSection />
      <VehicleCtaSection />
      <TestDriveCtaSection />
      <ShowroomSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}
