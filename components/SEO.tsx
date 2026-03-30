import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
}

const ensureMetaTag = (selector: string, attribute: 'name' | 'property', value: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const SEO: React.FC<SEOProps> = ({ title, description, keywords, author = 'Apex Resume' }) => {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.getAttribute('content') ?? '';
    const keywordsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]')?.getAttribute('content') ?? '';

    document.title = title;
    ensureMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) ensureMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    ensureMetaTag('meta[name="author"]', 'name', 'author', author);
    ensureMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    ensureMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    ensureMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    ensureMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    return () => {
      document.title = previousTitle;
      ensureMetaTag('meta[name="description"]', 'name', 'description', descriptionMeta);
      if (keywords) ensureMetaTag('meta[name="keywords"]', 'name', 'keywords', keywordsMeta);
    };
  }, [author, description, keywords, title]);

  return null;
};

export default SEO;
