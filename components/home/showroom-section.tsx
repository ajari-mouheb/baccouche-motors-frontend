import Image from "next/image";

export function ShowroomSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title mb-16 text-center text-foreground">
          Notre showroom
        </h2>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-xl lg:aspect-[4/3]">
            <Image
              src="/img_1.jpg"
              alt="Showroom Baccouche Automobiles"
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <h3 className="mb-3 font-serif text-xl font-semibold">
                Plus de 5000 m²
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Showroom, pièces détachées et service après-vente. Un espace
                dédié à l&apos;excellence automobile BMW.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <p className="text-muted-foreground leading-relaxed">
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
      </div>
    </section>
  );
}
