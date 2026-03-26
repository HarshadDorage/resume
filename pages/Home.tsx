import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileSearch, FileText, LayoutTemplate, ScanSearch, Sparkles, WandSparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoleCard from '../components/RoleCard';
import TemplateCard from '../components/TemplateCard';
import { ROLES, TEMPLATES } from '../constants';

const steps = [
  { title: 'Select Role', description: 'Pick the hiring path you are targeting so the resume starts with a tighter structure and more relevant template options.', icon: FileSearch },
  { title: 'Choose Template', description: 'Preview layouts built for clean hierarchy, ATS readability, and a stronger first scan from recruiters.', icon: LayoutTemplate },
  { title: 'Export Resume', description: 'Fill your details, refine the copy, and generate a polished PDF ready for applications.', icon: FileText },
];

const atsFeatures = [
  'ATS-friendly resume layouts',
  'Role-based keyword prompts',
  'Balanced spacing and hierarchy',
  'Clean export-ready formatting',
];

const Home: React.FC = () => {
  return (
    <>
      <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="section-shell pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              ATS Resume Builder
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] text-stone-950 sm:text-6xl xl:text-7xl">
              Build a <span className="text-gradient">sharper, cleaner</span> resume in minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Apex Resume gives you role-matched templates, guided content structure, and an interface that feels more premium than the usual blank form builder.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
                Create Resume Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/templates" className="inline-flex items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/65 px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:bg-white">
                Explore Templates
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
              {['Free to start', 'Role-based templates', 'ATS-friendly formatting'].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,63,37,0.1)] bg-white/60 px-4 py-2.5 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-panel relative overflow-hidden rounded-[36px] p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,138,11,0.2),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]" />
            <div className="relative grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
              <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_22px_50px_-34px_rgba(52,31,10,0.45)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Resume Score Checklist</p>
                <div className="mt-5 space-y-3">
                  {['Keyword-friendly sections', 'Readable role-specific hierarchy', 'Export-ready ATS layout'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-[20px] border border-[rgba(91,63,37,0.1)] bg-white/85 px-4 py-3 text-sm text-stone-700">
                      <span>{item}</span>
                      <span className="font-semibold text-brand-700">Ready</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] bg-stone-950 p-5 text-white shadow-[0_26px_60px_-34px_rgba(15,23,42,0.8)]">
                <div className="flex items-center gap-2 text-brand-200">
                  <WandSparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">Fast Setup</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">From role selection to export without the clutter.</h2>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  Use a cleaner layout, role prompts, and live preview workflow to draft faster and keep the final resume easy to scan.
                </p>
                <div className="mt-6 grid gap-3">
                  {['Pick a role', 'Choose a template', 'Edit and export PDF'].map((item, index) => (
                    <div key={item} className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-200">
                      <span className="mr-2 font-semibold text-brand-300">0{index + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,247,238,0.92))] p-8 shadow-[0_35px_90px_-55px_rgba(52,31,10,0.5)] sm:p-10">
          <div className="section-shell pt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Role Selection</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Choose your target role before you build</h2>
            <p className="mt-4 text-base leading-7 text-stone-600">Each role narrows the template set and suggested direction so the resume begins closer to the job you want.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((role) => (
              <RoleCard key={role} role={role} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="section-shell max-w-3xl pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Templates</p>
              <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Preview a stronger visual starting point</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">These layouts keep hierarchy clean, spacing disciplined, and the first-screen scan easier for recruiters.</p>
            </div>
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              See all templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TEMPLATES.slice(0, 6).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-stone-950 px-8 py-10 text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,0.9)] sm:px-10 sm:py-12">
          <div className="section-shell pt-8 max-w-3xl before:bg-gradient-to-r before:from-brand-300 before:to-transparent">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">How It Works</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A cleaner three-step flow from blank page to PDF</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} whileHover={{ y: -5 }} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-500/15 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-brand-200">Step 0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="section-shell max-w-3xl pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">ATS Features</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Built for tracking systems and human review</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {atsFeatures.map((feature) => (
              <div key={feature} className="rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-6 shadow-[0_22px_50px_-40px_rgba(52,31,10,0.55)] backdrop-blur-sm">
                <ScanSearch className="h-5 w-5 text-brand-600" />
                <p className="mt-4 text-base font-semibold text-stone-950">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 sm:px-6 sm:pb-12">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(135deg,#fff6e8_0%,#fffdfa_55%,#eef5fb_100%)] px-8 py-12 shadow-[0_34px_90px_-55px_rgba(52,31,10,0.55)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Start Free</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-stone-950 sm:text-4xl">Upgrade the way the whole resume builder feels, starting with your next draft.</h2>
          <div className="mt-8">
            <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
              Create Resume Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
