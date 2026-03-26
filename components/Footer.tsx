import React from 'react';
import { ArrowUpRight, FileText, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="px-4 pb-6 pt-12 sm:px-6 sm:pt-20">
      <div className="glass-panel mx-auto max-w-7xl overflow-hidden rounded-[36px] px-6 py-10 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,0.7fr,0.7fr,0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-brand-500 via-brand-600 to-slate-900 text-white shadow-lg shadow-brand-500/20">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Apex Resume</p>
                <p className="text-lg font-semibold text-stone-950">Resume builder with a premium ATS-first feel</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              Build polished resumes with role-based templates, guided content structure, and a cleaner export flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/builder" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
                Start Building
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/templates" className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,63,37,0.14)] bg-white/70 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white">
                Browse Templates
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Product</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <Link to="/builder" className="block transition hover:text-stone-950">Resume Builder</Link>
              <Link to="/templates" className="block transition hover:text-stone-950">Templates</Link>
              <Link to="/blog" className="block transition hover:text-stone-950">Blog</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Company</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <Link to="/about" className="block transition hover:text-stone-950">About</Link>
              <Link to="/contact" className="block transition hover:text-stone-950">Contact</Link>
              <Link to="/privacy" className="block transition hover:text-stone-950">Privacy</Link>
              <Link to="/terms" className="block transition hover:text-stone-950">Terms</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Why It Works</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="rounded-[22px] border border-[rgba(91,63,37,0.12)] bg-white/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  ATS-first structure
                </div>
                <p className="mt-2 leading-6">Balanced whitespace, readable hierarchy, and role-focused template selection.</p>
              </div>
              <a href="mailto:support@apexresume.app" className="inline-flex items-center gap-2 font-semibold text-stone-800 transition hover:text-brand-700">
                <Mail className="h-4 w-4" />
                support@apexresume.app
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(91,63,37,0.1)] pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Apex Resume. All rights reserved.</p>
          <p>Designed for faster drafting and cleaner exports.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
