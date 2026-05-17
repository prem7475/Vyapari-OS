import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

import HeroSection from '../sections/home/hero-section';
import TrustedBySection from '../sections/home/trusted-by-section';
import ProblemSolutionSection from '../sections/home/problem-solution-section';
import FeaturesSection from '../sections/home/features-section';
import BusinessFlowSection from '../sections/home/business-flow-section';
import TestimonialsSection from '../sections/home/testimonials-section';
import PricingPreviewSection from '../sections/home/pricing-preview-section';
import CtaSection from '../sections/home/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <Navbar />
      <main className="scroll-smooth">
        <HeroSection />
        <TrustedBySection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <BusinessFlowSection />
        <TestimonialsSection />
        <PricingPreviewSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

