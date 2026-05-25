// ProfilePage — exibe rank, pontos, breakdown e barra de progressao.
// Tier "cidadao" transforma painel em layout de "Passaporte Europeu Biometrico".

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { computeRank, pointsToNextTier, RANKS } from '@/lib/rank.js';
import RankedAvatar from '@/components/RankedAvatar.jsx';
import RankBadge from '@/components/RankBadge.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Sparkles, MessageSquare, FileText, MessagesSquare, Send, Camera, Trash2, Loader2 } from 'lucide-react';

// Restricoes do campo `avatar` na collection profiles (PB migration)
const AVATAR_MAX_MB = 5; // usuario nao precisa de 20MB
const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const ProfilePage = () => {
  const { session } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      if (!session?.id) { setIsLoading(false); return; }
      try {
        const p = await pb.collection('profiles').getOne(session.id, { $autoCancel: false });
        setProfile(p);
      } catch (err) {
        console.error('[ProfilePage] load failed:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [session]);

  const handleAvatarPick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // reset pra permitir re-upload do mesmo arquivo
    if (!file || !session?.id) return;

    if (!AVATAR_TYPES.includes(file.type)) {
      toast.error('Formato inválido. Use JPG, PNG, GIF ou WEBP.');
      return;
    }
    if (file.size > AVATAR_MAX_MB * 1024 * 1024) {
      toast.error(`Imagem muito grande. Máximo ${AVATAR_MAX_MB}MB.`);
      return;
    }

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('avatar', file);
      const updated = await pb.collection('profiles').update(session.id, fd, { $autoCancel: false });
      setProfile(updated);
      toast.success('Foto atualizada!');
    } catch (err) {
      console.error('[ProfilePage] avatar upload failed:', err);
      toast.error(err?.response?.message || 'Falha ao enviar foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarRemove = async () => {
    if (!session?.id || !profile?.avatar) return;
    setIsUploading(true);
    try {
      const updated = await pb.collection('profiles').update(session.id, { avatar: null }, { $autoCancel: false });
      setProfile(updated);
      toast.success('Foto removida.');
    } catch (err) {
      toast.error('Falha ao remover foto.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (!session || !profile) {
    return (
      <div className="container max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Faça login para ver seu perfil</h2>
      </div>
    );
  }

  const rank = computeRank(profile);
  const toNext = pointsToNextTier(profile);
  const avatarUrl = profile.avatar ? pb.files.getUrl(profile, profile.avatar) : '';
  const isCidadao = rank.tier === 'cidadao';

  // Input file global (compartilhado por ambos os layouts)
  const fileInputEl = (
    <input
      ref={fileInputRef}
      type="file"
      accept={AVATAR_TYPES.join(',')}
      onChange={handleAvatarChange}
      className="hidden"
      aria-label="Selecionar foto de perfil"
    />
  );

  // Tier final = layout "Passaporte"
  if (isCidadao) {
    return (
      <div className="bg-background min-h-screen py-12">
        <Helmet><title>Meu Passaporte | Comunidade</title></Helmet>
        {fileInputEl}
        <div className="container max-w-3xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border-4 border-yellow-500/60 shadow-2xl bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-yellow-100 p-8 md:p-10">
            {/* Faixa superior */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-yellow-500/40">
              <div className="text-xs uppercase tracking-[0.3em] opacity-70">União Europeia · España</div>
              <div className="text-xs opacity-70">PASAPORTE</div>
            </div>
            {/* Brasão / chip */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-80" aria-hidden="true" />
            {/* Conteudo */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex flex-col items-center gap-2">
                <RankedAvatar profile={profile} src={avatarUrl} size={140} />
                <AvatarControls
                  hasAvatar={!!profile.avatar}
                  isUploading={isUploading}
                  onPick={handleAvatarPick}
                  onRemove={handleAvatarRemove}
                  variant="royal"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-xs uppercase tracking-widest opacity-60 mb-1">Apellidos / Nombre</div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-yellow-50">
                  {profile.name}
                </h1>
                <RankBadge profile={profile} size="md" />
                <div className="mt-4 text-sm opacity-80 italic">"{rank.sub}"</div>
                {rank.viaPurchase && (
                  <div className="mt-3 text-xs uppercase tracking-wider text-yellow-300 font-bold">
                    ★ Status: Cliente do produto — bypass ativo
                  </div>
                )}
              </div>
            </div>
            {/* Dados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-yellow-500/40 text-sm">
              <Stat label="Pontos base" value={rank.basePoints} />
              <Stat label="Bônus tempo" value={`+${rank.timeBonus}`} />
              <Stat label="Total" value={rank.totalPoints} />
              <Stat label="Cadastro" value={new Date(profile.created).toLocaleDateString('pt-BR')} />
            </div>
            <div className="mt-8 text-[10px] text-center opacity-50 uppercase tracking-[0.5em]">
              &lt;&lt;&lt; Passaporte biométrico válido até cidadania &gt;&gt;&gt;
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tiers nao-cidadao: layout padrao
  const allTiers = RANKS;
  const currentIdx = allTiers.findIndex(t => t.tier === rank.tier);

  return (
    <div className="bg-background min-h-screen py-12">
      <Helmet><title>Meu Perfil | Comunidade</title></Helmet>
      {fileInputEl}
      <div className="container max-w-3xl mx-auto px-4 space-y-8">
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col items-center gap-2">
              <RankedAvatar profile={profile} src={avatarUrl} size={100} />
              <AvatarControls
                hasAvatar={!!profile.avatar}
                isUploading={isUploading}
                onPick={handleAvatarPick}
                onRemove={handleAvatarRemove}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{profile.name}</h1>
              <RankBadge profile={profile} size="md" />
              <p className="text-sm text-muted-foreground italic mt-3">"{rank.sub}"</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
            <Stat label="Pontos" value={rank.totalPoints} subtle={`base ${rank.basePoints} + ${rank.timeBonus} tempo`} />
            <Stat label="Próximo tier" value={toNext > 0 ? `${toNext} pts` : 'TOPO'} />
            <Stat label="Membro desde" value={new Date(profile.created).toLocaleDateString('pt-BR')} />
          </div>
        </div>

        {/* Roadmap dos tiers */}
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" /> Jornada de ranques
          </h2>
          <div className="space-y-3">
            {allTiers.map((t, i) => {
              const isCurrent = i === currentIdx;
              const isPassed = i < currentIdx;
              return (
                <div
                  key={t.tier}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    isCurrent ? 'border-primary bg-primary/5 shadow-sm' : isPassed ? 'opacity-60' : 'opacity-50'
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium flex items-center gap-2">
                      {t.label}
                      {isCurrent && <Sparkles className="h-3 w-3 text-primary" />}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{t.sub}</div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {t.max === Infinity ? `${t.min}+ pts` : `${t.min}-${t.max} pts`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Como ganhar pontos */}
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Como ganhar pontos</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted-foreground" /> Mensagem no chat — <strong>+1</strong></li>
            <li className="flex items-center gap-2"><MessagesSquare className="h-4 w-4 text-muted-foreground" /> Comentário em blog — <strong>+2</strong></li>
            <li className="flex items-center gap-2"><Send className="h-4 w-4 text-muted-foreground" /> Resposta no fórum — <strong>+3</strong></li>
            <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> Novo tópico no fórum — <strong>+5</strong></li>
            <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> Artigo no blog — <strong>+10</strong></li>
            <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> Cada mês de cadastro — <strong>+10</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Controles de upload/remocao de avatar. variant="royal" usa cor amber pro layout passaporte.
const AvatarControls = ({ hasAvatar, isUploading, onPick, onRemove, variant }) => {
  const isRoyal = variant === 'royal';
  const btnBase = 'inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const primary = isRoyal
    ? 'bg-yellow-500/20 text-yellow-100 hover:bg-yellow-500/30 border border-yellow-400/40'
    : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20';
  const danger = isRoyal
    ? 'text-red-300 hover:text-red-200 hover:bg-red-500/10'
    : 'text-destructive hover:bg-destructive/10';

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        type="button"
        onClick={onPick}
        disabled={isUploading}
        className={`${btnBase} ${primary}`}
        title={hasAvatar ? 'Trocar foto' : 'Adicionar foto (opcional)'}
      >
        {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
        {hasAvatar ? 'Trocar' : 'Foto'}
      </button>
      {hasAvatar && (
        <button
          type="button"
          onClick={onRemove}
          disabled={isUploading}
          className={`${btnBase} ${danger}`}
          title="Remover foto"
        >
          <Trash2 className="h-3 w-3" />
          Remover
        </button>
      )}
    </div>
  );
};

const Stat = ({ label, value, subtle }) => (
  <div className="text-center md:text-left">
    <div className="text-xs uppercase tracking-wider opacity-60 mb-1">{label}</div>
    <div className="text-xl font-bold">{value}</div>
    {subtle && <div className="text-[10px] opacity-50 mt-0.5">{subtle}</div>}
  </div>
);

export default ProfilePage;
