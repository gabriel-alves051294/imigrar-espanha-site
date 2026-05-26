
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GuaranteeSection = () => {
  return (
    <section className="py-20 bg-muted/50 border-y border-border/50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-xl bg-card">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left Content */}
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--trust))/0.1] text-[hsl(var(--trust))] font-medium text-sm mb-6 w-fit">
                  <ShieldCheck className="h-4 w-4" />
                  Risco Zero
                </div>
                <h2 className="text-3xl font-bold mb-4">Garantia Incondicional de 30 Dias</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Estamos tão confiantes na qualidade e na transformação que este guia proporciona que oferecemos uma garantia blindada. Se você não gostar do material, achar que não serve para você, ou simplesmente mudar de ideia, devolvemos 100% do seu dinheiro.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--trust))] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">Reembolso rápido e sem burocracia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--trust))] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">Sem perguntas constrangedoras</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--trust))] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">Basta um único e-mail para nossa equipe</span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Pagamento 100% Seguro
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Aceitamos Cartões e Pix
                  </div>
                </div>
              </div>

              {/* Right Visuals */}
              <div className="lg:col-span-2 bg-primary/5 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--trust))/0.05] to-transparent"></div>
                
                <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  src="https://images.unsplash.com/photo-1654588830920-92085849e384" 
                  alt="Selo de Garantia 30 Dias" 
                  className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-background mb-8 relative z-10"
                />
                
                <div className="text-center relative z-10">
                  <p className="font-bold text-2xl text-foreground mb-1">100%</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Reembolso em 30 dias</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
