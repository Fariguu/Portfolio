import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy",
  description: "Informativa sul trattamento dei dati personali del portfolio di Gabriele Farigu conforme al GDPR.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Torna al Portfolio
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Informativa sulla Privacy
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Ultimo aggiornamento: Settembre 2026 • Conforme al Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679)
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati è <strong>Gabriele Farigu</strong>, sviluppatore web e software con sede a Turi (BA), Italia.
              Per qualsiasi chiarimento o per l&apos;esercizio dei tuoi diritti in materia di privacy, puoi scrivermi all&apos;indirizzo:{" "}
              <a href="mailto:farigugabriele@gmail.com" className="text-primary hover:underline font-medium">
                farigugabriele@gmail.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Tipologia di Dati Trattati</h2>
            <div className="space-y-2">
              <p>
                <strong>Dati forniti volontariamente dall&apos;utente:</strong> Compilando il modulo di contatto presente sul sito, vengono raccolti nome, cognome, indirizzo email e il testo del messaggio inviato.
              </p>
              <p>
                <strong>Dati di navigazione e metriche:</strong> Il sito utilizza <em>@vercel/analytics</em> e <em>@vercel/speed-insights</em>, strumenti di analisi tecnica e misurazione delle prestazioni web nativamente <strong>cookieless</strong>. Non registrano indirizzi IP completi né tracciano gli utenti su altri siti web.
              </p>
              <p>
                <strong>Cookie Policy:</strong> Questo sito <strong>non fa uso di cookie di profilazione</strong> o pubblicitari. Non è pertanto necessario alcun banner di consenso preventivo ai sensi delle linee guida del Garante Privacy.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Finalità e Base Giuridica del Trattamento</h2>
            <p>
              I dati forniti tramite il modulo di contatto vengono trattati esclusivamente per <strong>rispondere alla tua richiesta</strong> di informazione, proposta di lavoro o collaborazione tecnica.
            </p>
            <p>
              La base giuridica del trattamento è l&apos;esecuzione di misure precontrattuali adottate su richiesta dell&apos;interessato (Art. 6, par. 1, lett. b GDPR). I tuoi dati non verranno ceduti a terzi per finalità commerciali né utilizzati per l&apos;invio di newsletter non richieste.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Fornitori di Servizi Tecnologici (Sub-responsabili)</h2>
            <p>
              Per garantire il funzionamento, l&apos;affidabilità e la sicurezza dell&apos;applicazione web, vengono impiegati i seguenti servizi terzi:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Vercel Inc.:</strong> Infrastruttura cloud di hosting, edge network e analisi prestazionale aggregata.
              </li>
              <li>
                <strong>Supabase Inc.:</strong> Gestione del database cloud PostgreSQL e storage delle risorse multimediali.
              </li>
              <li>
                <strong>Resend Inc.:</strong> Servizio di recapito email transazionali per l&apos;inoltro dei messaggi e la conferma automatica.
              </li>
              <li>
                <strong>Cloudflare Inc. (Turnstile):</strong> Sistema di protezione intelligente anti-bot e anti-spam a salvaguardia del modulo contatti, privo di profilazione pubblicitaria.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Conservazione dei Dati</h2>
            <p>
              I dati scambiati tramite corrispondenza email saranno conservati per il tempo strettamente necessario a gestire la comunicazione o l&apos;eventuale rapporto professionale instaurato, e comunque non oltre i termini di legge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. Diritti dell&apos;Interessato</h2>
            <p>
              Ai sensi degli articoli 15-22 del GDPR, hai il diritto in qualunque momento di:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Richiedere la conferma dell&apos;esistenza o meno dei tuoi dati personali.</li>
              <li>Accedere ai tuoi dati e richiederne la rettifica o l&apos;aggiornamento.</li>
              <li>Richiederne la cancellazione immediata (diritto all&apos;oblio).</li>
              <li>Opporsi al trattamento o richiederne la limitazione.</li>
            </ul>
            <p className="pt-2">
              Per esercitare tali diritti è sufficiente inviare un&apos;email a{" "}
              <a href="mailto:farigugabriele@gmail.com" className="text-primary hover:underline font-medium">
                farigugabriele@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gabriele Farigu • Tutti i diritti riservati.
          </p>
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href="/">Torna alla Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
