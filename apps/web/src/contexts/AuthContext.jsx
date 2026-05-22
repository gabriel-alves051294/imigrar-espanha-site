
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

  const signInWith = (provider) => {
    setError(null);
    return pb.collection('users').authWithOAuth2({ provider })
      .then((authData) => {
        setSession(authData.record);
        toast.success(`Bem-vindo, ${authData.record.name || 'usuário'}!`);
        return authData;
      })
      .catch((err) => {
        setError('Falha ao autenticar com ' + provider);
        toast.error('Falha ao autenticar com ' + provider);
        throw err;
      });
  };

  const loginWithPassword = async (email, password) => {
    setError(null);
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setSession(authData.record);
      toast.success('Login realizado com sucesso!');
      return authData;
    } catch (err) {
      setError('Credenciais inválidas.');
      toast.error('E-mail ou senha incorretos.');
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
      
      // Auto login after signup
      await loginWithPassword(email, password);
      return record;
    } catch (err) {
      setError('Erro ao criar conta. E-mail pode já estar em uso.');
      toast.error('Erro ao criar conta.');
      throw err;
    }
  };

  const signOut = () => {
    pb.authStore.clear();
    setSession(null);
    toast.success('Você saiu da conta.');
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
