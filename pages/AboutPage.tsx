import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const AboutPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
        <SectionHeading eyebrow="About" title="A cleaner front door for a useful resume tool" description="This product wraps the existing builder in a modern SaaS experience so visitors understand value before they see the editor." />
        <SurfaceCard className="grid gap-6 p-8 sm:grid-cols-3">
          {[
            ['10', 'resume templates'],
            ['2', 'pricing tiers'],
            ['100%', 'responsive layout'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-4xl font-bold text-stone-950">{value}</p>
              <p className="mt-2 text-sm text-stone-500">{label}</p>
            </div>
          ))}
        </SurfaceCard>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <SurfaceCard className="p-8">
          <h2 className="text-2xl font-semibold text-stone-950">What changed</h2>
          <p className="mt-4 text-sm leading-8 text-stone-600">The project now includes a landing page, templates page, pricing, blog, about, contact, FAQ, and legal pages alongside the original builder.</p>
        </SurfaceCard>
        <SurfaceCard className="p-8">
          <h2 className="text-2xl font-semibold text-stone-950">Why it matters</h2>
          <p className="mt-4 text-sm leading-8 text-stone-600">A working feature is not the same as a product. This structure adds trust, discoverability, and a clearer path to conversion.</p>
        </SurfaceCard>
      </div>
    </section>
  );
};

export default AboutPage;
