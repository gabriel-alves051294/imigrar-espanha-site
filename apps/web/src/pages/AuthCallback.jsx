
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // PocketBase handles OAuth redirect automatically if setup correctly via popup.
    // This page serves as a fallback or safe landing.
    const timer = setTimeout(() => {
      navigate('/comunidade', { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h1 className="text-2xl font-semibold">Autenticando...</h1>
      <p className="text-muted-foreground mt-2">Você será redirecionado em instantes.</p>
    </div>
  );
};

export default AuthCallback;
