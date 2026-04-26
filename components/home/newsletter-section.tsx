"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle2, Sparkles } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call - replace with actual newsletter API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("success");
    setEmail("");

    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-luxury-black to-luxury-charcoal">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-luxury-accent" />
            <span>Restez informé</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Recevez nos dernières actualités
          </h2>
          <p className="mb-8 text-lg text-white/70">
            Inscrivez-vous à notre newsletter pour découvrir nos nouvelles arrivées,
            offres exclusives et actualités BMW.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="h-12 sm:h-14 rounded-lg sm:rounded-r-none border-0 bg-white pl-12 text-foreground focus-visible:ring-luxury-accent w-full"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading" || status === "success"}
                className="h-12 sm:h-14 rounded-lg sm:rounded-l-none sm:px-6 bg-luxury-accent text-primary hover:bg-luxury-accent/90 w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Inscription...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Inscrit !
                  </>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </div>

            {status === "error" && (
              <p className="mt-3 text-sm text-red-400">
                Veuillez entrer une adresse email valide
              </p>
            )}

            <p className="mt-4 text-sm text-white/50">
              En vous inscrivant, vous acceptez de recevoir nos communications par email.
              Vous pouvez vous désinscrire à tout moment.
            </p>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {[
              { title: "Offres exclusives", desc: "Accédez à nos promotions en avant-première" },
              { title: "Nouveautés BMW", desc: "Découvrez les derniers modèles dès leur sortie" },
              { title: "Conseils experts", desc: "Entretien et conseils de nos spécialistes" },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <h3 className="mb-1 font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm text-white/60">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}