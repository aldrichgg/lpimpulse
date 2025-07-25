"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateBonusAction } from "@/app/actions";
import { Badge } from "../ui/badge";

const packages = [
  {
    name: "Iniciante",
    followers: "5,000",
    price: "49,90",
    description: "Ideal para dar o primeiro passo e começar a crescer.",
    features: ["Seguidores Brasileiros", "Entrega Rápida", "Suporte 24/7"],
    highlight: null,
    isAIPowered: false,
  },
  {
    name: "Influencer",
    followers: "20,000",
    price: "149,90",
    description: "Acelere seu crescimento e alcance o status de influencer.",
    features: [
      "Tudo do plano Iniciante",
      "Entrega Prioritária",
      "Análise de Perfil Grátis",
    ],
    highlight: "Mais Vendido",
    isAIPowered: true,
  },
  {
    name: "Celebridade",
    followers: "50,000",
    price: "299,90",
    description: "Para quem busca o estrelato e máxima autoridade.",
    features: [
      "Tudo do plano Influencer",
      "Consultoria Estratégica",
      "Menções em Perfis Parceiros",
    ],
    highlight: "Maior Custo-Benefício",
    isAIPowered: false,
  },
];

function BonusGenerator({ packageDescription }: { packageDescription: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bonus, setBonus] = useState("");
  const [profile, setProfile] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setBonus("");

    const formData = new FormData(event.currentTarget);
    const result = await generateBonusAction(null, formData);
    
    setLoading(false);

    if (result.bonus) {
      setBonus(result.bonus);
      toast({
        title: "Bônus Personalizado Gerado!",
        description: "Confira sua oferta exclusiva abaixo.",
      });
    } else {
        toast({
            variant: "destructive",
            title: "Ocorreu um erro.",
            description: result.message || "Não foi possível gerar seu bônus. Tente novamente.",
        });
    }
  };

  return (
    <div className="bg-accent/50 border-t border-primary/20 mt-6 -mx-6 px-6 pt-4 pb-6">
      <div className="flex items-center gap-2">
        <Sparkles className="text-primary w-5 h-5" />
        <h4 className="font-semibold text-primary">Bônus Exclusivo com IA</h4>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Descreva seu perfil (ex: fitness, culinária, viagens) e nossa IA criará um bônus especial para você!
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Input
          name="userProfile"
          placeholder="Ex: 'Sou um(a) influencer de fitness...'"
          className="bg-background"
          required
          minLength={10}
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <input type="hidden" name="packageDescription" value={packageDescription} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Gerando..." : "Gerar Meu Bônus"}
        </Button>
      </form>
      {bonus && (
         <div className="mt-4 p-3 rounded-md bg-primary/10 text-primary-dark font-medium text-sm border border-primary/20">
            <p className="font-semibold">Sua oferta especial:</p> 
            <p>{bonus}</p>
        </div>
      )}
    </div>
  );
}


export default function PackagesSection() {
  return (
    <section id="packages" className="w-full bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Pacotes Feitos Para Você
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha o plano ideal para seus objetivos e comece a crescer no Instagram hoje mesmo.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={cn(
                "relative flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl",
                pkg.highlight ? "border-primary shadow-lg border-2" : ""
              )}
            >
              {pkg.highlight && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold"
                >
                  <Star className="w-4 h-4 mr-2" />
                  {pkg.highlight}
                </Badge>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="font-headline text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-baseline justify-center gap-1 my-4">
                  <span className="text-4xl font-bold tracking-tighter">
                    {pkg.followers}
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    seguidores
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch p-0">
                {pkg.isAIPowered && <BonusGenerator packageDescription={`${pkg.name} - ${pkg.followers} seguidores`} />}
                <div className="p-6 pt-4">
                    <div className="flex items-baseline justify-center gap-1 my-4">
                        <span className="text-sm font-semibold">R$</span>
                        <span className="text-5xl font-bold tracking-tighter text-primary">
                        {pkg.price}
                        </span>
                    </div>
                    <Button size="lg" className="w-full">
                        Comprar Agora
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">Pagamento seguro via PIX ou Cartão de Crédito</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
