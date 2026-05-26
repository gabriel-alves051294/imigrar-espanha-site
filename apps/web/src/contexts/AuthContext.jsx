
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbase.js';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial sync
    setSession(pb.authStore.model);
    setIsLoading(false);

    // Listen to auth changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setSession(model);
    });

    return () => unsubscribe();
  }, []);

  // Nome formatado pro provider (Google, Facebook, etc) — só estética dos toasts.
  const providerLabel = (p) => (p ? p.charAt(0).toUpperCase() + p.slice(1) : 'rede social');

  const signInWith = (provider) => {
    setError(null);
    return pb.collection('users').authWithOAuth2({ provider })
      .then((authData) => {
        setSession(authData.record);
        const nome = authData.record.name?.split(' ')[0] || 'amigo';
        toast.success(`Boas-vindas, ${nome}! Sua jornada começa aqui.`);
        return authData;
      })
      .catch((err) => {
        const msg = `O login com ${providerLabel(provider)} não foi concluído. Tente de novo ou use e-mail e senha.`;
        setError(msg);
        toast.error(msg);
        throw err;
      });
  };

  const loginWithPassword = async (email, password) => {
    setError(null);
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setSession(authData.record);
      const nome = authData.record.name?.split(' ')[0] || 'amigo';
      toast.success(`Bem-vindo de volta, ${nome}.`);
      return authData;
    } catch (err) {
      const msg = 'E-mail ou senha não conferem. Tente novamente — se esqueceu, escreva pra contato@imigrarparaespanha.com.br.';
      setError(msg);
      toast.error(msg);
      throw err;
    }
  };

  const signUp = async (email, password, name) => {
    setError(null);
    try {
      const record = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name
      }, { $autoCancel: false });

      // Marca primeiro acesso pra CommunityPage exibir banner de onboarding.
      try { localStorage.setItem('first_visit_pending', '1'); } catch (_) { /* storage indisponível */ }

      // Auto login after signup
      await loginWithPassword(email, password);
      return record;
    } catch (err) {
      const msg = 'Não conseguimos criar sua conta. Se você já tem cadastro, faça login. Se o problema continuar, escreva pra contato@imigrarparaespanha.com.br.';
      setError(msg);
      toast.error(msg);
      throw err;
    }
  };

  const signOut = () => {
    pb.authStore.clear();
    setSession(null);
    toast.success('Até breve. Sua jornada continua quando você voltar.');
  };

  const value = {
    session,
    isLoading,
    error,
    signInWith,
    loginWithPassword,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
