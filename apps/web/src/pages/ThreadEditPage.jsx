import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, ChevronLeft } from 'lucide-react';

const ThreadEditPage = () => {
  const { id } = useParams();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [thread, setThread] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const record = await pb.collection('posts').getOne(id, {
          expand: 'author,category',
          $autoCancel: false,
        });

        // Validação de permissão: só autor ou admin
        const isAuthor = session?.id === record.author;
        const isAdmin = session?.role === 'admin' || session?.isAdmin === true;
        if (!isAuthor && !isAdmin) {
          toast.error('Sem permissão para editar este tópico.');
          navigate(`/comunidade/t/${id}`);
          return;
        }

        setThread(record);
        setTitle(record.title || '');
        setContent(record.content || '');
      } catch (err) {
        toast.error('Tópico não encontrado.');
        navigate('/comunidade/c/todas');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchThread();
    } else {
      navigate(`/comunidade/t/${id}`);
    }
  }, [id, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Título e conteúdo são obrigatórios.');
      return;
    }

    // Double-check permissão no save
    const isAuthor = session?.id === thread?.author;
    const isAdmin = session?.role === 'admin' || session?.isAdmin === true;
    if (!isAuthor && !isAdmin) {
      toast.error('Sem permissão para editar este tópico.');
      return;
    }

    setSubmitting(true);
    try {
      await pb.collection('posts').update(id, {
        title: title.trim(),
        content: content.trim(),
      }, { $autoCancel: false });

      toast.success('Tópico atualizado com sucesso!');
      navigate(`/comunidade/t/${id}`);
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
    <div className="bg-[hsl(var(--community-bg))] min-h-screen py-12">
      <Helmet>
        <title>Editar tópico | Fórum</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container max-w-4xl mx-auto px-4">
        <Link
          to={`/comunidade/t/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para o tópico
        </Link>

        <h1 className="text-3xl font-bold mb-2">Editar tópico</h1>
        <p className="text-muted-foreground mb-8">Atualize o título ou conteúdo do seu tópico.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              required
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
              rows={10}
              required
              className="min-h-[200px] bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground text-right">{content.length}/5000</p>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={() => navigate(`/comunidade/t/${id}`)}>
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

export default ThreadEditPage;
