// ────────────────────────────────────────────────────────────────────
// RequireAuth — guard de rotas privadas.
//
// Uso:
//   <Route element={<RequireAuth />}>
//     <Route path="/comunidade" element={<CommunityPage />} />
//   </Route>
//
// Comportamento:
//   - Aguarda hidratação do AuthContext (mostra spinner).
//   - Se não logado: redireciona para "/" e dispara um evento global
//     ("auth:open") que o Header escuta para abrir o AuthModal,
//     preservando a rota original em `state.from` para retornar
//     depois do login.
// ────────────────────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

const RequireAuth = () => {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  // Dispara solicitação de abertura do modal de auth quando o usuário
  // tenta acessar uma rota privada sem estar logado.
  useEffect(() => {
    if (!isLoading && !session) {
      window.dispatchEvent(
        new CustomEvent('auth:open', { detail: { redirectTo: location.pathname } })
      );
    }
  }, [isLoading, session, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Carregando sessão...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
