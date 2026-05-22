
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { moderateContent } from '@/lib/moderation.js';
import pb from '@/lib/pocketbase.js';
import { toast } from 'sonner';

const ChatInput = ({ room = 'general' }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    const moderation = moderateContent(message, [], pb.authStore.model?.id);
    if (!moderation.isValid) {
      toast.error(moderation.errors[0]);
      return;
    }

    setIsSending(true);
    try {
      await pb.collection('chat_messages').create({
        content: message.trim(),
        room,
        author: pb.authStore.model.id
      }, { $autoCancel: false });
      setMessage('');
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.message || err?.data?.message || err?.message;
      toast.error(serverMsg || 'Erro ao enviar mensagem.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 p-4 border-t bg-card shrink-0">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite uma mensagem..."
        className="flex-1 bg-background text-foreground"
        maxLength={500}
        disabled={isSending}
      />
      <Button type="submit" size="icon" disabled={!message.trim() || isSending}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
