// Sistema de ranques COMIQUICE — utilitarios puros sem side-effects.
//
// computeRank({points, has_purchased, created}) -> {tier, label, emoji, sub, totalPoints, timeBonus}
//
// Bonus de tempo: +10 por cada mes completo desde `created` (data do profile).
// E somado em tempo de exibicao — nao persistido no banco.

export const RANKS = [
  {
    tier: 'imigrante',
    min: 0,
    max: 50,
    label: 'Imigrante sem Papel',
    emoji: '🛬',
    sub: 'Perdido em Barajas, procurando o NIE.'
  },
  {
    tier: 'turista',
    min: 51,
    max: 200,
    label: 'Turista Estourado',
    emoji: '🇪🇸',
    sub: 'Vivendo ilegal pos-90 dias, cacador de tortilla barata.'
  },
  {
    tier: 'estudante',
    min: 201,
    max: 600,
    label: 'Estudante de Intercambio',
    emoji: '🎓',
    sub: 'Sobrevivendo a canas de 1€, ajudando novatos no metro.'
  },
  {
    tier: 'residente',
    min: 601,
    max: 1500,
    label: 'Residente com Arraigo',
    emoji: '📂',
    sub: 'Papelada saiu! Gesticula muito e reclama do calor.'
  },
  {
    tier: 'cidadao',
    min: 1501,
    max: Infinity,
    label: 'Cidadao Europeu',
    emoji: '👑',
    sub: 'Passaporte vermelho na mao, fala "vale" a cada 3 palavras.'
  }
];

// Bonus por tempo de cadastro (+10 por mes completo)
export function getTimeBonus(createdISO) {
  if (!createdISO) return 0;
  const created = new Date(createdISO);
  if (isNaN(created.getTime())) return 0;
  const now = new Date();
  const msPerMonth = 30.44 * 24 * 60 * 60 * 1000; // mes medio
  const months = Math.floor((now - created) / msPerMonth);
  return Math.max(0, months) * 10;
}

// Calcula rank consolidado. Aceita profile shape do PB.
export function computeRank(profile) {
  if (!profile) {
    return { ...RANKS[0], totalPoints: 0, timeBonus: 0, basePoints: 0 };
  }

  const hasPurchased = !!profile.has_purchased;
  const basePoints = Number(profile.points || 0);
  const timeBonus = getTimeBonus(profile.created);
  const totalPoints = basePoints + timeBonus;

  // Comprador ganha bypass automatico ao topo
  if (hasPurchased) {
    return { ...RANKS[RANKS.length - 1], totalPoints, timeBonus, basePoints, viaPurchase: true };
  }

  const rank = RANKS.find(r => totalPoints >= r.min && totalPoints <= r.max) || RANKS[0];
  return { ...rank, totalPoints, timeBonus, basePoints, viaPurchase: false };
}

// Pontos restantes pro proximo tier (UI de progressao)
export function pointsToNextTier(profile) {
  const r = computeRank(profile);
  if (r.tier === 'cidadao') return 0;
  const next = RANKS[RANKS.findIndex(x => x.tier === r.tier) + 1];
  return next ? Math.max(0, next.min - r.totalPoints) : 0;
}
