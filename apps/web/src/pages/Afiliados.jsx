
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Euro
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Afiliados = () => {
  const joinLink = "https://affiliate.hotmart.com/affiliate-recruiting/view/2706B105769790";

  return (
    <>
      <Helmet>
        <title>Programa de Afiliados - Do Brasil para a Espanha</title>
        <meta name="description" content="Seja um afiliado do melhor guia de imigração para a Espanha. Altas comissões e material de divulgação completo." />
      </Helmet>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80 z-0"></div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[hsl(var(--spain-yellow))]/20 text-[hsl(var(--spain-yellow))] text-sm font-bold uppercase mb-6 border border-[hsl(var(--spain-yellow))]/30">
              <Users className="w-4 h-4" />
              Programa de Parceria
            </div>
            <h1 className="mb-6 text-4xl md:text-5xl font-extrabold text-white text-balance">
              Ajude brasileiros a realizarem o sonho europeu e seja bem pago por isso.
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
              Junte-se ao programa de afiliados do Guia "Do Brasil para a Espanha" e ganhe comissões atrativas em um nicho de alta demanda.
            </p>
            <Button 
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-[0_0_20px_hsla(var(--secondary),0.4)] text-lg px-8 py-6 transition-all duration-300"
              asChild
            >
              <a href={joinLink} target="_blank" rel="noopener noreferrer">
                Quero Me Tornar Afiliado <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Prominent Kit Afiliados Section */}
      <section className="py-12 bg-muted/30 border-b border-border/50">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              size="lg" 
              asChild 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              <Link to="/kit-afiliados">
                Acessar Kit Completo de Materiais
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Dúvidas sobre o programa? Entre em contato: <a href="mailto:contato@imigrarparaespanha.com.br" className="underline hover:text-primary transition-colors">contato@imigrarparaespanha.com.br</a>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-[hsl(var(--brazil-green))] mb-4" />
                  <CardTitle>Comissão Atrativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Você ganha <strong>R$ 29,68</strong> por cada venda confirmada de um produto que custa apenas R$ 67,00. Quase 50% de lucro direto na sua conta Hotmart.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Shield className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>Alta Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Página de vendas validada, copy testada e um ticket baixo que permite vendas por impulso. Um produto que resolve uma dor urgente do público.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Euro className="w-10 h-10 text-[hsl(var(--spain-red))] mb-4" />
                  <CardTitle>Cookie de 90 Dias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Se o cliente clicar no seu link hoje e comprar apenas daqui a 3 meses, a comissão ainda é sua. Rastreamento 100% seguro via Hotmart.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">Como funciona?</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                "Clique no botão para acessar a página de afiliação na Hotmart.",
                "Leia os termos e clique em 'Afiliar-se Agora' (Aprovação imediata).",
                "Acesse a seção 'Meus Links' na Hotmart para pegar suas URLs exclusivas.",
                "Acesse nosso Kit de Afiliados para baixar criativos, vídeos e textos prontos.",
                "Comece a divulgar e acompanhe suas comissões caindo pelo app da Hotmart."
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Afiliados;
