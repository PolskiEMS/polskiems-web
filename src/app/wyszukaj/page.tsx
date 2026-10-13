import { Metadata } from "next";
import ProducerSearch from "../components/ProducerSearch/ProducerSearch";
import PageViewTracker from "../components/PageViewTracker";
import { getPublicSupplierSearchOptions } from "@/lib/publicSupplierTaxonomyActions";
import styles from "./styles.module.css";
import { absoluteUrl } from "@/lib/site";
import { unstable_cache } from "next/cache";

export const revalidate = 3600;
export const maxDuration = 30;

const getCachedSearchOptions = unstable_cache(
  () => getPublicSupplierSearchOptions(),
  ["public-supplier-search-options"],
  { revalidate: 3600 }
);

export const metadata: Metadata = {
  title: "Wyszukaj producenta elektroniki w Polsce",
  description:
    "Wybierz usługi, możliwości technologiczne, branże, certyfikaty, typ firmy, lokalizację i skalę produkcji, aby znaleźć producenta elektroniki w Polsce.",
  openGraph: {
    title: "Wyszukiwarka Producentów Elektroniki",
    description: "Znajdź producenta elektroniki według usług, możliwości, branż, certyfikatów, lokalizacji i skali produkcji.",
    url: absoluteUrl("/wyszukaj"),
    siteName: "Wyszukiwarka Producentów",
    locale: "pl_PL",
    type: "website",
  },
  alternates: {
    canonical: absoluteUrl("/wyszukaj"),
  },
};

export default async function Wyszukaj() {
  const options = await getCachedSearchOptions();

  return (
    <main className={styles.page}>
      <PageViewTracker page="search" />
      <section className={styles.hero}>
        <p className={styles.kicker}>Wyszukiwarka EMS</p>
        <h1>Znajdź producenta elektroniki dopasowanego do projektu</h1>
        <p className={styles.lead}>
          Wpisz nazwę firmy, usługę albo wybierz filtry. PolskiEMS pomaga zawęzić listę producentów według usług,
          możliwości technologicznych, branż, certyfikatów, typu firmy, lokalizacji i skali produkcji.
        </p>
      </section>
      <ProducerSearch options={options} />
    </main>
  );
}
