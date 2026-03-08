import type { Metadata } from "next";
import { CustomerProfileForm } from "@/components/customer/customer-profile-form";

export const metadata: Metadata = {
  title: "Mon profil | Espace client - Baccouche Automobiles",
  description: "Gérez votre profil",
};

export default function CustomerProfilePage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="section-title mb-8">Mon profil</h1>
      <CustomerProfileForm />
    </div>
  );
}
