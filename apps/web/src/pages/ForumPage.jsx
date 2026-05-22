
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquarePlus, Clock, MessageCircle } from 'lucide-react';
import HotmartCTAWidget from '@/components/HotmartCTAWidget.jsx';
import AdSlot from '@/components/AdSlot.jsx';
import ThreadForm from '@/components/ThreadForm.jsx';

const ForumPage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, posts] = await Promise.all([
          pb.collection('categories').getFullList({ sort: 'name', $autoCancel: false }),
          pb.collection('posts').getList(1, 20, { 
            sort: '-created', 
            expand: 'category,author',
            $autoCancel: false 
          })
        ]);
        setCategories(cats);
        setThreads(posts.items);
      } catch (err) {
        console.error('Error fetching forum data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleThreadCreated = (newThread) => {
    setShowForm(false);
    navigate(`/comunidade/t/${newThread.id}`);
  };

  return (
    <div className="bg-[hsl(var(--community-bg))] min-h-screen py-12">
      <Helmet>
        <title>Fórum de Discussões | Do Brasil para a Espanha</title>
        <meta name="description" content="Participe do fórum e tire suas dúvidas sobre imigração, vistos, e a vida na Espanha." />
      </Helmet>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">Fórum</h1>
              <Button 
                onClick={() => session ? setShowForm(!showForm) : navigate('/regras-comunidade')} // Temporary redirect for auth if needed, but Header handles auth
                className="hidden sm:flex"
                disabled={!session}
                title={!session ? 'Faça login para criar tópico' : ''}
              >
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                Criar Tópico
              </Button>
            </div>

            {showForm && session ? (
              <div className="mb-8">
                <ThreadForm onSuccess={handleThreadCreated} onCancel={() => setShowForm(false)} />
              </div>
            ) : null}

            {/* Categories Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Link to="/comunidade/c/todas" className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                Todas
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/comunidade/c/${cat.slug}`}
                  className="px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 text-sm font-medium transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Threads List */}
            <div className="space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl bg-muted" />
                ))
              ) : threads.length > 0 ? (
                threads.map((thread, index) => (
                  <React.Fragment key={thread.id}>
                    <Link to={`/comunidade/t/${thread.id}`} className="block group">
                      <div className="p-5 rounded-xl bg-[hsl(var(--forum-card))] border hover:border-primary/50 transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {thread.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {new Date(thread.created).toLocaleDateString('pt-BR')}
                              </span>
                              <span>•</span>
                              <span>{thread.expand?.author?.name || 'Usuário'}</span>
                              <span>•</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-muted">
                                {thread.expand?.category?.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">{thread.replies_count || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Inject Ad every 8 threads */}
                    {(index + 1) % 8 === 0 && (
                      <div className="my-4">
                        <AdSlot slot={`forum-list-${index}`} format="fluid" />
                      </div>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-[hsl(var(--forum-card))] rounded-xl border">
                  Nenhum tópico encontrado.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            <Button 
              onClick={() => session ? setShowForm(!showForm) : alert('Faça login para criar tópico')}
              className="w-full sm:hidden mb-4"
              disabled={!session}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Criar Tópico
            </Button>
            
            <HotmartCTAWidget />
            
            <div className="sticky top-24">
              <AdSlot slot="forum-sidebar" format="vertical" />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ForumPage;
