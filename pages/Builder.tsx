import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, CheckCircle2, ChevronDown, Download, FileUp, LoaderCircle, Plus, Redo2, RefreshCcw, Undo2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import DynamicList from '../components/DynamicList';
import FeedbackModal from '../components/FeedbackModal';
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';
import RoleCard from '../components/RoleCard';
import TemplateCard from '../components/TemplateCard';
import SurfaceCard from '../components/ui/SurfaceCard';
import { getTemplatesForRole, INITIAL_DATA, ROLE_SUGGESTIONS, ROLES, STORAGE_KEY, TEMPLATES } from '../constants';
import { extractTextFromFile } from '../services/fileService';
import { parseResumeWithAI } from '../services/aiService';
import { Education, Experience, Project, ResumeData, ViewMode } from '../types';

declare const html2pdf: any;

const defaultSectionOrder = ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'];

const hasText = (value: string) => value.trim().length > 0;

const Builder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedTemplateFromUrl = searchParams.get('template');
  const selectedRole = searchParams.get('role') && ROLES.includes(searchParams.get('role') as (typeof ROLES)[number])
    ? (searchParams.get('role') as string)
    : undefined;

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
  const [uploadProgress, setUploadProgress] = useState('');
  const [scale, setScale] = useState(1);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [downloadCooldownLeft, setDownloadCooldownLeft] = useState(0);
  const [isAtsChecklistOpen, setIsAtsChecklistOpen] = useState(false);

  const roleSuggestions = useMemo(() => (selectedRole ? ROLE_SUGGESTIONS[selectedRole] : undefined), [selectedRole]);
  const roleTemplates = useMemo(() => getTemplatesForRole(selectedRole), [selectedRole]);

  const atsChecks = useMemo(() => {
    const keywordSource = [
      data.summary,
      data.skills.join(' '),
      data.certifications.join(' '),
      ...data.experience.flatMap((item) => [item.jobTitle, item.company, item.description]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.technologies]),
      ...data.education.flatMap((item) => [item.degree, item.institution]),
    ]
      .join(' ')
      .toLowerCase();

    const keywordMatches = roleSuggestions?.keywords.filter((keyword) => keywordSource.includes(keyword.toLowerCase())) ?? [];
    const requiredKeywordCount = roleSuggestions ? Math.min(3, roleSuggestions.keywords.length) : 0;
    const strongExperienceEntries = data.experience.filter(
      (item) => [item.jobTitle, item.company, item.startDate, item.description].every(hasText) && item.description.trim().length >= 80,
    );
    const projectEntries = data.projects.filter((item) => [item.name, item.description].every(hasText));
    const skillCount = data.skills.filter(Boolean).length;

    return [
      {
        id: 'contact',
        label: 'Complete contact details',
        tip: 'Add full name, email, phone, and address so recruiters can reach you easily.',
        complete: [data.personalInfo.fullName, data.personalInfo.email, data.personalInfo.phone, data.personalInfo.address].every(hasText),
        weight: 15,
      },
      {
        id: 'summary',
        label: 'Add a strong professional summary',
        tip: 'Write at least 60 characters summarizing your role, strengths, and target position.',
        complete: data.summary.trim().length >= 60,
        weight: 15,
      },
      {
        id: 'experience',
        label: 'Include detailed work experience',
        tip: 'Add job title, company, dates, and an achievement-focused description.',
        complete: strongExperienceEntries.length > 0,
        weight: 20,
      },
      {
        id: 'skills',
        label: 'List enough relevant skills',
        tip: 'Add at least 8 skills so the ATS can match your profile better.',
        complete: skillCount >= 8,
        weight: 15,
      },
      {
        id: 'education',
        label: 'Complete education details',
        tip: 'Add degree, institution, and dates for at least one education entry.',
        complete: data.education.some((item) => [item.degree, item.institution, item.startDate].every(hasText)),
        weight: 10,
      },
      {
        id: 'projects',
        label: 'Show projects or certifications',
        tip: 'Add at least one project or certification to strengthen relevance.',
        complete: projectEntries.length > 0 || data.certifications.length > 0,
        weight: 10,
      },
      {
        id: 'profiles',
        label: 'Add LinkedIn or portfolio link',
        tip: 'A profile link makes the resume more complete for recruiters.',
        complete: hasText(data.personalInfo.linkedin) || hasText(data.personalInfo.portfolio),
        weight: 5,
      },
      {
        id: 'keywords',
        label: 'Use role keywords in the resume',
        tip: roleSuggestions
          ? `Add at least ${requiredKeywordCount} role keywords like ${roleSuggestions.keywords.slice(0, 3).join(', ')}.`
          : 'Add role-specific keywords in summary, skills, and experience.',
        complete: requiredKeywordCount === 0 || keywordMatches.length >= requiredKeywordCount,
        weight: 10,
      },
    ];
  }, [data, roleSuggestions]);

  const atsScore = useMemo(
    () => atsChecks.reduce((total, item) => total + (item.complete ? item.weight : 0), 0),
    [atsChecks],
  );

  const completedSectionCount = useMemo(() => atsChecks.filter((item) => item.complete).length, [atsChecks]);

  const missingRequirements = useMemo(() => atsChecks.filter((item) => !item.complete), [atsChecks]);

  const atsScoreMessage = useMemo(() => {
    if (atsScore >= 90) return 'Strong ATS setup. Your resume now covers most important screening requirements.';
    if (atsScore >= 75) return 'Good ATS coverage. Finish the remaining missing items to strengthen matching.';
    if (atsScore >= 50) return 'The resume is partially ATS-ready, but several required elements still need work.';
    return 'Your ATS score is low because important resume requirements are still missing.';
  }, [atsScore]);

  const nextIncompleteSection = useMemo(
    () => missingRequirements[0]?.label ?? 'All ATS requirements completed',
    [missingRequirements],
  );

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
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const handleSelectTemplate = useCallback((templateId: string) => {
    setData((prev) => ({ ...prev, templateId }));
    setHasSelectedTemplate(true);
    localStorage.setItem('apex_has_selected_tpl', 'true');
  }, [setData]);

  useEffect(() => {
    if (selectedTemplateFromUrl) {
      handleSelectTemplate(selectedTemplateFromUrl);
    }
  }, [handleSelectTemplate, selectedTemplateFromUrl]);

  useEffect(() => {
    if (hasSelectedTemplate) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, hasSelectedTemplate]);

  useEffect(() => {
    if (downloadCooldownLeft <= 0) return;
    const timer = window.setInterval(() => {
      setDownloadCooldownLeft((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [downloadCooldownLeft]);

  useEffect(() => {
    const handleResize = () => {
      const resumeWidth = 816;
      const padding = window.innerWidth < 640 ? 32 : 96;
      const availableWidth = window.innerWidth >= 1280 ? window.innerWidth / 2 : window.innerWidth;
      setScale(Math.min((availableWidth - padding) / resumeWidth, 1));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

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

  const downloadFile = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const element = document.getElementById('resume-pdf-target');
    if (!element) {
      setIsExporting(false);
      return;
    }

    try {
      await html2pdf().set({
        margin: 0,
        filename: `${data.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_Apex.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4, useCORS: true, letterRendering: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true },
      }).from(element).save();
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

  const applySuggestedSkill = (skill: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill],
    }));
  };

  const applySuggestedTitle = () => {
    if (!roleSuggestions) return;
    setData((prev) => {
      const experience = [...prev.experience];
      if (experience.length === 0) {
        experience.push({
          id: crypto.randomUUID(),
          jobTitle: roleSuggestions.jobTitle,
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        });
      } else {
        experience[0] = { ...experience[0], jobTitle: roleSuggestions.jobTitle };
      }
      return { ...prev, experience };
    });
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
          <FormSection key="summary" title="Professional Summary">
            <textarea rows={4} value={data.summary} onChange={(event) => setData((prev) => ({ ...prev, summary: event.target.value }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" />
          </FormSection>
        );
      case 'experience':
        return (
          <FormSection key="experience" title="Work Experience">
            <DynamicList items={data.experience} onAdd={() => addItem('experience')} onRemove={(id) => removeItem('experience', id)} addButtonText="Add Experience" renderItem={(exp: Experience) => (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Job Title</label><input value={exp.jobTitle} onChange={(event) => handleUpdateItem('experience', exp.id, 'jobTitle', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Company</label><input value={exp.company} onChange={(event) => handleUpdateItem('experience', exp.id, 'company', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Location</label><input value={exp.location} onChange={(event) => handleUpdateItem('experience', exp.id, 'location', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Start</label><input value={exp.startDate} onChange={(event) => handleUpdateItem('experience', exp.id, 'startDate', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">End</label><input value={exp.endDate} onChange={(event) => handleUpdateItem('experience', exp.id, 'endDate', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                </div>
                <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Description</label><textarea rows={4} value={exp.description} onChange={(event) => handleUpdateItem('experience', exp.id, 'description', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
              </div>
            )} />
          </FormSection>
        );
      case 'skills':
        return (
          <FormSection key="skills" title="Skills">
            <input value={data.skills.join(', ')} onChange={(event) => setData((prev) => ({ ...prev, skills: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" />
          </FormSection>
        );
      case 'education':
        return (
          <FormSection key="education" title="Education">
            <DynamicList items={data.education} onAdd={() => addItem('education')} onRemove={(id) => removeItem('education', id)} addButtonText="Add Education" renderItem={(edu: Education) => (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Institution</label><input value={edu.institution} onChange={(event) => handleUpdateItem('education', edu.id, 'institution', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Degree</label><input value={edu.degree} onChange={(event) => handleUpdateItem('education', edu.id, 'degree', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Location</label><input value={edu.location} onChange={(event) => handleUpdateItem('education', edu.id, 'location', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Start</label><input value={edu.startDate} onChange={(event) => handleUpdateItem('education', edu.id, 'startDate', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">End</label><input value={edu.endDate} onChange={(event) => handleUpdateItem('education', edu.id, 'endDate', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
              </div>
            )} />
          </FormSection>
        );
      case 'projects':
        return (
          <FormSection key="projects" title="Projects">
            <DynamicList items={data.projects} onAdd={() => addItem('projects')} onRemove={(id) => removeItem('projects', id)} addButtonText="Add Project" renderItem={(project: Project) => (
              <div className="grid gap-4">
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Project Name</label><input value={project.name} onChange={(event) => handleUpdateItem('projects', project.id, 'name', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Description</label><textarea rows={3} value={project.description} onChange={(event) => handleUpdateItem('projects', project.id, 'description', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Technologies</label><input value={project.technologies} onChange={(event) => handleUpdateItem('projects', project.id, 'technologies', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
              </div>
            )} />
          </FormSection>
        );
      case 'certifications':
        return (
          <FormSection key="certifications" title="Certifications">
            <input value={data.certifications.join(', ')} onChange={(event) => setData((prev) => ({ ...prev, certifications: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" />
          </FormSection>
        );
      default:
        return null;
    }
  };

  if (!hasSelectedTemplate) {
    return (
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gray-50 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Builder Setup</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">Choose a role and template to start</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">{selectedRole ? `Showing the best 3 templates for ${selectedRole}.` : 'Select a role first to unlock the most relevant ATS-friendly templates.'}</p>
          </div>

          {!selectedRole && <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{ROLES.map((role) => <RoleCard key={role} role={role} />)}</div>}

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(selectedRole ? roleTemplates : TEMPLATES.slice(0, 6)).map((template) => (
              <div key={template.id} onClick={() => handleSelectTemplate(template.id)} className="cursor-pointer">
                <TemplateCard template={template} role={selectedRole} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[30px] px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Resume Builder</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Build and export your ATS-friendly resume</h1>
            {selectedRole && <p className="mt-2 text-sm text-gray-600">Target role: <span className="font-semibold text-gray-900">{selectedRole}</span></p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to={selectedRole ? `/templates?role=${encodeURIComponent(selectedRole)}` : '/templates'} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700">
              <ArrowLeft className="h-4 w-4" />
              Templates
            </Link>
            <button type="button" onClick={undo} disabled={past.length === 0} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 disabled:opacity-40"><Undo2 className="h-4 w-4" />Undo</button>
            <button type="button" onClick={redo} disabled={future.length === 0} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 disabled:opacity-40"><Redo2 className="h-4 w-4" />Redo</button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700"><FileUp className="h-4 w-4" />Import<input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} disabled={isProcessing} /></label>
            <button type="button" onClick={() => { if (downloadCooldownLeft === 0) setIsFeedbackOpen(true); }} disabled={downloadCooldownLeft > 0} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"><Download className="h-4 w-4" />{downloadCooldownLeft > 0 ? `Download in ${downloadCooldownLeft}s` : "Download PDF"}</button>
          </div>
        </div>

        <div className="glass-panel mb-6 overflow-hidden rounded-[24px] xl:hidden">
          <div className="flex">
            <button type="button" onClick={() => setViewMode('edit')} className={`flex-1 px-4 py-3 text-sm font-semibold transition ${viewMode === 'edit' ? 'bg-stone-900 text-white' : 'bg-transparent text-stone-500'}`}>Edit</button>
            <button type="button" onClick={() => setViewMode('preview')} className={`flex-1 px-4 py-3 text-sm font-semibold transition ${viewMode === 'preview' ? 'bg-stone-900 text-white' : 'bg-transparent text-stone-500'}`}>Preview</button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
          <section className={viewMode === 'preview' ? 'hidden xl:block' : 'block'}>
            <div className="space-y-6">
              <SurfaceCard className="overflow-hidden p-0">
                <div className="border-b border-[rgba(91,63,37,0.1)] bg-gradient-to-r from-brand-50 via-white to-white px-6 py-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                        <Activity className="h-3.5 w-3.5" />
                        Live ATS Score
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold text-stone-950">{atsScore}/100</h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">{atsScoreMessage}</p>
                    </div>
                    <div className="rounded-[24px] bg-stone-950 px-5 py-4 text-center text-white shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Requirements Done</p>
                      <p className="mt-2 text-2xl font-semibold">{completedSectionCount}/{atsChecks.length}</p>
                    </div>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200/70">
                    <motion.div
                      initial={false}
                      animate={{ width: `${atsScore}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-slate-900"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-stone-700">Next ATS fix: <span className="font-semibold text-stone-950">{nextIncompleteSection}</span></p>
                </div>
                <div className="border-t border-[rgba(91,63,37,0.1)] px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setIsAtsChecklistOpen((current) => !current)}
                    className="flex w-full items-center justify-between gap-3 rounded-[18px] bg-white/65 px-4 py-3 text-left text-sm font-semibold text-stone-800 transition hover:bg-white/90"
                  >
                    <span>Show completed and pending ATS requirements</span>
                    <ChevronDown className={`h-4 w-4 text-stone-500 transition-transform ${isAtsChecklistOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isAtsChecklistOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3 px-6 pb-5 sm:grid-cols-2">
                        {atsChecks.map((item) => (
                          <div key={item.id} className={`rounded-[20px] border px-4 py-4 text-sm ${item.complete ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-[rgba(91,63,37,0.12)] bg-white/70 text-stone-600'}`}>
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-semibold">{item.label}</span>
                              <span className="inline-flex items-center gap-2 font-semibold">
                                {item.complete ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />}
                                +{item.weight}
                              </span>
                            </div>
                            <p className="mt-2 text-xs leading-5 opacity-90">{item.tip}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {missingRequirements.length > 0 && (
                  <div className="border-t border-[rgba(91,63,37,0.1)] bg-[rgba(255,248,240,0.55)] px-6 py-5">
                    {/* <p className="text-sm font-semibold text-stone-900">What to improve now</p>
                    <div className="mt-3 space-y-2 text-sm text-stone-600">
                      {missingRequirements.slice(0, 3).map((item) => (
                        <div key={item.id} className="rounded-[16px] border border-[rgba(91,63,37,0.1)] bg-white/75 px-4 py-3">
                          <span className="font-semibold text-stone-900">{item.label}:</span> {item.tip}
                        </div>
                      ))}
                    </div> */}
                  </div>
                )}
              </SurfaceCard>

              {/* {roleSuggestions && (
                <SurfaceCard className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Role Suggestions</p>
                      <h2 className="mt-2 text-xl font-semibold text-gray-900">Quick-fill ideas for {selectedRole}</h2>
                      <p className="mt-2 text-sm leading-6 text-gray-600">Use these to speed up your first draft, then edit them to match your actual experience.</p>
                    </div>
                    <button type="button" onClick={applySuggestedTitle} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-900">
                      <Plus className="h-4 w-4" />
                      Use Suggested Title
                    </button>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {roleSuggestions.skills.map((skill) => (
                      <button key={skill} type="button" onClick={() => applySuggestedSkill(skill)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                        + {skill}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 text-sm text-gray-600">
                    Suggested keywords: {roleSuggestions.keywords.join(', ')}
                  </div>
                </SurfaceCard>
              )} */}

              <FormSection title="Personal Information" description="Keep contact information simple and recruiter-friendly.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Full Name</label><input value={data.personalInfo.fullName} onChange={(event) => setPersonalField('fullName', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Email</label><input value={data.personalInfo.email} onChange={(event) => setPersonalField('email', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Phone</label><input value={data.personalInfo.phone} onChange={(event) => setPersonalField('phone', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div className="sm:col-span-2"><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Address</label><input value={data.personalInfo.address} onChange={(event) => setPersonalField('address', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">LinkedIn</label><input value={data.personalInfo.linkedin} onChange={(event) => setPersonalField('linkedin', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                  <div><label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Portfolio</label><input value={data.personalInfo.portfolio} onChange={(event) => setPersonalField('portfolio', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></div>
                </div>
              </FormSection>

              {data.sectionOrder.map((sectionId) => renderSectionForm(sectionId))}

              <button type="button" onClick={() => { if (confirm('Reset all details?')) setData({ ...INITIAL_DATA, templateId: data.templateId }); }} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                <RefreshCcw className="h-4 w-4" />
                Reset All Data
              </button>
            </div>
          </section>

          <section className={`${viewMode === 'edit' ? 'hidden xl:flex' : 'flex'} glass-panel items-start justify-center overflow-auto rounded-[30px] p-6`}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
              <div className="overflow-hidden rounded-sm bg-white resume-shadow">
                <ResumePreview data={data} id="resume-pdf-target" isExporting={isExporting} />
              </div>
            </div>
          </section>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onDownload={downloadFile}
        initialName={data.personalInfo.fullName}
        initialEmail={data.personalInfo.email}
        onCooldownStart={setDownloadCooldownLeft}
      />

      <AnimatePresence>
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-md">
            <SurfaceCard className="w-full max-w-sm p-8 text-center">
              <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />
              <p className="mt-5 text-lg font-semibold text-gray-900">Smart analysis in progress</p>
              <p className="mt-2 text-sm text-gray-600">{uploadProgress}</p>
            </SurfaceCard>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Builder;












