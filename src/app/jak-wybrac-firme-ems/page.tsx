import type { Metadata } from "next";
import SeoPageTemplateB from "../components/SeoPages/SeoPageTemplateB";
import { seoPagesData } from "../seo-pages-data";
import { absoluteUrl } from "@/lib/site";

const pageData = seoPagesData["jak-wybrac-firme-ems"];

export const metadata: Metadata = {
  title: "Jak wybrać firmę EMS? Praktyczny przewodnik",
  description:
    "Dowiedz się, jak wybrać firmę EMS do projektu elektronicznego. Poznaj kryteria oceny dostawców, checklistę wyboru i dobre praktyki współpracy.",
  alternates: { canonical: absoluteUrl("/jak-wybrac-firme-ems") },
};

export default function JakWybracFirmeEmsPage() {
  return <SeoPageTemplateB data={pageData} />;
}
