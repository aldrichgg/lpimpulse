
'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import CheckoutForm from '@/components/sections/checkout-form';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function CheckoutPageContent() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container px-4 md:px-6">
            <Button asChild variant="outline" size="icon">
                <Link href="/" aria-label="Voltar para o início">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
        </div>
      </header>
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
             <div className="flex flex-col items-center justify-center space-y-2 text-center mb-8">
                <Logo className="text-4xl" />
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl font-headline text-foreground">
                    Finalize sua Compra
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    Estamos quase lá! Complete os detalhes abaixo para impulsionar seu perfil.
                </p>
            </div>
            <CheckoutForm />
          </div>
        </div>
      </main>
    </div>
  );
}


export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CheckoutPageContent />
        </Suspense>
    )
}
