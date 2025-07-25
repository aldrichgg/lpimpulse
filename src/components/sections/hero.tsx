import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

function VideoEmbed() {
  const embedHtml = `
    <div style="padding:56.25% 0 0 0;position:relative;">
      <iframe 
        src="https://player.vimeo.com/video/973549755?badge=0&autoplay=1&loop=1&autopause=0&player_id=0&app_id=58479" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        style="position:absolute;top:0;left:0;width:100%;height:100%;" 
        title="02- atendimento iniciado (semana 01)">
      </iframe>
    </div>
  `;
  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
}


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
             <div className="relative mx-auto aspect-video overflow-hidden rounded-xl">
              <VideoEmbed />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
