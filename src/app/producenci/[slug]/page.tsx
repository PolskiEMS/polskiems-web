import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getPublicCompanyProfileBySlug } from "@/lib/actions";
import { companyProfileSlug } from "@/lib/companySlug";
import { getPublicCompanyTaxonomy } from "@/lib/publicSupplierTaxonomyActions";
import styles from "./style.module.css";
import { absoluteUrl, serializeJsonLd } from "@/lib/site";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type TagItem = {
  id: number;
  name?: string;
  nazwa?: string;
  zakres?: string;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getPublicCompanyProfileBySlug(slug);

  if (!company) return {};

  const canonicalPath = `/producenci/${companyProfileSlug(company.nazwa, company.id)}`;
  const serviceNames = company.dzialania.slice(0, 3).map((item) => item.nazwa);
  const regionSuffix = company.wojewodztwo ? `, ${company.wojewodztwo}` : "";
  const serviceSuffix = serviceNames.length > 0 ? ` – ${serviceNames.join(", ")}` : " – producent elektroniki";
  const descriptionParts = [
    `${company.nazwa}${regionSuffix}.`,
    serviceNames.length > 0 ? `Usługi: ${serviceNames.join(", ")}.` : "Profil producenta elektroniki w katalogu PolskiEMS.",
    "Sprawdź profil firmy i wyślij zapytanie ofertowe.",
  ];

  return {
    title: `${company.nazwa}${serviceSuffix}${regionSuffix}`,
    description: descriptionParts.join(" "),
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${company.nazwa}${serviceSuffix}${regionSuffix}`,
      description: descriptionParts.join(" "),
      url: canonicalPath,
      type: "website",
    },
  };
}

const hiddenDescriptions = new Set([["Twój", "krótki", "opis"].join(" ")]);
const hiddenPhones = new Set([["Twój", "numer", "telefonu"].join(" ")]);

function getVisibleDescription(description?: string | null) {
  if (!description?.trim() || hiddenDescriptions.has(description.trim())) {
    return "Opis zostanie uzupełniony wkrótce.";
  }

  return description;
}

function getVisibleValue(value?: string | null, hiddenValues?: Set<string>) {
  const normalizedValue = value?.trim();
  if (!normalizedValue || hiddenValues?.has(normalizedValue)) return "Brak danych";
  return normalizedValue;
}

function TaxonomyCard({ title, items, emptyText }: { title: string; items: TagItem[]; emptyText: string }) {
  return (
    <article className={styles.card}>
      <h2>{title}</h2>
      {items.length ? (
        <ul className={styles.tags}>
          {items.map((item) => <li key={item.id}>{item.name ?? item.nazwa ?? item.zakres}</li>)}
        </ul>
      ) : <p>{emptyText}</p>}
    </article>
  );
}

export default async function ProducerProfilePage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug?.trim()) {
    return (
      <main className={styles.page}>
        <section className={styles.invalidProfile}>
          <h1>Nieprawidłowy profil producenta</h1>
          <Link href="/wszyscy-producenci" className={styles.primaryBtn}>
            Powrót do listy producentów
          </Link>
        </section>
      </main>
    );
  }

  const company = await getPublicCompanyProfileBySlug(slug);
  if (!company) notFound();

  const canonicalSlug = companyProfileSlug(company.nazwa, company.id);
  if (slug !== canonicalSlug) permanentRedirect(`/producenci/${canonicalSlug}`);

  const taxonomy = await getPublicCompanyTaxonomy(company.id);
  const displayedServices = taxonomy.services.length > 0 ? taxonomy.services : company.dzialania;

  const websiteHref = company.www?.trim()
    ? company.www.startsWith("http")
      ? company.www
      : `https://${company.www}`
    : null;

  const profilePath = `/producenci/${canonicalSlug}`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.nazwa,
    url: absoluteUrl(profilePath),
    ...(websiteHref ? { sameAs: [websiteHref] } : {}),
    ...(company.email?.trim() ? { email: company.email.trim() } : {}),
    ...(company.telefon?.trim() ? { telephone: company.telefon.trim() } : {}),
    ...(company.adres?.trim() || company.wojewodztwo
      ? {
          address: {
            "@type": "PostalAddress",
            ...(company.adres?.trim() ? { streetAddress: company.adres.trim() } : {}),
            ...(company.wojewodztwo ? { addressRegion: company.wojewodztwo } : {}),
            addressCountry: "PL",
          },
        }
      : {}),
    areaServed: "Polska",
    knowsAbout: [
      ...displayedServices.map((item) => item.name ?? item.nazwa ?? item.zakres).filter(Boolean),
      ...taxonomy.capabilities.map((item) => item.name).filter(Boolean),
      ...taxonomy.industries.map((item) => item.name).filter(Boolean),
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PolskiEMS",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Producenci",
        item: absoluteUrl("/wszyscy-producenci"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: company.nazwa,
        item: absoluteUrl(profilePath),
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <section className={styles.hero}>
        <Link href="/wszyscy-producenci" className={styles.backLink}>← Powrót do producentów</Link>
        <div className={styles.heroContent}>
          <Image
            src={`/images/producers/${company.nazwa}.jpg`}
            width={210}
            height={210}
            alt={`Logo producenta ${company.nazwa}`}
            className={styles.logo}
            priority
          />
          <div>
            <h1>{company.nazwa}</h1>
            <div className={styles.badges}>
              <span className={styles.typeBadge}>{taxonomy.companyTypeLabel}</span>
              {company.featured && <span className={styles.featuredBadge}>Polecany Producent</span>}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Opis firmy</h2>
          <p>{getVisibleDescription(company.opis)}</p>
        </article>

        <article className={styles.card}>
          <h2>Dane kontaktowe</h2>
          <dl className={styles.details}>
            <div><dt>Typ firmy</dt><dd>{taxonomy.companyTypeLabel}</dd></div>
            <div><dt>Województwo</dt><dd>{getVisibleValue(company.wojewodztwo)}</dd></div>
            <div><dt>Adres</dt><dd>{getVisibleValue(company.adres)}</dd></div>
            <div><dt>Telefon</dt><dd>{getVisibleValue(company.telefon, hiddenPhones)}</dd></div>
            <div><dt>Email</dt><dd>{getVisibleValue(company.email)}</dd></div>
            <div><dt>Strona WWW</dt><dd>{getVisibleValue(company.www)}</dd></div>
          </dl>
        </article>

        <TaxonomyCard
          title="Usługi"
          items={displayedServices}
          emptyText="Brak przypisanych usług."
        />

        <TaxonomyCard
          title="Możliwości technologiczne"
          items={taxonomy.capabilities}
          emptyText="Brak przypisanych możliwości technologicznych."
        />

        <TaxonomyCard
          title="Branże"
          items={taxonomy.industries}
          emptyText="Brak przypisanych branż."
        />

        <TaxonomyCard
          title="Certyfikaty i standardy"
          items={taxonomy.certifications}
          emptyText="Brak przypisanych certyfikatów lub standardów."
        />

        <TaxonomyCard
          title="Skala produkcji"
          items={company.produkcja}
          emptyText="Brak przypisanej skali produkcji."
        />
      </section>

      <section className={styles.actions} aria-label="Akcje profilu producenta">
        <Link
          href={`/zapytania-ofertowe?companyId=${company.id}&source=company_profile`}
          className={styles.primaryBtn}
        >
          Poproś o wycenę
        </Link>
        {company.email?.trim() && (
          <a href={`mailto:${company.email}`} className={styles.secondaryBtn}>Napisz email</a>
        )}
        {websiteHref && (
          <a href={websiteHref} target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
            Strona firmy
          </a>
        )}
        <Link href="/wszyscy-producenci" className={styles.secondaryBtn}>
          Powrót do listy producentów
        </Link>
      </section>
    </main>
  );
}
