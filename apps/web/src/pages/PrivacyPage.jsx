
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Do Brasil para a Espanha</title>
        <meta name="description" content="Política de privacidade e uso de dados em conformidade com a LGPD." />
        <link rel="canonical" href="https://imigrarparaespanha.com.br/privacidade" />
      </Helmet>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Política de Privacidade</h1>
            <p className="text-muted-foreground">
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, 
              usamos, compartilhamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert">
            <h2>1. Informações Coletadas</h2>
            <p>Coletamos dados para fornecer um serviço melhor em nossa plataforma e comunidade:</p>
            <ul>
              <li><strong>Dados de Autenticação (OAuth/Email):</strong> Ao se cadastrar na comunidade via Google, Facebook ou e-mail, coletamos seu nome público, endereço de e-mail e foto de perfil (avatar) fornecidos pelo serviço.</li>
              <li><strong>Conteúdo Gerado pelo Usuário:</strong> Mensagens de chat, tópicos de fórum e comentários no blog publicados por você.</li>
              <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador e páginas visitadas.</li>
            </ul>

            <h2>2. Moderação Automática</h2>
            <p>Para manter a segurança e a cordialidade em nossa comunidade, todo conteúdo gerado por usuários passa por moderação automática em duas camadas:</p>
            <ul>
              <li><strong>Texto (fórum, chat, comentários):</strong> analisamos com a <strong>Perspective API</strong> do Google para detectar toxicidade, insultos, ameaças e ataques de identidade. Mensagens com pontuação de toxicidade ≥ 80% são bloqueadas. Três bloqueios resultam em banimento automático.</li>
              <li><strong>Imagens (uploads):</strong> processadas pelo <strong>Google Vision SafeSearch</strong> antes de serem armazenadas. Conteúdo classificado como adulto, violento ou explícito é rejeitado e nunca chega ao nosso servidor.</li>
            </ul>
            <p>Os textos e imagens são enviados a esses serviços exclusivamente para moderação, em conformidade com os termos das APIs. Nenhum dado é compartilhado para outros fins.</p>

            <h2>3. Uso dos Dados</h2>
            <p>As informações que coletamos são utilizadas para os seguintes propósitos:</p>
            <ul>
              <li>Criar e gerenciar sua conta na Comunidade.</li>
              <li>Personalizar sua experiência no site.</li>
              <li>Garantir a segurança aplicando regras anti-spam e de moderação.</li>
              <li>Comunicação direta, como responder a dúvidas.</li>
            </ul>

            <h2>4. Cookies e Google AdSense</h2>
            <p>Podemos exibir anúncios fornecidos pelo Google AdSense. O Google, como fornecedor de terceiros, utiliza cookies (incluindo o cookie DART) para veicular anúncios baseados em suas visitas anteriores a este e a outros sites na Internet. Esse uso permite ao Google e seus parceiros exibir anúncios direcionados aos usuários. Você pode desativar a publicidade personalizada visitando as <a href="https://myaccount.google.com/privacy" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>.</p>

            <h2>5. Segurança</h2>
            <p>Empregamos medidas técnicas e organizacionais de segurança, incluindo criptografia HTTPS e acesso restrito, para proteger seus dados. Senhas são armazenadas com hash forte através de nosso provedor de banco de dados (PocketBase). Não vendemos seus dados a terceiros.</p>

            <h2>6. Seus Direitos (LGPD)</h2>
            <p>Sob a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:</p>
            <ul>
              <li>Confirmar a existência de tratamento de dados e acessá-los.</li>
              <li>Corrigir dados incompletos ou inexatos através do seu perfil.</li>
              <li>Solicitar a exclusão de sua conta e dos dados associados.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>

            <h2>7. Contato</h2>
            <p>Se você tiver qualquer dúvida sobre esta Política de Privacidade, entre em contato conosco através do e-mail:</p>
            <p><strong>contato@imigrarparaespanha.com.br</strong></p>

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

export default PrivacyPage;
