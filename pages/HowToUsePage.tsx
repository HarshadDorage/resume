import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, CheckCircle2, ChevronDown, Cpu, Download, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const flowItems = [
  {
    icon: User,
    title: 'Enter Details',
    description: 'Add your name, education, skills, and the key details recruiters expect to see first.',
    badge: '01',
  },
  {
    icon: Cpu,
    title: 'AI Generates Resume',
    description: 'The builder structures everything into a cleaner ATS-friendly format with stronger flow.',
    badge: '02',
  },
  {
    icon: Download,
    title: 'Download PDF',
    description: 'Preview, export, and start applying with a polished resume in just a few minutes.',
    badge: '03',
  },
];

const stepCards = [
  {
    step: 'Step 1',
    icon: User,
    title: 'Enter Your Details',
    description: 'Fill in your basic information like name, education, skills, projects, and achievements. The form keeps the process guided and beginner-friendly.',
    highlights: ['Name, education, skills', 'Projects and achievements', 'Simple guided inputs'],
  },
  {
    step: 'Step 2',
    icon: Cpu,
    title: 'AI Generates Resume',
    description: 'Your content is organized into a cleaner ATS-optimized structure so the final result looks sharp and is easier for recruiters and systems to scan.',
    highlights: ['ATS-friendly layout', 'Cleaner structure', 'Modern recruiter-ready output'],
  },
  {
    step: 'Step 3',
    icon: Download,
    title: 'Download & Apply',
    description: 'Preview your final resume, download the PDF instantly, and use it for internships, fresher roles, or your next job application.',
    highlights: ['Instant PDF export', 'Job-ready presentation', 'Faster application flow'],
  },
];

const faqs = [
  {
    question: 'Is it free?',
    answer: 'Yes. You can start building your resume for free and move through the core flow without any complicated setup.',
  },
  {
    question: 'Do I need experience?',
    answer: 'No. The builder is designed for freshers, students, and job seekers who may not have formal work experience yet.',
  },
  {
    question: 'Is it ATS-friendly?',
    answer: 'Yes. The resume flow is built to help users create cleaner, recruiter-friendly resumes that are easier for ATS systems to scan.',
  },
];

const trustPoints = ['Simple step-by-step flow', 'No writing experience needed', 'Clean ATS-friendly output'];

const HowToUsePage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(135deg,rgba(255,248,238,0.96)_0%,rgba(255,255,255,0.86)_48%,rgba(239,246,255,0.9)_100%)] px-6 py-12 shadow-[0_35px_100px_-58px_rgba(52,31,10,0.55)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              How To Use
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-950 sm:text-5xl lg:text-6xl">
              How to Create Your Resume in 2 Minutes ??
            </h1>
            <p className="mt-5 text-lg leading-8 text-stone-600 sm:text-xl">
              Simple. Fast. No Experience Needed.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              Start with your details, let the AI organize the structure, and download a clean PDF that feels ready for recruiters and ATS screening.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustPoints.map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,63,37,0.1)] bg-white/70 px-4 py-2.5 text-sm text-stone-700 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
                Create Resume in 2 Minutes – Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-flow" className="inline-flex items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/75 px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:bg-white">
                See How It Works
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel relative overflow-hidden rounded-[34px] p-5 sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,138,11,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]" />
            <div className="relative space-y-4">
              <div className="rounded-[26px] border border-white/75 bg-white/80 p-5 shadow-[0_24px_60px_-38px_rgba(52,31,10,0.45)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Quick Preview</p>
                <div className="mt-5 space-y-3">
                  {flowItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-center gap-4 rounded-[20px] border border-[rgba(91,63,37,0.1)] bg-white/80 px-4 py-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-brand-50 text-brand-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-stone-950">{item.title}</p>
                          <p className="text-xs leading-6 text-stone-500">{item.description}</p>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">{item.badge}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[26px] bg-stone-950 p-5 text-white shadow-[0_28px_60px_-36px_rgba(15,23,42,0.9)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-200">Outcome</p>
                <h2 className="mt-3 text-2xl font-semibold">From blank form to job-ready resume.</h2>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  The page is built to remove confusion so users understand what happens next at every step.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div id="how-flow" className="relative mt-16">
          <SectionHeading
            centered
            eyebrow="Flow"
            title="A simple 3-step resume flow"
            description="Enter your details, let the AI organize the resume, and download a polished PDF in minutes."
          />

          <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-5">
            {flowItems.map((item, index) => (
              <React.Fragment key={item.title}>
                <FlowItem icon={item.icon} title={item.title} description={item.description} badge={item.badge} />
                {index < flowItems.length - 1 && (
                  <div className="flex items-center justify-center text-brand-500">
                    <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                      <ArrowDown className="h-5 w-5 lg:hidden" />
                    </motion.div>
                    <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                      <ArrowRight className="hidden h-5 w-5 lg:block" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative mt-16">
          <SectionHeading
            centered
            eyebrow="Steps"
            title="Follow these 3 steps and your resume is ready"
            description="The flow is intentionally simple so users can move from blank screen to job-ready PDF without friction."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {stepCards.map((item) => (
              <StepCard
                key={item.title}
                step={item.step}
                icon={item.icon}
                title={item.title}
                description={item.description}
                highlights={item.highlights}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-16 rounded-[34px] bg-stone-950 px-6 py-10 text-center text-white shadow-[0_28px_80px_-45px_rgba(15,23,42,0.85)] sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,138,11,0.22),transparent_35%)]" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">Start Free</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Ready to build your resume fast?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
              Use the builder to create a clean ATS-friendly resume without getting stuck on formatting or structure.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/builder"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-stone-950 px-8 py-4 text-base font-semibold text-white shadow-[0_22px_50px_-24px_rgba(245,138,11,0.8)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_28px_65px_-28px_rgba(245,138,11,0.9)]"
              >
                Create Resume in 2 Minutes – Free
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-16">
          <SectionHeading
            centered
            eyebrow="FAQ"
            title="Quick answers before you start"
            description="A few simple questions users usually ask before building their first resume here."
          />

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FlowItem: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; description: string; badge: string }> = ({ icon: Icon, title, description, badge }) => (
  <SurfaceCard className="w-full max-w-sm p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-35px_rgba(52,31,10,0.45)]">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-50 text-brand-700 shadow-[0_18px_35px_-22px_rgba(245,138,11,0.5)]">
      <Icon className="h-6 w-6" />
    </div>
    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">{badge}</p>
    <h3 className="mt-3 text-xl font-semibold text-stone-950">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
  </SurfaceCard>
);

const StepCard: React.FC<{
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlights: string[];
}> = ({ step, icon: Icon, title, description, highlights }) => (
  <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
    <SurfaceCard className="h-full p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[rgba(245,138,11,0.12)] text-brand-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">{step}</p>
      <h3 className="mt-3 text-2xl font-semibold text-stone-950">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
      <div className="mt-5 space-y-3">
        {highlights.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-stone-700">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            {item}
          </div>
        ))}
      </div>
    </SurfaceCard>
  </motion.div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <SurfaceCard className="overflow-hidden p-0 transition duration-300 hover:shadow-[0_20px_45px_-32px_rgba(52,31,10,0.4)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-stone-950">{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-stone-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[rgba(91,63,37,0.08)] px-6 py-5 text-sm leading-7 text-stone-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SurfaceCard>
  );
};

export default HowToUsePage;
