import Link from "next/link";
import Image from "next/image";
import { NewsletterSignup } from "@/components/shared/newsletter-signup";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/cars", label: "Véhicules" },
  { href: "/services", label: "Services" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
  { href: "/test-drive", label: "Test Drive" },
  { href: "/admin", label: "Admin" },
  { href: "/customer", label: "Espace client" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 text-primary-foreground overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.1 0.02 265) 0%, oklch(0.08 0.02 265) 100%)",
      }}
    >
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Baccouche Automobiles"
                width={120}
                height={36}
                className="h-9 w-auto object-contain brightness-0 invert opacity-95"
              />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Premier concessionnaire BMW à Sousse, agent agréé par Ben Jemâa
              Motors, importateur officiel de la marque BMW en Tunisie.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-luxury-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <span className="block font-medium text-primary-foreground">Adresse</span>
                <span>
                  Route Ceinture Oued Arouk
                  <br />
                  Akouda, Sousse, Tunisie
                </span>
              </li>
              <li>
                <span className="block font-medium text-primary-foreground">Tél</span>
                <a
                  href="tel:+21670220300"
                  className="hover:text-luxury-accent transition-colors"
                >
                  +216 70 220 300
                </a>
              </li>
              <li>
                <span className="block font-medium text-primary-foreground">Email</span>
                <a
                  href="mailto:contact@baccoucheautomobiles.tn"
                  className="hover:text-luxury-accent transition-colors"
                >
                  contact@baccoucheautomobiles.tn
                </a>
              </li>
              <li>
                <span className="block font-medium text-primary-foreground">Horaires</span>
                <span>Lun - Sam: 8h00 - 18h00</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Newsletter
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Recevez nos dernières offres et actualités BMW directement dans votre boîte mail.
            </p>
            <NewsletterSignup variant="compact" className="mt-4" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/70">
          <p>
            © {currentYear} Baccouche Automobiles. Tous droits réservés. | BMW
            Sousse - Agent agréé Ben Jemâa Motors
          </p>
        </div>
      </div>
    </footer>
  );
}
