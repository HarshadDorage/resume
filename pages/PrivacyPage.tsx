import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const PrivacyPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading eyebrow="Privacy Policy" title="How user information is handled" description="This is a concise product-ready privacy page placeholder for the resume SaaS." />
      <SurfaceCard className="mt-12 space-y-8 p-8">
        <div>
          <h2 className="text-xl font-semibold text-stone-950">Information collected</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">We may collect account details, resume content, uploaded files, contact requests, and usage analytics required to operate the service.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-950">How it is used</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">Information is used to provide the builder, improve templates, support exports, answer inquiries, and maintain product reliability.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-950">Data controls</h2>
          <p className="mt-3 text-sm leading-8 text-stone-600">Users can request access, updates, or deletion of stored personal information by contacting the team through the contact page.</p>
        </div>
      </SurfaceCard>
    </section>
  );
};

export default PrivacyPage;
