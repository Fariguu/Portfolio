import { getCvInfo } from "@/app/admin/actions/cv";
import { CvManager } from "./cv-manager";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gestione Curriculum | Portfolio Admin",
};

export default async function AdminCurriculumPage() {
  const cvInfo = await getCvInfo();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Dashboard</span>
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Curriculum Vitae
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Carica e mantieni aggiornato il tuo CV in formato PDF pubblicato sul sito
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/curriculum" target="_blank" className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>Vedi Pagina /curriculum</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Manager */}
      <CvManager initialCvInfo={cvInfo} />
    </div>
  );
}
