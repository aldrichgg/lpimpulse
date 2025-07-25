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
import { Check, Sparkles, Zap, Loader2, Gem, Rocket, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateBonusAction } from "@/app/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";

const packages = {
    monthly: [
      {
        name: "Iniciante Mensal",
        followers: "1,000",
        price: "29,90",
        description: "Comece a construir sua presença de forma consistente.",
        features: ["Seguidores Brasileiros", "Entrega Gradual", "Suporte 24/7"],
        isAIPowered: false,
        icon: Rocket,
        highlight: null,
      },
      {
        name: "Influencer Mensal",
        followers: "5,000",
        price: "99,90",
        description: "Crescimento constante para quem leva a sério.",
        features: [
          "Tudo do plano Iniciante",
          "Entrega Prioritária",
          "Análise de Perfil Grátis",
        ],
        isAIPowered: true,
        icon: Gem,
        highlight: "Mais Popular",
      },
      {
        name: "Celebridade Mensal",
        followers: "15,000",
        price: "249,90",
        description: "Domine seu nicho com crescimento acelerado.",
        features: [
          "Tudo do plano Influencer",
          "Consultoria Estratégica",
          "Menções em Perfis Parceiros",
        ],
        isAIPowered: false,
        icon: Crown,
        highlight: null,
      },
    ],
    once: [
      {
        name: "Iniciante",
        followers: "5,000",
        price: "49,90",
        description: "Ideal para dar o primeiro passo e começar a crescer.",
        features: ["Seguidores Brasileiros", "Entrega Rápida", "Suporte 24/7"],
        isAIPowered: false,
        icon: Rocket,
        highlight: null,
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
        isAIPowered: true,
        icon: Gem,
        highlight: "Mais Vendido",
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
        isAIPowered: false,
        icon: Crown,
        highlight: null,
      },
    ]
  };

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
    <div className="bg-primary/5 border-t border-primary/10 mt-6 -mx-6 px-6 pt-6 pb-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
            <Sparkles className="text-primary w-5 h-5" />
        </div>
        <h4 className="font-semibold text-primary text-lg">Bônus Exclusivo com IA</h4>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Descreva seu perfil (ex: fitness, culinária, viagens) e nossa IA criará um bônus especial para você!
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
        <Button type="submit" className="w-full" disabled={loading} variant="secondary">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Gerando..." : "Gerar Meu Bônus"}
        </Button>
      </form>
      {bonus && (
         <div className="mt-4 p-4 rounded-lg bg-primary/10 text-primary-dark font-medium text-sm border border-primary/20">
            <p className="font-bold text-base text-primary">Sua oferta especial:</p> 
            <p className="text-muted-foreground mt-1">{bonus}</p>
        </div>
      )}
    </div>
  );
}

function PackageCard({ pkg }: { pkg: typeof packages.once[0] }) {
    const Icon = pkg.icon;
    return (
        <Card
        className={cn(
          "relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
          pkg.highlight ? "border-primary shadow-lg border-2 ring-4 ring-primary/10" : "border"
        )}
      >
        {pkg.highlight && (
          <Badge
            variant="default"
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold shadow-lg"
          >
            {pkg.highlight}
          </Badge>
        )}
        <CardHeader className="pt-12">
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full border-4 border-background">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
            </div>
          <CardTitle className="font-headline text-2xl text-center">{pkg.name}</CardTitle>
          <CardDescription className="text-center">{pkg.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-center my-4">
            <span className="text-5xl font-bold tracking-tighter">
              {pkg.followers}
            </span>
            <span className="text-lg font-semibold text-muted-foreground ml-1">
              seguidores
            </span>
          </div>
          <ul className="space-y-3 text-sm my-8">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch p-0">
          {pkg.isAIPowered && <BonusGenerator packageDescription={`${pkg.name} - ${pkg.followers} seguidores`} />}
          <div className="p-6">
              <div className="flex items-baseline justify-center gap-1 my-4">
                  <span className="text-lg font-semibold">R$</span>
                  <span className="text-6xl font-bold tracking-tighter text-primary">
                  {pkg.price.split(',')[0]}
                  </span>
                  <span className="text-lg font-semibold">,{pkg.price.split(',')[1]}</span>
              </div>
              <Button size="lg" className="w-full text-lg py-7 font-bold">
                  Comprar Agora <Zap className="ml-2"/>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">Pagamento seguro via PIX ou Cartão de Crédito</p>
          </div>
        </CardFooter>
      </Card>
    )
}

export default function PackagesSection() {
  return (
    <section id="packages" className="w-full bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="text-sm">Nossos Pacotes</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Planos Flexíveis Para o Seu Sucesso
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Escolha entre compras únicas para um impulso rápido ou assinaturas mensais para um crescimento contínuo e sustentável.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
            <Tabs defaultValue="once" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="once">Compra Única</TabsTrigger>
                    <TabsTrigger value="monthly">Assinatura Mensal</TabsTrigger>
                </TabsList>
                <TabsContent value="once">
                    <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
                        {packages.once.map((pkg) => (
                           <PackageCard key={pkg.name} pkg={pkg} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="monthly">
                    <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
                        {packages.monthly.map((pkg) => (
                            <PackageCard key={pkg.name} pkg={pkg} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </section>
  );
}
