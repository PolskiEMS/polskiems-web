import type { Metadata } from "next";
import SeoPageTemplateB from "../components/SeoPages/SeoPageTemplateB";
import { seoPagesData } from "../seo-pages-data";
import { absoluteUrl } from "@/lib/site";

const pageData = seoPagesData["kontraktowy-montaz-elektroniki"];

export const metadata: Metadata = {
  title: "Kontraktowy montaż elektroniki – firmy EMS",
  description:
    "Sprawdź, jak działa kontraktowy montaż elektroniki i porównaj firmy EMS w Polsce. Wybierz partnera do stabilnej, skalowalnej produkcji B2B.",
  alternates: { canonical: absoluteUrl("/kontraktowy-montaz-elektroniki") },
};

export default function KontraktowyMontazElektronikiPage() {
  return <SeoPageTemplateB data={pageData} />;
}
