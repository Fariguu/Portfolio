import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CornerDownRight } from "lucide-react";

interface SectionExploreButtonProps {
  readonly href: string;
  readonly label: string;
  readonly className?: string;
}

export function SectionExploreButton({
  href,
  label,
  className = "",
}: Readonly<SectionExploreButtonProps>) {
  return (
    <div className={`mt-10 sm:mt-14 text-center ${className}`}>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="group rounded-full h-11 sm:h-12 px-6 sm:px-8 border-border/80 bg-background/90 hover:bg-muted/80 hover:border-brand-accent/50 hover:text-foreground shadow-xs transition-all duration-200 font-medium text-xs sm:text-sm"
      >
        <Link href={href} prefetch={false}>
          <span>{label}</span>
          <CornerDownRight className="ml-2.5 h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-110" />
        </Link>
      </Button>
    </div>
  );
}
