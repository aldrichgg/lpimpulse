
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Rocket, Package, Copy } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"


function PixIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10.15,12.37,8.73,11a.5.5,0,0,0-.71.71l1.42,1.42a2,2,0,0,0,2.83,0l4.24-4.24a.5.5,0,0,0-.71-.71L12,11.66A4,4,0,0,1,10.15,12.37Z" />
            <path d="M12,22h0a10,10,0,0,1-8.6-4.9L2.12,14.65a.5.5,0,0,1,.87-.5L4,15.69A8,8,0,0,0,12,20h0a8,8,0,0,0,8-8V11a.5.5,0,0,1,1,0v1A10,10,0,0,1,12,22Z" />
            <path d="M12,2a10,10,0,0,0-8.6,4.9L2.12,9.35a.5.5,0,0,0,.87.5L4,8.31A8,8,0,0,1,12,4h0a8,8,0,0,1,8,8V13a.5.5,0,0,0,1,0V12A10,10,0,0,0,12,2Z" />
        </svg>
    )
}

function PixModal({ isOpen, onClose, pixCode, timeLeft, onCopy }: { isOpen: boolean, onClose: () => void, pixCode: string, timeLeft: string, onCopy: () => void }) {
    if (!isOpen) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-2xl font-bold">Pague com PIX</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Aponte a câmera do seu celular para o QR Code ou copie o código abaixo.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <Image
                        src="https://placehold.co/250x250.png"
                        data-ai-hint="QR code"
                        alt="QR Code para pagamento PIX"
                        width={250}
                        height={250}
                    />
                     <div className="text-center text-lg font-bold text-destructive">
                        Tempo restante: {timeLeft}
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="pix-code">PIX Copia e Cola</Label>
                        <div className="flex items-center gap-2">
                            <Input id="pix-code" readOnly value={pixCode} className="text-xs"/>
                            <Button variant="outline" size="icon" onClick={onCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose} className="w-full">Fechar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', followers: '' });
    const [includeUpsell, setIncludeUpsell] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [isPixModalOpen, setIsPixModalOpen] = useState(false);
    
    const pixCode = "00020126360014br.gov.bcb.pix0114+5511999999999520400005303986540510.005802BR5913NOME DO LOJISTA6009SAO PAULO62070503***6304E2A4";
    
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(300);
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    if(timerRef.current) clearInterval(timerRef.current);
                    // aqui você pode fechar o modal ou mostrar uma mensagem de tempo esgotado
                    setIsPixModalOpen(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(pixCode);
        toast({
            title: "Copiado!",
            description: "Código PIX copiado para a área de transferência.",
        })
    };


    useEffect(() => {
        const name = searchParams.get('name') || 'Pacote não selecionado';
        const price = searchParams.get('price') || '0';
        const followers = searchParams.get('followers') || '';

        setSelectedPackage({ name, price, followers });
    }, [searchParams]);

    useEffect(() => {
        let mainPrice = parseFloat(selectedPackage.price.replace(',', '.'));
        if (isNaN(mainPrice)) {
            mainPrice = 0;
        }
        const upsellPrice = 29.90;
        let newTotal = mainPrice;

        if (includeUpsell) {
            newTotal += upsellPrice;
        }

        setTotalPrice(newTotal);
    }, [includeUpsell, selectedPackage.price])


    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (paymentMethod === 'pix') {
            startTimer();
            setIsPixModalOpen(true);
        } else {
            // Lógica para submissão de cartão de crédito
            console.log("Processando pagamento com cartão de crédito...");
            toast({
                title: "Processando...",
                description: "Seu pagamento com cartão de crédito está sendo processado.",
              })
        }
    }


    return (
        <>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
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
                             <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
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

                        {paymentMethod === 'card' && (
                            <div className="grid gap-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Número do Cartão</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="card-name">Nome no Cartão</Label>
                                    <Input id="card-name" placeholder="Nome como no cartão" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry-date">Validade (MM/AA)</Label>
                                        <Input id="expiry-date" placeholder="MM/AA" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" placeholder="123" required />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button type="submit" className="w-full font-bold text-lg py-7 mt-4" size="lg">
                            Finalizar Compra
                        </Button>
                         <p className="text-xs text-muted-foreground text-center">Pagamento seguro via PIX ou Cartão de Crédito</p>
                    </CardContent>
                </Card>
            </div>
        </form>
         <PixModal 
            isOpen={isPixModalOpen}
            onClose={() => {
                setIsPixModalOpen(false)
                if (timerRef.current) clearInterval(timerRef.current);
            }}
            pixCode={pixCode}
            timeLeft={formatTime(timeLeft)}
            onCopy={handleCopyToClipboard}
        />
        </>
    )
}

    