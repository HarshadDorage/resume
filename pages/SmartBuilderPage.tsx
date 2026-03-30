import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bot,
  Briefcase,
  CheckCircle2,
  CircleAlert,
  Download,
  FolderKanban,
  GraduationCap,
  Heart,
  Link2,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  User,
  WandSparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import FieldGroup from '../components/smart-builder/FieldGroup';
import FinalChecklistModal from '../components/smart-builder/FinalChecklistModal';
import TagSelector from '../components/smart-builder/TagSelector';
import SurfaceCard from '../components/ui/SurfaceCard';
import { INITIAL_DATA } from '../constants';
import {
  SMART_DEMO_PROFILES,
  SMART_EXPERIENCE_LEVELS,
  SMART_HOBBY_SUGGESTIONS,
  SMART_QUALIFICATIONS,
  SMART_ROLE_SKILL_MAP,
  SMART_ROLE_SUGGESTIONS,
  SMART_SKILL_SUGGESTIONS,
} from '../data/smartBuilderData';
import { Education, Experience, Project, ResumeData } from '../types';

declare const html2pdf: any;

type Tone = 'simple' | 'professional';
type ExperienceMode = (typeof SMART_EXPERIENCE_LEVELS)[number];
type Qualification = (typeof SMART_QUALIFICATIONS)[number];

type CertificationEntry = { id: string; name: string; organization: string; year: string };

const steps = ['Personal Information', 'Profile Setup', 'Summary', 'Education', 'Experience / Projects', 'Skills', 'Certifications & Interests'] as const;

const qualificationSeeds: Record<Qualification, string[]> = {
  'HSC (12th)': ['HSC (12th)'],
  Diploma: ['Diploma'],
  "Bachelor's Degree": ['HSC (12th)', "Bachelor's Degree"],
  "Master's Degree": ['HSC (12th)', "Bachelor's Degree", "Master's Degree"],
};

const createBlankResume = (): ResumeData => ({
  ...INITIAL_DATA,
  personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
  summary: '',
  experience: [],
  education: [{ id: crypto.randomUUID(), degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '' }],
  skills: [],
  projects: [{ id: crypto.randomUUID(), name: '', description: '', technologies: '' }],
  certifications: [],
  hobbies: [],
  templateId: 'modern',
  sectionOrder: ['summary', 'skills', 'education', 'projects', 'certifications', 'hobbies'],
});

const emptyExperience = (): Experience => ({ id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' });
const emptyProject = (): Project => ({ id: crypto.randomUUID(), name: '', description: '', technologies: '' });
const emptyEducation = (degree = ''): Education => ({ id: crypto.randomUUID(), degree, institution: '', location: '', startDate: '', endDate: '', gpa: '' });
const emptyCertification = (): CertificationEntry => ({ id: crypto.randomUUID(), name: '', organization: '', year: '' });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[0-9\s()-]{10,}$/;

const SmartBuilderPage: React.FC = () => {
  const [data, setData] = useState<ResumeData>(createBlankResume);
  const [currentStep, setCurrentStep] = useState(0);
  const [jobRole, setJobRole] = useState('');
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('Fresher');
  const [highestQualification, setHighestQualification] = useState<Qualification>("Bachelor's Degree");
  const [skillDraft, setSkillDraft] = useState('');
  const [hobbyDraft, setHobbyDraft] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState<Tone>('simple');
  const [certifications, setCertifications] = useState<CertificationEntry[]>([emptyCertification()]);
  const [scale, setScale] = useState(0.82);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const resumeWidth = 816;
      const padding = window.innerWidth < 640 ? 24 : 96;
      const availableWidth = window.innerWidth >= 1280 ? window.innerWidth / 2 : window.innerWidth;
      setScale(Math.min((availableWidth - padding) / resumeWidth, 1));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      certifications: certifications
        .filter((item) => item.name.trim())
        .map((item) => [item.name, item.organization, item.year].filter(Boolean).join(' - ')),
    }));
  }, [certifications]);

  useEffect(() => {
    const seededDegrees = qualificationSeeds[highestQualification];
    setData((prev) => {
      const educationEntries = experienceMode === 'Fresher'
        ? seededDegrees.map((degree, index) => prev.education[index] ? { ...prev.education[index], degree: prev.education[index].degree || degree } : emptyEducation(degree))
        : [prev.education[0] ? { ...prev.education[0], degree: prev.education[0].degree || highestQualification } : emptyEducation(highestQualification)];
      const nextExperience = experienceMode === 'Experienced' ? (prev.experience.length ? prev.experience : [emptyExperience()]) : [];
      const nextProjects = prev.projects.length ? prev.projects : [emptyProject()];
      return {
        ...prev,
        education: educationEntries,
        experience: nextExperience,
        projects: nextProjects,
        sectionOrder: experienceMode === 'Experienced'
          ? ['summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'hobbies']
          : ['summary', 'skills', 'education', 'projects', 'certifications', 'hobbies'],
      };
    });
  }, [experienceMode, highestQualification]);

  const roleSuggestions = useMemo(() => {
    if (!jobRole.trim()) return SMART_ROLE_SUGGESTIONS.slice(0, 6);
    return SMART_ROLE_SUGGESTIONS.filter((role) => role.toLowerCase().includes(jobRole.toLowerCase())).slice(0, 6);
  }, [jobRole]);

  const roleBasedSkills = useMemo(() => SMART_ROLE_SKILL_MAP[jobRole] ?? [], [jobRole]);

  const skillSuggestions = useMemo(() => {
    const query = skillDraft.trim().toLowerCase();
    const merged = Array.from(new Set([...roleBasedSkills, ...SMART_SKILL_SUGGESTIONS]));
    return merged.filter((skill) => !data.skills.includes(skill) && (!query || skill.toLowerCase().includes(query))).slice(0, 10);
  }, [data.skills, roleBasedSkills, skillDraft]);

  const hobbySuggestions = useMemo(() => {
    const query = hobbyDraft.trim().toLowerCase();
    return SMART_HOBBY_SUGGESTIONS.filter((item) => !(data.hobbies ?? []).includes(item) && (!query || item.toLowerCase().includes(query))).slice(0, 8);
  }, [data.hobbies, hobbyDraft]);

  const validations = useMemo(() => ({
    email: data.personalInfo.email && !emailRegex.test(data.personalInfo.email) ? 'Enter a valid email address' : '',
    phone: data.personalInfo.phone && !phoneRegex.test(data.personalInfo.phone) ? 'Enter a valid phone number' : '',
  }), [data.personalInfo.email, data.personalInfo.phone]);
  const missingFields = useMemo(() => {
    const issues: string[] = [];
    if (!data.personalInfo.fullName.trim()) issues.push('Add your full name');
    if (!data.personalInfo.email.trim() || validations.email) issues.push('Add a valid email address');
    if (!data.personalInfo.phone.trim() || validations.phone) issues.push('Add a valid phone number');
    if (!jobRole.trim()) issues.push('Select a target job role');
    if (!data.summary.trim()) issues.push('Generate or write a professional summary');
    if (data.skills.length < 5) issues.push('Add at least 5 relevant skills');
    if (!data.education.every((item) => item.degree.trim() && item.institution.trim() && item.endDate.trim())) issues.push('Complete all required education entries');
    if (experienceMode === 'Experienced') {
      if (!data.experience.length || !data.experience[0].company.trim() || !data.experience[0].jobTitle.trim() || !data.experience[0].description.trim()) issues.push('Complete your experience details');
    } else if (!data.projects.length || !data.projects[0].name.trim() || !data.projects[0].description.trim()) {
      issues.push('Add at least one strong project');
    }
    return issues;
  }, [data, experienceMode, jobRole, validations]);

  const checklist = useMemo(() => ([
    { label: 'All required fields completed', ok: missingFields.length === 0 },
    { label: 'ATS-friendly format', ok: true },
    { label: 'No missing core sections', ok: missingFields.length === 0 },
  ]), [missingFields]);

  const completion = Math.round(((currentStep + 1) / steps.length) * 100);

  const jobMatch = useMemo(() => {
    const source = [jobRole, data.summary, data.skills.join(' '), data.projects.map((item) => `${item.name} ${item.technologies} ${item.description}`).join(' '), data.experience.map((item) => `${item.jobTitle} ${item.company} ${item.description}`).join(' ')].join(' ').toLowerCase();
    const keywords = jobDescription.toLowerCase().match(/[a-z][a-z+.#-]{2,}/g) ?? [];
    const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 30);
    if (!uniqueKeywords.length) return 0;
    const matches = uniqueKeywords.filter((keyword) => source.includes(keyword)).length;
    return Math.round((matches / uniqueKeywords.length) * 100);
  }, [data, jobDescription, jobRole]);

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setData((prev) => ({ ...prev, education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)) }));
  };
  const addEducation = () => setData((prev) => ({ ...prev, education: [...prev.education, emptyEducation()] }));
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)) }));
  };
  const updateProject = (id: string, field: keyof Project, value: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)) }));
  };
  const addProject = () => setData((prev) => ({ ...prev, projects: [...prev.projects, emptyProject()] }));
  const addExperience = () => setData((prev) => ({ ...prev, experience: [...prev.experience, emptyExperience()] }));

  const addSkill = (value: string) => {
    const normalized = value.trim();
    if (!normalized || data.skills.includes(normalized)) return;
    setData((prev) => ({ ...prev, skills: [...prev.skills, normalized] }));
    setSkillDraft('');
  };
  const removeSkill = (value: string) => setData((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill !== value) }));
  const addHobby = (value: string) => {
    const normalized = value.trim();
    if (!normalized || (data.hobbies ?? []).includes(normalized)) return;
    setData((prev) => ({ ...prev, hobbies: [...(prev.hobbies ?? []), normalized] }));
    setHobbyDraft('');
  };
  const removeHobby = (value: string) => setData((prev) => ({ ...prev, hobbies: (prev.hobbies ?? []).filter((item) => item !== value) }));

  const generateSummary = () => {
    const topSkills = data.skills.slice(0, 4).join(', ') || 'communication, problem solving, teamwork';
    const qualification = data.education[0]?.degree || highestQualification;
    const summary = tone === 'professional'
      ? `${data.personalInfo.fullName || 'This candidate'} is a ${experienceMode.toLowerCase()} ${jobRole || 'job-ready'} profile with ${qualification} background and strengths in ${topSkills}. Presents information in a clean ATS-friendly format with clear relevance to recruiter expectations.`
      : `${data.personalInfo.fullName || 'This candidate'} is looking for a ${jobRole || 'job-ready'} opportunity and brings ${qualification} background with skills like ${topSkills}. The profile is easy to scan, beginner-friendly, and ready for applications.`;
    setData((prev) => ({ ...prev, summary }));
  };

  const generateExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => item.id === id ? {
        ...item,
        description: tone === 'professional'
          ? `- Delivered role-aligned work with clear ownership and measurable contribution.\n- Improved process clarity, team coordination, or output quality using stronger ATS-friendly wording.`
          : `- Worked on practical tasks related to the role and supported team goals.\n- Built hands-on experience and showed readiness to contribute in a structured environment.`,
      } : item),
    }));
  };

  const generateProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => item.id === id ? {
        ...item,
        description: tone === 'professional'
          ? `Built a focused ${jobRole || 'career'} project to demonstrate practical execution, keyword relevance, and structured problem solving for ATS and recruiter review.`
          : `Created a practical ${jobRole || 'career'} project to show real skills, clean presentation, and readiness for interviews.`,
      } : item),
    }));
  };

  const improveResume = () => {
    setData((prev) => ({
      ...prev,
      summary: prev.summary ? `${prev.summary} Optimized for clarity, stronger keyword matching, and cleaner ATS readability.` : prev.summary,
      experience: prev.experience.map((item) => ({ ...item, description: item.description ? `${item.description}\n- Reframed with stronger action-oriented and impact-focused language.` : item.description })),
      projects: prev.projects.map((item) => ({ ...item, description: item.description ? `${item.description} Refined to sound more structured and recruiter-friendly.` : item.description })),
    }));
  };

  const applyDemoProfile = (key: keyof typeof SMART_DEMO_PROFILES) => {
    const profile = SMART_DEMO_PROFILES[key];
    setData(profile);
    setJobRole(key === 'developer' ? 'Frontend Developer' : key === 'student' ? 'Graphic Designer' : 'BCA Fresher');
    setExperienceMode(key === 'developer' ? 'Experienced' : 'Fresher');
    setHighestQualification(key === 'developer' || key === 'student' ? "Bachelor's Degree" : "Bachelor's Degree");
    setCertifications(profile.certifications.map((item) => {
      const [name = '', organization = '', year = ''] = item.split(' - ');
      return { id: crypto.randomUUID(), name, organization, year };
    }));
    setCurrentStep(steps.length - 1);
  };

  const canGoNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return Boolean(data.personalInfo.fullName.trim() && data.personalInfo.email.trim() && data.personalInfo.phone.trim() && !validations.email && !validations.phone);
      case 1:
        return Boolean(jobRole.trim());
      case 2:
        return Boolean(data.summary.trim());
      case 3:
        return data.education.every((item) => item.degree.trim() && item.institution.trim() && item.endDate.trim());
      case 4:
        return experienceMode === 'Experienced'
          ? data.experience.some((item) => item.company.trim() && item.jobTitle.trim() && item.description.trim())
          : data.projects.some((item) => item.name.trim() && item.description.trim());
      case 5:
        return data.skills.length >= 3;
      case 6:
        return true;
      default:
        return true;
    }
  }, [currentStep, data, experienceMode, jobRole, validations]);

  const downloadFile = async () => {
    setIsDownloading(true);
    const element = document.getElementById('smart-resume-pdf-target');
    if (!element) {
      setIsDownloading(false);
      return;
    }
    try {
      await html2pdf().set({ margin: 0, filename: `${data.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_Apex_Smart.pdf`, image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 4, useCORS: true, letterRendering: true, logging: false }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', compress: true } }).from(element).save();
    } finally {
      setIsDownloading(false);
      setIsChecklistOpen(false);
    }
  };
  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel mb-8 rounded-[32px] px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"><Bot className="h-3.5 w-3.5" />Smart AI Guided Builder</div>
              <h1 className="mt-4 text-3xl font-bold text-stone-950">Detailed ATS-friendly smart builder</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Beginner-friendly for freshers, flexible for experienced users, and structured to produce clean ATS-friendly output without confusion.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/builder" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(91,63,37,0.14)] px-4 py-3 text-sm font-semibold text-stone-700"><ArrowLeft className="h-4 w-4" />Change Mode</Link>
              <Link to="/builder/manual" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(91,63,37,0.14)] px-4 py-3 text-sm font-semibold text-stone-700">Manual Builder</Link>
              <button type="button" onClick={() => setIsChecklistOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Download className="h-4 w-4" />Final Checklist</button>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-[1fr,0.8fr]">
          <SurfaceCard className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Progress</p>
                <p className="mt-2 text-lg font-semibold text-stone-950">{steps[currentStep]}</p>
              </div>
              <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">{completion}% complete</div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200/80"><motion.div initial={false} animate={{ width: `${completion}%` }} transition={{ duration: 0.3 }} className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-stone-950" /></div>
            <div className="mt-4 flex flex-wrap gap-2">{steps.map((step, index) => <div key={step} className={`rounded-full px-3 py-1 text-xs font-semibold ${index === currentStep ? 'bg-stone-950 text-white' : index < currentStep ? 'bg-brand-50 text-brand-700' : 'bg-stone-100 text-stone-500'}`}>{index + 1}. {step}</div>)}</div>
          </SurfaceCard>
          <SurfaceCard className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Quick Fill</p>
            <h2 className="mt-2 text-xl font-semibold text-stone-950">Demo profiles</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => applyDemoProfile('fresher')} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Fresher</button>
              <button type="button" onClick={() => applyDemoProfile('developer')} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Developer</button>
              <button type="button" onClick={() => applyDemoProfile('student')} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Student</button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={generateSummary} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" />Generate Summary</button>
              <button type="button" onClick={improveResume} className="inline-flex items-center gap-2 rounded-xl border border-[rgba(91,63,37,0.14)] px-4 py-3 text-sm font-semibold text-stone-700"><WandSparkles className="h-4 w-4" />Improve Resume</button>
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
          <div className="space-y-6">
            <SurfaceCard className="p-5 sm:p-6">
              <StepShell title={steps[currentStep]} description={stepDescriptions[currentStep]} stepNumber={currentStep + 1}>
                {currentStep === 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldGroup label="Full Name" icon={User}><input value={data.personalInfo.fullName} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, fullName: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                    <FieldGroup label="Phone Number" icon={Phone} error={validations.phone}><input value={data.personalInfo.phone} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                    <FieldGroup label="Email Address" icon={Mail} error={validations.email}><input value={data.personalInfo.email} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, email: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                    <FieldGroup label="Address" icon={Link2} hint="City, State / Country is enough"><input value={data.personalInfo.address} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, address: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                    <FieldGroup label="LinkedIn Profile URL" icon={Linkedin}><input value={data.personalInfo.linkedin} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, linkedin: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                    <FieldGroup label="Portfolio / GitHub / Other Link" icon={Link2}><input value={data.personalInfo.portfolio} onChange={(event) => setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, portfolio: event.target.value } }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-5">
                    <FieldGroup label="Target Job Role" icon={Briefcase}>
                      <input value={jobRole} onChange={(event) => setJobRole(event.target.value)} placeholder="Frontend Developer, Data Analyst..." className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" />
                    </FieldGroup>
                    <div className="flex flex-wrap gap-2">{roleSuggestions.map((role) => <button key={role} type="button" onClick={() => setJobRole(role)} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">{role}</button>)}</div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldGroup label="Are you fresher or experienced?" icon={Briefcase}><div className="grid gap-3 sm:grid-cols-2">{SMART_EXPERIENCE_LEVELS.map((item) => <button key={item} type="button" onClick={() => setExperienceMode(item)} className={`rounded-[18px] border px-4 py-3 text-sm font-semibold ${experienceMode === item ? 'border-brand-300 bg-brand-50 text-brand-800' : 'border-[rgba(91,63,37,0.12)] bg-white text-stone-700'}`}>{item}</button>)}</div></FieldGroup>
                      <FieldGroup label="Highest Qualification" icon={GraduationCap}><select value={highestQualification} onChange={(event) => setHighestQualification(event.target.value as Qualification)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm">{SMART_QUALIFICATIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select></FieldGroup>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FieldGroup label="Professional Summary" icon={Sparkles} hint="Use the AI button if you want ATS-friendly wording fast.">
                      <textarea rows={6} value={data.summary} onChange={(event) => setData((prev) => ({ ...prev, summary: event.target.value }))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" />
                    </FieldGroup>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={generateSummary} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" />Generate for Me</button>
                      <div className="flex gap-2 rounded-full bg-stone-100 p-1">{(['simple', 'professional'] as Tone[]).map((item) => <button key={item} type="button" onClick={() => setTone(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tone === item ? 'bg-stone-950 text-white' : 'text-stone-600'}`}>{item === 'simple' ? 'Simple' : 'Professional'}</button>)}</div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-stone-700">Education Details</p>
                      <button type="button" onClick={addEducation} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Add More</button>
                    </div>
                    {data.education.map((item, index) => (
                      <div key={item.id} className="grid gap-4 rounded-[24px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-4 sm:grid-cols-2">
                        <FieldGroup label={`Degree ${index + 1}`} icon={GraduationCap}><input value={item.degree} onChange={(event) => updateEducation(item.id, 'degree', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                        <FieldGroup label="College / University / Board"><input value={item.institution} onChange={(event) => updateEducation(item.id, 'institution', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                        <FieldGroup label="Percentage / CGPA"><input value={item.gpa || ''} onChange={(event) => updateEducation(item.id, 'gpa', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                        <FieldGroup label="Year of Completion"><input value={item.endDate} onChange={(event) => updateEducation(item.id, 'endDate', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                      </div>
                    ))}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    {experienceMode === 'Experienced' ? (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-stone-700">Experience Details</p>
                          <button type="button" onClick={addExperience} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Add More</button>
                        </div>
                        {data.experience.map((item) => (
                          <div key={item.id} className="space-y-4 rounded-[24px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <FieldGroup label="Company Name" icon={Briefcase}><input value={item.company} onChange={(event) => updateExperience(item.id, 'company', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                              <FieldGroup label="Role"><input value={item.jobTitle} onChange={(event) => updateExperience(item.id, 'jobTitle', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                              <FieldGroup label="Duration"><input value={item.startDate} onChange={(event) => updateExperience(item.id, 'startDate', event.target.value)} placeholder="Jan 2024 - Present" className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                              <FieldGroup label="Location"><input value={item.location} onChange={(event) => updateExperience(item.id, 'location', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            </div>
                            <FieldGroup label="Description"><textarea rows={5} value={item.description} onChange={(event) => updateExperience(item.id, 'description', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <button type="button" onClick={() => generateExperience(item.id)} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" />Generate for Me</button>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="rounded-[20px] border border-brand-200 bg-brand-50/70 px-4 py-4 text-sm text-brand-800">As a fresher, projects are more important than experience. Add 1-2 strong projects to improve ATS value.</div>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-stone-700">Projects</p>
                          <button type="button" onClick={addProject} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Add More</button>
                        </div>
                        {data.projects.map((item) => (
                          <div key={item.id} className="space-y-4 rounded-[24px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-4">
                            <FieldGroup label="Project Title" icon={FolderKanban}><input value={item.name} onChange={(event) => updateProject(item.id, 'name', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <FieldGroup label="Description"><textarea rows={5} value={item.description} onChange={(event) => updateProject(item.id, 'description', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <FieldGroup label="Technologies Used"><input value={item.technologies} onChange={(event) => updateProject(item.id, 'technologies', event.target.value)} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <button type="button" onClick={() => generateProject(item.id)} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" />Generate for Me</button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <FieldGroup label="Skills" icon={Sparkles} hint="Trending suggestions change based on the job role you selected.">
                      <TagSelector value={skillDraft} onChange={setSkillDraft} onAdd={addSkill} onRemove={removeSkill} selected={data.skills} suggestions={skillSuggestions} placeholder="React, Communication, SQL..." />
                    </FieldGroup>
                    {roleBasedSkills.length > 0 && <div className="rounded-[20px] border border-[rgba(91,63,37,0.12)] bg-white/70 px-4 py-4 text-sm text-stone-700">Trending for <span className="font-semibold text-stone-950">{jobRole}</span>: {roleBasedSkills.join(', ')}</div>}
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-stone-700">Certifications</p>
                        <button type="button" onClick={() => setCertifications((prev) => [...prev, emptyCertification()])} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Add More</button>
                      </div>
                      <div className="space-y-4">
                        {certifications.map((item, index) => (
                          <div key={item.id} className="grid gap-4 rounded-[24px] border border-[rgba(91,63,37,0.12)] bg-white/70 p-4 sm:grid-cols-3">
                            <FieldGroup label={`Certification ${index + 1}`} icon={Award}><input value={item.name} onChange={(event) => setCertifications((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, name: event.target.value } : entry))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <FieldGroup label="Issuing Organization"><input value={item.organization} onChange={(event) => setCertifications((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, organization: event.target.value } : entry))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                            <FieldGroup label="Year"><input value={item.year} onChange={(event) => setCertifications((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, year: event.target.value } : entry))} className="input-surface w-full rounded-[20px] px-4 py-3 text-sm" /></FieldGroup>
                          </div>
                        ))}
                      </div>
                    </div>
                    <FieldGroup label="Hobbies / Interests" icon={Heart} hint="Optional, but useful for a fuller fresher profile.">
                      <TagSelector value={hobbyDraft} onChange={setHobbyDraft} onAdd={addHobby} onRemove={removeHobby} selected={data.hobbies ?? []} suggestions={hobbySuggestions} placeholder="Reading, Coding, Sports..." />
                    </FieldGroup>
                  </div>
                )}
              </StepShell>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button type="button" onClick={() => setCurrentStep((value) => Math.max(value - 1, 0))} disabled={currentStep === 0} className="inline-flex items-center gap-2 rounded-xl border border-[rgba(91,63,37,0.14)] px-4 py-3 text-sm font-semibold text-stone-700 disabled:opacity-40"><ArrowLeft className="h-4 w-4" />Back</button>
                <button type="button" onClick={() => setCurrentStep((value) => Math.min(value + 1, steps.length - 1))} disabled={!canGoNext || currentStep === steps.length - 1} className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">Next<ArrowRight className="h-4 w-4" /></button>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Missing Info Detector</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-950">What still needs attention</h2>
              <div className="mt-4 space-y-3">{missingFields.length === 0 ? <div className="rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-800">Everything important is filled. The resume is ready for final review.</div> : missingFields.map((item) => <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[rgba(91,63,37,0.12)] bg-white/70 px-4 py-4 text-sm text-stone-700"><CircleAlert className="mt-0.5 h-4 w-4 text-amber-500" /><span>{item}</span></div>)}</div>
            </SurfaceCard>

            <SurfaceCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Job Match</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-950">Paste a job description</h2>
              <textarea rows={5} value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste a job description here to estimate keyword match..." className="input-surface mt-4 w-full rounded-[20px] px-4 py-3 text-sm" />
              <div className="mt-4 rounded-[20px] bg-stone-950 px-4 py-4 text-white"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Match Score</p><p className="mt-2 text-2xl font-semibold">{jobMatch}%</p><p className="mt-2 text-sm text-stone-300">Basic keyword match from your role, summary, skills, projects, and experience.</p></div>
            </SurfaceCard>
          </div>

          <section className="glass-panel flex items-start justify-center overflow-auto rounded-[30px] p-6">
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}><div className="overflow-hidden rounded-sm bg-white resume-shadow"><ResumePreview data={data} id="smart-resume-pdf-target" isExporting={isDownloading} /></div></div>
          </section>
        </div>
      </div>

      <FinalChecklistModal open={isChecklistOpen} checks={checklist} isDownloading={isDownloading} onClose={() => setIsChecklistOpen(false)} onDownload={downloadFile} />
    </section>
  );
};

const stepDescriptions = [
  'Add the contact details recruiters need first.',
  'Choose your target role, qualification, and whether you are fresher or experienced.',
  'Write or generate a recruiter-friendly summary.',
  'Fill education details based on your highest qualification and profile type.',
  'Show experience if you are experienced, or projects if you are a fresher.',
  'Add ATS-relevant skills with role-based suggestions.',
  'Complete optional but valuable sections like certifications and hobbies.',
] as const;

const StepShell: React.FC<{ title: string; description: string; stepNumber: number; children: React.ReactNode }> = ({ title, description, stepNumber, children }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Step {stepNumber}</p>
    <h2 className="mt-2 text-2xl font-semibold text-stone-950">{title}</h2>
    <p className="mt-2 text-sm leading-7 text-stone-600">{description}</p>
    <div className="mt-6">{children}</div>
  </div>
);

export default SmartBuilderPage;
