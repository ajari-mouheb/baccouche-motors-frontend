import { Building2 } from "lucide-react";

export function ShowroomSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="section-title mb-12 text-center">NOTRE SHOWROOM</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
            <Building2 className="mb-4 size-16 text-primary" />
            <h3 className="mb-2 font-semibold">Plus de 5000 m²</h3>
            <p className="text-muted-foreground">
              Showroom, pièces détachées et service après-vente. Un espace
              dédié à l&apos;excellence automobile BMW.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Route Ceinture Oued Arouk
              <br />
              Akouda, Sousse
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Lun - Sam: 8h00 - 18h00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
