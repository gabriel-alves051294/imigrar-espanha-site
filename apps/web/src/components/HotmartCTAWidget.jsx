
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const HotmartCTAWidget = () => {
  const hotmartLink = import.meta.env.VITE_HOTMART_URL || "https://pay.hotmart.com/E105769769S?checkoutMode=10";

  return (
    <Card className="border-secondary ring-1 ring-secondary/20 shadow-md bg-card overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-secondary to-primary" />
      <CardContent className="p-6">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-md mb-2">
            OFERTA EXCLUSIVA
          </span>
          <h3 className="text-xl font-bold leading-tight mb-2">
            Guia Completo: Imigre para a Espanha
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Passo a passo prático do visto FP. Permissão de trabalho automática e cidadania em 2 anos.
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <span>Checklist à prova de falhas</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
            <span>Templates validados</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-extrabold text-foreground">R$67</span>
          <span className="text-sm text-muted-foreground">à vista</span>
        </div>

        <Button 
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-sm"
          asChild
        >
          <a href={hotmartLink} target="_blank" rel="noopener noreferrer">
            Quero meu guia · R$67
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotmartCTAWidget;
