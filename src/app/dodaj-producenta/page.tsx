import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PackageCheckout from "../cennik/PackageCheckout";
import { getPublicSupplierSearchOptions } from "@/lib/publicSupplierTaxonomyActions";
import styles from "./styles.module.css";
import { unstable_cache } from "next/cache";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const getCachedSignupOptions = unstable_cache(
  () => getPublicSupplierSearchOptions(),
  ["producer-signup-options"],
  { revalidate: 3600 }
);

export const metadata: Metadata = {
  title: "Dodaj firmę do katalogu",
  description:
    "Zgłoś firmę do katalogu PolskiEMS. Uzupełnij dane, typ firmy, usługi, możliwości technologiczne, branże, certyfikaty i skalę produkcji.",
  alternates: {
    canonical: absoluteUrl("/dodaj-producenta"),
  },
};

export default async function DodajProducentaPage() {
  const taxonomy = await getCachedSignupOptions();
  const produkcja = taxonomy.productionScales;
  const regions = taxonomy.regions;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Onboarding firmy do PolskiEMS</p>
        <h1>Dodaj firmę do katalogu PolskiEMS</h1>
        <p className={styles.lead}>
          Zgłoś producenta EMS, PCB, elektroniki albo firmę świadczącą usługi dla branży elektronicznej.
          Dane podane w formularzu zasilą profil firmy, wyszukiwarkę i przyszłe dopasowania zapytań RFQ.
        </p>

        <div className={styles.heroActions}>
          <a href="#formularz" className={styles.primaryAction}>Rozpocznij zgłoszenie</a>
          <Link href="/cennik" className={styles.secondaryAction}>Porównaj pakiety</Link>
        </div>
      </section>

      <section className={styles.steps} aria-label="Jak działa zgłoszenie firmy">
        <article>
          <span>1</span>
          <h2>Dane i typ firmy</h2>
          <p>Podaj podstawowe dane firmy i wybierz typ działalności najlepiej opisujący ofertę.</p>
        </article>
        <article>
          <span>2</span>
          <h2>Oferta i kompetencje</h2>
          <p>Uzupełnij usługi, technologie, branże, certyfikaty oraz skalę produkcji.</p>
        </article>
        <article>
          <span>3</span>
          <h2>Pakiet i weryfikacja</h2>
          <p>Wybierz Free, Standard lub Premium. Każde nowe zgłoszenie trafia najpierw do weryfikacji administratora.</p>
        </article>
      </section>

      <div id="formularz" className={styles.formAnchor}>
        <Suspense fallback={<p>Ładowanie formularza zgłoszenia…</p>}>
          <PackageCheckout
            initialPackage="free"
            regions={regions}
            produkcja={produkcja}
            companyTypes={taxonomy.companyTypes}
            services={taxonomy.services}
            capabilities={taxonomy.capabilities}
            industries={taxonomy.industries}
            certifications={taxonomy.certifications}
            producerSignupMode
          />
        </Suspense>
      </div>
    </div>
  );
}
