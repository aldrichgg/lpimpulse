
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Rocket, Pilcrow, Package } from 'lucide-react';


function PixIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10.15,12.37,8.73,11a.5.5,0,0,0-.71.71l1.42,1.42a2,2,0,0,0,2.83,0l4.24-4.24a.5.5,0,0,0-.71-.71L12,11.66A4,4,0,0,1,10.15,12.37Z" />
            <path d="M12,22h0a10,10,0,0,1-8.6-4.9L2.12,14.65a.5.5,0,0,1,.87-.5L4,15.69A8,8,0,0,0,12,20h0a8,8,0,0,0,8-8V11a.5.5,0,0,1,1,0v1A10,10,0,0,1,12,22Z" />
            <path d="M12,2a10,10,0,0,0-8.6,4.9L2.12,9.35a.5.5,0,0,0,.87.5L4,8.31A8,8,0,0,1,12,4h0a8,8,0,0,1,8,8V13a.5.5,0,0,0,1,0V12A10,10,0,0,0,12,2Z" />
        </svg>
    )
}


export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', followers: '' });
    const [includeUpsell, setIncludeUpsell] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const name = searchParams.get('name') || 'Pacote não selecionado';
        const price = searchParams.get('price') || '0';
        const followers = searchParams.get('followers') || '';

        setSelectedPackage({ name, price, followers });

        const mainPrice = parseFloat(price.replace(',', '.'));
        setTotalPrice(mainPrice);

    }, [searchParams]);

    useEffect(() => {
        const mainPrice = parseFloat(selectedPackage.price.replace(',', '.'));
        const upsellPrice = 29.90;
        let newTotal = mainPrice;

        if (includeUpsell) {
            newTotal += upsellPrice;
        }

        setTotalPrice(newTotal);
    }, [includeUpsell, selectedPackage.price])


    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Package className="h-6 w-6" />Resumo do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">{selectedPackage.name} ({selectedPackage.followers} seguidores)</span>
                            <span className="font-semibold">R$ {selectedPackage.price}</span>
                        </div>

                        <Separator />

                        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                           <div className="flex items-start space-x-4">
                               <Checkbox id="upsell" checked={includeUpsell} onCheckedChange={(checked) => setIncludeUpsell(checked as boolean)} className="mt-1" />
                               <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="upsell"
                                    className="text-base font-bold text-primary flex items-center gap-2"
                                >
                                    <Rocket className="h-5 w-5"/> Garanta seu lugar no topo!
                                </label>
                                <p className="text-sm font-semibold text-foreground">Oferta Especial por R$ 29,90</p>
                                <p className="text-sm text-muted-foreground">
                                Usando nossos métodos exclusivos de Inteligência Artificial, vamos impulsionar seu perfil direto para o Explorar por 24 horas! 🔥
                                </p>
                               </div>
                           </div>
                        </div>

                        <Separator />
                        
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informações de Pagamento</CardTitle>
                        <CardDescription>Preencha seus dados para finalizar o pedido.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Seu @usuário do Instagram</Label>
                            <Input id="instagram" placeholder="@seu_perfil" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu melhor e-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" required />
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                             <Label>Forma de Pagamento</Label>
                             <RadioGroup defaultValue="pix" className="grid grid-cols-2 gap-4">
                                <div>
                                    <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                                    <Label
                                    htmlFor="pix"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <PixIcon className="mb-3 h-6 w-6" />
                                        PIX
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                    <Label
                                    htmlFor="card"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <CreditCard className="mb-3 h-6 w-6" />
                                        Cartão de Crédito
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button type="submit" className="w-full font-bold text-lg py-7 mt-4" size="lg">
                            Finalizar Compra
                        </Button>
                         <p className="text-xs text-muted-foreground text-center">Pagamento seguro via PIX ou Cartão de Crédito</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
