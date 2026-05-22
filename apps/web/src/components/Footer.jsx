
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-primary text-primary-foreground relative pt-16 pb-8">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--brazil-green))] via-[hsl(var(--spain-yellow))] to-[hsl(var(--spain-red))] opacity-80" />
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Do Brasil para a Espanha</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              O guia definitivo e atualizado para sua imigração legal via FP de Grado Superior. Transforme seu sonho europeu em realidade com segurança.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors focus-visible:outline-white rounded-sm" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors focus-visible:outline-white rounded-sm" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors focus-visible:outline-white rounded-sm" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/80 hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-white rounded-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/comunidade" className="text-sm text-primary-foreground/80 hover:text-white hover:translate-x-1 inline-block transition-all focus-visible:outline-white rounded-sm">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link to="/afiliados" className="text-sm text-primary-foreground/80 hover:text-[hsl(var(--spain-yellow))] hover:translate-x-1 inline-block transition-all focus-visible:outline-white rounded-sm font-medium">
                  Programa de Afiliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacidade" className="text-sm text-primary-foreground/80 hover:text-white transition-colors focus-visible:outline-white rounded-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-primary-foreground/80 hover:text-white transition-colors focus-visible:outline-white rounded-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/regras-comunidade" className="text-sm text-primary-foreground/80 hover:text-white transition-colors focus-visible:outline-white rounded-sm">
                  Regras da Comunidade
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-sm text-primary-foreground/60 font-mono">
                  CNPJ: [Seu CNPJ aqui]
                </span>
              </li>
            </ul>
          </div>

          {/* Contato Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 min-w-0">
                <Mail className="h-4 w-4 mt-0.5 text-primary-foreground/60 flex-shrink-0" />
                <a 
                  href="mailto:contato@imigrarparaespanha.com.br" 
                  className="text-sm text-primary-foreground/80 hover:text-white transition-colors focus-visible:outline-white rounded-sm break-all inline-block"
                >
                  contato@imigrarparaespanha.com.br
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">Espanha & Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            © 2026 Do Brasil para a Espanha. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <span>Pagamento Seguro via</span>
            <span className="font-semibold text-white">Hotmart</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
