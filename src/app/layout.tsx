import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import styles from "./layout.module.css";
import { SITE_URL } from "@/lib/site";

export const preferredRegion = "fra1";

const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../public/fonts/Roboto-Regular.ttf",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PolskiEMS – firmy EMS i producenci elektroniki",
    template: "%s | PolskiEMS",
  },
  description:
    "Znajdź producentów elektroniki i firmy EMS w Polsce. Porównaj montaż SMT, THT, PCB, lokalizację, skalę produkcji i kompetencje firm.",
  openGraph: {
    title: "PolskiEMS – firmy EMS i producenci elektroniki",
    description:
      "Znajdź partnera do produkcji elektroniki w Polsce i porównaj firmy EMS według usług, lokalizacji i możliwości produkcyjnych.",
    url: SITE_URL,
    siteName: "PolskiEMS",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "PolskiEMS – firmy EMS i producenci elektroniki",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolskiEMS – firmy EMS i producenci elektroniki",
    description:
      "Znajdź firmę EMS lub producenta elektroniki w Polsce według usług, województwa i skali produkcji.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${styles.body}`}>
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
