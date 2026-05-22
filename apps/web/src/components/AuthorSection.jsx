
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuthorSection = () => {
  return (
    <section id="autor" className="py-16 author-gradient-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[hsl(var(--spain-red))]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[hsl(var(--brazil-green))]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <div>
            <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Sobre o Autor
              <span className="w-8 h-px bg-primary"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              Gabriel Alves
            </h3>
          </div>

          <div className="space-y-6 text-lg text-muted-foreground leading-[1.8]">
            <p>
              Minha jornada com a imigração começou em 2007. Desde então, vivenciei na pele os desafios, as burocracias e as incertezas de quem decide construir uma nova vida em outro país.
            </p>
            <p>
              Ao longo desses anos, vi muitas pessoas caírem em golpes de agências, perderem dinheiro com despachantes desnecessários ou tentarem caminhos obscuros que só trouxeram dor de cabeça. Foi observando esses erros e acertos que aprendi uma lição inegociável: <strong className="text-foreground font-semibold">o jeito certo de imigrar é o legal</strong>.
            </p>
            <p>
              Hoje, dedico meu tempo a compilar todo esse conhecimento prático para ajudar brasileiros a conquistarem seu espaço na Espanha através da educação (FP de Grado Superior). Meu objetivo é entregar a você o mapa exato que eu gostaria de ter recebido lá no início.
            </p>
          </div>

          <div className="relative py-8">
            <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 text-primary/10 rotate-180" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-medium text-foreground italic leading-snug">
              "Não tem atalho. Mas tem método."
            </blockquote>
          </div>

          <div className="pt-2">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              asChild
            >
              <a href="#oferta">
                Acessar o Guia Agora
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorSection;
