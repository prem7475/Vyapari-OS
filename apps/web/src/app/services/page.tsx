import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';

import ServicesHeroSection from '../../sections/services/services-hero-section';
import ServicesGridSection from '../../sections/services/services-grid-section';
import CtaSection from '../../sections/home/cta-section';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <Navbar />
      <main>
        <ServicesHeroSection />
        <ServicesGridSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

