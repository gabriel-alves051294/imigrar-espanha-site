// Badge visual condicional por tier de ranque (Tailwind nativo).
//
// Uso:
//   <RankBadge profile={user} size="sm" />
//   <RankBadge profile={user} size="md" showLabel />

import React from 'react';
import { computeRank } from '@/lib/rank.js';

// Mapeamento tier -> classes Tailwind (sem dynamic class names, JIT-friendly)
const STYLES = {
  imigrante: {
    base: 'bg-slate-100 text-slate-500 border border-dashed border-slate-300',
    dark: 'dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-600',
  },
  turista: {
    base: 'bg-amber-100 text-amber-800 border border-amber-200',
    dark: 'dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50',
  },
  estudante: {
    base: 'bg-gradient-to-r from-blue-500 to-teal-500 text-white border border-blue-300/50',
    dark: '',
  },
  residente: {
    base: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 border border-purple-400/40',
    dark: '',
  },
  cidadao: {
    base: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-yellow-950 font-bold shadow-lg shadow-yellow-500/40 border border-yellow-300 ring-1 ring-yellow-200/50',
    dark: 'dark:text-yellow-950',
  },
};

const SIZES = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1',
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

const RankBadge = ({ profile, size = 'sm', showLabel = true, className = '' }) => {
  const rank = computeRank(profile);
  const s = STYLES[rank.tier] || STYLES.imigrante;
  const sz = SIZES[size] || SIZES.sm;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium leading-none whitespace-nowrap select-none ${s.base} ${s.dark} ${sz} ${className}`}
      title={rank.viaPurchase ? `${rank.label} • Cliente do produto` : `${rank.label} • ${rank.totalPoints} pts`}
    >
      <span aria-hidden="true">{rank.emoji}</span>
      {showLabel && <span>{rank.label}</span>}
    </span>
  );
};

export default RankBadge;
