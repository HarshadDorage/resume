import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import RoleCard from '../components/RoleCard';
import TemplateCard from '../components/TemplateCard';
import { ROLES, getTemplatesForRole } from '../constants';

const Templates: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get('role') && ROLES.includes(searchParams.get('role') as (typeof ROLES)[number])
    ? (searchParams.get('role') as string)
    : ROLES[0];

  const templates = getTemplatesForRole(selectedRole);

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel overflow-hidden rounded-[40px] px-8 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div className="section-shell pt-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                <Sparkles className="h-3.5 w-3.5" />
                Role-Based Templates
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold text-stone-950 sm:text-5xl">Best resume templates for {selectedRole}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                These templates are curated for this role path. Switch roles below to explore a different structure and writing direction.
              </p>
            </div>
            <div className="rounded-[30px] border border-[rgba(91,63,37,0.12)] bg-white/65 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Selected Flow</p>
              <p className="mt-3 text-2xl font-semibold text-stone-950">{selectedRole}</p>
              <p className="mt-2 text-sm leading-7 text-stone-600">Showing {templates.length} template options tuned for clarity, ATS readability, and recruiter scan speed.</p>
              <Link to={`/builder?role=${encodeURIComponent(selectedRole)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                Go straight to builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ROLES.map((role) => (
            <RoleCard key={role} role={role} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col items-center justify-center text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-200 bg-brand-50/80 px-5 py-3 text-sm font-semibold text-brand-700 shadow-[0_18px_40px_-28px_rgba(214,109,6,0.45)]">
            <span>Selected role: {selectedRole}</span>
            <span className="text-brand-300">|</span>
            <span>Next: choose a template below</span>
          </div>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-brand-700 shadow-[0_20px_50px_-30px_rgba(214,109,6,0.5)]"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TemplateCard template={template} role={selectedRole} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;
