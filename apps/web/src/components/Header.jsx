
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LogOut, Users } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext.jsx';
import AuthModal from '@/components/AuthModal.jsx';
import pb from '@/lib/pocketbase.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { session, signOut } = useAuth();

  // Permite que outros componentes (ex: RequireAuth) solicitem
  // a abertura do modal de auth via evento global.
  React.useEffect(() => {
    const handler = () => setAuthOpen(true);
    window.addEventListener('auth:open', handler);
    return () => window.removeEventListener('auth:open', handler);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Comunidade', href: '/comunidade' },
    { name: 'Afiliados', href: '/afiliados' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg border-b border-primary/20">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground px-4 py-2 rounded-md z-[100]"
        >
          Pular para o conteúdo principal
        </a>

        <div className="h-1 w-full bg-gradient-to-r from-[hsl(var(--brazil-green))] via-[hsl(var(--spain-yellow))] to-[hsl(var(--spain-red))]" />
        
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-2 focus-visible:outline-white">
              <span className="text-xl md:text-2xl font-bold">Do Brasil para a Espanha</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Navegação Principal">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium hover:text-[hsl(var(--spain-yellow))] transition-colors duration-200 relative group focus-visible:outline-white focus-visible:ring-offset-primary p-1 rounded-sm",
                    (location.pathname.startsWith(link.href) && link.href !== '/') || location.pathname === link.href ? "text-[hsl(var(--spain-yellow))]" : ""
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[hsl(var(--brazil-green))] transition-all duration-300",
                    (location.pathname.startsWith(link.href) && link.href !== '/') || location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </Link>
              ))}

              <div className="pl-4 border-l border-primary-foreground/20 flex items-center">
                {!session ? (
                  <Button 
                    onClick={() => setAuthOpen(true)}
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                  >
                    Entrar
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-visible:ring-offset-primary focus-visible:outline-white">
                        <Avatar className="h-10 w-10 border border-primary-foreground/20">
                          <AvatarImage src={session.avatar ? pb.files.getUrl(session, session.avatar) : ''} alt={session.name || 'Usuário'} />
                          <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">{session.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{session.name || 'Usuário'}</p>
                          <p className="w-[200px] truncate text-xs text-muted-foreground">{session.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/comunidade">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Comunidade</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90" aria-label="Abrir menu de navegação">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary text-primary-foreground border-l-[hsl(var(--spain-red))]">
                <SheetTitle className="text-primary-foreground sr-only">Menu de Navegação</SheetTitle>
                <div className="flex flex-col space-y-6 mt-8">
                  {session && (
                    <div className="flex items-center gap-3 px-4 pb-4 border-b border-primary-foreground/20">
                      <Avatar className="h-12 w-12 border border-primary-foreground/20">
                        <AvatarImage src={session.avatar ? pb.files.getUrl(session, session.avatar) : ''} />
                        <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">{session.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{session.name || 'Usuário'}</span>
                        <span className="text-xs opacity-70 truncate max-w-[150px]">{session.email}</span>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium hover:text-[hsl(var(--spain-yellow))] transition-all duration-200 border-l-2 pl-4 py-2",
                        (location.pathname.startsWith(link.href) && link.href !== '/') || location.pathname === link.href ? "border-[hsl(var(--spain-yellow))] text-[hsl(var(--spain-yellow))]" : "border-transparent hover:border-[hsl(var(--brazil-green))]"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="pt-4 px-4 space-y-4">
                    {!session ? (
                      <Button 
                        onClick={() => { setIsOpen(false); setAuthOpen(true); }}
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        Entrar na Comunidade
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => { signOut(); setIsOpen(false); }}
                        variant="outline"
                        className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sair
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Header;
