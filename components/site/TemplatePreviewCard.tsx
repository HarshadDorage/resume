import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_DATA } from '../../constants';
import ResumePreview from '../ResumePreview';

interface TemplatePreviewCardProps {
  template: {
    id: string;
    name: string;
    description: string;
  };
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({ template }) => {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-soft"
    >
      <div className="relative aspect-[0.82] overflow-hidden bg-[radial-gradient(circle_at_top,#fff8e8,transparent_48%)] p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
        <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-[22px] border border-stone-200 bg-white">
          <div className="origin-top-left scale-[0.22]">
            <ResumePreview data={{ ...INITIAL_DATA, templateId: template.id }} isExporting={true} />
          </div>
        </div>
      </div>
      <div className="space-y-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-stone-950">{template.name}</h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">{template.description}</p>
        </div>
        <Link to={`/builder?template=${template.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          Use Template
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default TemplatePreviewCard;
