import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, centered = false }) => {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl text-stone-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-stone-600">{description}</p>
    </div>
  );
};

export default SectionHeading;
