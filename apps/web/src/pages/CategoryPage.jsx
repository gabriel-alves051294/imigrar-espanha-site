
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, MessageCircle, ChevronLeft } from 'lucide-react';
import HotmartCTAWidget from '@/components/HotmartCTAWidget.jsx';
import AdSlot from '@/components/AdSlot.jsx';

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (slug !== 'todas') {
          const cat = await pb.collection('categories').getFirstListItem(`slug="${slug}"`, { $autoCancel: false });
          setCategory(cat);
          
          const posts = await pb.collection('posts').getList(1, 30, {
            filter: `category="${cat.id}"`,
            sort: '-created',
            expand: 'author',
            $autoCancel: false
          });
          setThreads(posts.items);
        } else {
          setCategory({ name: 'Todas as Categorias', description: 'Navegue por todos os tópicos' });
          const posts = await pb.collection('posts').getList(1, 30, {
            sort: '-created',
            expand: 'category,author',
            $autoCancel: false
          });
          setThreads(posts.items);
        }
      } catch (err) {
        console.error('Error fetching category:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div className="bg-[hsl(var(--community-bg))] min-h-screen py-12">
      <Helmet>
        <title>{category ? `${category.name} - Fórum` : 'Carregando...'} | Do Brasil para a Espanha</title>
      </Helmet>

      <div className="container max-w-7xl mx-auto px-4">
        <Link to="/comunidade" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para Comunidade
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {isLoading ? (
              <div className="mb-8 space-y-4">
                <Skeleton className="h-10 w-1/3 bg-muted" />
                <Skeleton className="h-4 w-1/2 bg-muted" />
              </div>
            ) : (
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{category?.name}</h1>
                {category?.description && (
                  <p className="text-lg text-muted-foreground">{category.description}</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl bg-muted" />)
              ) : threads.length > 0 ? (
                threads.map((thread) => (
                  <Link key={thread.id} to={`/comunidade/t/${thread.id}`} className="block group">
                    <div className="p-5 rounded-xl bg-[hsl(var(--forum-card))] border hover:border-primary/50 transition-all">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {thread.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {new Date(thread.created).toLocaleDateString('pt-BR')}
                            </span>
                            <span>•</span>
                            <span>{thread.expand?.author?.name || 'Usuário'}</span>
                            {slug === 'todas' && thread.expand?.category && (
                              <>
                                <span>•</span>
                                <span className="px-2 py-0.5 rounded text-xs bg-muted">
                                  {thread.expand.category.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{thread.replies_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-[hsl(var(--forum-card))] rounded-xl border">
                  Nenhum tópico nesta categoria ainda.
                </div>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <HotmartCTAWidget />
            <div className="sticky top-24">
              <AdSlot slot="category-sidebar" format="vertical" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
