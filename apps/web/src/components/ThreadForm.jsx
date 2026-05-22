
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { moderateContent } from '@/lib/moderation.js';
import pb from '@/lib/pocketbase.js';
import { toast } from 'sonner';

const ThreadForm = ({ onSuccess, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    pb.collection('categories').getFullList({ sort: 'name', $autoCancel: false })
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const moderation = moderateContent(title + ' ' + content, [], pb.authStore.model?.id);
    
    if (!moderation.isValid) {
      setErrors(moderation.errors);
      setIsLoading(false);
      return;
    }

    try {
      const record = await pb.collection('posts').create({
        title,
        content,
        category,
        author: pb.authStore.model.id,
        replies_count: 0
      }, { $autoCancel: false });
      
      toast.success('Tópico criado com sucesso!');
      if (onSuccess) onSuccess(record);
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.message || err?.data?.message || err?.message;
      toast.error(serverMsg || 'Erro ao criar tópico. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">
      {errors.length > 0 && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg space-y-1">
          {errors.map((err, i) => <p key={i} className="text-sm font-medium">{err}</p>)}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="bg-background text-foreground">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título do Tópico</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Seja claro e específico..."
          className="bg-background text-foreground"
          maxLength={150}
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea 
          id="content" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Detalhe sua dúvida ou compartilhe sua experiência..."
          className="min-h-[200px] bg-background text-foreground"
          maxLength={5000}
          required 
        />
        <div className="text-xs text-muted-foreground text-right">
          {content.length}/5000
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isLoading || !category || !title || !content}>
          {isLoading ? 'Publicando...' : 'Publicar Tópico'}
        </Button>
      </div>
    </form>
  );
};

export default ThreadForm;
