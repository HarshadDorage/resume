import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import SurfaceCard from '../components/ui/SurfaceCard';

const contactItems = [
  { icon: Mail, title: 'Email', value: 'hello@apexresume.com' },
  { icon: Phone, title: 'Phone', value: '+1 (415) 555-0118' },
  { icon: MapPin, title: 'Office', value: 'San Francisco, CA' },
];

const ContactPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk to the team behind the builder" description="Use this page for sales, support, or partnership inquiries. The form is presentational and ready for backend wiring." />
          <div className="mt-8 space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <SurfaceCard key={item.title} className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-500">{item.title}</p>
                    <p className="text-base text-stone-950">{item.value}</p>
                  </div>
                </SurfaceCard>
              );
            })}
          </div>
        </div>

        <SurfaceCard className="p-8">
          <form className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-700">First name</label>
              <input className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-700">Last name</label>
              <input className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-stone-700">Email</label>
              <input type="email" className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-stone-700">Message</label>
              <textarea rows={6} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full rounded-full bg-stone-950 px-5 py-4 text-sm font-semibold text-white">Send message</button>
            </div>
          </form>
        </SurfaceCard>
      </div>
    </section>
  );
};

export default ContactPage;
