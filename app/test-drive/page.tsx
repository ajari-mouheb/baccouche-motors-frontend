import type { Metadata } from "next";
import { TestDriveForm } from "@/components/forms/test-drive-form";

export const metadata: Metadata = {
  title: "Test Drive | Baccouche Automobiles - BMW Sousse",
  description: "Réservez votre essai gratuit BMW chez Baccouche Automobiles.",
};

export default function TestDrivePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="section-title mb-4">RÉSERVER UN TEST DRIVE</h1>
        <p className="text-muted-foreground">
          Vivez l&apos;expérience BMW. Remplissez le formulaire et notre équipe
          vous contactera pour organiser votre essai.
        </p>
      </div>
      <TestDriveForm />
    </div>
  );
}
