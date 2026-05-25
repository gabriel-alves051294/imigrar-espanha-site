// Avatar com modificadores visuais por tier (opacidade, bordas, animacoes, shimmer).
//
// Uso:
//   <RankedAvatar profile={user} size={40} />
//   <RankedAvatar profile={user} size={64} src={avatarUrl} />

import React from 'react';
import { computeRank } from '@/lib/rank.js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Wrapper classes por tier — aplicadas no container externo
const WRAPPER_BY_TIER = {
  imigrante: 'opacity-60',
  turista: '',
  estudante: 'rounded-full p-[2px] bg-emerald-500',
  residente: 'rounded-full p-[2px] bg-gradient-to-br from-purple-600 to-indigo-600 animate-pulse',
  cidadao:
    'rounded-full p-[3px] bg-[conic-gradient(from_0deg,#facc15,#dc2626,#facc15,#dc2626,#facc15)] drop-shadow-[0_0_8px_rgba(234,179,8,0.6)] animate-[spin_6s_linear_infinite]',
};

// Inner avatar precisa de fundo solido pra mascara funcionar
const INNER_BY_TIER = {
  imigrante: '',
  turista: '',
  estudante: 'ring-2 ring-white dark:ring-slate-900',
  residente: 'ring-2 ring-white dark:ring-slate-900',
  cidadao: 'ring-2 ring-white dark:ring-slate-900',
};

const RankedAvatar = ({ profile, size = 40, src, fallback, className = '' }) => {
  const rank = computeRank(profile);
  const wrapperCls = WRAPPER_BY_TIER[rank.tier] || '';
  const innerCls = INNER_BY_TIER[rank.tier] || '';

  const initials = (profile?.name || fallback || 'U')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');

  // Container externo controla efeito; inner mantem aspect-ratio
  const style = { width: size, height: size };

  // Tier cidadao: contra-rotacionar inner pra texto/imagem ficar parados
  const innerSpin =
    rank.tier === 'cidadao' ? 'animate-[spin_6s_linear_infinite_reverse]' : '';

  return (
    <div
      className={`relative inline-block shrink-0 ${wrapperCls} ${className}`}
      style={style}
      data-rank={rank.tier}
    >
      <div className={`w-full h-full rounded-full overflow-hidden ${innerSpin}`}>
        <Avatar className={`w-full h-full ${innerCls}`}>
          {src && <AvatarImage src={src} alt={profile?.name || ''} />}
          <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default RankedAvatar;
