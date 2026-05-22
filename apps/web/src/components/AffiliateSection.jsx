
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: DollarSign,
    title: "Ganhe 50% de comissão em cada venda",
    description: "Receba uma comissão generosa por cada pessoa que comprar através do seu link."
  },
  {
    icon: Users,
    title: "Compartilhe com sua audiência",
    description: "Ideal para criadores de conteúdo, agentes de viagens ou quem já mora na Espanha."
  },
  {
    icon: TrendingUp,
    title: "Quanto mais indicar, mais você ganha",
    description: "Construa uma fonte de renda passiva escalável e sem dor de cabeça."
  },
  {
    icon: Gift,
    title: "Sem limite de ganhos",
    description: "Seu potencial de faturamento é infinito. Comece a monetizar seus contatos."
  }
];

const AffiliateSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Programa de Afiliados
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              Ganhe 50% de comissão compartilhando o Guia
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/15 transition-colors duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 md:p-8 flex flex-col items-center text-center h-full relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-snug">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] text-lg px-10 py-7 rounded-xl font-bold transition-all duration-300 active:scale-[0.98] group"
            asChild
          >
            <a 
              href="https://affiliate.hotmart.com/affiliate-recruiting/view/2706B105769790" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Quero Ser Afiliado
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <p className="mt-6 text-white/80 font-medium">
            Comece a ganhar hoje mesmo. O cadastro é gratuito e imediato.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AffiliateSection;
