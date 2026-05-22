
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      // Show after scrolling past hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
        >
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-4 relative flex flex-col items-center text-center">
            <button 
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
            
            <Button 
              size="lg" 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-semibold mb-2 shadow-lg shadow-secondary/20"
              asChild
            >
              <a href="#oferta">Acessar Guia Premium - R$ 67,00</a>
            </Button>
            
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--trust))]" />
              <span>Acesso imediato após pagamento | 30 dias de garantia</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
