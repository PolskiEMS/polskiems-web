import { absoluteUrl, serializeJsonLd } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbJsonLd({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
