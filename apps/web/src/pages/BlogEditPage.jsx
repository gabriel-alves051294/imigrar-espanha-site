import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, ChevronLeft } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor.jsx';

const BlogEditPage = () => {
  const { slug } = useParams();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('blog_posts').getFirstListItem(`slug="${slug}"`, {
          expand: 'author',
          $autoCancel: false,
        });

        // Validação de permissão: só autor ou admin
        const isAuthor = session?.id === record.author;
        const isAdmin = session?.role === 'admin' || session?.isAdmin === true;
        if (!isAuthor && !isAdmin) {
          toast.error('Sem permissão para editar este post.');
          navigate(`/blog/${slug}`);
          return;
        }

        setPost(record);
        setTitle(record.title || '');
        setExcerpt(record.excerpt || '');
        setContent(record.content || '');
      } catch (err) {
        toast.error('Post não encontrado.');
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchPost();
    } else {
      navigate('/blog');
    }
  }, [slug, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || content === '<p></p>') {
      toast.error('Título e conteúdo são obrigatórios.');
      return;
    }

    // Double-check permissão no momento do save
    const isAuthor = session?.id === post?.author;
    const isAdmin = session?.role === 'admin' || session?.isAdmin === true;
    if (!isAuthor && !isAdmin) {
      toast.error('Sem permissão para editar este post.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content);
      formData.append('excerpt', excerpt.trim().substring(0, 280));
      if (image) formData.append('featured_image', image);

      await pb.collection('blog_posts').update(post.id, formData, { $autoCancel: false });
      toast.success('Post atualizado com sucesso!');
      navigate(`/blog/${post.slug}`);
    } catch (err) {
      const msg = err?.response?.message || err?.message || 'Falha ao atualizar.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <Helmet>
        <title>Editar post | Blog</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container max-w-4xl mx-auto px-4">
        <Link to={`/blog/${slug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para o artigo
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Editar post</h1>
        <p className="text-muted-foreground mb-8">Atualize o conteúdo do seu artigo.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={140}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo (até 280 caracteres)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={280}
              rows={2}
            />
            <p className="text-xs text-muted-foreground text-right">{excerpt.length}/280</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">
              Nova imagem de capa (opcional — deixe em branco para manter a atual)
            </Label>
            {post?.featured_image && !image && (
              <div className="rounded-lg overflow-hidden border border-border/40 mb-2 max-w-xs">
                <img
                  src={pb.files.getUrl(post, post.featured_image)}
                  alt="Imagem atual"
                  className="w-full h-32 object-cover"
                />
                <p className="text-xs text-muted-foreground p-2">Imagem atual</p>
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Conteúdo *</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => navigate(`/blog/${slug}`)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Salvando...</>
              ) : (
                <><Save className="h-4 w-4 mr-2" /> Salvar alterações</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditPage;
