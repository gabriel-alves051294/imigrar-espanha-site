import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Reposicionado: enquanto o produto não tem base de clientes reais o suficiente
// para depoimentos honestos, esta seção mostra CENÁRIOS PRÁTICOS que o método
// resolve. Mantém a força narrativa de "4 perfis" sem afirmar fatos que não
// podem ser provados (evita risco de propaganda enganosa - CDC art. 37).
// Quando houver depoimentos reais coletados via Comunidade, basta trocar o
// array `scenarios` por um array `testimonials` e ajustar o título.
const scenarios = [{
  id: 1,
  title: "Mãe de família perdida na burocracia",
  location: "Cenário: aplicação com 2 dependentes",
  palette: 'from-[hsl(var(--brazil-green))] to-emerald-700',
  Icon: Users,
  text: "Não sabe por onde começar: o que apostilar primeiro, qual cartório, como comprovar €8.400 com dependentes. O checklist + carta de patrocínio do guia organizam o processo em 3 semanas — sem precisar pagar agência."
}, {
  id: 2,
  title: "Profissional CLT querendo recomeçar",
  location: "Cenário: visto FP a partir do Brasil",
  palette: 'from-[hsl(var(--spain-red))] to-rose-700',
  Icon: Briefcase,
  text: "Tem €7.200 no extrato mas não sabe como apresentar pro consulado. O simulador + os templates de carta de motivação validam a documentação financeira no primeiro envio, evitando indeferimento por detalhe formal."
}, {
  id: 3,
  title: "Já tá na Espanha como turista",
  location: "Cenário: Rota Mercurio (In Situ)",
  palette: 'from-[hsl(var(--secondary))] to-indigo-700',
  Icon: MapPin,
  text: "Os 90 dias estão acabando e a opção parece ser voltar. O passo a passo da Rota Mercurio mostra como obter o Certificado Digital e submeter o pedido dentro da janela crítica de 30 dias — direto da Espanha, sem retornar ao Brasil."
}, {
  id: 4,
  title: "Pensa em cidadania europeia em 2 anos",
  location: "Cenário: planejamento de longo prazo",
  palette: 'from-amber-500 to-[hsl(var(--spain-yellow))]',
  Icon: GraduationCap,
  text: "Quer que o tempo de estudo conte pro passaporte. A estratégia de cidadania do guia mapeia quais FPs preservam o vínculo legal, quando renovar a residência e como dar entrada na nacionalidade no mês exato em que se torna elegível."
}];

const TestimonialsSection = () => {
  return <section className="py-24 bg-background relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wide mb-4 border border-secondary/20">
            <Sparkles className="h-3.5 w-3.5" />
            Cenários do método
          </span>
          <h2 className="mb-4">Quatro situações comuns — e como o guia destrava cada uma</h2>
          <p className="text-lg text-muted-foreground">
            Cada perfil abaixo representa uma jornada real do brasileiro indo pra Espanha. Veja como o passo a passo do Guia Premium resolve a fricção principal de cada um.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.Icon;
            return <motion.div key={scenario.id} initial={{
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
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      aria-hidden="true"
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${scenario.palette} text-white flex items-center justify-center shadow-md shrink-0`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base leading-tight">{scenario.title}</h3>
                  </div>
                  <p className="text-foreground/90 leading-relaxed mb-6 flex-grow">
                    {scenario.text}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/40">
                    <MapPin className="h-3 w-3" />
                    {scenario.location}
                  </div>
                </CardContent>
              </Card>
            </motion.div>;
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
          Cenários ilustrativos das jornadas mais comuns no nicho. Os primeiros depoimentos reais serão publicados conforme alunos autorizarem expressamente.
        </p>

        <div className="text-center mt-6">
          <a href="#oferta" className="inline-flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary/80 hover:underline transition-all">
            Ver a oferta completa
          </a>
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;
