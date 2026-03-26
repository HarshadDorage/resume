import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const Builder = lazy(() => import('./pages/Builder'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Home = lazy(() => import('./pages/Home'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const Templates = lazy(() => import('./pages/Templates'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-sm font-semibold text-gray-500">Loading...</div>}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
