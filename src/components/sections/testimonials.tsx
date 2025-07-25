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

const testimonials = [
  {
    image: "https://i.imgur.com/ChSZOQQ.png",
    dataAiHint: "testimonial screenshot"
  },
  {
    image: "https://i.imgur.com/4K5120o.png",
    dataAiHint: "testimonial review"
  },
  {
    image: "https://i.imgur.com/3z6Jf6S.png",
    dataAiHint: "customer feedback"
  },
  {
    image: "https://i.imgur.com/ca63ejk.png",
    dataAiHint: "testimonial social media"
  },
  {
    image: "https://i.imgur.com/WHr6G2G.png",
    dataAiHint: "review social media"
  },
  {
    image: "https://i.imgur.com/r4lZd7T.png",
    dataAiHint: "customer testimonial"
  },
  {
    image: "https://i.imgur.com/Zmn6vIN.png",
    dataAiHint: "testimonial screenshot"
  },
  {
    image: "https://i.imgur.com/WTuaW81.png",
    dataAiHint: "testimonial review"
  },
  {
    image: "https://i.imgur.com/SZgDcte.png",
    dataAiHint: "customer review"
  },
  {
    image: "https://i.imgur.com/J1rnyvG.png",
    dataAiHint: "social media feedback"
  },
  {
    image: "https://i.imgur.com/I7KveBV.png",
    dataAiHint: "client testimonial"
  },
  {
    image: "https://i.imgur.com/lXiuQ5j.png",
    dataAiHint: "user feedback"
  },
  {
    image: "https://i.imgur.com/AWlDzwI.png",
    dataAiHint: "positive review"
  }
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
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-2">
                         <Image 
                            src={testimonial.image}
                            alt={`Depoimento ${index + 1}`}
                            width={300}
                            height={550}
                            className="rounded-md object-cover w-full h-full"
                            data-ai-hint={testimonial.dataAiHint}
                         />
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
