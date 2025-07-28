"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { packages, extraPackages } from "@/lib/packages"; // exporte seus arrays aqui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rocket, Package, CreditCard, Copy } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogClose,
} from "@/components/ui/dialog";
import Image from 'next/image';
// Adapte PixIcon para o seu projeto
function PixIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10.15,12.37,8.73,11a.5.5,0,0,0-.71.71l1.42,1.42a2,2,0,0,0,2.83,0l4.24-4.24a.5.5,0,0,0-.71-.71L12,11.66A4,4,0,0,1,10.15,12.37Z" />
            <path d="M12,22h0a10,10,0,0,1-8.6-4.9L2.12,14.65a.5.5,0,0,1,.87-.5L4,15.69A8,8,0,0,0,12,20h0a8,8,0,0,0,8-8V11a.5.5,0,0,1,1,0v1A10,10,0,0,1,12,22Z" />
            <path d="M12,2a10,10,0,0,0-8.6,4.9L2.12,9.35a.5.5,0,0,0,.87.5L4,8.31A8,8,0,0,1,12,4h0a8,8,0,0,1,8,8V13a.5.5,0,0,0,1,0V12A10,10,0,0,0,12,2Z" />
        </svg>
    );
}

function PixModal({ open, onOpenChange, pixCode, qrCodeUrl, onCopy, timeLeft }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pixCode: string;
    qrCodeUrl: string;
    onCopy: () => void;
    timeLeft: string;
}) {
    if (!open) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Pagamento via PIX</DialogTitle>
                    <DialogDescription className="text-center">
                        Escaneie o QR Code ou copie o código abaixo para finalizar seu pedido.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <Image
                        src={`data:image/png;base64,${qrCodeUrl}`}
                        alt="QR Code Pix"
                        width={220}
                        height={220}
                        className="rounded"
                    />
                    <div className="text-center text-lg font-bold text-destructive">
                        Tempo restante: {timeLeft}
                    </div>
                    <div className="w-full space-y-2">
                        <label htmlFor="pix-code">PIX Copia e Cola</label>
                        <div className="flex items-center gap-2">
                            <Input id="pix-code" readOnly value={pixCode} className="text-xs" />
                            <Button variant="outline" size="icon" type="button" onClick={onCopy}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="w-full">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    // Inputs
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [includeUpsell, setIncludeUpsell] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [isProcessing, setIsProcessing] = useState(false);
    const [pixModalOpen, setPixModalOpen] = useState(false);
    const [pixCode, setPixCode] = useState("00020126360014br.gov.bcb.pix01149999999999520400005303986540510.005802BR5913NOME6009SAOPAULO62070503***6304E2A4");
    const [qrCodeUrl, setQrCodeUrl] = useState("https://placehold.co/220x220.png?text=QR+Code"); // Substitua pelo QR real se tiver.
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    function formatTime(sec: number) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(pixCode);
        alert("Código PIX copiado!");
    };

    useEffect(() => {
        if (pixModalOpen) {
            setTimeLeft(300);
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setPixModalOpen(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [pixModalOpen]);

    // Busca pacote por serviceId na URL
    useEffect(() => {
        const packageId = Number(searchParams.get('packageId'));
        const allPackages = [...packages, ...extraPackages];
        const found = allPackages.find(pkg => pkg.packageId === packageId);
        setSelectedPackage(found || null);
    }, [searchParams]);

    // Preços
    const mainPrice = selectedPackage ? parseFloat((selectedPackage.discountPrice || selectedPackage.newPrice).toString().replace(',', '.')) : 0;
    const upsellPrice = 29.90;
    const totalPrice = includeUpsell ? mainPrice + upsellPrice : mainPrice;
    const priceWithFee = Number((totalPrice * 1.01).toFixed(2));
    const quantityFromTitle = selectedPackage ? parseInt(selectedPackage.title.match(/\d+/)?.[0] || "1", 10) : 1;

    // SUBMIT: envia body igual API espera
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const body = {
            transaction_amount: priceWithFee,
            description: `${selectedPackage?.title}${includeUpsell ? " + Oferta Especial" : ""}`,
            payment_method_id: paymentMethod === "pix" ? "pix" : "credit_card",
            payer: {
                email,
                first_name: name,
                last_name: "-",
                identification: {
                    type: "CPF",
                    number: cpf.replace(/\D/g, ""),
                },
            },
            metadata: {
                service_id: selectedPackage?.serviceId,
                link: profileLink,
                quantity: quantityFromTitle,
                email,
                celular: phone.replace(/\D/g, ""),
                first_name: name,
                platform: selectedPackage?.platform,
            }
        };

        try {


            if (paymentMethod === "pix") {
                const response = await fetch(
                    "https://new-back-end-phi.vercel.app/payments/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                    }
                );

                const result = await response.json();
                setPixCode(result.point_of_interaction.transaction_data.qr_code);
                setQrCodeUrl(result.point_of_interaction.transaction_data.qr_code_base64);
                gtag_report_conversion();
                setPixModalOpen(true);
            } else {
                alert("Pedido enviado! (Cartão de crédito)");
            }
        } catch (err) {
            alert("Erro ao finalizar pedido");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!selectedPackage) {
        return <div className="p-6 text-center">Pacote não encontrado!</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                {/* RESUMO DO PEDIDO */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Package className="h-6 w-6" />Resumo do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{selectedPackage.title} ({selectedPackage.followers} seguidores)</span>
                                <span className="font-semibold">R$ {selectedPackage.newPrice || selectedPackage.discountPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Bônus Seguidores:</span>
                                <span>{selectedPackage.bonusFollowers}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Bônus Engajamento:</span>
                                <span>{selectedPackage.engagementBonus}</span>
                            </div>
                            <Separator />
                            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                                <div className="flex items-start space-x-4">
                                    <Checkbox id="upsell" checked={includeUpsell} onCheckedChange={(checked: any) => setIncludeUpsell(checked as boolean)} className="mt-1" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="upsell" className="text-base font-bold text-primary flex items-center gap-2">
                                            <Rocket className="h-5 w-5" /> Garanta seu lugar no topo!
                                        </label>
                                        <p className="text-sm font-semibold text-foreground">Oferta Especial por R$ 29,90</p>
                                        <p className="text-sm text-muted-foreground">
                                            Usando nossos métodos exclusivos de Inteligência Artificial, vamos impulsionar seu perfil direto para o Explorar por 24h! 🔥
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

                {/* FORMULÁRIO DO USUÁRIO */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações de Pagamento</CardTitle>
                            <CardDescription>Preencha seus dados para finalizar o pedido.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Seu nome</Label>
                                <Input id="name" placeholder="João da silva" required value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Seu melhor e-mail</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cpf">Seu CPF</Label>
                                <Input id="cpf" placeholder="000.000.000-00" required value={cpf} onChange={e => setCpf(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Celular</Label>
                                <Input id="phone" placeholder="(99) 99999-9999" required value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profileLink">Link do Perfil</Label>
                                <Input id="profileLink" placeholder="https://instagram.com/seu_perfil" value={profileLink} onChange={e => setProfileLink(e.target.value)} />
                            </div>
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <Label>Forma de Pagamento</Label>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                    className="grid grid-cols-1 gap-4"
                                >
                                    <div className="w-full">
                                        <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                                        <Label
                                            htmlFor="pix"
                                            className="flex flex-col items-center justify-between w-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                                        >
                                            <PixIcon className="mb-3 h-6 w-6" /> PIX
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {/* {paymentMethod === "credit_card" && (
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
                                )} */}
                            </div>

                            <Button type="submit" className="w-full font-bold text-lg py-7 mt-4" size="lg" disabled={isProcessing}>
                                {isProcessing ? "Processando..." : "Finalizar Compra"}
                            </Button>
                            <p className="text-xs text-muted-foreground text-center">Pagamento seguro via PIX ou Cartão de Crédito</p>
                        </CardContent>
                    </Card>
                </div>
            </form>
            <PixModal
                open={pixModalOpen}
                onOpenChange={setPixModalOpen}
                pixCode={pixCode}
                qrCodeUrl={qrCodeUrl}
                onCopy={handleCopyToClipboard}
                timeLeft={formatTime(timeLeft)}
            />
        </>
    );
}

declare global {
    interface Window {
      gtag?: (...args: any[]) => void;
    }
  }
  
  function gtag_report_conversion(url?: string) {
    const callback = () => {
      if (typeof url !== 'undefined') {
        window.location.href = url;
      }
    };
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17382362278/KReeCIbyx_oaEKaZx-BA',
        transaction_id: '',
        event_callback: callback,
      });
    }
  }
  