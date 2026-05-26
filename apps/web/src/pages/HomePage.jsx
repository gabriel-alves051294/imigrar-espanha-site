
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle,
  FileText, 
  Mail, 
  Shield,
  Euro,
  Calculator,
  Target,
  Users,
  Sparkles,
  Gift,
  Clock4,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import TestimonialsSection from '@/components/TestimonialsSection.jsx';
import GuaranteeSection from '@/components/GuaranteeSection.jsx';
import AdSlot from '@/components/AdSlot.jsx';
// StickyCTA e MobileStickyBar agora são renderizados globalmente em App.jsx
// para cobrir também /sobre, /afiliados, /blog, /comunidade.

const HomePage = () => {
  const [courseDuration, setCourseDuration] = useState('1');
  const [dependents, setDependents] = useState('0');

  const calculateMinimumAmount = () => {
    const iprem = 600;
    const baseAmount = courseDuration === '1' ? 7200 : 14400;
    const dependentsAmount = parseInt(dependents) * iprem;
    return baseAmount + dependentsAmount;
  };

  const minimumAmount = calculateMinimumAmount();
  const hotmartLink = "https://pay.hotmart.com/E105769769S?checkoutMode=10";

  // Structured data — Product + FAQPage + Organization. Habilita rich results no Google
  // (preço, garantia, FAQ accordion direto na SERP). Zero impacto em backend.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Guia Premium — Do Brasil para a Espanha",
    "description": "Guia prático de 46 páginas para imigração legal do Brasil para a Espanha via FP de Grado Superior. Permissão automática para trabalhar e caminho para cidadania europeia em 2 anos.",
    "brand": { "@type": "Brand", "name": "Do Brasil para a Espanha" },
    "image": "https://imigrarparaespanha.com.br/guia-capa.png",
    "offers": {
      "@type": "Offer",
      "url": hotmartLink,
      "priceCurrency": "BRL",
      "price": "67.00",
      "availability": "https://schema.org/InStock",
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "BR",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Você é advogado de imigração?", "acceptedAnswer": { "@type": "Answer", "text": "Não somos advogados de imigração. O guia é um manual prático baseado nas leis oficiais do governo espanhol, estruturado de forma didática a partir de dezenas de casos validados." } },
      { "@type": "Question", "name": "Funciona para quem tem mais de 40 anos?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. A Espanha não impõe limite de idade para Formação Profissional. Para quem tem filhos, o processo exige passo extra na comprovação financeira (detalhado no guia)." } },
      { "@type": "Question", "name": "E se as leis mudarem no meio do processo?", "acceptedAnswer": { "@type": "Answer", "text": "Você recebe 1 ano de atualizações gratuitas. Quando o BOE publica mudanças, enviamos a versão atualizada do guia para o seu e-mail." } },
      { "@type": "Question", "name": "Funciona para quem não fala espanhol fluente?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. O consulado não exige certificado de idioma para o visto de FP. O guia inclui modelos prontos em espanhol para contato com escolas." } },
      { "@type": "Question", "name": "Qual o tempo de acesso após a compra?", "acceptedAnswer": { "@type": "Answer", "text": "Imediato. No mesmo segundo da aprovação do Pix ou cartão, a Hotmart envia o e-mail com login para download do PDF." } },
      { "@type": "Question", "name": "Qual a política de reembolso?", "acceptedAnswer": { "@type": "Answer", "text": "30 dias de garantia incondicional pela Hotmart. Solicite o estorno em um clique na própria plataforma e devolvemos 100% do valor." } }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Do Brasil para a Espanha - Guia Completo de Imigração Legal 2026</title>
        <meta
          name="description"
          content="Guia completo para imigração legal do Brasil para a Espanha via FP de Grado Superior. Permissão automática de trabalho 30h/semana e cidadania europeia em 2 anos."
        />
        <link rel="canonical" href="https://imigrarparaespanha.com.br" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section 
        className="relative min-h-[100dvh] flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(https://images.unsplash.com/photo-1703540918559-2ac64d38b6c8)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] to-transparent opacity-60 pointer-events-none mix-blend-multiply"></div>
        
        <div className="container py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* initial={false} = renderiza o estado final imediatamente.
                Evita "tela escura" no above-the-fold em conexões lentas,
                prefers-reduced-motion, scrapes e screenshots. */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--trust))/0.2] text-[hsl(var(--trust))] border border-[hsl(var(--trust))/30] text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  Atualizado para 2026
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium">
                  <Users className="h-4 w-4" />
                  Manual completo · 46 páginas
                </span>
              </div>

              <h1 className="text-white mb-4 leading-tight">
                Sua vida na Espanha começa por uma decisão simples.
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                O guia que substitui R$10 mil de assessoria pelo passo a passo do visto de estudante FP
                <span className="text-white/70"> (Formação Profissional)</span>{' '}— com permissão automática para trabalhar
                e caminho para cidadania europeia em 2 anos. Atualizado para 2026.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-[0_0_20px_hsla(var(--secondary),0.4)] text-lg px-8 py-6 transition-all duration-300 active:scale-[0.98]"
                  asChild
                >
                  <a href={hotmartLink} target="_blank" rel="noopener noreferrer">Quero meu guia · R$67</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-[0.98]"
                  asChild
                >
                  <a href="#sobre-guia">Ver o que está incluído</a>
                </Button>
              </div>
              <p className="text-sm text-white/60 flex flex-col gap-1 mt-3">
                <span>Pagamento em segundos via Pix ou cartão (até 9x) processado pela Hotmart · 30 dias de garantia · Acesso imediato.</span>
              </p>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-first lg:order-last relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--secondary))] to-[hsl(var(--primary))] blur-3xl opacity-30 rounded-full"></div>
              <img 
                src="/guia-capa.png"
                alt="Guia Completo - Imigração para Espanha com Visto de Estudante"
                loading="eager"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl relative z-10 border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500 h-auto"
              />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--brazil-green))] via-[hsl(var(--spain-yellow))] to-[hsl(var(--spain-red))] opacity-80" />
      </section>

      <div className="container mt-8">
        <AdSlot slot="home-top" />
      </div>

      {/* Para quem este guia é (e para quem NÃO é) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Para quem este guia é (e para quem NÃO é)</h2>
            <p className="text-lg text-muted-foreground">Transparência total antes de você tomar sua decisão.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-green-800 dark:text-green-400">É para você se...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Você quer imigrar legalmente, não como turista esticando estadia",
                    "Você tem entre 18 e 60 anos e está disposto a estudar FP",
                    "Você quer trabalhar legalmente na Espanha desde o primeiro dia",
                    "Você prefere economizar R$8-15 mil de assessoria e fazer com método próprio",
                    "Você quer cidadania europeia em 2 anos de residência legal"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-red-800 dark:text-red-400">NÃO é para você se...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Você procura visto de trabalho com oferta de emprego prévia",
                    "Você não tem como comprovar €7.200/ano para o consulado",
                    "Você quer atalhos ou caminhos informais",
                    "Você espera que alguém faça tudo por você sem nenhum esforço seu"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Simulator Section */}
      <section id="simulador" className="py-16 bg-muted relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="mb-4">Simulador Financeiro Espanha 2026</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calcule o valor mínimo que você precisa comprovar ao governo espanhol
              </p>
            </div>

            <Card className="shadow-lg border-0 border-l-4 border-r-4 border-l-[hsl(var(--brazil-green))] border-r-[hsl(var(--spain-red))] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brazil-green))] to-[hsl(var(--spain-red))] opacity-[0.02] pointer-events-none"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  Configure sua situação
                </CardTitle>
                <CardDescription>
                  Baseado no IPREM vigente em 2026 (publicado pela LPGE 2025): €600/mês. Atualizamos automaticamente quando o BOE publicar o IPREM 2026.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duração do curso</label>
                    <Select value={courseDuration} onValueChange={setCourseDuration}>
                      <SelectTrigger className="text-foreground bg-background border-border focus:ring-primary/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 ano</SelectItem>
                        <SelectItem value="2">2 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Número de dependentes</label>
                    <Select value={dependents} onValueChange={setDependents}>
                      <SelectTrigger className="text-foreground bg-background border-border focus:ring-primary/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 dependentes</SelectItem>
                        <SelectItem value="1">1 dependente</SelectItem>
                        <SelectItem value="2">2 dependentes</SelectItem>
                        <SelectItem value="3">3+ dependentes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[hsl(var(--brazil-yellow))] to-[hsl(var(--spain-yellow))]"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Valor mínimo a comprovar</span>
                    <Euro className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-4">
                    €{minimumAmount.toLocaleString('pt-BR')}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Base ({courseDuration} {courseDuration === '1' ? 'ano' : 'anos'}):</span>
                      <span className="font-medium">€{(courseDuration === '1' ? 7200 : 14400).toLocaleString('pt-BR')}</span>
                    </p>
                    {parseInt(dependents) > 0 && (
                      <p className="flex justify-between">
                        <span>Dependentes ({dependents}):</span>
                        <span className="font-medium">€{(parseInt(dependents) * 600).toLocaleString('pt-BR')}</span>
                      </p>
                    )}
                    <div className="border-t border-border/60 pt-2 mt-2">
                      <p className="text-xs opacity-80">
                        Fórmula: {courseDuration === '1' ? '€7.200' : '€14.400'} (base) + €600 por dependente
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA contextual — converte o pico de engajamento do simulador.
                    Antes o usuário via o valor e saía sem ação possível. */}
                <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-sm text-foreground/90 flex-1">
                    Esse é o valor que o consulado vai exigir. O guia mostra <strong>exatamente como comprovar</strong>{' '}
                    (extrato, carta de patrocínio, conversão BRL→EUR) — sem refazer documento por erro de formato.
                  </p>
                  <Button
                    asChild
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 whitespace-nowrap"
                  >
                    <a href={hotmartLink} target="_blank" rel="noopener noreferrer">
                      Quero meu guia · R$67
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Comparativo Section */}
      <section className="py-16 md:py-24 bg-background border-t border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Comparativo: 3 caminhos para imigrar legalmente</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entenda os riscos e custos de cada opção antes de tomar sua decisão.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-10">
            {/* Mobile Carousel */}
            <div className="block md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <Card className="h-full flex flex-col border-border/60 shadow-sm">
                      <CardHeader className="bg-muted/30 pb-6">
                        <CardTitle className="text-xl text-center">Fazer sozinho</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex-1 space-y-4">
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Custo:</span> <strong>R$ 0</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>6-12 meses</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-red-500">Alto</strong></p>
                        <div className="pt-4 border-t border-border/60">
                          <p className="text-sm text-muted-foreground italic">Sem templates validados, sem checklist atualizado, e pesquisando em fóruns desatualizados. Alta chance de visto negado por detalhe bobo.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="h-full flex flex-col bg-muted/20 border-muted-foreground/30 shadow-sm">
                      <CardHeader className="bg-muted/40 pb-6">
                        <CardTitle className="text-xl text-center">Contratar assessoria</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex-1 space-y-4">
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Custo:</span> <strong className="text-red-500">R$ 8.000 a 15.000</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>2-3 meses</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-orange-500">De golpe</strong></p>
                        <div className="pt-4 border-t border-border/60">
                          <p className="text-sm text-muted-foreground italic">Você se torna totalmente dependente de terceiros que cobram preços absurdos por um processo administrativo que você mesmo deve assinar.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="h-full flex flex-col border-secondary shadow-lg relative overflow-hidden ring-1 ring-secondary/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none"></div>
                      <CardHeader className="bg-secondary text-secondary-foreground pb-6">
                        <CardTitle className="text-xl text-center">Guia Premium</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex-1 space-y-4 relative z-10">
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Custo:</span> <strong className="text-secondary font-bold text-lg">R$ 67</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>2-4 semanas para preparar tudo</strong></p>
                        <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-green-600">Método validado</strong></p>
                        <div className="pt-4 border-t border-border/60">
                          <p className="text-sm font-medium">Você no controle total. Passo a passo prático com checklists oficiais, modelos de cartas aprovados e economia real.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <CarouselPrevious className="relative static translate-x-0 translate-y-0" />
                  <CarouselNext className="relative static translate-x-0 translate-y-0" />
                </div>
              </Carousel>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
              <Card className="h-full flex flex-col border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/30 pb-6 text-center">
                  <CardTitle className="text-xl">Fazer sozinho</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Custo:</span> <strong>R$ 0</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>6-12 meses</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-red-500">Alto</strong></p>
                    <div className="pt-4 mt-auto border-t border-border/60">
                      <p className="text-sm text-muted-foreground italic">Sem templates validados, sem checklist atualizado, e pesquisando em fóruns desatualizados. Alta chance de visto negado por detalhe bobo.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col bg-muted/20 border-muted-foreground/30 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/40 pb-6 text-center">
                  <CardTitle className="text-xl">Contratar assessoria</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Custo:</span> <strong className="text-red-500">R$ 8.000 a 15.000</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>2-3 meses</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-orange-500">De golpe</strong></p>
                    <div className="pt-4 mt-auto border-t border-border/60">
                      <p className="text-sm text-muted-foreground italic">Você se torna totalmente dependente de terceiros que cobram preços absurdos por um processo administrativo que você mesmo deve assinar.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full flex flex-col border-secondary shadow-xl relative overflow-hidden ring-2 ring-secondary/50 scale-105 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none"></div>
                <CardHeader className="bg-secondary text-secondary-foreground pb-6 text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-secondary text-xs font-bold px-3 py-1 rounded-b-md shadow-sm">
                    ESCOLHA INTELIGENTE
                  </div>
                  <CardTitle className="text-xl mt-3">Guia Premium</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col relative z-10">
                  <div className="space-y-4 flex-1">
                    <p className="flex justify-between text-base"><span className="text-muted-foreground font-medium">Custo:</span> <strong className="text-secondary font-extrabold text-xl">R$ 67</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Tempo:</span> <strong>2-4 semanas</strong></p>
                    <p className="flex justify-between text-sm"><span className="text-muted-foreground">Risco:</span> <strong className="text-green-600">Método validado</strong></p>
                    <div className="pt-4 mt-auto border-t border-border/60">
                      <p className="text-sm font-medium">Você no controle total. Passo a passo prático com checklists oficiais, modelos de cartas aprovados e economia real.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-[0_0_20px_hsla(var(--secondary),0.4)] text-lg px-8 py-6 transition-all duration-300"
              asChild
            >
              <a href={hotmartLink} target="_blank" rel="noopener noreferrer">Quero meu guia · R$67</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="sobre-guia" className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="mb-4">O que você vai encontrar no Guia Premium</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Um manual prático de 46 páginas, direto ao ponto, desenhado para aprovação do seu visto sem depender de agências.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Checklist à Prova de Falhas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Lista detalhada de todos os documentos exigidos pelo consulado. Saiba exatamente o que precisa ser apostilado (Haia) e o que exige tradução juramentada, evitando gastos desnecessários e atrasos no seu processo.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Templates Aprovados</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Modelos prontos de Carta de Motivação e Carta de Patrocínio Financeiro em espanhol, construídos a partir dos requisitos formais publicados pelo consulado. Basta preencher com seus dados — estrutura aprovada na primeira tentativa quando a documentação financeira é compatível.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Rota Mercurio (In Situ)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    O passo a passo completo para aplicar seu visto já estando na Espanha como turista. Aprenda como obter o Certificado Digital e submeter seus documentos online dentro da janela crítica de 30 dias.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Estratégia de Cidadania</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    O mapa exato de como converter seu tempo de estudo em residência legal e, após 2 anos, dar entrada no seu passaporte espanhol. Entenda as regras e prazos para não perder esse direito.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl mx-auto bg-secondary/5 border border-secondary/20 rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-8 w-8 text-secondary" />
                <h3 className="text-2xl font-bold text-foreground">Bônus Exclusivos</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Atualizações Gratuitas (1 Ano)</h4>
                    <p className="text-sm text-muted-foreground">As leis de imigração mudam. Você receberá todas as atualizações do guia gratuitamente por 12 meses.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">E-mails Prontos para Escolas</h4>
                    <p className="text-sm text-muted-foreground">Scripts em espanhol para contatar instituições, pedir informações de matrícula e negociar vagas.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />
      <GuaranteeSection />

      {/* O Que Acontece Depois — Customer Success começa ANTES da compra.
          Antes o usuário só descobria o fluxo pós-pagamento na FAQ #9 (enterrado).
          Visualizar a sequência reduz ansiedade e materializa o valor. */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="mb-3">O que acontece nos próximos 5 minutos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparência total sobre cada passo após o clique de compra.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {[
              { n: '1', title: 'Pagamento aprovado', desc: 'Pix em segundos · cartão em até 9x na Hotmart.' },
              { n: '2', title: 'E-mail com acesso', desc: 'A Hotmart envia automaticamente para o e-mail da compra.' },
              { n: '3', title: 'PDF de 46 páginas', desc: 'Download imediato · funciona em celular, tablet, computador.' },
              { n: '4', title: 'Convite à comunidade', desc: 'Acesso gratuito ao fórum, blog e chat com outros brasileiros.' },
              { n: '5', title: 'Atualizações por 1 ano', desc: 'Mudou a lei? Você recebe a versão nova no seu e-mail.' },
            ].map((step, i) => (
              <li key={step.n} className="relative bg-card border border-border/60 rounded-xl p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-sm shrink-0">
                    {step.n}
                  </span>
                  <h3 className="text-base font-semibold leading-tight">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < 4 && (
                  <span aria-hidden="true" className="hidden md:block absolute top-1/2 -right-2 text-muted-foreground/40">→</span>
                )}
              </li>
            ))}
          </ol>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Tudo automatizado pela Hotmart. Você nunca fica sem o material.
          </p>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539037116277-4db20201732f')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-white mb-4">Garanta seu Guia Completo Agora</h2>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                O investimento que economiza milhares de reais em agências e evita a frustração de um visto negado.
              </p>
            </div>

            <Card className="shadow-2xl border-0 overflow-hidden bg-card text-card-foreground">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary to-primary z-20"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-muted/30 p-8 md:p-10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                  <img 
                    src="/guia-capa.png"
                    alt="Guia Completo - Imigração para Espanha com Visto de Estudante"
                    loading="lazy"
                    className="w-full max-w-[200px] md:max-w-xs mx-auto rounded-xl shadow-xl relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 h-auto"
                  />
                </div>
                
                <CardContent className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border/50">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--urgency))/0.1] text-[hsl(var(--urgency))] text-sm font-semibold mb-6">
                      <Clock4 className="h-4 w-4" />
                      Acesso Imediato
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl text-muted-foreground line-through font-medium">R$ 197</span>
                      <span className="text-5xl md:text-6xl font-bold text-foreground">R$ 67</span>
                    </div>
                    <p className="text-muted-foreground font-medium">R$ 67 à vista (Pix ou cartão) • PDF de 46 páginas • Acesso imediato</p>
                    <p className="text-sm text-muted-foreground/80 mt-1">Parcelamento em até 9x disponível no checkout (com acréscimo Hotmart)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>Guia Prático e Atualizado 2026</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>Modelos de Cartas e E-mails (Bônus)</span>
                    </li>
                    <li className="flex items-center gap-2 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>1 Ano de Atualizações Gratuitas</span>
                    </li>
                  </ul>

                  <Button 
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-[0_0_20px_hsla(var(--secondary),0.3)] text-xl py-8 mb-4 transition-all duration-300 active:scale-[0.98]"
                    asChild
                  >
                    <a href={hotmartLink} target="_blank" rel="noopener noreferrer">Quero meu guia · R$67</a>
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" /> Compra Segura
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> 30 dias de garantia
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="mb-4">Perguntas Frequentes</h2>
              <p className="text-lg text-muted-foreground">
                Tudo o que você precisa saber antes de dar o próximo passo.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  1. Você é advogado de imigração? Como posso confiar neste guia?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Não somos advogados de imigração. Este guia não é um aconselhamento jurídico individual. Ele é um manual prático baseado no que as leis oficiais do governo espanhol exigem publicamente, estruturado de forma didática a partir de dezenas de casos práticos validados. O objetivo é te dar autonomia na documentação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  2. Funciona para quem tem mais de 40 anos? E para quem tem filhos?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Sim e sim. A Espanha não impõe limite de idade para estudar uma Formação Profissional. Inclusive, estudantes mais maduros são bem avaliados por demonstrarem foco. Para quem tem filhos, o processo exige um passo a mais na comprovação financeira (explicada no guia), mas é perfeitamente viável aplicar com a família.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  3. E se as leis de imigração espanholas mudarem no meio do meu processo?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Ao comprar o guia hoje, você garante 1 ano de atualizações gratuitas. Sempre que o BOE (Boletín Oficial del Estado) publicar mudanças nos requisitos para Vistos de Estudante, nós revisamos o material e enviamos a versão atualizada diretamente para o seu e-mail cadastrado na compra.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  4. Funciona para quem não fala espanhol fluente?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Sim. O Consulado não exige certificado oficial de idioma para aplicar ao visto de FP. No entanto, o guia entrega modelos prontos de e-mails em espanhol para você se comunicar com as escolas e fazer sua matrícula com segurança, mesmo usando apenas o básico ou ferramentas de tradução.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  5. Qual a diferença deste guia para os perfis de Instagram que cobram R$19,90?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Nós entregamos um método completo, não apenas informações rasas mastigadas do Google. Enquanto os materiais baratos listam "o que fazer", nosso guia foca em "como fazer": quais cartórios usar, como apostilar sem taxas extras, onde e como emitir atestados oficiais e como preencher os complexos formulários (EX-00) espanhóis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  6. Quanto tempo leva, na prática, para preparar tudo e aplicar o visto?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  A partir da leitura do guia, se você dedicar os horários comerciais úteis, levará entre 2 a 4 semanas para reunir toda documentação, reconhecer firmas, realizar o apostilamento de Haia e pagar traduções juramentadas. É um cronograma rápido que exige foco.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  7. Quais são os métodos de pagamento aceitos? É seguro?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Trabalhamos exclusivamente com a plataforma Hotmart, o ambiente de pagamentos mais seguro do Brasil. Aceitamos pagamentos via PIX (com liberação instantânea) e cartões de crédito das principais bandeiras em até 9x (com acréscimo da operadora). Seus dados financeiros não são armazenados por nós.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  8. Qual é a política de reembolso?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  O risco está todo com a gente. Você tem 30 dias de Garantia Incondicional assegurada pela Hotmart. Se o material não for útil ou você desistir dos seus planos de imigração, basta um clique dentro da plataforma de compras para solicitar o estorno e devolvermos 100% do valor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  9. Quanto tempo leva para receber acesso após a compra?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  No mesmo segundo em que a Hotmart processar seu Pix ou aprovar seu cartão de crédito, um e-mail com os dados de login será enviado para a sua caixa de entrada. Você poderá fazer o download do arquivo PDF (46 páginas) imediatamente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline font-medium text-lg">
                  10. Posso trabalhar enquanto estudo o FP?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Essa é a grande vantagem desta modalidade. A lei espanhola alterada recentemente garante que estudantes de Formação Profissional (Grado Superior) tenham autorização automática para trabalhar legalmente por até 30 horas semanais no país, sem necessitar de vistos paralelos.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </motion.div>
        </div>
      </section>

    </>
  );
};

export default HomePage;
