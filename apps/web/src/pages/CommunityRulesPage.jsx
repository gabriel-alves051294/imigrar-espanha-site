
import React from 'react';
import { Helmet } from 'react-helmet';
import { ShieldAlert, UserX, MessageSquare as MessageSquareWarning } from 'lucide-react';

const CommunityRulesPage = () => {
  return (
    <div className="bg-background min-h-screen py-16">
      <Helmet>
        <title>Regras da Comunidade | Do Brasil para a Espanha</title>
        <meta name="description" content="Diretrizes e regras de convivência da nossa comunidade." />
      </Helmet>

      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Regras da Comunidade</h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Para mantermos um ambiente seguro, colaborativo e focado em ajudar brasileiros a imigrarem legalmente, estabelecemos diretrizes estritas.
        </p>

        <div className="space-y-8">
          <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="h-6 w-6 text-destructive" />
              <h2 className="text-xl font-semibold m-0 text-destructive">Tolerância Zero</h2>
            </div>
            <p className="text-foreground/90">
              Qualquer violação dos itens abaixo resultará em banimento imediato e permanente, sem aviso prévio:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-foreground/80">
              <li>Discurso de ódio, racismo, xenofobia ou discriminação de qualquer natureza.</li>
              <li>Incentivo ou apologia a meios de imigração ilegais ou irregulares.</li>
              <li>Compartilhamento de material pornográfico ou NSFW.</li>
              <li>Doxxing (exposição de dados pessoais de terceiros).</li>
              <li>Golpes, esquemas financeiros ou venda de "facilidades" consulares.</li>
            </ul>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3>Sistema de Moderação e Strikes</h3>
            <p>
              Utilizamos um sistema misto de inteligência artificial (Perspective API) e moderação humana. 
              Conteúdos que atingem alta pontuação de toxicidade são bloqueados automaticamente antes de serem publicados.
            </p>
            <div className="flex items-start gap-4 my-6 p-4 bg-muted rounded-lg border border-border">
              <UserX className="h-8 w-8 text-muted-foreground shrink-0" />
              <div>
                <strong className="block mb-1">Regra dos 3 Strikes</strong>
                <span className="text-sm text-muted-foreground">Comportamentos rudes, spam leve ou desvio constante do foco geram "strikes" (advertências). Acumular 3 strikes resulta no banimento automático da conta.</span>
              </div>
            </div>

            <h3>Boas Práticas no Fórum e Chat</h3>
            <ul>
              <li><strong>Pesquise antes de perguntar:</strong> Use a barra de pesquisa do fórum. Sua dúvida pode já ter sido respondida.</li>
              <li><strong>Seja claro nos títulos:</strong> "Ajuda com documento X" é melhor que "SOCORRO URGENTE".</li>
              <li><strong>Não faça Spam:</strong> Enviar a mesma mensagem repetidas vezes no chat resultará em restrição temporária (rate limit já ativado).</li>
              <li><strong>Evite auto-promoção excessiva:</strong> A comunidade não é um mural de classificados.</li>
            </ul>

            <h3>Reporte Problemas</h3>
            <p className="flex items-center gap-2">
              <MessageSquareWarning className="h-5 w-5 text-orange-500" />
              Se você presenciar qualquer comportamento inadequado, não engaje. Utilize o botão de reportar presente nos posts ou contate os administradores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRulesPage;
