import { notFound } from 'next/navigation';

import Navbar from '../../../components/layout/navbar';
import Footer from '../../../components/layout/footer';

import { getAllServiceSlugs, getServiceBySlug } from '../../../modules/services/data/services';
import ServiceDetailHero from '../../../sections/services/service-detail-hero';
import ServiceFeatures from '../../../sections/services/service-features';
import ServiceProcess from '../../../sections/services/service-process';
import ServicePricing from '../../../sections/services/service-pricing';
import ServiceDocuments from '../../../sections/services/service-documents';
import ServiceFaq from '../../../sections/services/service-faq';
import ServiceCta from '../../../sections/services/service-cta';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070A12] dark:text-slate-50">
      <Navbar />
      <main>
        <ServiceDetailHero service={service} />
        <ServiceFeatures service={service} />
        <ServiceProcess service={service} />
        <ServicePricing service={service} />
        <ServiceDocuments service={service} />
        <ServiceFaq service={service} />
        <ServiceCta service={service} />
      </main>
      <Footer />
    </div>
  );
}

