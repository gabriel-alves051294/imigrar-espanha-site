
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Mail, Facebook } from 'lucide-react';

const AuthModal = ({ open, onOpenChange }) => {
  const { signInWith, loginWithPassword, signUp, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleOAuth = (provider) => {
    signInWith(provider).then(() => onOpenChange(false)).catch(() => {});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithPassword(email, password);
      onOpenChange(false);
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      onOpenChange(false);
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Entrar na Comunidade</DialogTitle>
          <DialogDescription className="text-center">
            Junte-se a milhares de brasileiros a caminho da Espanha — é gratuito.
          </DialogDescription>
        </DialogHeader>

        {/* Atalho explícito pra quem já comprou e está procurando o PDF.
            Resolve confusão de tráfego pós-Hotmart caindo aqui sem encontrar o material. */}
        <div className="mt-3 rounded-lg border border-secondary/30 bg-secondary/5 px-3 py-2.5 text-sm">
          <span className="font-medium">Já comprou o guia?</span>{' '}
          <a
            href="https://hotmart.com/club"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline font-medium"
          >
            Acesse seu material na Hotmart →
          </a>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button 
            variant="outline" 
            className="w-full justify-center flex gap-2 h-12 text-foreground"
            onClick={() => handleOAuth('google')}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
            </svg>
            Continuar com Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-center flex gap-2 h-12 text-foreground"
            onClick={() => handleOAuth('facebook')}
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            Continuar com Facebook
          </Button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou</span>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
            {error}
          </div>
        )}

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background text-foreground"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background text-foreground"
                  required 
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar com E-mail"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Nome completo</Label>
                <Input 
                  id="reg-name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background text-foreground"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">E-mail</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background text-foreground"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Senha</Label>
                <Input 
                  id="reg-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background text-foreground"
                  minLength={8}
                  required 
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Criando..." : "Criar conta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
