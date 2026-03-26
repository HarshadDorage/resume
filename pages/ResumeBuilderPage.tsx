import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Download, FileUp, LoaderCircle, Redo2, RefreshCcw, Undo2, Wand2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import DynamicList from '../components/DynamicList';
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';
import TemplatePreviewCard from '../components/site/TemplatePreviewCard';
import SurfaceCard from '../components/ui/SurfaceCard';
import { INITIAL_DATA, STORAGE_KEY, TEMPLATES } from '../constants';
import { extractTextFromFile } from '../services/fileService';
import { parseResumeWithAI } from '../services/aiService';
import { Education, Experience, Project, ResumeData, ViewMode } from '../types';

declare const html2pdf: any;

const defaultSectionOrder = ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'];

const ResumeBuilderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedTemplateFromUrl = searchParams.get('template');

  const [data, setPresent] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed) {
      if (!parsed.sectionOrder) parsed.sectionOrder = defaultSectionOrder;
      return parsed;
    }
    return {
      ...INITIAL_DATA,
      templateId: selectedTemplateFromUrl || INITIAL_DATA.templateId,
    };
  });
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState<boolean>(() => {
    if (selectedTemplateFromUrl) return true;
    return localStorage.getItem('apex_has_selected_tpl') === 'true';
  });
  const [past, setPast] = useState<ResumeData[]>([]);
  const [future, setFuture] = useState<ResumeData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [uploadProgress, setUploadProgress] = useState('');
  const [scale, setScale] = useState(1);

  const setData = useCallback((updater: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setPresent((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
      setPast((current) => [...current.slice(-49), prev]);
      setFuture([]);
      return next;
    });
  }, []);

  const setPersonalField = (field: keyof ResumeData['personalInfo'], value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleSelectTemplate = useCallback(
    (templateId: string) => {
      setData((prev) => ({ ...prev, templateId }));
      setHasSelectedTemplate(true);
      localStorage.setItem('apex_has_selected_tpl', 'true');
    },
    [setData]
  );

  useEffect(() => {
    if (selectedTemplateFromUrl) {
      handleSelectTemplate(selectedTemplateFromUrl);
    }
  }, [handleSelectTemplate, selectedTemplateFromUrl]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((current) => current.slice(0, current.length - 1));
    setFuture((current) => [data, ...current]);
    setPresent(previous);
  }, [data, past]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((current) => current.slice(1));
    setPast((current) => [...current, data]);
    setPresent(next);
  }, [data, future]);

  useEffect(() => {
    const onBlur = () => setIsWindowFocused(false);
    const onFocus = () => setIsWindowFocused(true);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [redo, undo]);

  useEffect(() => {
    if (hasSelectedTemplate) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, hasSelectedTemplate]);

  useEffect(() => {
    const handleResize = () => {
      const resumeWidth = 816;
      const padding = window.innerWidth < 640 ? 32 : 96;
      const availableWidth = window.innerWidth >= 1280 ? window.innerWidth / 2 : window.innerWidth;
      const nextScale = (availableWidth - padding) / resumeWidth;
      setScale(Math.min(nextScale, 1));
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const triggerPdfDownload = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const element = document.getElementById('resume-pdf-target');
    if (!element) {
      setIsExporting(false);
      return;
    }

    const options = {
      margin: 0,
      filename: `${data.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_Apex.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4, useCORS: true, letterRendering: true, logging: false },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true },
    };

    try {
      await html2pdf().set(options).from(element).save();
    } finally {
      setIsExporting(false);
    }
  };

  const handleUpdateItem = <K extends 'experience' | 'education' | 'projects'>(section: K, id: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item: any) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const id = crypto.randomUUID();
    const newItem =
      section === 'experience'
        ? { id, jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }
        : section === 'education'
        ? { id, degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '' }
        : { id, name: '', description: '', technologies: '' };

    setData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeItem = (section: 'experience' | 'education' | 'projects', id: string) => {
    setData((prev) => ({ ...prev, [section]: prev[section].filter((item: any) => item.id !== id) }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadProgress('Analyzing file structure...');

    try {
      const text = await extractTextFromFile(file);
      setUploadProgress('AI is extracting professional details...');
      const parsedData = await parseResumeWithAI(text);
      if (parsedData) {
        setData((prev) => ({ ...parsedData, templateId: prev.templateId }));
      } else {
        alert('Auto-fill failed. Please enter details manually.');
      }
    } catch (error) {
      console.error(error);
      alert('Error processing file.');
    } finally {
      setIsProcessing(false);
      setUploadProgress('');
      event.target.value = '';
    }
  };

  const renderSectionForm = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <FormSection key="summary" title="Professional Summary" description="Position the candidate in 3-4 lines.">
            <textarea rows={4} value={data.summary} onChange={(event) => setData((prev) => ({ ...prev, summary: event.target.value }))} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
          </FormSection>
        );
      case 'experience':
        return (
          <FormSection key="experience" title="Work Experience" description="Lead with measurable outcomes and clear scope.">
            <DynamicList
              items={data.experience}
              onAdd={() => addItem('experience')}
              onRemove={(id) => removeItem('experience', id)}
              addButtonText="Add Experience"
              renderItem={(exp: Experience) => (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Job Title</label>
                    <input value={exp.jobTitle} onChange={(event) => handleUpdateItem('experience', exp.id, 'jobTitle', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Company</label>
                    <input value={exp.company} onChange={(event) => handleUpdateItem('experience', exp.id, 'company', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Location</label>
                    <input value={exp.location} onChange={(event) => handleUpdateItem('experience', exp.id, 'location', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Start</label>
                      <input value={exp.startDate} onChange={(event) => handleUpdateItem('experience', exp.id, 'startDate', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">End</label>
                      <input value={exp.endDate} onChange={(event) => handleUpdateItem('experience', exp.id, 'endDate', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Description</label>
                    <textarea rows={4} value={exp.description} onChange={(event) => handleUpdateItem('experience', exp.id, 'description', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                </div>
              )}
            />
          </FormSection>
        );
      case 'skills':
        return (
          <FormSection key="skills" title="Skills" description="Separate each skill with a comma.">
            <input value={data.skills.join(', ')} onChange={(event) => setData((prev) => ({ ...prev, skills: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" placeholder="React, TypeScript, Tailwind CSS" />
          </FormSection>
        );
      case 'education':
        return (
          <FormSection key="education" title="Education">
            <DynamicList
              items={data.education}
              onAdd={() => addItem('education')}
              onRemove={(id) => removeItem('education', id)}
              addButtonText="Add Education"
              renderItem={(edu: Education) => (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Institution</label>
                    <input value={edu.institution} onChange={(event) => handleUpdateItem('education', edu.id, 'institution', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Degree</label>
                    <input value={edu.degree} onChange={(event) => handleUpdateItem('education', edu.id, 'degree', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Location</label>
                    <input value={edu.location} onChange={(event) => handleUpdateItem('education', edu.id, 'location', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Start</label>
                    <input value={edu.startDate} onChange={(event) => handleUpdateItem('education', edu.id, 'startDate', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">End</label>
                    <input value={edu.endDate} onChange={(event) => handleUpdateItem('education', edu.id, 'endDate', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                </div>
              )}
            />
          </FormSection>
        );
      case 'projects':
        return (
          <FormSection key="projects" title="Projects">
            <DynamicList
              items={data.projects}
              onAdd={() => addItem('projects')}
              onRemove={(id) => removeItem('projects', id)}
              addButtonText="Add Project"
              renderItem={(project: Project) => (
                <div className="grid gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Project Name</label>
                    <input value={project.name} onChange={(event) => handleUpdateItem('projects', project.id, 'name', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Description</label>
                    <textarea rows={3} value={project.description} onChange={(event) => handleUpdateItem('projects', project.id, 'description', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Technologies</label>
                    <input value={project.technologies} onChange={(event) => handleUpdateItem('projects', project.id, 'technologies', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                  </div>
                </div>
              )}
            />
          </FormSection>
        );
      case 'certifications':
        return (
          <FormSection key="certifications" title="Certifications">
            <input value={data.certifications.join(', ')} onChange={(event) => setData((prev) => ({ ...prev, certifications: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" placeholder="AWS Certified Solutions Architect, PMP" />
          </FormSection>
        );
      default:
        return null;
    }
  };

  if (!hasSelectedTemplate) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Resume Builder</p>
          <h1 className="mt-4 font-serif text-5xl text-stone-950">Choose a template to start editing</h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">Pick one of the 10 resume templates below and jump straight into the builder.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {TEMPLATES.map((template) => (
            <div key={template.id} onClick={() => handleSelectTemplate(template.id)} className="cursor-pointer">
              <TemplatePreviewCard template={template} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-100/70">
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Builder workspace</p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-950">Edit, preview, and export your resume</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => { setHasSelectedTemplate(false); localStorage.removeItem('apex_has_selected_tpl'); }} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700">
              <ArrowLeft className="h-4 w-4" />
              Templates
            </button>
            <button type="button" onClick={undo} disabled={past.length === 0} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 disabled:opacity-40">
              <Undo2 className="h-4 w-4" />
              Undo
            </button>
            <button type="button" onClick={redo} disabled={future.length === 0} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 disabled:opacity-40">
              <Redo2 className="h-4 w-4" />
              Redo
            </button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700">
              <FileUp className="h-4 w-4" />
              Import
              <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} disabled={isProcessing} />
            </label>
            <button type="button" onClick={triggerPdfDownload} className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-stone-200 bg-white xl:hidden">
        <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setViewMode('edit')} className={`flex-1 border-b-2 px-4 py-3 text-sm font-semibold ${viewMode === 'edit' ? 'border-stone-950 text-stone-950' : 'border-transparent text-stone-500'}`}>Edit</button>
          <button type="button" onClick={() => setViewMode('preview')} className={`flex-1 border-b-2 px-4 py-3 text-sm font-semibold ${viewMode === 'preview' ? 'border-stone-950 text-stone-950' : 'border-transparent text-stone-500'}`}>Preview</button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col xl:flex-row">
        <section className={`${viewMode === 'preview' ? 'hidden xl:block' : 'block'} w-full xl:w-1/2`}>
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <SurfaceCard className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">Template</p>
                  <h2 className="mt-2 text-xl font-semibold text-stone-950">{TEMPLATES.find((template) => template.id === data.templateId)?.name || 'Selected Template'}</h2>
                </div>
                <button type="button" onClick={() => setHasSelectedTemplate(false)} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700">Change</button>
              </div>
            </SurfaceCard>

            <FormSection title="Personal Information" description="Core details shown at the top of the resume.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Full Name</label>
                  <input value={data.personalInfo.fullName} onChange={(event) => setPersonalField('fullName', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Email</label>
                  <input value={data.personalInfo.email} onChange={(event) => setPersonalField('email', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Phone</label>
                  <input value={data.personalInfo.phone} onChange={(event) => setPersonalField('phone', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Address</label>
                  <input value={data.personalInfo.address} onChange={(event) => setPersonalField('address', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">LinkedIn</label>
                  <input value={data.personalInfo.linkedin} onChange={(event) => setPersonalField('linkedin', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Portfolio</label>
                  <input value={data.personalInfo.portfolio} onChange={(event) => setPersonalField('portfolio', event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-950" />
                </div>
              </div>
            </FormSection>

            {data.sectionOrder.map((sectionId) => renderSectionForm(sectionId))}

            <button type="button" onClick={() => { if (confirm('Reset all details?')) { setData({ ...INITIAL_DATA, templateId: data.templateId }); } }} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <RefreshCcw className="h-4 w-4" />
              Reset All Data
            </button>
          </div>
        </section>

        <section className={`${viewMode === 'edit' ? 'hidden xl:flex' : 'flex'} relative min-h-[calc(100vh-180px)] w-full items-start justify-center overflow-auto px-4 py-8 sm:px-6 lg:px-8 xl:w-1/2`}>
          <div className={`${!isWindowFocused ? 'blur-2xl opacity-40' : ''} transition-all duration-500`} style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            <div className="overflow-hidden rounded-sm bg-white resume-shadow">
              <ResumePreview data={data} id="resume-pdf-target" isExporting={isExporting} />
            </div>
          </div>

          {!isWindowFocused && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
              <SurfaceCard className="bg-white/90 p-8 text-center backdrop-blur-xl">
                <Wand2 className="mx-auto h-8 w-8 text-brand-600" />
                <p className="mt-4 text-lg font-semibold text-stone-950">Preview paused</p>
                <p className="mt-2 text-sm text-stone-500">Focus the window to continue editing.</p>
              </SurfaceCard>
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-md">
            <SurfaceCard className="w-full max-w-sm p-8 text-center">
              <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-brand-600" />
              <p className="mt-5 text-lg font-semibold text-stone-950">Smart analysis in progress</p>
              <p className="mt-2 text-sm text-stone-500">{uploadProgress}</p>
            </SurfaceCard>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResumeBuilderPage;
