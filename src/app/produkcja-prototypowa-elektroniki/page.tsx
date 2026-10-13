import type { Metadata } from "next";
import SeoPageTemplateB from "../components/SeoPages/SeoPageTemplateB";
import { seoPagesData } from "../seo-pages-data";
import { absoluteUrl } from "@/lib/site";

const pageData = seoPagesData["produkcja-prototypowa-elektroniki"];

export const metadata: Metadata = {
  title: "Produkcja prototypowa elektroniki – firmy EMS",
  description:
    "Produkcja prototypowa elektroniki w Polsce: porównaj firmy EMS, które wspierają szybkie iteracje, walidację projektu i przejście do produkcji seryjnej.",
  alternates: { canonical: absoluteUrl("/produkcja-prototypowa-elektroniki") },
};

export default function ProdukcjaPrototypowaElektronikiPage() {
  return <SeoPageTemplateB data={pageData} breadcrumbPath="/produkcja-prototypowa-elektroniki" />;
}
