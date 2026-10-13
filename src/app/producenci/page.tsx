import { Metadata } from 'next';
import FoundProducers from '../components/FoundProducers/FoundProducers';
import styles from './styles.module.css'
import Link from 'next/link';
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Firmy EMS i producenci elektroniki w Polsce",
  description:
    "Sprawdź dopasowane firmy EMS i producentów elektroniki w Polsce. Porównaj usługi montażu SMD, THT, PCB, lokalizację oraz skalę produkcji.",
  alternates: {
    canonical: absoluteUrl("/producenci"),
  },
  openGraph: {
    title: "Firmy EMS i producenci elektroniki w Polsce",
    description:
      "Porównaj producentów elektroniki i firmy EMS według usług, lokalizacji oraz skali produkcji.",
    url: absoluteUrl("/producenci"),
    siteName: "PolskiEMS",
    locale: "pl_PL",
    type: "website",
  },
};

const Producenci = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Dopasowane firmy</p>
        <h1>Wyniki wyszukiwania producentów</h1>
        <p className={styles.lead}>
          Poniżej zobaczysz firmy pasujące do wybranych kryteriów. Otwórz profil producenta albo wyślij zapytanie ofertowe.
        </p>
        <div className={styles.heroActions}>
          <Link href="/wyszukaj" className={styles.primaryAction}>Zmień kryteria</Link>
          <Link href="/dodaj-producenta" className={styles.secondaryAction}>Dodaj firmę EMS</Link>
        </div>
      </section>
      <FoundProducers />
    </main>
  );
}

export default Producenci;
