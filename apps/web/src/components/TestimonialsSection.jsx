import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const testimonials = [{
  id: 1,
  name: "Mariana Costa",
  location: "Madri, Espanha",
  image: "https://images.unsplash.com/photo-1666892666066-abe5c4865e9c",
  text: "Eu estava perdida com tanta burocracia e orçamentos absurdos de agências. O guia me deu o passo a passo exato. Hoje estou matriculada no meu FP e trabalhando legalmente em Madri. Mudou minha vida!"
}, {
  id: 2,
  name: "Rafael Santos",
  location: "São Paulo, Brasil",
  image: "https://images.unsplash.com/photo-1532586539-30f58a60677a",
  text: "O simulador financeiro e os templates de cartas me salvaram. Consegui organizar minhas economias e meu visto foi aprovado em apenas 12 dias pelo consulado. Recomendo de olhos fechados."
}, {
  id: 3,
  name: "Beatriz Lima",
  location: "Barcelona, Espanha",
  image: "https://images.unsplash.com/photo-1652841190565-b96e0acbae17",
  text: "Achei que pela minha idade (34 anos) seria impossível. O guia desmistificou tudo. Apliquei diretamente da Espanha (rota Mercurio) e já estou com meu TIE em mãos. O bônus de e-mails ajudou muito."
}, {
  id: 4,
  name: "Lucas Oliveira",
  location: "Valência, Espanha",
  image: "https://images.unsplash.com/photo-1693035730007-fbc2c14c6814",
  text: "O melhor investimento que fiz no meu planejamento. As informações sobre a cidadania em 2 anos são claríssimas. Já estou no meu segundo ano de curso e iniciando o processo do passaporte."
}];
const TestimonialsSection = () => {
  return <section className="py-24 bg-background relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">Mais de 5.000+ pessoas já transformaram suas vidas</h2>
          <p className="text-lg text-muted-foreground">
            Veja o que dizem os brasileiros que já estão vivendo o sonho europeu através do nosso método.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[hsl(var(--spain-yellow))] text-[hsl(var(--spain-yellow))]" />)}
                  </div>
                  <p className="text-foreground/90 leading-relaxed mb-6 flex-grow italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/10" />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        <div className="text-center mt-12">
          <a href="#oferta" className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary/80 hover:underline transition-all">
            Garantir Minha Vaga
          </a>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;