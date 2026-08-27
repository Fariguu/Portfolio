import { Hero } from "@/components/blocks/hero";
import { Features } from "@/components/blocks/features";
import { Portfolio } from "@/components/blocks/portfolio";
import { Contact } from "@/components/blocks/contact";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
