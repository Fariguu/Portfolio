import { getProfile } from "@/app/admin/actions/profile";
import { ProfileManager } from "./profile-manager";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const [profile, dictIt, dictEn] = await Promise.all([
    getProfile(),
    Promise.resolve(getDictionary("it")),
    Promise.resolve(getDictionary("en")),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <User className="h-4 w-4" /> Gestione Profilo
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Biografia & Chi Sono
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalizza la tua biografia narrativa e il sottotitolo visualizzati nella pagina dedicata <span className="font-semibold text-foreground">/chi-sono</span>.
        </p>
      </div>

      <ProfileManager
        initialProfile={profile}
        defaultHeadlineIt={dictIt.bio.fallbackHeadline}
        defaultHeadlineEn={dictEn.bio.fallbackHeadline}
        defaultBioIt={dictIt.bio.fallbackBio}
        defaultBioEn={dictEn.bio.fallbackBio}
      />
    </div>
  );
}
