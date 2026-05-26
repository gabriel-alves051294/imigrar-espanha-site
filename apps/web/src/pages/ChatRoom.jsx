
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import ChatInput from '@/components/ChatInput.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import RankedAvatar from '@/components/RankedAvatar.jsx';
import RankBadge from '@/components/RankBadge.jsx';
import { computeRank } from '@/lib/rank.js';

const ChatRoom = () => {
  const { slug } = useParams();
  const roomName = slug || 'geral';
  const { session } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  // TTL visual — mensagens > 6h somem do chat (clean look). Backend mantem
  // historico pra preservar pontos ja contabilizados.
  const TTL_HOURS = 6;
  const TTL_MS = TTL_HOURS * 60 * 60 * 1000;
  const isFresh = (createdISO) => (Date.now() - new Date(createdISO).getTime()) < TTL_MS;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Filtro server-side: traz apenas msgs das ultimas 6h pra economizar payload
        const sinceIso = new Date(Date.now() - TTL_MS).toISOString().replace('T', ' ');
        const records = await pb.collection('chat_messages').getList(1, 50, {
          filter: `room="${roomName}" && created >= "${sinceIso}"`,
          sort: '-created',
          expand: 'author',
          $autoCancel: false
        });
        setMessages(records.items.reverse());
      } catch (err) {
        console.error('Error fetching chat:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    pb.collection('chat_messages').subscribe('*', async (e) => {
      if (e.action === 'create' && e.record.room === roomName) {
        const newMessage = await pb.collection('chat_messages').getOne(e.record.id, { expand: 'author', $autoCancel: false });
        setMessages(prev => [...prev, newMessage]);
      }
      // Remove instantaneamente do DOM se moderacao deletou
      if (e.action === 'delete') {
        setMessages(prev => prev.filter(m => m.id !== e.record.id));
      }
    });

    // Sweep periodico: a cada 60s remove msgs que passaram do TTL local
    const sweepId = setInterval(() => {
      setMessages(prev => prev.filter(m => isFresh(m.created)));
    }, 60 * 1000);

    return () => {
      pb.collection('chat_messages').unsubscribe('*');
      clearInterval(sweepId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-layout">
      <Helmet>
        <title>Chat {roomName.toUpperCase()} | Comunidade</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Messages Area */}
      <div className="overflow-y-auto p-4 md:p-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="text-center py-4 mb-4 border-b">
            <h1 className="text-xl font-bold">Sala: {roomName.toUpperCase()}</h1>
            <p className="text-sm text-muted-foreground">
              Conversa em tempo real — troque dicas, dúvidas e vitórias.
              Mensagens somem em 6h pra manter o chat leve.
            </p>
          </div>

          {isLoading ? (
            Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-3/4 rounded-xl" />)
          ) : messages.length > 0 ? (
            messages.map((msg) => {
              const isMe = session?.id === msg.author;
              const author = msg.expand?.author;
              const rank = computeRank(author);
              // Disparidade visual da bolha por tier
              const isGhost = rank.tier === 'imigrante';
              const isRoyal = rank.tier === 'cidadao';
              // Eleve, não rebaixe: o tier inicial ('imigrante') recebia bolha
              // cinza apagada que parecia "fantasma da sala" — exclusão social
              // codificada num produto que promete "espaço seguro". Trocado
              // por tom acolhedor verde-claro com tipografia normal.
              const nameClass = isRoyal
                ? 'text-yellow-600 dark:text-yellow-400 font-semibold drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]'
                : 'text-muted-foreground';
              const bubbleClass = isMe
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : isGhost
                ? 'bg-emerald-50 text-foreground border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50 rounded-tl-sm'
                : isRoyal
                ? 'bg-gradient-to-br from-yellow-100 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/20 text-foreground border border-yellow-400/40 rounded-tl-sm'
                : 'bg-muted text-foreground rounded-tl-sm';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className="mt-1">
                    <RankedAvatar profile={author} size={32} />
                  </div>
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-1.5 mb-1 ml-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-xs ${nameClass}`}>{author?.name || 'Usuário'}</span>
                      {author && <RankBadge profile={author} size="xs" showLabel={false} />}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${bubbleClass}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-muted-foreground mt-10">Nenhuma mensagem ainda. Seja o primeiro!</div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-4xl mx-auto pb-4 px-4">
        {session ? (
          <ChatInput room={roomName} />
        ) : (
          <div className="p-4 bg-muted text-center rounded-xl border border-border/50">
            <p className="text-muted-foreground text-sm">Entre na sua conta para participar do chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
