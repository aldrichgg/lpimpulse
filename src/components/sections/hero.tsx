import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full pt-24 md:pt-32 lg:pt-40 bg-accent">
      <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline animate-fade-in-up">
              Transforme seu Instagram com a ImpulseGram
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4 animate-fade-in-up animation-delay-200">
              Compre seguidores reais e brasileiros para aumentar seu engajamento, autoridade e alcance. Resultados rápidos e seguros.
            </p>
            <div className="mt-6 space-x-4 animate-fade-in-up animation-delay-400">
              <Button asChild size="lg">
                <Link href="#packages">Comprar Seguidores Agora</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center animate-fade-in animation-delay-500">
            <div className="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-md aspect-video group">
              <Image
                src="https://placehold.co/1280x720.png"
                alt="Video Placeholder"
                width={1280}
                height={720}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="social media growth"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircleIcon className="w-20 h-20 text-white/80 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    )
  }
