import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-muted p-6 md:py-8 w-full border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ImpulseGram Marketing. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Termos de Serviço
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidade
            </Link>
        </div>
      </div>
    </footer>
  );
}
