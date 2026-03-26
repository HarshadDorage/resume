import React from 'react';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr,1fr,1fr] lg:px-8">
        <div className="space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-brand-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            SaaS Resume Platform
          </p>
          <div>
            <h2 className="font-serif text-3xl text-white">Create faster. Apply smarter.</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-stone-400">
              Resume builder, template gallery, pricing, legal pages, and content marketing all in one clean product shell.
            </p>
          </div>
          <Link to="/builder" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
            Start building
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4 text-sm">
          <h3 className="font-semibold text-white">Product</h3>
          <Link to="/" className="block text-stone-400 hover:text-white">Home</Link>
          <Link to="/templates" className="block text-stone-400 hover:text-white">Templates</Link>
          <Link to="/builder" className="block text-stone-400 hover:text-white">Builder</Link>
          <Link to="/pricing" className="block text-stone-400 hover:text-white">Pricing</Link>
          <Link to="/blog" className="block text-stone-400 hover:text-white">Blog</Link>
          <Link to="/about" className="block text-stone-400 hover:text-white">About</Link>
        </div>

        <div className="space-y-4 text-sm">
          <h3 className="font-semibold text-white">Company</h3>
          <Link to="/contact" className="block text-stone-400 hover:text-white">Contact</Link>
          <Link to="/privacy" className="block text-stone-400 hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="block text-stone-400 hover:text-white">Terms & Conditions</Link>
          <a href="mailto:hello@apexresume.com" className="inline-flex items-center gap-2 text-stone-400 hover:text-white">
            <Mail className="h-4 w-4" />
            hello@apexresume.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
