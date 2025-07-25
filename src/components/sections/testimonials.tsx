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
    image: "https://placehold.co/300x550.png",
    dataAiHint: "testimonial screenshot"
  },
  {
    image: "https://placehold.co/300x550.png",
    dataAiHint: "testimonial review"
  },
  {
    image: "https://placehold.co/300x550.png",
    dataAiHint: "customer feedback"
  },
  {
    image: "https://placehold.co/300x550.png",
    dataAiHint: "testimonial social media"
  },
    {
    image: "https://placehold.co/300x550.png",
    dataAiHint: "review social media"
  },
  {
    image: "https://placehold.co/300x550.png",
    dataAiHint: "customer testimonial"
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
