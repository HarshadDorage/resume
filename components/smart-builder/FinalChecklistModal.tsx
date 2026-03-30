import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import SurfaceCard from '../ui/SurfaceCard';

interface FinalChecklistModalProps {
  open: boolean;
  checks: Array<{ label: string; ok: boolean }>;
  isDownloading: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const FinalChecklistModal: React.FC<FinalChecklistModalProps> = ({ open, checks, isDownloading, onClose, onDownload }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-950/55 p-4 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} className="w-full max-w-xl">
            <SurfaceCard className="p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Final Checklist</p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950">Review before download</h2>
              <div className="mt-5 space-y-3">
                {checks.map((check) => (
                  <div key={check.label} className={`flex items-center justify-between gap-3 rounded-[18px] border px-4 py-3 text-sm ${check.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-[rgba(91,63,37,0.12)] bg-white/70 text-stone-600'}`}>
                    <span>{check.label}</span>
                    {check.ok ? <CheckCircle2 className="h-4 w-4" /> : <CircleAlert className="h-4 w-4 text-amber-500" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={onClose} className="rounded-xl border border-[rgba(91,63,37,0.14)] px-4 py-3 text-sm font-semibold text-stone-700">Close</button>
                <button type="button" onClick={onDownload} disabled={isDownloading} className="rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
                  {isDownloading ? 'Downloading...' : 'Download Resume'}
                </button>
              </div>
            </SurfaceCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinalChecklistModal;
