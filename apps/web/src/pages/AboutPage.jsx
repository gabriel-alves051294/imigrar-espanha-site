
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Target, Globe, Mail, MapPin, AlertTriangle, Plane, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Do Brasil para a Espanha</title>
        <meta name="description" content="Conheça a história de Gabriel Alves e a missão por trás do guia definitivo de imigração para a Espanha." />
        <link rel="canonical" href="https://imigrarparaespanha.com.br/sobre" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543783207-11ce28a1f1ce?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Sobre Nós</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
              Transformando a complexidade da imigração em um caminho claro, seguro e legal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Text Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">A Minha Jornada: Do Erro ao Método Legal</h2>
              
              <div className="space-y-6">
                {/* Block 1 */}
                <Card className="shadow-sm border-border/60 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-primary/10 p-2.5 rounded-xl shrink-0 h-fit">
                        <Plane className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground leading-relaxed">
                          Em 2007, com apenas 12 anos, pisei na Espanha pela primeira vez. Como muitas famílias brasileiras, fomos vítimas da desinformação na busca por um recomeço. Confiamos em promessas fáceis e atalhos de agências que, no fim das contas, só nos custaram tempo, dinheiro e uma enorme frustração. Aquela dor e a sensação de impotência me marcaram profundamente.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Block 2 */}
                <Card className="shadow-sm border-border/60 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-secondary/10 p-2.5 rounded-xl shrink-0 h-fit">
                        <Search className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground leading-relaxed">
                          Anos mais tarde, decidido a desenhar um retorno seguro e definitivo, mergulhei a fundo nas leis de imigração espanholas. Foi então que descobri o "segredo" mais bem guardado e estável: o caminho pela educação através do FP (Formación Profesional) de Grado Superior. Uma rota 100% legal, segura e estratégica que garante residência e permissão automática de trabalho desde o primeiro dia.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Block 3 - Warning */}
                <Card className="shadow-sm border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-amber-500/20 p-2.5 rounded-xl shrink-0 h-fit">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                      </div>
                      <div>
                        <p className="text-amber-800/90 dark:text-amber-200/80 leading-relaxed font-medium">
                          ⚠️ IMPORTANTE: Este guia foi feito para te dar 100% de autonomia e controle sobre o seu processo. Não somos uma agência e não vendemos falsas promessas. Ele substitui o trabalho de despachantes caros, entregando o passo a passo exato, modelos aprovados e conhecimento prático para você aplicar o seu visto por conta própria, economizando milhares de reais.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Photo - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 lg:sticky lg:top-24"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/60 aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] group max-w-md mx-auto lg:ml-auto lg:mr-0">
                <img
                  src="/perfil-gabriel.png"
                  alt="Gabriel Alves - Fundador & Autor"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                  <div>
                    <p className="text-white font-bold text-2xl mb-1">Gabriel Alves</p>
                    <p className="text-white/90 font-medium">Fundador &amp; Autor</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossa Missão & Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acreditamos que imigrar não deve ser um salto no escuro. Nossos princípios guiam tudo o que fazemos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Transparência Total</h3>
              <p className="text-muted-foreground">
                Não vendemos falsas promessas. Explicamos exatamente os requisitos, os custos reais e os prazos de cada etapa do processo.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <BookOpen className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Conhecimento Prático</h3>
              <p className="text-muted-foreground">
                Chega de teorias jurídicas confusas. Transformamos leis de imigração em checklists práticos e templates prontos para uso.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Foco no Longo Prazo</h3>
              <p className="text-muted-foreground">
                Nossa estratégia não é apenas colocar você na Espanha, mas garantir que sua estadia conte tempo para a sua cidadania europeia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tem dúvidas sobre minha história ou quer saber mais sobre o processo de imigração? Estou aqui para ajudar.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
                    <a 
                      href="mailto:contato@imigrarparaespanha.com.br" 
                      className="text-primary hover:text-primary/80 transition-colors font-medium whitespace-nowrap inline-block"
                    >
                      contato@imigrarparaespanha.com.br
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Respondo em até 24 horas úteis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Localização</h3>
                    <p className="text-muted-foreground">
                      Belo Horizonte, MG - Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Button 
                  asChild
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 active:scale-[0.98]"
                >
                  <a href="/contato">Enviar Mensagem</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                