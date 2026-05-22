
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

  // Don't render ads if no client ID is provided in non-production
  if (!client || client.includes('000000')) {
    return (
      <div className="ad-container text-muted-foreground text-sm">
        [ Espaço Publicitário Reservado ]
      </div>
    );
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
