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
                <p className="text-lg font-semibold text-stone-950">Trusted resume builder for freshers, developers, and job seekers</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              Create ATS-friendly resumes faster, improve trust with recruiters, and apply with more confidence using cleaner templates and sharper content.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/builder" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
                Create Resume in 2 Minutes ??
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {/* <Link to="/templates" className="inline-flex items-center gap-2 rounded-full border border-[rgba(91,63,37,0.14)] bg-white/70 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white">
                Start Now - It's Free
              </Link> */}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">About us</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <Link to="/about" className="block transition hover:text-stone-950">About</Link>
              <Link to="/blog" className="block transition hover:text-stone-950">Career Blog</Link>
              <Link to="/builder" className="block transition hover:text-stone-950">Resume Builder</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Support</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <Link to="/contact" className="block transition hover:text-stone-950">Contact</Link>
              <Link to="/privacy" className="block transition hover:text-stone-950">Privacy Policy</Link>
              <Link to="/terms" className="block transition hover:text-stone-950">Terms</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Trust</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="rounded-[22px] border border-[rgba(91,63,37,0.12)] bg-white/60 p-4">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  Your data is safe & private
                </div>
                <p className="mt-2 leading-6">No spam. No hidden charges. Built by developers who understand job search frustration.</p>
              </div>
              <a href="mailto:support@apexresume.app" className="inline-flex items-center gap-2 font-semibold text-stone-800 transition hover:text-brand-700">
                <Mail className="h-4 w-4" />
                support@apexresume.app
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(91,63,37,0.1)] pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>� 2026 Apex Resume. All rights reserved.</p>
          <p>Made to improve trust, conversions, and better job search outcomes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
