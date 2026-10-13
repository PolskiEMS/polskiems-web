import type { Metadata } from "next";
import SeoPageTemplateB from "../components/SeoPages/SeoPageTemplateB";
import { seoPagesData } from "../seo-pages-data";
import { absoluteUrl } from "@/lib/site";

const pageData = seoPagesData["montaz-elektroniki-w-polsce"];

export const metadata: Metadata = {
  title: "Montaż elektroniki w Polsce – firmy EMS",
  description:
    "Znajdź partnera do montażu elektroniki w Polsce. Porównaj firmy EMS oferujące montaż, testy i wsparcie wdrożenia od prototypu po produkcję seryjną.",
  alternates: { canonical: absoluteUrl("/montaz-elektroniki-w-polsce") },
};

export default function MontazElektronikiPolskaPage() {
  return <SeoPageTemplateB data={pageData} breadcrumbPath="/montaz-elektroniki-w-polsce" />;
}
