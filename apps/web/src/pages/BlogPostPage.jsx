
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Calendar } from 'lucide-react';
import HotmartCTAWidget from '@/components/HotmartCTAWidget.jsx';
import AdSlot from '@/components/AdSlot.jsx';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('blog_posts').getFirstListItem(`slug="${slug}"`, {
          expand: 'author',
          $autoCancel: false
        });
        setPost(record);
        
        // Increment views safely (ignoring errors)
        pb.collection('blog_posts').update(record.id, { views: (record.views || 0) + 1 }, { $autoCancel: false }).catch(() => {});
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Skeleton className="h-12 w-3/4 mb-6 bg-muted" />
        <Skeleton className="h-[400px] w-full rounded-xl mb-8 bg-muted" />
        <Skeleton className="h-4 w-full mb-2 bg-muted" />
        <Skeleton className="h-4 w-5/6 bg-muted" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1>Artigo não encontrado</h1>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">Voltar para o Blog</Link>
      </div>
    );
  }

  // Handle simple HTML content safely and inject AdSlot
  const paragraphs = post.content.split('</p>');
  const firstHalf = paragraphs.slice(0, 2).join('</p>') + (paragraphs.length > 2 ? '</p>' : '');
  const secondHalf = paragraphs.slice(2).join('</p>');

  return (
    <div className="bg-background min-h-screen py-12">
      <Helmet>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para Artigos
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          <article className="flex-1">
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-balance leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground border-b border-border/50 pb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.expand?.author?.avatar ? pb.files.getUrl(post.expand.author, post.expand.author.avatar) : ''} />
                  <AvatarFallback>{post.expand?.author?.name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{post.expand?.author?.name || 'Equipe Editorial'}</div>
                  <div className="text-sm flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.created).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </header>

            {post.featured_image && (
              <div className="rounded-2xl overflow-hidden mb-10 border border-border/30">
                <img 
                  src={pb.files.getUrl(post, post.featured_image)} 
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
              <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
              
              {paragraphs.length > 2 && (
                <div className="my-10">
                  <AdSlot slot="blog-inline" format="in-article" />
                </div>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
            </div>
            
            <div className="mt-16 pt-8 border-t border-border">
               <AdSlot slot="blog-bottom" format="autorelaxed" />
            </div>
          </article>

          <aside className="w-full lg:w-80 space-y-8 shrink-0">
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

export default BlogPostPage;
