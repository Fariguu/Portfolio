import { createClient } from "@/lib/supabase/server";
import { AdminSidebar, AdminMobileHeader } from "@/components/admin/admin-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Gabriele Farigu",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AdminLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col font-sans">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col font-sans">
      {/* Sidebar Fissa per Desktop (>= md) */}
      <AdminSidebar userEmail={user.email} />

      {/* Header compatto con drawer a comparsa per Mobile (< md) */}
      <AdminMobileHeader userEmail={user.email} />

      {/* Contenuto principale con offset a sinistra su desktop */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
