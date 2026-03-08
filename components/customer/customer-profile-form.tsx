"use client";

import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Placeholder data - will come from API when backend is ready
const placeholderProfile = {
  name: "Client",
  email: "client@email.com",
  phone: "+216 XX XXX XXX",
  address: "Adresse à compléter",
};

export function CustomerProfileForm() {
  return (
    <div className="max-w-xl space-y-8">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <User className="size-8 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Mon profil</h2>
            <p className="text-sm text-muted-foreground">
              Authentification requise pour modifier
            </p>
          </div>
        </div>
        <form className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                defaultValue={placeholderProfile.name}
                disabled
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={placeholderProfile.email}
                disabled
                className="bg-muted/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              defaultValue={placeholderProfile.phone}
              disabled
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              defaultValue={placeholderProfile.address}
              disabled
              className="bg-muted/50"
            />
          </div>
          <Button type="button" disabled variant="outline">
            Modifier (backend requis)
          </Button>
        </form>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Lock className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Changer le mot de passe</h2>
            <p className="text-sm text-muted-foreground">
              Disponible après intégration de l&apos;authentification
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input
              id="current-password"
              type="password"
              disabled
              placeholder="••••••••"
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nouveau mot de passe</Label>
            <Input
              id="new-password"
              type="password"
              disabled
              placeholder="••••••••"
              className="bg-muted/50"
            />
          </div>
          <Button type="button" disabled variant="outline">
            Changer le mot de passe (backend requis)
          </Button>
        </div>
      </div>
    </div>
  );
}
