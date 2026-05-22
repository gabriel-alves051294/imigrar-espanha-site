
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, MessagesSquare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AdSlot from '@/components/AdSlot.jsx';

const CommunityPage = () => {
  return (
    <div className="bg-[hsl(var(--community-bg))] min-h-screen pb-20">
      <Helmet>
        <title>Comunidade | Do Brasil para a Espanha</title>
        <meta name="description" content="Conecte-se com outros brasileiros, tire dúvidas no fórum, leia nosso blog e participe do chat ao vivo." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Bem-vindo à Comunidade
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            O espaço seguro para compartilhar experiências, tirar dúvidas e construir sua jornada rumo à Espanha.
          </p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto mt-[-40px] relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 bg-[hsl(var(--forum-card))] border-border flex flex-col h-full">
            <CardHeader className="pb-4">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-2xl">Fórum de Discussões</CardTitle>
              <CardDescription className="text-base">
                Pergunte, responda e pesquise tópicos sobre vistos, moradia, custo de vida e estudos.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <Link to="/comunidade/c/todas" className="text-primary font-medium flex items-center hover:underline">
                Acessar Fórum <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 bg-[hsl(var(--forum-card))] border-border flex flex-col h-full">
            <CardHeader className="pb-4">
              <FileText className="h-10 w-10 text-secondary mb-4" />
              <CardTitle className="text-2xl">Blog de Imigração</CardTitle>
              <CardDescription className="text-base">
                Artigos detalhados, novidades da lei de estrangeiria e histórias reais de sucesso.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <Link to="/blog" className="text-secondary font-medium flex items-center hover:underline">
                Ler Artigos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 bg-[hsl(var(--forum-card))] border-border flex flex-col h-full">
            <CardHeader className="pb-4">
              <MessagesSquare className="h-10 w-10 text-[hsl(var(--spain-red))] mb-4" />
              <CardTitle className="text-2xl">Chat ao Vivo</CardTitle>
              <CardDescription className="text-base">
                Converse em tempo real com outros membros que estão no mesmo processo que você.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <Link to="/comunidade/chat" className="text-[hsl(var(--spain-red))] font-medium flex items-center hover:underline">
                Entrar no Chat <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <AdSlot slot="hero-bottom" />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
