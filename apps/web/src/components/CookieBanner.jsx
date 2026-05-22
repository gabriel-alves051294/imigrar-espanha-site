
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not immediately pop up on first render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    sessionStorage.setItem('cookieConsent', 'rejected'); // Store in session to avoid bugging them immediately, but don't save permanently
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="container max-w-5xl mx-auto pointer-events-auto">
            <div className="bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full hidden sm:block">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-foreground">Sua privacidade é importante</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Usamos cookies para autenticar você (PocketBase), exibir publicidade
                    relevante (Google AdSense) e moderar conteúdo da comunidade (Perspective API
                    e Vision SafeSearch). Ao clicar em "Aceitar" você concorda com esses usos.
                    Detalhes na nossa {' '}
                    <Link to="/privacidade" className="text-primary hover:underline font-medium focus-visible:outline-primary">
                      Política de Privacidade
                    </Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <Button 
                  variant="outline" 
                  onClick={handleReject}
                  className="w-full md:w-auto hover:bg-muted"
                >
                  Rejeitar
                </Button>
                <Button 
                  onClick={handleAccept}
                  className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Aceitar
                </Button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
