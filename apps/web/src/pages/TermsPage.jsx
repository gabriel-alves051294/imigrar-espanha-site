
import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso | Do Brasil para a Espanha</title>
        <meta name="description" content="Termos de uso e condições para utilização do site e do guia digital." />
        <link rel="canonical" href="https://imigrarparaespanha.com.br/termos" />
      </Helmet>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Termos de Uso</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao "Do Brasil para a Espanha". Ao acessar e utilizar este site e nossos produtos digitais, 
              você concorda em cumprir e estar vinculado aos seguintes termos e condições.
            </p>
          </div>

          <div className="prose prose-lg">
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar o site imigrarparaespanha.com.br e/ou adquirir nosso guia, você aceita incondicionalmente estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nosso site ou serviços.</p>

            <h2>2. Uso Permitido</h2>
            <p>Concedemos a você uma licença limitada, não exclusiva e intransferível para acessar e utilizar o conteúdo deste site e do guia digital (quando adquirido) para os seguintes fins:</p>
            <ul>
              <li>Uso estritamente pessoal e não comercial.</li>
              <li>Visualização do conteúdo em dispositivos eletrônicos.</li>
              <li>Compartilhamento do link do site em redes sociais ou com contatos, desde que não implique em cópia do material pago.</li>
              <li>Fins educativos e de planejamento de imigração própria.</li>
            </ul>

            <h2>3. Uso Proibido</h2>
            <p>Você concorda expressamente em NÃO realizar as seguintes ações:</p>
            <ul>
              <li>Reproduzir, duplicar, copiar, vender ou revender qualquer parte do conteúdo do site ou do guia em PDF.</li>
              <li>Utilizar o conteúdo para fins comerciais ou oferecê-lo como serviço de consultoria a terceiros.</li>
              <li>Acessar áreas restritas do site sem autorização.</li>
              <li>Utilizar o site para enviar spam, correntes ou conteúdo malicioso (vírus, malware).</li>
              <li>Violar direitos de propriedade intelectual da nossa marca.</li>
            </ul>

            <h2>4. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste site (textos, gráficos, logotipos, imagens, guias em PDF, templates) é de propriedade exclusiva de "Do Brasil para a Espanha" e seus autores, estando protegido por leis de direitos autorais e propriedade intelectual. Nenhuma modificação, distribuição ou republicação é permitida sem autorização prévia por escrito.</p>

            <h2>5. Isenção de Responsabilidade</h2>
            <p>O conteúdo fornecido neste site e no guia digital é oferecido "como está", com propósitos informativos e educacionais. Embora façamos o máximo esforço para manter as informações atualizadas (versão 2026), as leis de imigração espanholas podem mudar sem aviso prévio. Não garantimos a aprovação de vistos, pois isso é prerrogativa exclusiva do governo espanhol. Recomendamos sempre verificar informações junto aos órgãos consulares oficiais ou consultar um advogado de imigração para casos complexos.</p>

            <h2>6. Limitação de Responsabilidade</h2>
            <p>Em nenhuma circunstância o "Do Brasil para a Espanha" ou seus autores serão responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de uso do nosso conteúdo, incluindo perda de lucros, dados ou recusas de vistos.</p>

            <h2>7. Links Externos</h2>
            <p>Nosso site pode conter links para sites de terceiros (como escolas, governos ou plataformas de pagamento). Estes links são fornecidos apenas para conveniência. Não endossamos nem nos responsabilizamos pelo conteúdo ou práticas de privacidade desses sites. O acesso a sites de terceiros é feito por sua própria conta e risco.</p>

            <h2>8. Modificações</h2>
            <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação no site. O uso contínuo do site após tais modificações constitui a sua aceitação dos novos termos.</p>

            <h2>9. Lei Aplicável</h2>
            <p>Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Qualquer disputa relacionada a estes termos estará sujeita à jurisdição exclusiva dos tribunais brasileiros.</p>

            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Última atualização: 20 de maio de 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
