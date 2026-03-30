import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  ScanSearch,
  Sparkles,
  Star,
  Users,
  WandSparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { TEMPLATES } from '../constants';
import beforeResumeSample from '../assets/before-resume-sample.svg';
import afterResumeSample from '../assets/after-resume-sample.svg';
import SEO from '../components/SEO';

const socialProofStats = [
  { icon: Star, label: 'Average rating', value: '4.9/5' },
  { icon: Users, label: 'Active users', value: '500+' },
  { icon: FileText, label: 'Resumes created', value: '1,000+' },
];

const testimonials = [
  {
    name: 'Rohit Sharma',
    role: 'BCA Student',
    quote: 'Pehle mera resume bilkul generic lagta tha. Is builder se ATS-friendly resume bana and I started getting actual interview calls.',
  },
  {
    name: 'Varsha Deshpande',
    role: 'Frontend Developer',
    quote: 'The templates feel clean, modern, and recruiter-friendly. Summary, skills, and project sections became much easier to structure.',
  },
  {
    name: 'Neha Patel',
    role: 'Fresher Job Seeker',
    quote: 'As a fresher, mujhe samajh hi nahi aa raha tha resume kaise likhna hai. This tool made the whole process simple and confidence-building.',
  },
];

const featureCards = [
  {
    title: 'AI Writes Your Resume Content',
    description: 'No writing skills needed. Start with guided content blocks and build stronger resume lines faster.',
  },
  {
    title: 'ATS Optimization',
    description: 'Pass resume screening with cleaner structure, keyword-aware sections, and recruiter-friendly readability.',
  },
  {
    title: 'Professional Templates',
    description: 'Use polished resume layouts that look modern without hurting ATS compatibility.',
  },
  {
    title: 'Download PDF Instantly',
    description: 'Preview live, refine quickly, and export your resume in a clean PDF without extra friction.',
  },
  {
    title: 'AI Cover Letter Generator',
    description: 'Move beyond the resume with faster application-ready cover letter support for job seekers.',
  },
  {
    title: 'Resume Score Checker (Coming Soon)',
    description: 'See what is missing, improve ATS readiness, and fix weak sections before you apply.',
  },
];

const blogPreview = [
  {
    title: 'How to Make a Resume for Freshers (Step-by-Step Guide 2026)',
    excerpt: 'Learn the easiest way to build a strong fresher resume with the right format, skills, and project sections.',
    category: 'Freshers',
  },
  {
    title: 'Top 10 Resume Mistakes That Are Killing Your Job Chances',
    excerpt: 'Spot the resume mistakes that trigger ATS rejection and silently reduce interview calls.',
    category: 'ATS Tips',
  },
  {
    title: 'Best Resume Format in 2026 (ATS-Friendly Templates)',
    excerpt: 'See which resume format works best for ATS and how to choose a modern design that still gets parsed correctly.',
    category: 'Templates',
  },
];

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [leadState, setLeadState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setLeadState('loading');
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setLeadState('success');
    setEmail('');
  };

  return (
    <>
      <SEO title="AI Resume Builder for Freshers | Create ATS-Friendly Resume in 2 Minutes" description="Create professional ATS-friendly resumes in 2 minutes using AI. Perfect for freshers, students, and job seekers in India." keywords="AI resume builder, ATS resume, fresher resume, resume builder India" />
      <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="section-shell pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI Resume Builder
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Used by 10,000+ job seekers</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.02] text-stone-950 sm:text-6xl xl:text-7xl">
              Create <span className="text-gradient">ATS-Friendly Resume in 2 Minutes</span> and Get 3x More Interviews
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Create ATS-friendly resumes in minutes and stand out from 1000+ applicants with sharper content, cleaner templates, and faster editing.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
                Create Resume in 2 Minutes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#live-demo" className="inline-flex items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/65 px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:bg-white">
                See Live Demo
              </a>
            </div>
            <div className="mt-4">
              <Link to="/builder" className="text-sm font-semibold text-brand-700 transition hover:text-brand-800">
                Start Now - It's Free
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
              {['ATS-friendly formatting', 'No spam, no hidden charges', 'Built for freshers and developers'].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,63,37,0.1)] bg-white/60 px-4 py-2.5 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-panel relative overflow-hidden rounded-[36px] p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,138,11,0.2),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]" />
            <div className="relative space-y-4">
              <div className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_22px_50px_-34px_rgba(52,31,10,0.45)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Why users trust it</p>
                <div className="mt-5 grid gap-3">
                  {['AI-guided resume content', 'ATS-friendly structure', 'Role-focused templates', 'PDF export in minutes'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-[20px] border border-[rgba(91,63,37,0.1)] bg-white/85 px-4 py-3 text-sm text-stone-700">
                      <span>{item}</span>
                      <CheckCircle2 className="h-4 w-4 text-brand-700" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] bg-stone-950 p-5 text-white shadow-[0_26px_60px_-34px_rgba(15,23,42,0.8)]">
                <div className="flex items-center gap-2 text-brand-200">
                  <WandSparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">Live Demo</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">From blank page to recruiter-ready resume, fast.</h2>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  Pick a template, fill guided sections, improve ATS score, and download a cleaner PDF without getting stuck on wording.
                </p>
                <div className="mt-6 grid gap-3">
                  {['Choose a role', 'Use AI-assisted structure', 'Download recruiter-ready PDF'].map((item, index) => (
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

      {/* <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {socialProofStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <SurfaceStat key={stat.label} icon={<Icon className="h-5 w-5 text-brand-600" />} value={stat.value} label={stat.label} />
            );
          })}
        </div>
      </section> */}

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="section-shell max-w-3xl pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Social Proof</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Loved by job seekers who needed better results fast</h2>
            <p className="mt-4 text-base leading-7 text-stone-600">Real users trust the builder because it removes confusion, improves ATS readiness, and helps them apply with more confidence.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-white/75 p-6 shadow-[0_22px_50px_-40px_rgba(52,31,10,0.55)] backdrop-blur-sm">
                <div className="flex items-center gap-1 text-brand-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-700">"{item.quote}"</p>
                <p className="mt-5 text-base font-semibold text-stone-950">{item.name}</p>
                <p className="text-sm text-stone-500">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="before-after" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,247,238,0.92))] p-8 shadow-[0_35px_90px_-55px_rgba(52,31,10,0.5)] sm:p-10">
          <div className="section-shell max-w-3xl pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Before vs After</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">See the difference between a weak resume and a high-converting one</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ComparisonCard
              title="Bad Resume"
              tone="bad"
              imageSrc={beforeResumeSample}
              imageAlt="Sample blurred weak resume preview"
              bullets={['Weak bullet points', 'No keywords for the target role', 'Not ATS friendly', 'Looks generic and forgettable']}
            />
            <ComparisonCard
              title="AI Resume"
              tone="good"
              imageSrc={afterResumeSample}
              imageAlt="Sample clean AI resume preview"
              bullets={['Strong impact statements', 'ATS optimized with role keywords', 'Clean modern design', 'Built to impress recruiters fast']}
            />
          </div>
          <div className="mt-8">
            <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
              Upgrade your resume now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="section-shell max-w-3xl pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Benefits</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Everything is written to help you get more replies, not just make a pretty PDF</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => (
              <div key={feature.title} className="rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-6 shadow-[0_22px_50px_-40px_rgba(52,31,10,0.55)] backdrop-blur-sm">
                <ScanSearch className="h-5 w-5 text-brand-600" />
                <p className="mt-4 text-lg font-semibold text-stone-950">{feature.title}</p>
                <p className="mt-3 text-sm leading-7 text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="live-demo" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="section-shell max-w-3xl pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Live Demo</p>
              <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Preview the ATS-friendly templates before you start</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">These template previews help users trust the output quality before they commit to building their resume.</p>
            </div>
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              See all templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TEMPLATES.slice(0, 3).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-stone-950 px-8 py-10 text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,0.9)] sm:px-10 sm:py-12">
          <div className="section-shell pt-8 max-w-3xl before:bg-gradient-to-r before:from-brand-300 before:to-transparent">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Trust</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Your data is safe, your workflow is simple, and the goal is clear</h2>
            <p className="mt-4 text-base leading-7 text-stone-300">No spam. No hidden charges. No confusing setup. Just a faster way to create a better resume.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <TrustCard icon={<Lock className="h-5 w-5" />} title="Your data is safe & private" description="We keep the resume flow focused and transparent so users feel comfortable filling personal details." />
            <TrustCard icon={<CheckCircle2 className="h-5 w-5" />} title="No spam. No hidden charges." description="The product messaging stays clear: start free, build fast, and understand what happens before download." />
            <TrustCard icon={<Sparkles className="h-5 w-5" />} title="Built by developers who faced 100+ rejections" description="This product is shaped by real job search pain, not generic SaaS copy. It is built to help users avoid the same mistakes." />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(135deg,#fff6e8_0%,#fffdfa_55%,#eef5fb_100%)] px-8 py-12 shadow-[0_34px_90px_-55px_rgba(52,31,10,0.55)] sm:px-12">
          <div className="section-shell max-w-3xl pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Lead Capture</p>
            <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Get Free Resume Tips & Templates</h2>
            <p className="mt-4 text-base leading-7 text-stone-600">Join the list and get actionable resume advice, fresher tips, and template ideas straight to your inbox.</p>
          </div>
          <form onSubmit={handleLeadSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="sr-only" htmlFor="lead-email">Email</label>
              <div className="flex items-center gap-3 rounded-full border border-[rgba(91,63,37,0.14)] bg-white/90 px-5 py-3.5 shadow-sm">
                <Mail className="h-4 w-4 text-stone-500" />
                <input
                  id="lead-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
                />
              </div>
            </div>
            <button type="submit" disabled={leadState === 'loading'} className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60">
              {leadState === 'loading' ? 'Loading...' : 'Get Free Access'}
            </button>
          </form>
          {leadState === 'success' && (
            <p className="mt-4 text-sm font-medium text-emerald-700">You are in. We will share resume tips and templates soon.</p>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="section-shell max-w-3xl pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Latest Career Tips</p>
              <h2 className="mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">Practical blogs that help users build, improve, and understand resumes better</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">Use high-intent content to build SEO traffic, trust, and better conversion into the builder.</p>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              Read More Blogs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {blogPreview.map((post) => (
              <div key={post.title} className="rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-white/75 p-6 shadow-[0_22px_50px_-40px_rgba(52,31,10,0.55)] backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">{post.category}</p>
                <h3 className="mt-4 text-xl font-semibold text-stone-950">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 sm:px-6 sm:pb-12">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(135deg,#fff6e8_0%,#fffdfa_55%,#eef5fb_100%)] px-8 py-12 shadow-[0_34px_90px_-55px_rgba(52,31,10,0.55)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Start Free</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-stone-950 sm:text-4xl">Start now, improve trust instantly, and give job seekers a clearer reason to convert.</h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800">
              Create Resume in 2 Minutes
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/builder" className="inline-flex items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:bg-white">
              Start Now - It's Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const SurfaceStat: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-white/75 p-6 shadow-[0_22px_50px_-40px_rgba(52,31,10,0.55)] backdrop-blur-sm">
    <div className="flex items-center gap-3">{icon}<span className="text-3xl font-bold text-stone-950">{value}</span></div>
    <p className="mt-3 text-sm text-stone-600">{label}</p>
  </div>
);

const ComparisonCard: React.FC<{ title: string; bullets: string[]; tone: 'bad' | 'good'; imageSrc: string; imageAlt: string }> = ({ title, bullets, tone, imageSrc, imageAlt }) => (
  <div className={`rounded-[28px] border p-6 ${tone === 'good' ? 'border-emerald-200 bg-emerald-50/70' : 'border-red-200 bg-red-50/70'}`}>
    <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/80 shadow-[0_20px_45px_-35px_rgba(52,31,10,0.4)]">
      <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-cover" loading="lazy" />
    </div>
    <h3 className="mt-5 text-xl font-semibold text-stone-950">{title}</h3>
    <div className="mt-5 space-y-3">
      {bullets.map((bullet) => (
        <div key={bullet} className="flex gap-3 text-sm text-stone-700">
          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tone === 'good' ? 'bg-emerald-500' : 'bg-red-400'}`} />
          <span>{bullet}</span>
        </div>
      ))}
    </div>
  </div>
);

const TrustCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-brand-500/15 text-brand-300">{icon}</div>
    <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-stone-300">{description}</p>
  </div>
);

export default Home;

