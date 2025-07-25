import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <Logo />
        <span className="sr-only">ImpulseGram Marketing</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild>
          <Link href="#packages">Garantir meu pacote</Link>
        </Button>
      </nav>
    </header>
  );
}
