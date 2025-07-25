import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Badge } from "../ui/badge";
  
const faqs = [
    {
        question: "Os seguidores são reais?",
        answer: "Sim, todos os seguidores que fornecemos são de perfis brasileiros e reais. Nosso sistema avançado garante que você receba seguidores de alta qualidade, o que contribui para um crescimento autêntico e seguro do seu perfil."
    },
    {
        question: "Preciso informar minha senha do Instagram?",
        answer: "Não, de forma alguma! Nós nunca solicitaremos sua senha. Para realizar o serviço, precisamos apenas do seu nome de usuário (@seu_perfil). Sua segurança e privacidade são nossa maior prioridade."
    },
    {
        question: "Em quanto tempo receberei os seguidores?",
        answer: "A entrega dos seguidores começa poucos minutos após a confirmação do pagamento. O processo é rápido e gradual para simular um crescimento natural e evitar qualquer tipo de bloqueio ou penalidade do Instagram."
    },
    {
        question: "Corro o risco de ter minha conta banida?",
        answer: "O risco é praticamente zero. Utilizamos métodos seguros e que estão em conformidade com as diretrizes do Instagram. Trabalhamos com perfis reais, o que torna o processo indetectável pela plataforma."
    },
    {
        question: "Quais são as formas de pagamento?",
        answer: "Aceitamos as formas de pagamento mais populares e seguras, incluindo PIX e Cartão de Crédito. Todo o processo de pagamento é criptografado para garantir a segurança dos seus dados."
    },
    {
        question: "Existe garantia ou suporte?",
        answer: "Sim! Oferecemos suporte completo via WhatsApp e e-mail para tirar qualquer dúvida que você possa ter. Além disso, garantimos a reposição de seguidores caso ocorra alguma queda durante o período de 30 dias."
    }
]

export default function FaqSection() {
    return (
        <section id="faq" className="w-full bg-secondary/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-sm border-foreground/50">Dúvidas Frequentes</Badge>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
                            Perguntas Frequentes
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Ainda tem dúvidas? Aqui estão algumas das perguntas mais comuns que recebemos.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl mt-12">
                    <Accordion type="single" collapsible className="w-full">
                       {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                       ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
