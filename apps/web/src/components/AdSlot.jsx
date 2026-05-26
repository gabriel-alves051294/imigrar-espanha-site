
import React, { useEffect, useRef } from 'react';

const AdSlot = ({ slot, format = 'auto', responsive = true }) => {
  const adRef = useRef(null);
  const client = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-0000000000000000';

  useEffect(() => {
    if (!client || client.includes('000000')) return;

    // Inject AdSense script globally ONCE
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
              console.error('AdSense push error:', e);
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [client]);

  // Sem client real (placeholder/dev): nao renderiza nada — evita "espaço publicitário reservado"
  // poluindo a percepção premium do produto.
  if (!client || client.includes('000000')) {
    return null;
  }

  return (
    <div className="ad-container overflow-hidden w-full" ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSlot;
