import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FieldGroupProps {
  label: string;
  icon?: LucideIcon;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, icon: Icon, hint, error, children }) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700">
        {Icon && <Icon className="h-4 w-4 text-brand-600" />}
        <span>{label}</span>
      </div>
      {children}
      {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : hint ? <p className="mt-2 text-xs text-stone-500">{hint}</p> : null}
    </div>
  );
};

export default FieldGroup;
