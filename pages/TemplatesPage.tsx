import React from 'react';
import { TEMPLATES } from '../constants';
import TemplatePreviewCard from '../components/site/TemplatePreviewCard';
import SectionHeading from '../components/ui/SectionHeading';

const TemplatesPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading eyebrow="Templates" title="Choose from 10 resume templates" description="A responsive preview grid designed to feel product-quality on desktop and mobile." />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((template) => (
          <TemplatePreviewCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
};

export default TemplatesPage;
