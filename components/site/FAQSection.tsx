import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../../data/siteContent';
import SectionHeading from '../ui/SectionHeading';
import SurfaceCard from '../ui/SurfaceCard';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        centered
        eyebrow="FAQ"
        title="Questions buyers ask before they commit"
        description="Clear answers on templates, exports, customization, and plan differences."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <SurfaceCard key={item.question} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-stone-950">{item.question}</span>
                <ChevronDown className={`h-5 w-5 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="px-6 pb-6 text-sm leading-7 text-stone-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SurfaceCard>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
