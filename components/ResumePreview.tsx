import React from 'react';
import { ResumeData } from '../types';
import { cleanText } from '../utils/text';

interface ResumePreviewProps {
  data: ResumeData;
  id?: string;
  isExporting?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, id, isExporting = false }) => {
  const tplId = data.templateId || 'modern';

  const styleConfigs = {
    modern: {
      font: "'Inter', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[11pt] font-bold uppercase tracking-wider text-black border-b border-black mb-2 pb-0.5',
      nameSize: 'text-[24pt]',
      contactSize: 'text-[9.5pt]',
      accentColor: 'black',
    },
    executive: {
      font: "'Playfair Display', serif",
      headerAlign: 'text-center',
      sectionTitle: 'text-[12pt] font-bold uppercase tracking-[0.1em] text-black border-y border-black/20 my-4 py-1 text-center',
      nameSize: 'text-[28pt]',
      contactSize: 'text-[10pt]',
      accentColor: '#1a1a1a',
    },
    creative: {
      font: "'Inter', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[12pt] font-extrabold text-blue-700 mb-3 flex items-center gap-2 after:content-[""] after:h-[2px] after:bg-blue-100 after:flex-1',
      nameSize: 'text-[32pt]',
      contactSize: 'text-[9pt]',
      accentColor: '#2563eb',
    },
    compact: {
      font: "'Inter', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[10pt] font-bold border-l-4 border-slate-800 pl-2 mb-2',
      nameSize: 'text-[20pt]',
      contactSize: 'text-[8.5pt]',
      accentColor: '#334155',
    },
    technical: {
      font: 'monospace',
      headerAlign: 'text-left',
      sectionTitle: 'text-[11pt] font-bold text-slate-900 border-b-2 border-slate-900/10 mb-2 pb-1',
      nameSize: 'text-[22pt]',
      contactSize: 'text-[9pt]',
      accentColor: '#0f172a',
    },
    academic: {
      font: "'Georgia', serif",
      headerAlign: 'text-center',
      sectionTitle: 'text-[11pt] font-bold uppercase italic text-slate-800 border-b border-slate-300 mb-3 pb-1',
      nameSize: 'text-[26pt]',
      contactSize: 'text-[10pt]',
      accentColor: '#1e293b',
    },
    elegant: {
      font: "'Times New Roman', serif",
      headerAlign: 'text-center',
      sectionTitle: 'text-[10pt] font-medium tracking-[0.2em] text-slate-500 uppercase mb-4 text-center',
      nameSize: 'text-[30pt]',
      contactSize: 'text-[10pt]',
      accentColor: '#475569',
    },
    professional: {
      font: "'Inter', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[12pt] font-black uppercase text-white bg-black px-2 py-0.5 mb-3',
      nameSize: 'text-[24pt]',
      contactSize: 'text-[9.5pt]',
      accentColor: '#000000',
    },
    minimalist: {
      font: "'Inter', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[9pt] font-bold text-slate-400 uppercase tracking-widest mb-4',
      nameSize: 'text-[18pt]',
      contactSize: 'text-[9pt]',
      accentColor: '#64748b',
    },
    classic: {
      font: "'Arial', sans-serif",
      headerAlign: 'text-left',
      sectionTitle: 'text-[11pt] font-bold text-black border-b-[3px] border-black mb-2',
      nameSize: 'text-[22pt]',
      contactSize: 'text-[10pt]',
      accentColor: '#000000',
    }
  };

  const styles = styleConfigs[tplId as keyof typeof styleConfigs] || styleConfigs.modern;
  const formatRange = (start?: string, end?: string) => [start, end].filter(Boolean).join(' - ');

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <section key="summary" className="mb-5">
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className="text-[10pt] text-black leading-snug text-justify whitespace-pre-wrap">{cleanText(data.summary)}</p>
          </section>
        ) : null;
      case 'experience':
        return data.experience?.length ? (
          <section key="experience" className="mb-5">
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-[10.5pt] font-bold text-black">{cleanText(exp.jobTitle)}</h3>
                    <span className="text-right text-[9.5pt] font-medium text-black">{cleanText(formatRange(exp.startDate, exp.endDate))}</span>
                  </div>
                  <div className="mb-1 flex justify-between items-baseline gap-4">
                    <span className="text-[10pt] font-bold italic text-black opacity-80">{cleanText(exp.company)}</span>
                    <span className="text-right text-[9.5pt] italic text-black opacity-70">{cleanText(exp.location)}</span>
                  </div>
                  <div className="text-[10pt] leading-snug text-black">
                    {(exp.description ?? '').split('\n').filter((line) => line.trim()).map((line, index) => {
                      const cleanLine = line.trim().replace(/^[•\-*]\s*/, '');
                      return (
                        <div key={index} className="mb-0.5 flex items-start gap-2">
                          <span className="mt-1 text-[8pt] font-bold">•</span>
                          <p className="flex-1">{cleanText(cleanLine)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'skills':
        return data.skills?.length ? (
          <section key="skills" className="mb-5">
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className="text-[10pt] leading-snug text-black">
              <span className="font-bold">Core Competencies: </span>
              {cleanText(data.skills.join(', '))}
            </div>
          </section>
        ) : null;
      case 'education':
        return data.education?.length ? (
          <section key="education" className="mb-5">
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-[10.5pt] font-bold text-black">{cleanText(edu.degree)}</h3>
                    <span className="text-right text-[9.5pt] font-medium text-black">{cleanText(formatRange(edu.startDate, edu.endDate))}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="text-[10pt] font-bold text-black opacity-80">{cleanText(edu.institution)}</span>
                    <span className="text-right text-[9.5pt] italic text-black opacity-70">{cleanText(edu.location)}</span>
                  </div>
                  {edu.gpa && <p className="mt-0.5 text-[9.5pt] font-medium text-black">CGPA / Percentage: {cleanText(edu.gpa)}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'projects':
        return data.projects?.length ? (
          <section key="projects" className="mb-5">
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="mb-0.5 text-[10.5pt] font-bold text-black">{cleanText(proj.name)}</h3>
                  <p className="mb-1 text-[10pt] leading-snug text-black">{cleanText(proj.description)}</p>
                  <p className="text-[9pt] italic text-black"><span className="font-bold not-italic opacity-80">Tech Stack:</span> {cleanText(proj.technologies)}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'certifications':
        return data.certifications?.length ? (
          <section key="certifications" className="mb-5">
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <div className="text-[10pt] leading-snug text-black">{cleanText(data.certifications.join(' - '))}</div>
          </section>
        ) : null;
      case 'hobbies':
        return data.hobbies?.length ? (
          <section key="hobbies" className="mb-5">
            <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
            <div className="text-[10pt] leading-snug text-black">{cleanText(data.hobbies.join(', '))}</div>
          </section>
        ) : null;
      default:
        return null;
    }
  };

  const sectionOrder = data.sectionOrder ?? ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'];

  return (
    <div
      id={id}
      onContextMenu={(event) => !isExporting && event.preventDefault()}
      className={`relative mx-auto overflow-hidden bg-white p-[0.6in] text-left text-black ${!isExporting ? 'pointer-events-none select-none' : ''}`}
      style={{ width: '8.5in', minHeight: '11in', fontFamily: styles.font }}
    >
      {!isExporting && (
        <div className="absolute inset-0 z-50 flex scale-150 rotate-[-30deg] flex-wrap content-start justify-center overflow-hidden opacity-[0.02]">
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index} className="whitespace-nowrap p-10 text-[20pt] font-bold uppercase">
              APEX RESUME BUILDER - PREVIEW ONLY
            </div>
          ))}
        </div>
      )}

      <header className={`${styles.headerAlign} mb-8`}>
        <h1 className={`${styles.nameSize} mb-2 font-extrabold uppercase tracking-tight text-black`} style={{ color: styles.accentColor }}>
          {cleanText(data.personalInfo.fullName || 'FULL NAME')}
        </h1>
        <div className={`flex flex-wrap ${styles.headerAlign === 'text-center' ? 'justify-center' : 'justify-start'} gap-x-3 text-[10pt] text-black`}>
          {data.personalInfo.address && <span>{cleanText(data.personalInfo.address)}</span>}
          {data.personalInfo.address && (data.personalInfo.email || data.personalInfo.phone) && <span className="opacity-30">|</span>}
          {data.personalInfo.email && <span className="font-bold">{cleanText(data.personalInfo.email)}</span>}
          {data.personalInfo.email && data.personalInfo.phone && <span className="opacity-30">|</span>}
          {data.personalInfo.phone && <span>{cleanText(data.personalInfo.phone)}</span>}
        </div>
        <div className={`mt-1 flex flex-wrap ${styles.headerAlign === 'text-center' ? 'justify-center' : 'justify-start'} gap-x-3 text-[10pt] text-black`}>
          {data.personalInfo.linkedin && <span className="font-medium underline opacity-80">{cleanText(data.personalInfo.linkedin)}</span>}
          {data.personalInfo.linkedin && data.personalInfo.portfolio && <span className="opacity-30">|</span>}
          {data.personalInfo.portfolio && <span className="font-medium underline opacity-80">{cleanText(data.personalInfo.portfolio)}</span>}
        </div>
      </header>

      <div>{sectionOrder.map((sectionId) => renderSection(sectionId))}</div>
    </div>
  );
};

export default ResumePreview;


