import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { LoaderCircle, MessageSquareText, X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => Promise<void>;
  initialName?: string;
  initialEmail?: string;
  onCooldownStart?: (seconds: number) => void;
}

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID || 'service_taec0q5';
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY || import.meta.env.VITE_EMAIL_PUBLIC_KE || 'rcajKWz3ACgYlCKHL';
const COOLDOWN_SECONDS = 6;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getEmailJsErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null) {
    const maybeText = 'text' in error ? String((error as { text?: unknown }).text ?? '') : '';
    const maybeStatus = 'status' in error ? String((error as { status?: unknown }).status ?? '') : '';
    const combined = `${maybeStatus} ${maybeText}`.trim();

    if (combined.toLowerCase().includes('template')) {
      return 'EmailJS template is invalid. Set a valid VITE_EMAIL_TEMPLATE_ID and restart the app.';
    }
    if (combined.toLowerCase().includes('public key') || combined.toLowerCase().includes('apikey')) {
      return 'EmailJS public key is invalid. Check VITE_EMAIL_PUBLIC_KEY.';
    }
    if (combined.toLowerCase().includes('service')) {
      return 'EmailJS service ID is invalid. Check VITE_EMAIL_SERVICE_ID.';
    }
    if (combined) {
      return `Feedback send failed: ${combined}`;
    }
  }

  return 'Failed to send feedback. Check EmailJS config and try again.';
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  initialName = '',
  initialEmail = '',
  onCooldownStart,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const [form, setForm] = useState({ name: initialName, email: initialEmail, message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; submit?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [cooldownLeft, setCooldownLeft] = useState(0);

  useEffect(() => {
    setForm((current) => ({ ...current, name: initialName, email: initialEmail }));
  }, [initialEmail, initialName]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setSuccessMessage('');
      setIsSubmitting(false);
      setIsSkipping(false);
      setCooldownLeft(0);
      if (cooldownTimerRef.current) {
        window.clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
      return;
    }

    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 120);
    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!panelRef.current || panelRef.current.contains(event.target as Node) || isSubmitting || isSkipping) return;
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting && !isSkipping) onClose();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isSkipping, isSubmitting, onClose]);

  const startCooldown = () => {
    setCooldownLeft(COOLDOWN_SECONDS);
    onCooldownStart?.(COOLDOWN_SECONDS);
    if (cooldownTimerRef.current) window.clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = window.setInterval(() => {
      setCooldownLeft((current) => {
        if (current <= 1) {
          if (cooldownTimerRef.current) {
            window.clearInterval(cooldownTimerRef.current);
            cooldownTimerRef.current = null;
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailPattern.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, submit: undefined }));
  };

  const handleSkip = async () => {
    if (isSubmitting || isSkipping || cooldownLeft > 0) return;
    setIsSkipping(true);
    startCooldown();
    try {
      await onDownload();
      onClose();
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Download failed. Please try again.' });
    } finally {
      setIsSkipping(false);
    }
  };

  const handleSubmitAndDownload = async () => {
    if (isSubmitting || isSkipping || cooldownLeft > 0) return;
    if (!validate()) return;
    if (!EMAIL_TEMPLATE_ID?.trim()) {
      setErrors({ submit: 'EmailJS is not configured. Add VITE_EMAIL_TEMPLATE_ID in .env.local and restart the Vite server.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
    startCooldown();

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID.trim(),
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim() || 'No message provided.',
          time: new Date().toLocaleString(),
          source: 'Resume Download Page',
        },
        EMAIL_PUBLIC_KEY,
      );

      setSuccessMessage('Feedback sent successfully. Your download is starting...');
      await onDownload();
      window.setTimeout(() => onClose(), 700);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      setErrors({ submit: getEmailJsErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/55 p-4 backdrop-blur-md"
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-lg overflow-hidden rounded-[32px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,247,238,0.94))] shadow-[0_35px_90px_-40px_rgba(52,31,10,0.58)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(91,63,37,0.1)] bg-gradient-to-r from-brand-50 via-white to-white px-6 py-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  Quick Feedback
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-stone-950">Before you download</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Share quick feedback to help improve the resume builder. You can also skip and download directly.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting || isSkipping}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(91,63,37,0.12)] bg-white/80 text-stone-500 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Name</label>
                  <input
                    ref={firstInputRef}
                    value={form.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    className="input-surface w-full rounded-[18px] px-4 py-3 text-sm"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Email</label>
                  <input
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="input-surface w-full rounded-[18px] px-4 py-3 text-sm"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                  className="input-surface w-full rounded-[18px] px-4 py-3 text-sm"
                  placeholder="Tell us what worked well or what needs improvement"
                />
              </div>

              {successMessage && <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div>}
              {errors.submit && <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errors.submit}</div>}
              {cooldownLeft > 0 && !isSubmitting && !isSkipping && (
                <div className="rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  Please wait {cooldownLeft}s before trying again.
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSubmitting || isSkipping || cooldownLeft > 0}
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(91,63,37,0.14)] bg-white/80 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSkipping ? 'Preparing download...' : 'Skip & Download'}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAndDownload}
                  disabled={isSubmitting || isSkipping || cooldownLeft > 0}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit & Download'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
