import { Button } from "@/components/ui/button"

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 448 512"
        {...props}
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7.1-4.2-73.3 19.3 19.3-71.6-4.7-7.5c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    )
}


export default function WhatsAppPurchaseSection() {
    return (
        <section id="whatsapp-purchase" className="w-full bg-background pt-0">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center py-12">
                    <WhatsAppIcon className="h-12 w-12 text-green-500 mb-4" />
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-foreground">
                        Compre conosco pelo WhatsApp
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Caso você prefira, pode realizar a compra dos seguidores diretamente com nossa equipe pelo WhatsApp, só clicar no botão abaixo 👇
                    </p>
                    <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-7 mt-4">
                        <a href="https://wa.me/5512981457975?text=Quero%20saber%20mais%20sobre%20a%20ImpulseGram" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="mr-3 h-6 w-6" />
                            COMPRAR PELO WHATSAPP
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
