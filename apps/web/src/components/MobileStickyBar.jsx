
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only run on mobile viewport
      if (window.innerWidth >= 768) {
        setIsVisible(false);
        return;
      }
      
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollY / scrollHeight) * 100;

      // Show after 30% scroll
      if (scrollPercentage > 30) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.1)] md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">R$ 67</span>
              <span className="text-xs text-muted-foreground font-medium">Acesso em segundos</span>
            </div>
            <a
              href="https://pay.hotmart.com/E105769769S?checkoutMode=10"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-md flex-1 text-center whitespace-nowrap"
            >
              Quero meu guia
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
