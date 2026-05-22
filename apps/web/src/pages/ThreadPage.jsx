
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, ChevronLeft } from 'lucide-react';
import HotmartCTAWidget from '@/components/HotmartCTAWidget.jsx';
import AdSlot from '@/components/AdSlot.jsx';
import ReplyForm from '@/components/ReplyForm.jsx';

const ThreadPage = () => {
  const { id } = useParams();
  const { session } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const post = await pb.collection('posts').getOne(id, {
          expand: 'author,category',
          $autoCancel: false
        });
        setThread(post);

        const threadReplies = await pb.collection('replies').getFullList({
          filter: `post="${id}"`,
          sort: 'created',
          expand: 'author',
          $autoCancel: false
        });
        setReplies(threadReplies);
      } catch (err) {
        console.error('Error fetching thread:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();

    // Realtime subscription for new replies
    pb.collection('replies').subscribe('*', async (e) => {
      if (e.action === 'create' && e.record.post === id) {
        const newReply = await pb.collection('replies').getOne(e.record.id, { expand: 'author', $autoCancel: false });
        setReplies(prev => [...prev, newReply]);
      }
    });

    return () => pb.collection('replies').unsubscribe('*');
  }, [id]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-12 px-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="container py-20 text-center">
        <h2>Tópico não encontrado</h2>
        <Link to="/comunidade" className="text-primary hover:underline mt-4 inline-block">Voltar</Link>
      </div>
    );
  }

  // Split content to insert AdSlot
  const paragraphs = thread.content.split('\n\n');
  const contentFirstPart = paragraphs.slice(0, 2).join('\n\n');
  const contentSecondPart = paragraphs.slice(2).join('\n\n');

  return (
    <div className="bg-[hsl(var(--community-bg))] min-h-screen py-12">
      <Helmet>
        <title>{thread.title} | Fórum</title>
        <meta name="description" content={thread.content.substring(0, 150)} />
      </Helmet>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Link to={`/comunidade/c/${thread.expand?.category?.slug || 'todas'}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para {thread.expand?.category?.name || 'Fórum'}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Original Post */}
            <div className="bg-[hsl(var(--forum-card))] rounded-xl border p-6 md:p-8 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">{thread.title}</h1>
              
              <div className="flex items-center gap-4 mb-8 border-b pb-6">
                <Avatar className="h-12 w-12 rounded-xl">
                  <AvatarImage src={thread.expand?.author?.avatar ? pb.files.getUrl(thread.expand.author, thread.expand.author.avatar) : ''} />
                  <AvatarFallback className="rounded-xl">{thread.expand?.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{thread.expand?.author?.name || 'Usuário'}</div>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <Clock className="h-3 w-3" />
                    {new Date(thread.created).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap">
                {contentFirstPart}
                
                {paragraphs.length > 2 && (
                  <div className="my-8">
                    <AdSlot slot="thread-inline" format="in-article" />
                  </div>
                )}
                
                {contentSecondPart}
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">{replies.length} Respostas</h3>
              
              {replies.map((reply) => (
                <div key={reply.id} className="bg-[hsl(var(--forum-card))] rounded-xl border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg text-xs">{reply.expand?.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{reply.expand?.author?.name || 'Usuário'}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(reply.created).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-foreground whitespace-pre-wrap">
                    {reply.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            {session ? (
              <ReplyForm postId={thread.id} />
            ) : (
              <div className="mt-8 p-6 bg-muted rounded-xl text-center border">
                <p className="text-muted-foreground mb-4">Faça login para responder a este tópico.</p>
                {/* Trigger auth modal via context/header state if possible, or link */}
              </div>
            )}

            <div className="mt-12">
              <AdSlot slot="thread-bottom" format="autorelaxed" />
            </div>
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <HotmartCTAWidget />
            <div className="sticky top-24">
              <AdSlot slot="thread-sidebar" format="vertical" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
