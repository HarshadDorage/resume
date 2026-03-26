
import React from 'react';
import { TEMPLATES, INITIAL_DATA } from '../constants';
import ResumePreview from './ResumePreview';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-8 sm:py-16 px-4 sm:px-12">
      <div className="max-w-6xl w-full text-center mb-10 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
          Choose Your Professional Layout
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight">
          Select a <span className="text-blue-600">Resume Template</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Our templates are crafted for maximum ATS compatibility and professional appeal. Choose one to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 w-full max-w-[1500px] animate-in fade-in zoom-in duration-1000">
        {TEMPLATES.map((tpl, idx) => (
          <div
            key={tpl.id}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="group flex flex-col animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="relative aspect-[1/1.41] w-full bg-white rounded-xl border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:border-blue-400 transition-all duration-300 overflow-hidden mb-4 cursor-pointer" onClick={() => onSelect(tpl.id)}>
              {/* Scaled down real preview */}
              <div 
                className="absolute inset-0 flex items-start justify-center overflow-hidden"
              >
                <div 
                  className="origin-top pointer-events-none select-none"
                  style={{ 
                      transform: 'scale(0.24)', 
                      width: '8.5in',
                      height: '11in'
                  }}
                >
                  <ResumePreview 
                      data={{ ...INITIAL_DATA, templateId: tpl.id }} 
                      isExporting={true}
                  />
                </div>
              </div>

              {/* Selection Overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center p-6">
                <button
                  onClick={(e) => { e.stopPropagation(); onSelect(tpl.id); }}
                  className="bg-blue-600 text-white w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-sm shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700"
                >
                  Use Template
                </button>
              </div>
            </div>

            <div className="px-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{tpl.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 sm:mt-24 mb-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-8 grayscale opacity-40">
           <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
           <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-widest uppercase">Apex Resume Builder © 2024</p>
           <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
