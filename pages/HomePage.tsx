import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { featureItems, testimonials } from '../data/siteContent';
import FAQSection from '../components/site/FAQSection';
import TemplatePreviewCard from '../components/site/TemplatePreviewCard';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const HomePage: React.FC = () => {
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:px-8 lg:py-24">
          <div className="relative">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-brand-700">
                <Sparkles className="h-4 w-4" />
                Resume Builder SaaS
              </p>
              <div className="space-y-5">
                <h1 className="max-w-3xl font-serif text-5xl leading-none text-stone-950 sm:text-6xl">
                  Turn a resume tool into a product people trust in one visit.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600 text-balance">
                  Modern landing page, 10 template previews, pricing, legal pages, blog, and a responsive builder experience built for fast conversion.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white">
                  Create Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/templates" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-4 text-sm font-semibold text-stone-900">
                  Explore Templates
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-stone-600">
                {['ATS-ready templates', 'AI import flow', 'Responsive builder'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-600" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -left-4 -top-8 h-24 w-24 rounded-full bg-brand-200 blur-3xl" />
            <SurfaceCard className="relative overflow-hidden bg-mesh p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-stone-950 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-300">Conversion stack</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-4xl font-bold">10</p>
                      <p className="text-sm text-stone-300">template previews ready to browse</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold">9</p>
                      <p className="text-sm text-stone-300">supporting pages around the builder</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-500">Why it converts</p>
                    <p className="mt-3 text-2xl font-semibold text-stone-950">Clear value, repeated CTA, trust pages, and product proof.</p>
                  </div>
                  <div className="rounded-[24px] border border-stone-200 bg-brand-50 p-5">
                    <div className="flex items-center gap-2 text-brand-700">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-stone-700">
                      Built with React, TypeScript, Tailwind CSS, lucide-react, and framer-motion.
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Templates" title="A preview grid that sells before users click" description="Show the product quality immediately with reusable template cards and realistic resume previews." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TEMPLATES.slice(0, 4).map((template) => (
            <TemplatePreviewCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading centered eyebrow="How It Works" title="Three steps from blank page to ready-to-send resume" description="The flow stays simple so the site feels productized, not overdesigned." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            ['Choose a template', 'Start with the layout that matches the role you are targeting.'],
            ['Fill or import content', 'Upload an existing resume or edit each section directly in the builder.'],
            ['Export and apply', 'Preview live changes, polish details, and export a finished PDF.'],
          ].map(([title, description], index) => (
            <SurfaceCard key={title} className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-lg font-bold text-stone-950">0{index + 1}</div>
              <h3 className="mt-6 text-xl font-semibold text-stone-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Features" title="Everything expected from a lean resume SaaS" description="Reusable sections, clean content structure, and polished UI patterns that are straightforward to extend." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <SurfaceCard key={item.title} className="p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
              </SurfaceCard>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading centered eyebrow="Testimonials" title="Social proof that reads like a real product" description="A SaaS shell needs buyer confidence, not just a tool UI." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <SurfaceCard key={item.name} className="p-8">
              <p className="text-base leading-8 text-stone-700">"{item.quote}"</p>
              <div className="mt-8">
                <p className="font-semibold text-stone-950">{item.name}</p>
                <p className="text-sm text-stone-500">{item.role}</p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <FAQSection />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SurfaceCard className="overflow-hidden bg-stone-950 px-8 py-10 text-white sm:px-12 sm:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">Final CTA</p>
              <h2 className="mt-4 font-serif text-4xl">Launch the full resume experience, not just the editor.</h2>
              <p className="mt-4 text-base leading-8 text-stone-300">
                The builder already works. This product shell makes it feel complete, premium, and ready to sell.
              </p>
            </div>
            <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-sm font-semibold text-stone-950">
              Create Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SurfaceCard>
      </section>
    </>
  );
};

export default HomePage;
