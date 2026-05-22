// ────────────────────────────────────────────────────────────────────
// BlogEditorPage — formulário de criação de blog post para usuários
// logados (rota protegida por <RequireAuth>).
//
// Fluxo:
//   1) Usuário preenche título, resumo, conteúdo (TipTap) e imagem opcional.
//   2) Slug é derivado do título (kebab-case, único checado server-side).
//   3) Upload é multipart (porque tem file): título/conteúdo passam pelo
//      hook de moderação Perspective server-side.
//   4) Sucesso → redireciona para /blog/<slug>.
//
// Schema usado (collection blog_posts):
//   title (text) · slug (text) · content (text/HTML) · excerpt (text) ·
//   author (relation→profiles) · featured_image (file) · views (number)
// ────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor.jsx';

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);

const BlogEditorPage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || content === '<p></p>') {
      toast.error('Título e conteúdo são obrigatórios.');
      return;
    }
    setSubmitting(true);
    try {
      const baseSlug = slugify(title) || `post-${Date.now()}`;
      const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('slug', slug);
      formData.append('content', content);
      formData.append('excerpt', excerpt.trim().substring(0, 280));
      formData.append('author', session.id);
      formData.append('views', 0);
      if (image) formData.append('featured_image', image);

      const record = await pb.collection('blog_posts').create(formData, { $autoCancel: false });
      toast.success('Post publicado!');
      navigate(`/blog/${record.slug}`);
    } catch (err) {
      const msg = err?.response?.message || err?.message || 'Falha ao publicar.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <Helmet>
        <title>Novo post | Blog</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Novo post</h1>
        <p className="text-muted-foreground mb-8">
          Compartilhe seu relato, dica ou análise sobre imigração. Conteúdo passa por moderação automática.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={140}
              placeholder="Ex: Como consegui meu visto FP em 90 dias"
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
              placeholder="Frase curta que aparece na listagem do blog."
            />
            <p className="text-xs text-muted-foreground text-right">{excerpt.length}/280</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagem de capa (opcional, JPG/PNG/WebP até 20MB)</Label>
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
            <Button type="button" variant="outline" onClick={() => navigate('/blog')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Publicando...</>
              ) : (
                <><Save className="h-4 w-4 mr-2" /> Publicar</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditorPage;
