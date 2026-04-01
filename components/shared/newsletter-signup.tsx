"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  variant?: "default" | "compact";
  className?: string;
}

export function NewsletterSignup({
  variant = "default",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Veuillez entrer une adresse email valide");
      return;
    }

    setStatus("loading");

    // Simulate API call - replace with actual newsletter API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, just simulate success
    setStatus("success");
    setMessage("Merci pour votre inscription !");
    setEmail("");

    // Reset after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="pl-10"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={status === "loading" || status === "success"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              "S'inscrire"
            )}
          </Button>
        </div>
        {status === "error" && (
          <p className="text-xs text-destructive">{message}</p>
        )}
        {status === "success" && (
          <p className="text-xs text-green-600">{message}</p>
        )}
      </form>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border/50 bg-card p-6 md:p-8", className)}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-luxury-accent/10">
          <Mail className="h-5 w-5 text-luxury-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Recevez nos dernières offres et actualités
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="pl-10"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Inscrit !
            </>
          ) : (
            "S'inscrire à la newsletter"
          )}
        </Button>

        {status === "error" && (
          <p className="text-sm text-destructive">{message}</p>
        )}

        <p className="text-xs text-muted-foreground text-center">
          En vous inscrivant, vous acceptez de recevoir nos communications par email.
          Vous pouvez vous désinscrire à tout moment.
        </p>
      </form>
    </div>
  );
}