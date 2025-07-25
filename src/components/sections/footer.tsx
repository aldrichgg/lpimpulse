"use client"

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Acelere seu crescimento no Instagram com seguidores reais e engajamento autêntico.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Pacotes</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#packages" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Iniciante
              </Link>
              <Link href="#packages" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Influencer
              </Link>
              <Link href="#packages" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Celebridade
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Empresa</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Sobre Nós
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Termos de Serviço
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                Política de Privacidade
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Siga-nos</h4>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
                &copy; {currentYear} ImpulseGram Marketing. Todos os direitos reservados.
            </p>
        </div>
      </div>
    </footer>
  );
}
