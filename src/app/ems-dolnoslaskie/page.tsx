import type { Metadata } from "next";
import Link from "next/link";
import styles from "../seo-page.module.css";
import { absoluteUrl } from "@/lib/site";
import BreadcrumbJsonLd from "../components/SeoPages/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Firmy EMS w województwie dolnośląskim",
  description: "Znajdź firmy EMS na Dolnym Śląsku. Porównaj producentów elektroniki z Wrocławia i regionu dla prototypów, wdrożeń NPI i produkcji seryjnej.",
  alternates: { canonical: absoluteUrl("/ems-dolnoslaskie") },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "PolskiEMS", path: "/" },
          { name: "EMS Polska", path: "/ems-polska" },
          { name: "Firmy EMS w województwie dolnośląskim", path: "/ems-dolnoslaskie" },
        ]}
      />

      <section className={styles.hero}>
        <h1>Firmy EMS w województwie dolnośląskim</h1>
        <p>
          Dolny Śląsk i Wrocław to silne zaplecze inżynierskie oraz technologiczne. Region jest
          szczególnie interesujący dla firm rozwijających nowe urządzenia, które potrzebują
          elastycznego partnera od etapu prototypu aż po produkcję seryjną.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/producenci?regions=dolnośląskie">
            <button className={styles.primaryBtn}>Producenci z Dolnośląskiego</button>
          </Link>
          <Link href="/wszyscy-producenci">
            <button className={styles.secondaryBtn}>Wszyscy Producenci</button>
          </Link>
        </div>
      </section>

      <section className={styles.textBlock}>
        <h2>Dolny Śląsk jako region technologiczny</h2>
        <p>
          Duża dostępność kompetencji technicznych sprzyja projektom, które wymagają częstych
          konsultacji między konstruktorami a produkcją. To ważne szczególnie podczas pierwszych
          uruchomień i walidacji dokumentacji.
        </p>
        <p>
          Współpraca z lokalnym producentem może skrócić czas potrzebny na analizę problemów,
          akceptację zmian materiałowych i kolejne iteracje produktu.
        </p>
      </section>

      <section className={styles.textBlock}>
        <h2>Prototypy i NPI na Dolnym Śląsku</h2>
        <p>
          Przy nowych produktach ważne jest nie tylko wykonanie pierwszej partii, ale także
          zebranie informacji zwrotnej z procesu. Dobry partner EMS powinien pomóc zidentyfikować
          problemy montażowe i wskazać potencjalne ryzyka przed skalowaniem.
        </p>
        <p>
          Warto zapytać o wsparcie DFM, możliwość szybkich zmian w BOM oraz sposób dokumentowania
          wyników z partii pilotażowych.
        </p>
      </section>

      <section className={styles.textBlock}>
        <h2>Jak przygotować zapytanie do producenta EMS?</h2>
        <p>
          Najlepiej przekazać komplet dokumentacji: BOM, pliki produkcyjne, informacje o wolumenie,
          wymagania jakościowe oraz zakres testów. Dzięki temu oferty różnych dostawców będą
          znacznie łatwiejsze do porównania.
        </p>
        <p>
          Jeżeli projekt jest jeszcze na etapie rozwoju, zaznacz przewidywany kierunek skalowania.
          Pozwoli to od razu ocenić, czy wybrany producent ma potencjał do obsługi kolejnych etapów.
        </p>
      </section>

      <section className={styles.textBlock}>
        <h2>Na co zwrócić uwagę poza ceną?</h2>
        <p>
          Istotna jest szybkość komunikacji, dostępność zespołu technicznego, elastyczność
          harmonogramu oraz zdolność do reagowania na braki komponentów. Te elementy mają
          duże znaczenie zwłaszcza przy dynamicznie rozwijanych produktach.
        </p>
      </section>

      <section className={styles.textBlock}>
        <h2>Powiązane strony</h2>
        <div className={styles.ctaRow}>
          <Link href="/produkcja-prototypowa-elektroniki"><button className={styles.secondaryBtn}>Produkcja prototypowa</button></Link>
          <Link href="/montaz-elektroniki-w-polsce"><button className={styles.secondaryBtn}>Montaż elektroniki</button></Link>
          <Link href="/produkcja-pcb-polska"><button className={styles.secondaryBtn}>Produkcja PCB</button></Link>
        </div>
      </section>
    </div>
  );
}
