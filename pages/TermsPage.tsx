import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const TermsPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading eyebrow="Terms & Conditions" title="Basic product terms for using the service" description="A compact terms page gives the site the expected legal foundation of a SaaS product." />
      <SurfaceCard className="mt-12 space-y-8 p-8">
        <div>
          <h2 className="text-xl font-semibold text-stone-950">Service use</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">Users may use the builder for lawful professional purposes. Abuse, scraping, reverse engineering, or unauthorized access is prohibited.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-950">Plans and billing</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">Paid features may require an active subscription. Pricing, plan limits, and feature access may change as the product evolves.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-950">Liability</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">The service is provided as available, and users remain responsible for reviewing final resume output before sharing it with employers.</p>
        </div>
      </SurfaceCard>
    </section>
  );
};

export default TermsPage;
