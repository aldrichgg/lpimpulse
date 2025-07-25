import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-headline font-bold text-2xl text-primary tracking-tight", className)}>
      ImpulseGram
    </span>
  )
}
