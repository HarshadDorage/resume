import React from 'react';
import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Best for testing the builder and creating a simple first resume.',
    features: ['Basic template access', 'Manual editing', 'Live preview', 'Standard PDF export'],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'Best for job seekers who want the full library and polished customization.',
    features: ['All 10 templates', 'Premium styling options', 'AI import workflow', 'Priority export experience'],
    featured: true,
  },
];

const PricingPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading centered eyebrow="Pricing" title="Simple plans with a clear upgrade path" description="Two tiers are enough here: a free starter plan and a more premium Pro offer." />
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <SurfaceCard key={plan.name} className={plan.featured ? 'border-stone-950 bg-stone-950 text-white' : 'p-0'}>
            <div className="p-8">
              <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${plan.featured ? 'text-brand-300' : 'text-brand-600'}`}>{plan.name}</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className={plan.featured ? 'pb-2 text-stone-300' : 'pb-2 text-stone-500'}>/ month</span>
              </div>
              <p className={`mt-4 text-sm leading-7 ${plan.featured ? 'text-stone-300' : 'text-stone-600'}`}>{plan.description}</p>
              <button type="button" className={`mt-8 w-full rounded-full px-5 py-4 text-sm font-semibold ${plan.featured ? 'bg-brand-500 text-stone-950' : 'bg-stone-950 text-white'}`}>
                {plan.featured ? 'Upgrade to Pro' : 'Start Free'}
              </button>
              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`h-4 w-4 ${plan.featured ? 'text-brand-300' : 'text-brand-600'}`} />
                    <span className={plan.featured ? 'text-stone-200' : 'text-stone-700'}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
};

export default PricingPage;
