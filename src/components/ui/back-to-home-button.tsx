import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackToHomeButtonProps {
  readonly href: string;
  readonly label?: string;
  readonly className?: string;
}

export function BackToHomeButton({
  href,
  label = "Torna alla Home",
  className = "",
}: Readonly<BackToHomeButtonProps>) {
  return (
    <section aria-label="Ritorno alla Home" className={`w-full py-12 sm:py-16 text-center border-t border-border/40 bg-muted/20 ${className}`}>
      <div className="container px-4 mx-auto flex flex-col items-center justify-center space-y-3">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group rounded-full h-11 sm:h-12 px-6 sm:px-8 border-border/80 bg-background/90 hover:bg-muted/80 hover:border-brand-accent/50 hover:text-foreground shadow-xs transition-all duration-200 font-medium text-xs sm:text-sm"
        >
          <Link href={href} prefetch={false}>
            <ArrowLeft className="mr-2 h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{label}</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
