
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    name: "Pacote Iniciante",
    followers: "1.000",
    bonusFollowers: "500",
    engagementBonus: "10.000",
    oldPrice: "197,00",
    newPrice: "97,00",
    highlight: null,
  },
  {
    name: "Pacote Amador",
    followers: "2.500",
    bonusFollowers: "1.000",
    engagementBonus: "20.000",
    oldPrice: "297,00",
    newPrice: "149,90",
    highlight: null,
  },
  {
    name: "Pacote Avançado",
    followers: "5.000",
    bonusFollowers: "1.500",
    engagementBonus: "30.000",
    oldPrice: "497,00",
    newPrice: "197,00",
    highlight: null,
  },
  {
    name: "Pacote Profissional",
    followers: "10.000",
    bonusFollowers: "2.000",
    engagementBonus: "50.000",
    oldPrice: "997,00",
    newPrice: "399,00",
    highlight: null,
  },
];

const extraPackages = [
    {
        name: "Pacote VIP",
        followers: "20.000",
        bonusFollowers: "5.000",
        engagementBonus: "100.000",
        oldPrice: "1.997,00",
        newPrice: "799,00",
        highlight: null,
    },
    {
        name: "Pacote Premium",
        followers: "50.000",
        bonusFollowers: "10.000",
        engagementBonus: "100.000",
        oldPrice: "3.500,00",
        newPrice: "1.200,00",
        highlight: null,
    },
    {
        name: "Pacote Elite",
        followers: "100.000",
        bonusFollowers: "20.000",
        engagementBonus: "150.000",
        oldPrice: "4.500,00",
        newPrice: "1.997,00",
        highlight: null,
    }
]

const features = [
    { text: "100% Seguro e Confidencial", icon: Check },
    { text: "Não precisamos da sua senha", icon: Check },
    { text: "Seguidores Reais e Brasileiros", icon: Check },
];

function CountdownTimer({ initialHours = 2, initialMinutes = 11, initialSeconds = 11 }) {
    const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);
  
    useEffect(() => {
        setTimeLeft({
            hours: initialHours,
            minutes: initialMinutes,
            seconds: initialSeconds,
        });
    }, [initialHours, initialMinutes, initialSeconds]);

    useEffect(() => {
        if (timeLeft === null) return;

        const timer = setTimeout(() => {
            if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
                // Timer finished
            } else {
                let seconds = timeLeft.seconds - 1;
                let minutes = timeLeft.minutes;
                let hours = timeLeft.hours;
        
                if (seconds < 0) {
                  seconds = 59;
                  minutes -= 1;
                }
                if (minutes < 0) {
                  minutes = 59;
                  hours -= 1;
                }
                
                if (hours < 0) {
                    hours = 0;
                }

                setTimeLeft({ hours, minutes, seconds });
            }
          }, 1000);
  
      return () => clearTimeout(timer);
    }, [timeLeft]);
  
    const formatTime = (time: number) => time.toString().padStart(2, '0');
  
    if (timeLeft === null) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-2 my-4">
            <span className="text-sm font-semibold text-muted-foreground">Somente Hoje</span>
            <div className="flex gap-1 text-center">
                <span className="bg-primary/10 text-primary font-bold text-lg rounded-md px-2 py-1">{formatTime(timeLeft.hours)}</span>
                <span className="text-primary font-bold text-lg">:</span>
                <span className="bg-primary/10 text-primary font-bold text-lg rounded-md px-2 py-1">{formatTime(timeLeft.minutes)}</span>
                <span className="text-primary font-bold text-lg">:</span>
                <span className="bg-primary/10 text-primary font-bold text-lg rounded-md px-2 py-1">{formatTime(timeLeft.seconds)}</span>
            </div>
      </div>
    );
}

function PackageCard({ pkg, countdownProps }: { pkg: typeof packages[0], countdownProps?: { initialHours?: number, initialMinutes?: number, initialSeconds?: number } }) {
    return (
        <Card
        className={cn(
          "relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full border-2",
          pkg.highlight ? "border-primary shadow-lg ring-4 ring-primary/10" : "border-border"
        )}
      >
        {pkg.highlight && (
           <div className="absolute top-0 right-0 overflow-hidden w-48 h-48">
             <Badge
               variant="default"
               className="absolute top-8 -right-5 rotate-45 bg-primary text-primary-foreground text-center w-40 py-2 text-sm font-semibold shadow-lg"
             >
               {pkg.highlight}
             </Badge>
           </div>
        )}
        <CardContent className="p-6 text-center flex flex-col flex-grow">
            <h3 className="font-headline text-2xl text-foreground font-semibold mt-4">{pkg.name}</h3>
            <p className="font-bold text-primary text-3xl mt-4">{pkg.followers} Seguidores</p>
            <p className="text-md text-muted-foreground font-medium">+ {pkg.bonusFollowers} Seguidores Bônus</p>
            <p className="text-md text-muted-foreground font-medium mb-4">+{pkg.engagementBonus} Bônus Engajamento</p>

            <div className="my-4">
                <span className="text-xl text-muted-foreground/60 line-through">
                R${pkg.oldPrice}
                </span>
                <p className="text-5xl font-bold text-foreground tracking-tight">
                    <span className="text-2xl align-top">R$</span>{pkg.newPrice.split(',')[0]}<span className="text-2xl align-top">,{pkg.newPrice.split(',')[1]}</span>
                </p>
            </div>

            <CountdownTimer {...countdownProps} />

            <ul className="space-y-2 text-sm my-6 text-left">
                {features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-2">
                        <feature.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature.text}</span>
                    </li>
                ))}
            </ul>
            
            <div className="mt-auto space-y-3">
                 <Input
                    name="userProfile"
                    placeholder="Digite seu @usuario"
                    className="bg-background text-center text-base"
                />
                <Button size="lg" className="w-full text-lg py-7 font-bold">
                    Comprar Agora <ArrowRight className="ml-2"/>
                </Button>
                <p className="text-xs text-muted-foreground text-center">Pagamento seguro via PIX ou Cartão de Crédito</p>
            </div>

        </CardContent>
      </Card>
    )
}

export default function PackagesSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="packages" className="w-full bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
              Conheça Nossos Pacotes
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              (Na compra de qualquer pacote ganhe também Bônus de engajamento: Curtidas + Views)
            </p>
            <p className="font-semibold text-foreground md:text-lg">Escolha o pacote ideal para você 👇</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {packages.map((pkg) => (
               <PackageCard key={pkg.name} pkg={pkg} />
            ))}
        </div>
        
        {!showMore && (
            <div className="text-center mt-12">
                <Button variant="outline" size="lg" onClick={() => setShowMore(true)}>
                    Ver mais pacotes
                    <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
            </div>
        )}

        {showMore && (
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                {extraPackages.map((pkg) => (
                    <PackageCard 
                        key={pkg.name} 
                        pkg={pkg}
                        countdownProps={{ initialHours: 1, initialMinutes: 31, initialSeconds: 35 }}
                    />
                ))}
            </div>
        )}

      </div>
    </section>
  );
}
