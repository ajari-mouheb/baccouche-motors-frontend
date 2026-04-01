import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3, Geist } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="fr" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${cormorant.variable} ${geist.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
