
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Clock, PenSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import HotmartCTAWidget from '@/components/HotmartCTAWidget.jsx';
import AdSlot from '@/components/AdSlot.jsx';

const BlogPage = () => {
  const { session } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('blog_posts').getList(1, 10, {
          sort: '-created',
          expand: 'author',
          $autoCancel: false
        });
        setPosts(records.items);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20">
      <Helmet>
        <title>Blog de Imigração | Do Brasil para a Espanha</title>
        <meta name="description" content="Artigos, dicas e atualizações sobre imigração legal para a Espanha via estudos." />
      </Helmet>

      <section className="bg-[hsl(var(--blog-accent))] text-white py-16 px-4 mb-8">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog de Imigração</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Informações oficiais, guias práticos e histórias para ajudar no seu planejamento.
            </p>
          </div>
          {session && (
            <Button asChild size="lg" variant="secondary" className="self-start md:self-end">
              <Link to="/blog/novo">
                <PenSquare className="h-4 w-4 mr-2" /> Escrever post
              </Link>
            </Button>
          )}
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <AdSlot slot="blog-hero-bottom" format="horizontal" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden border-border/50">
                  <Skeleton className="h-48 w-full rounded-none bg-muted" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4 bg-muted" />
                    <Skeleton className="h-20 w-full bg-muted" />
                  </CardContent>
                </Card>
              ))
            ) : (
              posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group h-full">
                  <Card className="h-full overflow-hidden border-border/50 hover:border-primary/40 transition-colors flex flex-col">
                    {post.featured_image ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={pb.files.getUrl(post, post.featured_image)} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Sem imagem</span>
                      </div>
                    )}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(post.created).toLocaleDateString('pt-BR')}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                        {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 120) + '...'}
                      </p>
                      <span className="text-primary font-medium text-sm mt-auto inline-block">Ler artigo completo →</span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>

          <aside className="w-full lg:w-80 space-y-8">
            <HotmartCTAWidget />
            <div className="sticky top-24">
              <AdSlot slot="blog-sidebar" format="vertical" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
