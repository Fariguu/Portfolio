"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  User,
  Layers,
  GraduationCap,
  FolderGit2,
  HelpCircle,
  MessageSquareQuote,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOutAction } from "@/app/admin/actions/auth";

interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly icon: React.ElementType;
  readonly exact?: boolean;
}

const navItems: ReadonlyArray<NavItem> = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { title: "Biografia", href: "/admin/profile", icon: User },
  { title: "Competenze", href: "/admin/skills", icon: Layers },
  { title: "Percorso", href: "/admin/journey", icon: GraduationCap },
  { title: "Progetti", href: "/admin/projects", icon: FolderGit2 },
  { title: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { title: "Testimonianze", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "Curriculum", href: "/admin/curriculum", icon: FileText },
];

interface SidebarNavProps {
  readonly onNavigate?: () => void;
}

function SidebarNav({ onNavigate }: Readonly<SidebarNavProps>) {
  const pathname = usePathname();

  const isItemActive = (item: NavItem) => {
    if (!pathname) return false;
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <nav className="flex flex-col gap-1 px-3 py-4 select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isItemActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
              active
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

interface AdminSidebarProps {
  readonly userEmail?: string | null;
}

/**
 * Sidebar fissa desktop (>= md) per il pannello di amministrazione
 */
export function AdminSidebar({ userEmail }: Readonly<AdminSidebarProps>) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 fixed inset-y-0 left-0 z-40 bg-background border-r border-border/80">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-border/60">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 font-bold text-base text-foreground hover:text-primary transition-colors"
        >
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="tracking-tight">Portfolio Admin</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <SidebarNav />
      </div>

      {/* Footer User / Logout */}
      <div className="p-3 border-t border-border/60 bg-muted/20 space-y-2">
        <div className="flex items-center justify-between px-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 px-2"
            asChild
          >
            <Link href="/" target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Vedi Sito Live</span>
            </Link>
          </Button>
        </div>

        {userEmail && (
          <div className="px-2 text-[11px] text-muted-foreground truncate" title={userEmail}>
            {userEmail}
          </div>
        )}

        <form action={signOutAction} className="w-full">
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5 h-8 px-2 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Esci dall&apos;Admin</span>
          </Button>
        </form>
      </div>
    </aside>
  );
}

/**
 * Header mobile (< md) con pulsante drawer a comparsa a sinistra
 */
export function AdminMobileHeader({ userEmail }: Readonly<AdminSidebarProps>) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="md:hidden sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-foreground hover:bg-muted"
                aria-label="Apri menu admin"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 flex flex-col justify-between">
              <div>
                <SheetHeader className="p-4 border-b border-border/60 text-left">
                  <SheetTitle className="flex items-center gap-2 text-base font-bold">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Portfolio Admin</span>
                  </SheetTitle>
                </SheetHeader>
                <SidebarNav onNavigate={() => setOpen(false)} />
              </div>

              <div className="p-4 border-t border-border/60 bg-muted/20 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs gap-1.5 h-9"
                  asChild
                >
                  <Link href="/" target="_blank" onClick={() => setOpen(false)}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Vedi Sito Live</span>
                  </Link>
                </Button>

                {userEmail && (
                  <p className="text-[11px] text-muted-foreground truncate text-center">
                    {userEmail}
                  </p>
                )}

                <form action={signOutAction} className="w-full">
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5 h-9 cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Esci</span>
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/admin" className="font-bold text-sm text-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
