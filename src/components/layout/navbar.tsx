"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    const navigations = [
        { title: "Home", href: "/" },
        { title: "Competenze", href: "#competenze" },
        { title: "Percorso", href: "#percorso" },
        { title: "Progetti", href: "#progetti" },
        { title: "Contatti", href: "#contatti" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Code2 className="h-6 w-6 text-primary" />
                        <span className="font-bold inline-block">Gabriele Farigu</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm font-medium">
                    {navigations.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="transition-colors hover:text-primary text-muted-foreground"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-3">
                    <ThemeToggle />
                    <Button asChild variant="default" className="rounded-full">
                        <Link href="#contatti">Contattami</Link>
                    </Button>
                </div>

                {/* Mobile Nav */}
                <div className="flex md:hidden items-center space-x-2">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] pr-0">
                            <div className="flex flex-col gap-6 pt-8 px-4 text-lg font-medium">
                                {navigations.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                <Button className="mt-4 w-full rounded-full" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="#contatti">Contattami</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
