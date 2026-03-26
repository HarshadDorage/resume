import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoleCardProps {
  role: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/templates?role=${encodeURIComponent(role)}`}
        className="group flex h-full items-center justify-between gap-4 overflow-hidden rounded-[28px] border border-[rgba(91,63,37,0.12)] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,245,232,0.85))] p-5 shadow-[0_24px_60px_-38px_rgba(52,31,10,0.48)] transition duration-300 hover:border-[rgba(214,109,6,0.28)] hover:shadow-[0_28px_70px_-34px_rgba(214,109,6,0.35)]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">Role Flow</p>
          <p className="mt-2 text-lg font-semibold text-stone-950">{role}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">View templates shaped around this hiring path and recruiter expectation.</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(91,63,37,0.12)] bg-white/70 text-stone-500 transition group-hover:border-brand-200 group-hover:text-brand-700">
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
};

export default RoleCard;
