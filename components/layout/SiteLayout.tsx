import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

const SiteLayout: React.FC = () => {
  return (
    <div className="site-shell text-stone-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-white/55 via-white/15 to-transparent" />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
