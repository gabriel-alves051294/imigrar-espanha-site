
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import pb from '@/lib/pocketbase.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import ChatInput from '@/components/ChatInput.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const ChatRoom = () => {
  const { slug } = useParams();
  const roomName = slug || 'geral';
  const { session } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const records = await pb.collection('chat_messages').getList(1, 50, {
          filter: `room="${roomName}"`,
          sort: '-created',
          expand: 'author',
          $autoCancel: false
        });
        setMessages(records.items.reverse());
      } catch (err) {
        console.error('Error fetching chat:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    pb.collection('chat_messages').subscribe('*', async (e) => {
      if (e.action === 'create' && e.record.room === roomName) {
        const newMessage = await pb.collection('chat_messages').getOne(e.record.id, { expand: 'author', $autoCancel: false });
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => pb.collection('chat_messages').unsubscribe('*');
  }, [roomName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-layout">
      <Helmet>
        <title>Chat {roomName.toUpperCase()} | Comunidade</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Messages Area */}
      <div className="overflow-y-auto p-4 md:p-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="text-center py-4 mb-4 border-b">
            <h1 className="text-xl font-bold">Sala: {roomName.toUpperCase()}</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo ao chat em tempo real. Respeite as regras.</p>
          </div>

          {isLoading ? (
            Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-3/4 rounded-xl" />)
          ) : messages.length > 0 ? (
            messages.map((msg) => {
              const isMe = session?.id === msg.author;
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <Avatar className="h-8 w-8 shrink-0 mt-1">
                    <AvatarFallback className="text-[10px]">{msg.expand?.author?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-muted-foreground mb-1 ml-1">{msg.expand?.author?.name || 'Usuário'}</span>
                    <div className={`px-4 py-2 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-muted-foreground mt-10">Nenhuma mensagem ainda. Seja o primeiro!</div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-4xl mx-auto pb-4 px-4">
        {session ? (
          <ChatInput room={roomName} />
        ) : (
          <div className="p-4 bg-muted text-center rounded-xl border border-border/50">
            <p className="text-muted-foreground text-sm">Entre na sua conta para participar do chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
