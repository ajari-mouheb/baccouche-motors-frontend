import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/cars", label: "Véhicules" },
  { href: "/services", label: "Services" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
  { href: "/test-drive", label: "Test Drive" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Baccouche Automobiles</h3>
            <p className="text-sm text-muted-foreground">
              Premier concessionnaire BMW à Sousse, agent agréé par Ben Jemâa
              Motors, importateur officiel de la marque BMW en Tunisie.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 shrink-0" />
                <span>
                  Route Ceinture Oued Arouk
                  <br />
                  Akouda, Sousse, Tunisie
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href="tel:+216" className="hover:text-foreground">
                  +216 XX XXX XXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a href="mailto:contact@baccoucheautomobiles.tn" className="hover:text-foreground">
                  contact@baccoucheautomobiles.tn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="size-4 mt-0.5 shrink-0" />
                <span>Lun - Sam: 8h00 - 18h00</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">BMW Sousse</h3>
            <p className="text-sm text-muted-foreground">
              Showroom, pièces détachées et service après-vente. Plus de 5000
              m² dédiés à l&apos;excellence automobile.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Baccouche Automobiles. Tous droits réservés. | BMW
            Sousse - Agent agréé Ben Jemâa Motors
          </p>
        </div>
      </div>
    </footer>
  );
}
