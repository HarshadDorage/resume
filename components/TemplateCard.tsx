import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_DATA } from '../constants';
import ResumePreview from './ResumePreview';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
  };
  role?: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, role }) => {
  const builderLink = role
    ? `/builder?template=${template.id}&role=${encodeURIComponent(role)}`
    : `/builder?template=${template.id}`;

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.24 }}
      className="group overflow-hidden rounded-[32px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,246,235,0.9))] p-3 shadow-[0_28px_70px_-42px_rgba(52,31,10,0.6)] transition duration-300 hover:border-[rgba(214,109,6,0.28)] hover:shadow-[0_32px_90px_-40px_rgba(214,109,6,0.38)]"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,#f8eee2,#fdfbf8)]">
        <div className="warm-grid absolute inset-0 opacity-45" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          ATS Ready
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 pt-14">
          <div className="origin-top scale-[0.48] transition duration-300 sm:scale-[0.56] lg:scale-[0.62] lg:group-hover:scale-[0.66]">
            <ResumePreview data={{ ...INITIAL_DATA, templateId: template.id }} isExporting={true} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f5e9da] via-[#f5e9da]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Template</p>
            <p className="mt-1 text-base font-semibold text-stone-900">{template.name}</p>
          </div>
          <Link
            to={builderLink}
            className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-stone-800"
          >
            Use Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="space-y-4 px-2 pb-2 pt-5">
        <div>
          <h3 className="text-xl font-semibold text-stone-950">{template.name}</h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">{template.description}</p>
        </div>
        <Link to={builderLink} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          Open this template
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default TemplateCard;
