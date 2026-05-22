
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { moderateContent } from '@/lib/moderation.js';
import pb from '@/lib/pocketbase.js';
import { toast } from 'sonner';

const ReplyForm = ({ postId, onSuccess }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    const moderation = moderateContent(content, [], pb.authStore.model?.id);
    
    if (!moderation.isValid) {
      toast.error(moderation.errors[0]);
      setIsLoading(false);
      return;
    }

    try {
      await pb.collection('replies').create({
        content,
        post: postId,
        author: pb.authStore.model.id
      }, { $autoCancel: false });

      // replies_count is incremented by the PocketBase hook update_thread_stats.pb.js
      // (don't double-increment here).

      setContent('');
      toast.success('Resposta enviada!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.message || err?.data?.message || err?.message;
      toast.error(serverMsg || 'Erro ao enviar resposta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <Textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva sua resposta..."
        className="min-h-[120px] mb-4 bg-background text-foreground"
        maxLength={5000}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? 'Enviando...' : 'Responder'}
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
