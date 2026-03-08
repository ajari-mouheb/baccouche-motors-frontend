import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baccouche Automobiles | BMW Sousse",
    template: "%s | Baccouche Automobiles",
  },
  description:
    "Baccouche Automobiles - Premier concessionnaire BMW à Sousse, agent agréé Ben Jemâa Motors. Découvrez véhicules neufs et d'occasion certifiés, service après-vente d'excellence.",
  keywords: ["BMW", "Sousse", "Tunisie", "luxury cars", "Baccouche Automobiles", "concessionnaire"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Baccouche Automobiles | BMW Sousse",
    description: "Premier concessionnaire BMW à Sousse, agent agréé Ben Jemâa Motors.",
    images: ["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=85"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${cormorant.variable} ${sourceSans.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
