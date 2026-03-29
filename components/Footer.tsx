import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  about: [
    { label: 'About', to: '/about' },
    { label: 'Career Blog', to: '/blog' },
    { label: 'Resume Builder', to: '/builder' },
  ],
  support: [
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="px-4 pb-6 pt-12 sm:px-6 sm:pt-20">
      <div className="glass-panel mx-auto max-w-7xl overflow-hidden rounded-[36px] px-6 py-10 sm:px-10">
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.2, 0.32, 0.2], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-brand-300/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr,0.7fr,0.7fr,0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ y: -4, rotate: -4, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-gradient-to-br from-brand-500 via-brand-600 to-slate-900 text-white shadow-lg shadow-brand-500/20"
              >
                <FileText className="h-6 w-6" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Apex Resume</p>
                <p className="text-lg font-semibold text-stone-950">Trusted resume builder for freshers, developers, and job seekers</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              Create ATS-friendly resumes faster, improve trust with recruiters, and apply with more confidence using cleaner templates and sharper content.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Link to="/builder" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-stone-800 hover:shadow-[0_18px_40px_-20px_rgba(28,25,23,0.85)]">
                  Create Resume in 2 Minutes ??
                  <motion.span whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 320, damping: 18 }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">About us</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              {footerLinks.about.map((item) => (
                <motion.div key={item.to} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
                  <Link to={item.to} className="group inline-flex items-center gap-2 transition duration-200 hover:text-stone-950">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400 transition duration-200 group-hover:scale-125 group-hover:bg-brand-600" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Support</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              {footerLinks.support.map((item) => (
                <motion.div key={item.to} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
                  <Link to={item.to} className="group inline-flex items-center gap-2 transition duration-200 hover:text-stone-950">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400 transition duration-200 group-hover:scale-125 group-hover:bg-brand-600" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Trust</p>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="rounded-[22px] border border-[rgba(91,63,37,0.12)] bg-white/60 p-4 transition duration-300 hover:border-brand-200 hover:bg-white/80 hover:shadow-[0_20px_45px_-30px_rgba(52,31,10,0.45)]"
              >
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <motion.span animate={{ rotate: [0, 6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
                    <Sparkles className="h-4 w-4 text-brand-600" />
                  </motion.span>
                  Your data is safe & private
                </div>
                <p className="mt-2 leading-6">No spam. No hidden charges. Built by developers who understand job search frustration.</p>
              </motion.div>
              <motion.a
                href="mailto:support@apexresume.app"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="inline-flex items-center gap-2 font-semibold text-stone-800 transition duration-200 hover:text-brand-700"
              >
                <Mail className="h-4 w-4" />
                support@apexresume.app
              </motion.a>
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
