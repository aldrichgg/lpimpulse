"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Julia S.",
    handle: "@jujufit",
    quote: "O engajamento no meu perfil de fitness explodiu! A ImpulseGram entregou seguidores reais e ativos. Superou minhas expectativas!",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "woman fitness"
  },
  {
    name: "Marcos V.",
    handle: "@marcoseats",
    quote: "Serviço confiável e suporte incrível. Consegui fechar duas parcerias grandes depois de usar o pacote Influencer.",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "man cooking"
  },
  {
    name: "Livia M.",
    handle: "@liviatrips",
    quote: "Como influenciadora de viagens, ter uma base sólida de seguidores é essencial. A ImpulseGram foi o empurrão que eu precisava. 100% satisfeita!",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "woman travel"
  },
  {
    name: "Carlos P.",
    handle: "@carlosgamer",
    quote: "Meu canal de games no Instagram decolou. A entrega foi super rápida e o suporte me ajudou com todas as dúvidas. Recomendo!",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "man gaming"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-accent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Histórias de sucesso de quem confiou na ImpulseGram para crescer.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <blockquote className="text-lg font-semibold leading-snug">
                          “{testimonial.quote}”
                        </blockquote>
                        <div className="flex items-center gap-4 mt-6">
                          <Avatar>
                            <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.handle}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
