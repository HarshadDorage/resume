import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeIndianRupee,
  CheckCircle2,
  CircleAlert,
  Download,
  Flame,
  Gift,
  Sparkles,
  Target,
  WandSparkles,
  X,
} from 'lucide-react';
import { ResumeData } from '../types';

interface ResumeFinalModalProps {
  isOpen: boolean;
  resumeData: ResumeData;
  onClose: () => void;
  onEdit: () => void;
  onResumeDataChange?: (nextData: ResumeData) => void;
  onDownload?: () => Promise<void> | void;
  onUnlockFree?: () => Promise<void> | void;
  recommendedKeywords?: string[];
}

const scoreWeights = {
  content: 40,
  ats: 35,
  skills: 25,
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
const hasText = (value?: string) => Boolean(value?.trim());

const ResumeFinalModal: React.FC<ResumeFinalModalProps> = ({
  isOpen,
  resumeData,
  onClose,
  onEdit,
  onResumeDataChange,
  onDownload,
  onUnlockFree,
  recommendedKeywords,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [isImproving, setIsImproving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [addedKeywords, setAddedKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setIsImproving(false);
      setIsDownloading(false);
      setIsUnlocking(false);
      setAddedKeywords([]);
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (!panelRef.current || panelRef.current.contains(event.target as Node)) return;
      if (!isImproving && !isDownloading && !isUnlocking) onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isImproving && !isDownloading && !isUnlocking) onClose();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDownloading, isImproving, isOpen, isUnlocking, onClose]);

  const keywordSuggestions = useMemo(() => {
    if (recommendedKeywords?.length) return recommendedKeywords.slice(0, 5);
    const fallback = ['React.js', 'Problem Solving', 'REST API', 'Team Collaboration', 'ATS Friendly'];
    return fallback.filter((keyword) => !resumeData.skills.includes(keyword)).slice(0, 5);
  }, [recommendedKeywords, resumeData.skills]);

  const scoreBreakdown = useMemo(() => {
    const contactComplete = [resumeData.personalInfo.fullName, resumeData.personalInfo.email, resumeData.personalInfo.phone].every(hasText);
    const summaryStrong = resumeData.summary.trim().length >= 80;
    const educationComplete = resumeData.education.some((item) => hasText(item.degree) && hasText(item.institution) && hasText(item.endDate));
    const experienceOrProjects = resumeData.experience.some((item) => hasText(item.jobTitle) && hasText(item.description)) || resumeData.projects.some((item) => hasText(item.name) && hasText(item.description));
    const contentScore = clamp(((Number(contactComplete) + Number(summaryStrong) + Number(educationComplete) + Number(experienceOrProjects)) / 4) * 100);

    const atsSignals = [
      summaryStrong,
      resumeData.skills.length >= 5,
      resumeData.sectionOrder.includes('education'),
      resumeData.sectionOrder.includes('skills'),
      resumeData.sectionOrder.includes('projects') || resumeData.sectionOrder.includes('experience'),
    ];
    const atsScore = clamp((atsSignals.filter(Boolean).length / atsSignals.length) * 100);

    const combinedKeywords = [
      ...resumeData.skills,
      resumeData.summary,
      ...resumeData.projects.map((item) => `${item.name} ${item.technologies} ${item.description}`),
      ...resumeData.experience.map((item) => `${item.jobTitle} ${item.company} ${item.description}`),
    ].join(' ').toLowerCase();
    const matchedSuggestions = keywordSuggestions.filter((keyword) => combinedKeywords.includes(keyword.toLowerCase())).length;
    const skillsScore = clamp(((resumeData.skills.length >= 5 ? 0.6 : resumeData.skills.length / 5 * 0.6) + (keywordSuggestions.length ? (matchedSuggestions / keywordSuggestions.length) * 0.4 : 0.4)) * 100);

    const totalScore = clamp((contentScore * scoreWeights.content + atsScore * scoreWeights.ats + skillsScore * scoreWeights.skills) / 100);

    return {
      totalScore,
      contentScore,
      atsScore,
      skillsScore,
      checks: [
        { label: 'ATS Friendly', ok: atsScore >= 70 },
        { label: 'All Sections Completed', ok: contentScore >= 75 },
        { label: 'No Missing Information', ok: contactComplete && educationComplete && experienceOrProjects },
        { label: 'Ready to Apply', ok: totalScore >= 75 },
      ],
    };
  }, [keywordSuggestions, resumeData]);

  const applyKeyword = (keyword: string) => {
    if (resumeData.skills.includes(keyword) || addedKeywords.includes(keyword)) return;
    const nextData = { ...resumeData, skills: [...resumeData.skills, keyword] };
    onResumeDataChange?.(nextData);
    setAddedKeywords((current) => [...current, keyword]);
  };

  const handleImprove = async () => {
    if (isImproving) return;
    setIsImproving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1400));

    const currentKeywords = new Set(resumeData.skills);
    keywordSuggestions.slice(0, 3).forEach((keyword) => currentKeywords.add(keyword));

    const improvedSummary = resumeData.summary.trim()
      ? `${resumeData.summary} Optimized with stronger ATS keywords, clearer positioning, and sharper recruiter-friendly phrasing.`
      : `ATS-friendly ${resumeData.personalInfo.fullName || 'candidate'} profile with stronger role alignment, clean structure, and keyword-optimized content for recruiter screening.`;

    const improvedProjects = resumeData.projects.length
      ? resumeData.projects.map((project, index) => index === 0
        ? { ...project, description: project.description ? `${project.description} Rewritten to emphasize impact, execution, and relevant technologies.` : 'Built a focused project that highlights practical execution, ATS relevance, and clear problem solving.' }
        : project)
      : resumeData.projects;

    const improvedExperience = resumeData.experience.length
      ? resumeData.experience.map((item, index) => index === 0
        ? { ...item, description: item.description ? `${item.description}\n- Reframed with stronger action verbs and keyword-focused achievements.` : '- Improved process quality, ownership, and recruiter relevance with stronger ATS wording.' }
        : item)
      : resumeData.experience;

    onResumeDataChange?.({
      ...resumeData,
      summary: improvedSummary,
      skills: Array.from(currentKeywords),
      projects: improvedProjects,
      experience: improvedExperience,
    });

    setIsImproving(false);
  };

  const handleDownload = async () => {
    if (!onDownload || isDownloading) return;
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUnlockFree = async () => {
    if (!onUnlockFree || isUnlocking) return;
    setIsUnlocking(true);
    try {
      await onUnlockFree();
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-md"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-5xl overflow-hidden rounded-[34px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,247,238,0.95))] shadow-[0_35px_100px_-40px_rgba(52,31,10,0.6)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(91,63,37,0.1)] bg-gradient-to-r from-brand-50 via-white to-white px-6 py-5 sm:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Final Resume Review
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-stone-950 sm:text-3xl">Your resume is almost ready</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">Review the score, improve weak areas, and choose how you want to unlock the final PDF.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isImproving || isDownloading || isUnlocking}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(91,63,37,0.12)] bg-white/80 text-stone-500 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <div className="rounded-[26px] border border-[rgba(91,63,37,0.1)] bg-white/75 p-5 shadow-[0_22px_50px_-38px_rgba(52,31,10,0.45)]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Resume Score</p>
                      <h3 className="mt-2 text-4xl font-bold text-stone-950">{scoreBreakdown.totalScore}/100</h3>
                    </div>
                    <div className="rounded-[24px] bg-stone-950 px-5 py-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Status</p>
                      <p className="mt-2 text-lg font-semibold">{scoreBreakdown.totalScore >= 80 ? 'Strong' : scoreBreakdown.totalScore >= 65 ? 'Good' : 'Needs Work'}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <ScoreRow label="Content Score" value={scoreBreakdown.contentScore} />
                    <ScoreRow label="ATS Compatibility" value={scoreBreakdown.atsScore} />
                    <ScoreRow label="Skills Match" value={scoreBreakdown.skillsScore} />
                  </div>
                </div>

                <div className="rounded-[26px] border border-[rgba(91,63,37,0.1)] bg-white/75 p-5 shadow-[0_22px_50px_-38px_rgba(52,31,10,0.45)]">
                  <div className="flex items-center gap-2 text-brand-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">Final Checklist</p>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {scoreBreakdown.checks.map((check) => (
                      <div key={check.label} className={`flex items-center gap-3 rounded-[18px] border px-4 py-4 text-sm ${check.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                        {check.ok ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <CircleAlert className="h-4 w-4 shrink-0" />}
                        <span className="font-medium">{check.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-[rgba(91,63,37,0.1)] bg-white/75 p-5 shadow-[0_22px_50px_-38px_rgba(52,31,10,0.45)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-brand-700">
                        <Target className="h-5 w-5" />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">Keyword Suggestions</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-stone-600">Add recommended keywords with one click to improve role relevance and ATS matching.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleImprove}
                      disabled={isImproving}
                      className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isImproving ? <WandSparkles className="h-4 w-4 animate-pulse" /> : <Flame className="h-4 w-4" />}
                      {isImproving ? 'Optimizing your resume...' : 'Improve My Resume'}
                    </button>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {keywordSuggestions.map((keyword) => {
                      const isAdded = resumeData.skills.includes(keyword) || addedKeywords.includes(keyword);
                      return (
                        <button
                          key={keyword}
                          type="button"
                          onClick={() => applyKeyword(keyword)}
                          disabled={isAdded}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isAdded ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'}`}
                        >
                          {isAdded ? `Added: ${keyword}` : keyword}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] bg-stone-950 p-6 text-white shadow-[0_28px_80px_-45px_rgba(15,23,42,0.85)]">
                  <div className="flex items-center gap-2 text-brand-200">
                    <BadgeIndianRupee className="h-5 w-5" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">Download Unlock</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!onDownload || isDownloading}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-brand-500 via-brand-600 to-stone-950 px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(245,138,11,0.8)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" />
                    {isDownloading ? 'Preparing PDF...' : 'Download Resume PDF – ?49'}
                  </button>
                  <p className="mt-3 text-center text-sm text-stone-300">One-time payment • Instant download</p>

                  <button
                    type="button"
                    onClick={handleUnlockFree}
                    disabled={!onUnlockFree || isUnlocking}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] border border-white/12 bg-white/8 px-5 py-4 text-base font-semibold text-white transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Gift className="h-4 w-4" />
                    {isUnlocking ? 'Unlocking...' : 'Unlock for Free'}
                  </button>
                  <p className="mt-3 text-center text-sm text-stone-300">Share with 2 friends to unlock</p>

                  <button
                    type="button"
                    onClick={onEdit}
                    className="mt-5 flex w-full items-center justify-center rounded-[20px] border border-white/12 bg-transparent px-5 py-4 text-base font-semibold text-white transition hover:bg-white/8"
                  >
                    Edit Resume
                  </button>
                </div>

                <div className="rounded-[26px] border border-[rgba(91,63,37,0.1)] bg-white/75 p-5 shadow-[0_22px_50px_-38px_rgba(52,31,10,0.45)]">
                  <div className="flex items-start gap-3 text-sm leading-6 text-stone-700">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <p>This resume is optimized for ATS systems used by top companies.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScoreRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-stone-700">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-stone-200/80">
      <motion.div
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-stone-950"
      />
    </div>
  </div>
);

export default ResumeFinalModal;
