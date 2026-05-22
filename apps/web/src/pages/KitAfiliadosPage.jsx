
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Copy, 
  Check, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Video, 
  Megaphone, 
  Hash, 
  TrendingUp,
  Link as LinkIcon,
  ShieldAlert,
  Euro,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

// Helper component for copying text
const CopyButton = ({ text, label = "Copiar" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      variant="secondary" 
      size="sm" 
      onClick={handleCopy}
      className={cn(
        "transition-all duration-300",
        copied ? "bg-[hsl(var(--brazil-green))] text-white hover:bg-[hsl(var(--brazil-green))]/90" : ""
      )}
    >
      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
      {copied ? "Copiado!" : label}
    </Button>
  );
};

const KitAfiliadosPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const affiliateLink = "https://go.hotmart.com/SEU-CODIGO";

  return (
    <>
      <Helmet>
        <title>Kit Afiliados - Brasil Rumo à Espanha</title>
        <meta name="description" content="Material completo de divulgação para afiliados do Guia Brasil Rumo à Espanha." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[hsl(var(--spain-yellow))]/20 text-[hsl(var(--spain-yellow))] text-sm font-bold tracking-wide uppercase mb-6 border border-[hsl(var(--spain-yellow))]/30">
              <ShieldAlert className="w-4 h-4" />
              Página exclusiva para afiliados
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-balance">
              Brasil Rumo à Espanha - Kit Afiliados 2026
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Tudo o que você precisa para divulgar o Guia Definitivo de Imigração e faturar alto ajudando brasileiros a realizarem o sonho europeu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Data Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="border-border/60 shadow-lg overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-[hsl(var(--brazil-green))] via-[hsl(var(--spain-yellow))] to-[hsl(var(--spain-red))]"></div>
              <CardHeader className="bg-card pb-8">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Dados do Produto
                </CardTitle>
                <CardDescription className="text-base">
                  Informações essenciais para a sua estratégia de vendas.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-muted p-4 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground font-medium mb-1">Preço Final</p>
                  <p className="text-2xl font-bold text-foreground">R$ 67,00</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/10">
                  <p className="text-sm text-primary/80 font-medium mb-1">Sua Comissão</p>
                  <p className="text-2xl font-bold text-primary">R$ 29,68</p>
                </div>
                <div className="bg-muted p-4 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground font-medium mb-1">Plataforma</p>
                  <p className="text-xl font-bold text-foreground mt-1">Hotmart</p>
                </div>
                <div className="bg-muted p-4 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground font-medium mb-1">Duração Cookie</p>
                  <p className="text-xl font-bold text-foreground mt-1">90 dias</p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t border-border/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Seu Link de Divulgação Padrão:
                  </p>
                  <code className="block w-full p-3 bg-background border border-border rounded-lg text-primary font-mono text-sm break-all">
                    {affiliateLink}
                  </code>
                </div>
                <div className="mt-6 sm:mt-0">
                  <CopyButton text={affiliateLink} label="Copiar Link" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column */}
            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Instagram Captions */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-pink-500/10 rounded-xl">
                    <Instagram className="w-6 h-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Captions para Instagram</h2>
                </div>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      <AccordionItem value="cap-1" className="border rounded-lg px-4 bg-muted/20">
                        <AccordionTrigger className="hover:no-underline font-semibold">Opção 1: Foco na dor (Agências caras)</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 space-y-4">
                          <p className="text-muted-foreground whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-md border">
{`Estão te cobrando R$ 5.000 para tirar um visto de estudante para a Espanha? 🛑 PARE AGORA!

Você sabia que o processo pode ser feito 100% por você, de forma legal e segura, sem pagar taxas abusivas para despachantes? 

O caminho mais seguro para morar legalmente na Espanha e ter permissão de trabalho automática (30h/semana) é através do FP (Formação Profissional) de Grado Superior. 🇪🇸✈️

E o melhor: 2 anos depois você já pode pedir sua Cidadania Europeia!

Descubra o passo a passo exato, com todos os checklists e modelos de cartas aprovados no Guia Completo "Do Brasil para a Espanha". 

👉 Clica no link da minha bio e garanta seu guia com desconto especial hoje!`}
                          </p>
                          <CopyButton text={`Estão te cobrando R$ 5.000 para tirar um visto de estudante para a Espanha? 🛑 PARE AGORA!\n\nVocê sabia que o processo pode ser feito 100% por você, de forma legal e segura, sem pagar taxas abusivas para despachantes? \n\nO caminho mais seguro para morar legalmente na Espanha e ter permissão de trabalho automática (30h/semana) é através do FP (Formação Profissional) de Grado Superior. 🇪🇸✈️\n\nE o melhor: 2 anos depois você já pode pedir sua Cidadania Europeia!\n\nDescubra o passo a passo exato, com todos os checklists e modelos de cartas aprovados no Guia Completo "Do Brasil para a Espanha". \n\n👉 Clica no link da minha bio e garanta seu guia com desconto especial hoje!`} />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="cap-2" className="border rounded-lg px-4 bg-muted/20">
                        <AccordionTrigger className="hover:no-underline font-semibold">Opção 2: Foco na Cidadania (Futuro)</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 space-y-4">
                          <p className="text-muted-foreground whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-md border">
{`O seu passaporte europeu está mais perto do que você imagina. 🛂🇪🇺

Muitos brasileiros não sabem, mas a Espanha tem um acordo incrível com o Brasil: morando lá de forma legal por apenas 2 anos, você ganha o direito de aplicar para a cidadania espanhola!

"Ah, mas como eu vou legalmente se não tenho cidadania?"
A resposta: Visto de Estudante para FP de Grado Superior. 📚💼

✅ Permissão de trabalho de 30h semanais desde o DIA 1.
✅ Conta tempo para a cidadania.
✅ Você faz todo o processo sozinho, economizando milhares de reais.

Quer saber exatamente os documentos que você precisa e como aplicar sem ser reprovado?

👉 Acesse o link na bio e baixe agora o Guia Completo 2026.`}
                          </p>
                          <CopyButton text={`O seu passaporte europeu está mais perto do que você imagina. 🛂🇪🇺\n\nMuitos brasileiros não sabem, mas a Espanha tem um acordo incrível com o Brasil: morando lá de forma legal por apenas 2 anos, você ganha o direito de aplicar para a cidadania espanhola!\n\n"Ah, mas como eu vou legalmente se não tenho cidadania?"\nA resposta: Visto de Estudante para FP de Grado Superior. 📚💼\n\n✅ Permissão de trabalho de 30h semanais desde o DIA 1.\n✅ Conta tempo para a cidadania.\n✅ Você faz todo o processo sozinho, economizando milhares de reais.\n\nQuer saber exatamente os documentos que você precisa e como aplicar sem ser reprovado?\n\n👉 Acesse o link na bio e baixe agora o Guia Completo 2026.`} />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="cap-3" className="border rounded-lg px-4 bg-muted/20">
                        <AccordionTrigger className="hover:no-underline font-semibold">Opção 3: Direto ao ponto (Prático)</AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 space-y-4">
                          <p className="text-muted-foreground whitespace-pre-wrap font-mono text-sm bg-background p-4 rounded-md border">
{`Visto de estudante para a Espanha negado? Geralmente é por falta de informação correta. ❌

Consulados são rigorosos, e um documento faltando pode atrasar seu sonho em meses. 

Não corra riscos. No Guia "Do Brasil para a Espanha", você recebe:
📄 Checklist à prova de falhas
✍️ Templates prontos de cartas em espanhol (Motivação e Patrocínio)
💶 Simulador financeiro (saiba exatamente quanto comprovar)
📍 Rota Mercurio (como aplicar o visto já estando na Espanha)

Tudo isso por menos do que você gastaria em um jantar.

🔗 Link na bio para garantir o seu arquivo agora mesmo.`}
                          </p>
                          <CopyButton text={`Visto de estudante para a Espanha negado? Geralmente é por falta de informação correta. ❌\n\nConsulados são rigorosos, e um documento faltando pode atrasar seu sonho em meses. \n\nNão corra riscos. No Guia "Do Brasil para a Espanha", você recebe:\n📄 Checklist à prova de falhas\n✍️ Templates prontos de cartas em espanhol (Motivação e Patrocínio)\n💶 Simulador financeiro (saiba exatamente quanto comprovar)\n📍 Rota Mercurio (como aplicar o visto já estando na Espanha)\n\nTudo isso por menos do que você gastaria em um jantar.\n\n🔗 Link na bio para garantir o seu arquivo agora mesmo.`} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>

              {/* WhatsApp Messages */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-500/10 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Mensagens WhatsApp</h2>
                </div>
                <div className="space-y-4">
                  <Card className="shadow-sm border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground whitespace-pre-wrap mb-4 font-mono text-sm">
{`Oi! Tudo bem? Lembrei de você porque sei que você tem vontade de morar fora. 

Achei um material incrível de um brasileiro que ensina o passo a passo exato para tirar o visto de estudante pra Espanha por conta própria, sem pagar agência. O legal é que esse visto específico (FP de Grado Superior) já te dá permissão pra trabalhar 30h por semana e em 2 anos você consegue a cidadania europeia! 🇪🇸

Dá uma olhada no site oficial, tá muito barato pelo que entrega: [SEU LINK AQUI]`}
                      </p>
                      <CopyButton text={`Oi! Tudo bem? Lembrei de você porque sei que você tem vontade de morar fora. \n\nAchei um material incrível de um brasileiro que ensina o passo a passo exato para tirar o visto de estudante pra Espanha por conta própria, sem pagar agência. O legal é que esse visto específico (FP de Grado Superior) já te dá permissão pra trabalhar 30h por semana e em 2 anos você consegue a cidadania europeia! 🇪🇸\n\nDá uma olhada no site oficial, tá muito barato pelo que entrega: ${affiliateLink}`} />
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground whitespace-pre-wrap mb-4 font-mono text-sm">
{`Pessoal, pra quem tá pensando em imigrar legalmente, descobri o "segredo" que os despachantes cobram 5 mil reais pra fazer. 🤯

É o processo de Visto de Estudante pra FP na Espanha. Você estuda, trabalha legalmente e depois pega o passaporte europeu. Achei um Guia Completo com todos os modelos de carta e documentos necessários pra aplicar sozinho. 

Vou deixar o link aqui pra quem quiser dar uma olhada, vale muito a pena: [SEU LINK AQUI]`}
                      </p>
                      <CopyButton text={`Pessoal, pra quem tá pensando em imigrar legalmente, descobri o "segredo" que os despachantes cobram 5 mil reais pra fazer. 🤯\n\nÉ o processo de Visto de Estudante pra FP na Espanha. Você estuda, trabalha legalmente e depois pega o passaporte europeu. Achei um Guia Completo com todos os modelos de carta e documentos necessários pra aplicar sozinho. \n\nVou deixar o link aqui pra quem quiser dar uma olhada, vale muito a pena: ${affiliateLink}`} />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Email Marketing */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Email Marketing</h2>
                </div>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 space-y-2">
                      <p className="text-sm font-semibold">Assunto 1: O segredo que as agências de intercâmbio escondem de você</p>
                      <p className="text-sm font-semibold">Assunto 2: Como conseguir a Cidadania Europeia em apenas 2 anos</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-md border font-mono text-sm text-muted-foreground whitespace-pre-wrap mb-4">
{`Olá [Nome],

Se você já pensou em morar na Europa, provavelmente já esbarrou em duas grandes barreiras: a falta de cidadania europeia e os preços absurdos cobrados por agências de imigração.

Hoje eu quero te mostrar como quebrar essas duas barreiras de uma vez só.

Existe um caminho 100% legal e seguro na Espanha chamado Formação Profissional (FP) de Grado Superior. É um curso técnico de alta demanda. 

Por que isso é a mina de ouro da imigração?
1. O Visto de Estudante para FP te dá permissão automática de trabalho (30h/semana).
2. O tempo estudando na Espanha legalmente CONTA para a sua cidadania.
3. Como brasileiro, você só precisa de 2 anos de residência legal para pedir o passaporte europeu!

Mas para conseguir esse visto, o Consulado exige uma documentação impecável. Cartas específicas, comprovação financeira correta, apostilamentos... 

É aí que entra o Guia "Do Brasil para a Espanha". Um manual direto ao ponto, criado por quem já passou pelo processo, entregando:

✅ O checklist completo à prova de erros.
✅ Templates validados de Cartas de Motivação (basta preencher).
✅ Estratégia de como aplicar já estando na Espanha (Rota Mercurio).

Pelo preço de um lanche no fim de semana, você garante o mapa que economiza meses de dor de cabeça e milhares de reais.

👉 [Clique aqui para acessar o Guia Completo agora](${affiliateLink})

Dê o primeiro passo seguro rumo à sua nova vida.

Um abraço!`}
                    </div>
                    <CopyButton text={`Olá [Nome],\n\nSe você já pensou em morar na Europa, provavelmente já esbarrou em duas grandes barreiras: a falta de cidadania europeia e os preços absurdos cobrados por agências de imigração.\n\nHoje eu quero te mostrar como quebrar essas duas barreiras de uma vez só.\n\nExiste um caminho 100% legal e seguro na Espanha chamado Formação Profissional (FP) de Grado Superior. É um curso técnico de alta demanda. \n\nPor que isso é a mina de ouro da imigração?\n1. O Visto de Estudante para FP te dá permissão automática de trabalho (30h/semana).\n2. O tempo estudando na Espanha legalmente CONTA para a sua cidadania.\n3. Como brasileiro, você só precisa de 2 anos de residência legal para pedir o passaporte europeu!\n\nMas para conseguir esse visto, o Consulado exige uma documentação impecável. Cartas específicas, comprovação financeira correta, apostilamentos... \n\nÉ aí que entra o Guia "Do Brasil para a Espanha". Um manual direto ao ponto, criado por quem já passou pelo processo, entregando:\n\n✅ O checklist completo à prova de erros.\n✅ Templates validados de Cartas de Motivação (basta preencher).\n✅ Estratégia de como aplicar já estando na Espanha (Rota Mercurio).\n\nPelo preço de um lanche no fim de semana, você garante o mapa que economiza meses de dor de cabeça e milhares de reais.\n\n👉 [Clique aqui para acessar o Guia Completo agora](${affiliateLink})\n\nDê o primeiro passo seguro rumo à sua nova vida.\n\nUm abraço!`} />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Instagram Stories */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-xl">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Instagram Stories</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="shadow-sm bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-muted">Storie 1 - Enquete</Badge>
                        <p className="text-sm text-muted-foreground font-medium italic">
                          "Você pagaria R$ 5.000 pra uma agência tirar seu visto, ou preferia ter o passo a passo pra fazer sozinho por R$ 67? 👀 Link do mapa completo na bio!"
                        </p>
                      </div>
                      <CopyButton text="Você pagaria R$ 5.000 pra uma agência tirar seu visto, ou preferia ter o passo a passo pra fazer sozinho por R$ 67? 👀 Link do mapa completo na bio!" />
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-muted">Storie 2 - Curiosidade</Badge>
                        <p className="text-sm text-muted-foreground font-medium italic">
                          "O maior segredo pra morar na Europa sem cidadania: Visto de Estudante (FP) na Espanha. Trabalhe 30h/semana e pegue o passaporte em 2 anos. Quer saber como? Clica no link! ✈️🇪🇸"
                        </p>
                      </div>
                      <CopyButton text="O maior segredo pra morar na Europa sem cidadania: Visto de Estudante (FP) na Espanha. Trabalhe 30h/semana e pegue o passaporte em 2 anos. Quer saber como? Clica no link! ✈️🇪🇸" />
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-muted">Storie 3 - Urgência</Badge>
                        <p className="text-sm text-muted-foreground font-medium italic">
                          "Aviso: as leis de imigração podem mudar. Se você quer ir pra Espanha em 2026, comece a preparar seus documentos HOJE. Baixe o Guia completo com checklists e modelos no link. 👇"
                        </p>
                      </div>
                      <CopyButton text="Aviso: as leis de imigração podem mudar. Se você quer ir pra Espanha em 2026, comece a preparar seus documentos HOJE. Baixe o Guia completo com checklists e modelos no link. 👇" />
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* YouTube / TikTok */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <Video className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Scripts (Vídeos 30s)</h2>
                </div>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-3 border-b pb-2">Roteiro TikTok / Reels</h3>
                    <div className="space-y-3 mb-4 text-sm text-muted-foreground font-mono bg-muted/20 p-4 rounded-md border">
                      <p><strong>[0-3s] Hook (visual dinâmico):</strong> Não pague uma agência de intercâmbio antes de ver esse vídeo!</p>
                      <p><strong>[3-15s] Problema/Desenvolvimento:</strong> Sabia que você pode imigrar legalmente pra Espanha, trabalhar 30h por semana e ganhar a cidadania europeia em 2 anos? O segredo é o visto de estudante para FP (Formação Profissional).</p>
                      <p><strong>[15-25s] Solução:</strong> As agências cobram milhares de reais pra fazer isso, mas um brasileiro reuniu TODOS os documentos, modelos de cartas e o passo a passo num Guia Prático que custa menos que uma pizza.</p>
                      <p><strong>[25-30s] CTA:</strong> Clica no link da minha bio agora pra não cair em furada e fazer seu processo sozinho!</p>
                    </div>
                    <CopyButton text={`[0-3s] Hook (visual dinâmico): Não pague uma agência de intercâmbio antes de ver esse vídeo!\n[3-15s] Problema/Desenvolvimento: Sabia que você pode imigrar legalmente pra Espanha, trabalhar 30h por semana e ganhar a cidadania europeia em 2 anos? O segredo é o visto de estudante para FP (Formação Profissional).\n[15-25s] Solução: As agências cobram milhares de reais pra fazer isso, mas um brasileiro reuniu TODOS os documentos, modelos de cartas e o passo a passo num Guia Prático que custa menos que uma pizza.\n[25-30s] CTA: Clica no link da minha bio agora pra não cair em furada e fazer seu processo sozinho!`} />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Paid Traffic & Ads */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Megaphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Tráfego Pago (Ads)</h2>
                </div>
                <Card className="shadow-sm mb-4">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-3">Headlines Vencedoras (Facebook/Google)</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4 text-sm text-muted-foreground">
                      <li>Morar na Espanha: O Guia Definitivo 2026</li>
                      <li>Visto de Estudante Espanha: Como Fazer Sozinho</li>
                      <li>Trabalhe e Estude Legalmente na Espanha</li>
                      <li>Pare de Pagar Agências! Guia Imigração Espanha</li>
                      <li>Cidadania Europeia em 2 Anos? Veja Como.</li>
                    </ul>
                    <CopyButton text={`Morar na Espanha: O Guia Definitivo 2026\nVisto de Estudante Espanha: Como Fazer Sozinho\nTrabalhe e Estude Legalmente na Espanha\nPare de Pagar Agências! Guia Imigração Espanha\nCidadania Europeia em 2 Anos? Veja Como.`} />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hashtags */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Hash className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Hashtags Estratégicas</h2>
                </div>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground font-mono bg-muted/20 p-4 rounded-md border mb-4 break-words">
                      #imigrarparaespanha #morarnaespanha #brasileirosnaespanha #vistodeestudante #fpespanha #cidadaniaeuropeia #imigracaolegal #morarnaeeuropa #vivernaespanha #brasileirosnaeuropa #intercambioespanha #passaporteeuropeu
                    </p>
                    <CopyButton text="#imigrarparaespanha #morarnaespanha #brasileirosnaespanha #vistodeestudante #fpespanha #cidadaniaeuropeia #imigracaolegal #morarnaeeuropa #vivernaespanha #brasileirosnaeuropa #intercambioespanha #passaporteeuropeu" />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para faturar com a gente?</h2>
            <p className="text-xl md:text-2xl text-secondary-foreground/80 mb-10">
              Junte-se ao nosso time de afiliados e ganhe R$ 29,68 por cada venda de um produto que realmente transforma a vida das pessoas.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 font-bold shadow-[0_0_30px_hsla(0,0%,100%,0.3)]"
              asChild
            >
              <a href="https://affiliate.hotmart.com/affiliate-recruiting/view/2706B105769790" target="_blank" rel="noopener noreferrer">
                Quero Me Tornar Afiliado Agora
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Simple Badge component to replace standard UI if missing
const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "destructive" && "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        variant === "outline" && "text-foreground",
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export default KitAfiliadosPage;
