import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, FilePenLine, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SurfaceCard from '../components/ui/SurfaceCard';
import SEO from '../components/SEO';

const modeCards = [
  {
    title: 'Smart AI Builder',
    description: 'Guided one-question-at-a-time flow with suggestions, mock AI generation, live preview, and resume improvement tools.',
    icon: Bot,
    to: '/builder/smart',
    badge: 'Recommended',
    accent: 'from-brand-500 via-brand-600 to-stone-950',
    points: ['Guided chat-like steps', 'Suggestions + demo data', 'Generate and improve content'],
  },
  {
    title: 'Manual Builder',
    description: 'Use the full existing form-based builder with ATS scoring, import, preview, and the original editing workflow.',
    icon: FilePenLine,
    to: '/builder/manual',
    badge: 'Existing',
    accent: 'from-stone-700 via-stone-800 to-stone-950',
    points: ['Full form editor', 'Existing ATS score flow', 'Template-driven manual control'],
  },
] as const;

const Builder: React.FC = () => {
  return (
    <>
      <SEO title="Resume Builder Modes | Smart AI Builder and Manual Builder" description="Choose between the Smart AI Builder and Manual Builder to create an ATS-friendly fresher resume or professional resume faster." keywords="resume builder, ATS resume, fresher resume, AI resume builder" />
      <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[38px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(135deg,rgba(255,248,238,0.95)_0%,rgba(255,255,255,0.86)_52%,rgba(239,246,255,0.9)_100%)] px-6 py-12 shadow-[0_35px_100px_-58px_rgba(52,31,10,0.55)] sm:px-10">
          <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Builder Modes
            </div>
            <h1 className="mt-6 text-4xl font-bold text-stone-950 sm:text-5xl">Choose Your Resume Building Method</h1>
            <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
              Start with the smarter guided flow or jump into the existing manual editor. Both modes use the same resume preview and export-ready output.
            </p>
          </div>

          <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
            {modeCards.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div key={mode.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6, scale: 1.01 }}>
                  <Link to={mode.to} className="block h-full">
                    <SurfaceCard className="h-full p-7 transition duration-300 hover:shadow-[0_24px_60px_-38px_rgba(52,31,10,0.45)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br ${mode.accent} text-white shadow-lg`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${mode.badge === 'Recommended' ? 'bg-brand-50 text-brand-700' : 'bg-stone-100 text-stone-600'}`}>
                          {mode.badge}
                        </div>
                      </div>
                      <h2 className="mt-6 text-2xl font-semibold text-stone-950">{mode.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-stone-600">{mode.description}</p>
                      <div className="mt-6 space-y-3">
                        {mode.points.map((point) => (
                          <div key={point} className="flex items-center gap-3 text-sm text-stone-700">
                            <CheckCircle2 className="h-4 w-4 text-brand-600" />
                            {point}
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 inline-flex items-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white">
                        Open {mode.title}
                      </div>
                    </SurfaceCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Builder;

