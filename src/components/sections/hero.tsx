import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full pt-24 md:pt-32 lg:pt-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-400">
                Transforme seu Instagram com a ImpulseGram
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Compre seguidores reais e brasileiros para aumentar seu engajamento, autoridade e alcance. Resultados rápidos e seguros.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#packages">
                  Ver Pacotes
                  <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-400 rounded-lg blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <Image
              src="https://placehold.co/1280x800.png"
              alt="Hero"
              width={1280}
              height={800}
              className="relative mx-auto aspect-[16/10] overflow-hidden rounded-xl object-cover sm:w-full"
              data-ai-hint="social media growth abstract"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
