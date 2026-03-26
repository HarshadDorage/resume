import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon, children, description }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="glass-panel mb-4 overflow-hidden rounded-[28px] sm:mb-6">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-start justify-between gap-4 border-b border-[rgba(91,63,37,0.1)] bg-gradient-to-r from-white/70 via-white/35 to-transparent px-5 py-4 text-left sm:px-6"
      >
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-stone-900 sm:text-lg">
            {icon} {title}
          </h3>
          {description && <p className="mt-1 text-xs leading-5 text-stone-600 sm:text-sm">{description}</p>}
        </div>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FormSection;
