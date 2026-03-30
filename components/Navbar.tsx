import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Templates', to: '/templates' },
  { label: 'Builder', to: '/builder' },
  { label: 'How to Use', to: '/how-to-use' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="glass-panel mx-auto max-w-7xl rounded-[28px] px-4 sm:px-6">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-gradient-to-br from-brand-500 via-brand-600 to-slate-900 text-sm font-extrabold text-white shadow-lg shadow-brand-500/20">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Apex Resume</p>
              <p className="text-sm text-stone-600">Sharper resumes for ATS and recruiters</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-[rgba(91,63,37,0.1)] bg-white/60 px-2 py-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-stone-900 text-white shadow-md' : 'text-stone-600 hover:bg-white hover:text-stone-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/builder" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
              Create Resume in 2 Minutes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/70 text-stone-700 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl md:hidden"
          >
            <div className="glass-panel space-y-2 rounded-[28px] p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-[18px] px-4 py-3 text-sm font-semibold ${
                      isActive ? 'bg-stone-900 text-white' : 'bg-white/55 text-stone-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/builder" className="mt-2 flex items-center justify-center gap-2 rounded-[18px] bg-brand-600 px-4 py-3 text-sm font-semibold text-white">
                Create Resume in 2 Minutes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

