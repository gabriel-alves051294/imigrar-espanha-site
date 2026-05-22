
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and save to localStorage
    setTimeout(() => {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      toast.success('Mensagem enviada com sucesso! Responderemos em até 24 horas.');
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Entre em Contato | Do Brasil para a Espanha</title>
        <meta name="description" content="Tem dúvidas sobre o guia, parcerias ou programa de afiliados? Entre em contato conosco. Resposta em até 24 horas." />
        <link rel="canonical" href="https://imigrarparaespanha.com.br/contato" />
      </Helmet>

      <section className="py-20 bg-muted/20 min-h-[calc(100vh-200px)]">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tem alguma dúvida sobre o processo, propostas de parceria ou quer saber mais sobre o programa de afiliados? Estamos aqui para ajudar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">E-mail</p>
                      <a href="mailto:contato@imigrarparaespanha.com.br" className="text-muted-foreground hover:text-primary transition-colors text-sm break-all">
                        contato@imigrarparaespanha.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Tempo de Resposta</p>
                      <p className="text-muted-foreground text-sm">
                        Em até 24 horas úteis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Localização</p>
                      <p className="text-muted-foreground text-sm">
                        Belo Horizonte, MG - Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo <span className="text-destructive">*</span></Label>
                      <Input 
                        id="nome" 
                        name="nome" 
                        placeholder="Seu nome" 
                        required 
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        required 
                        className="bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto <span className="text-destructive">*</span></Label>
                    <Select name="assunto" required defaultValue="Dúvidas">
                      <SelectTrigger id="assunto" className="bg-background text-foreground">
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dúvidas">Dúvidas sobre o Guia</SelectItem>
                        <SelectItem value="Parcerias">Parcerias</SelectItem>
                        <SelectItem value="Afiliados">Programa de Afiliados</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem <span className="text-destructive">*</span></Label>
                    <Textarea 
                      id="mensagem" 
                      name="mensagem" 
                      placeholder="Como podemos ajudar?" 
                      rows={6} 
                      required 
                      className="bg-background text-foreground resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Enviar Mensagem <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
