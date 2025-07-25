import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import PackagesSection from '@/components/sections/packages';
import TestimonialsSection from '@/components/sections/testimonials';
import Footer from '@/components/sections/footer';
import FloatingWhatsAppButton from '@/components/floating-whatsapp-button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PackagesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
