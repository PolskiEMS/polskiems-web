import Link from "next/link";
import styles from "./styles.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <section className={styles.brandColumn}>
          <Link href="/" className={styles.brand} aria-label="PolskiEMS — strona główna">
            <span className={styles.brandMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>PolskiEMS</span>
          </Link>
          <p>
            Platforma łącząca firmy szukające wykonawców elektroniki z producentami EMS działającymi w Polsce.
          </p>
          <Link href="/wyszukaj" className={styles.footerCta}>
            Znajdź producenta
          </Link>
        </section>

        <nav className={styles.linkColumn} aria-label="Platforma">
          <p className={styles.columnTitle}>Platforma</p>
          <Link href="/wyszukaj">Wyszukiwarka producentów</Link>
          <Link href="/wszyscy-producenci">Wszyscy producenci</Link>
          <Link href="/zapytania-ofertowe">Zapytanie ofertowe</Link>
          <Link href="/ems-polska">EMS w Polsce</Link>
        </nav>

        <nav className={styles.linkColumn} aria-label="Dla firm EMS">
          <p className={styles.columnTitle}>Dla firm EMS</p>
          <Link href="/dodaj-producenta">Dodaj firmę EMS</Link>
          <Link href="/cennik">Pakiety i cennik</Link>
          <Link href="/kontakt">Współpraca i kontakt</Link>
          <Link href="/jak-wybrac-firme-ems">Jak wybrać firmę EMS</Link>
        </nav>

        <nav className={styles.linkColumn} aria-label="Wiedza i lokalizacje">
          <p className={styles.columnTitle}>Wiedza i lokalizacje</p>
          <Link href="/montaz-smt-polska">Montaż SMT</Link>
          <Link href="/montaz-tht-polska">Montaż THT</Link>
          <Link href="/produkcja-pcb-polska">Produkcja PCB</Link>
          <Link href="/ems-mazowieckie">EMS mazowieckie</Link>
          <Link href="/ems-slaskie">EMS śląskie</Link>
        </nav>
      </div>

      <div className={styles.footerBottom}>
        <p>© {year} PolskiEMS. Platforma producentów elektroniki w Polsce.</p>
        <Link href="/wyszukaj">Porównaj firmy EMS</Link>
      </div>
    </footer>
  );
};

export default Footer;
