import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { producenci } from "@/db/schema";
import { getDb } from "@/lib/db";
import { companyProfileSlug } from "@/lib/companySlug";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const staticRoutes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/wyszukaj", changeFrequency: "weekly", priority: 0.9 },
  { path: "/wszyscy-producenci", changeFrequency: "weekly", priority: 0.9 },
  { path: "/produkcja-pcb-polska", changeFrequency: "weekly", priority: 0.8 },
  { path: "/montaz-smt-polska", changeFrequency: "weekly", priority: 0.8 },
  { path: "/montaz-tht-polska", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ems-polska", changeFrequency: "weekly", priority: 0.8 },
  { path: "/montaz-elektroniki-w-polsce", changeFrequency: "weekly", priority: 0.8 },
  { path: "/kontraktowy-montaz-elektroniki", changeFrequency: "weekly", priority: 0.8 },
  { path: "/jak-wybrac-firme-ems", changeFrequency: "monthly", priority: 0.7 },
  { path: "/produkcja-prototypowa-elektroniki", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ems-mazowieckie", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ems-pomorskie", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ems-slaskie", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ems-dolnoslaskie", changeFrequency: "weekly", priority: 0.7 },
  { path: "/ems-wielkopolskie", changeFrequency: "weekly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.6 },
  { path: "/o-nas", changeFrequency: "monthly", priority: 0.6 },
  { path: "/regulamin", changeFrequency: "monthly", priority: 0.4 },
  { path: "/cennik", changeFrequency: "monthly", priority: 0.5 },
  { path: "/aktywacja_pakietu", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const db = getDb();
    const companies = await db
      .select({
        id: producenci.id,
        nazwa: producenci.nazwa,
        createdAt: producenci.createdAt,
      })
      .from(producenci)
      .where(eq(producenci.isActive, true));

    const companyEntries: MetadataRoute.Sitemap = companies.map((company) => ({
      url: `${SITE_URL}/producenci/${companyProfileSlug(company.nazwa, company.id)}`,
      lastModified: company.createdAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticEntries, ...companyEntries];
  } catch (error) {
    console.error("Failed to load producer profiles for sitemap", error);
    return staticEntries;
  }
}
