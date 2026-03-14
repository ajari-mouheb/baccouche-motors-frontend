"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as authApi from "@/lib/api/auth-api";
import { AuthPageLayout } from "@/components/auth/auth-page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z
  .object({
    newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: FormValues) {
    if (!token) {
      toast.error("Lien invalide ou expiré");
      return;
    }
    setIsSubmitting(true);
    const result = await authApi.resetPassword(token, values.newPassword);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      toast.success("Mot de passe réinitialisé avec succès");
    } else {
      toast.error(result.error ?? "Une erreur est survenue");
    }
  }

  if (!token) {
    return (
      <AuthPageLayout
        title="Lien invalide"
        subtitle="Ce lien de réinitialisation est invalide ou a expiré."
        backHref="/customer/forgot-password"
        backLabel="Demander un nouveau lien"
      >
        <Button asChild variant="luxury" className="w-full">
          <Link href="/customer/forgot-password">Demander un nouveau lien</Link>
        </Button>
      </AuthPageLayout>
    );
  }

  if (success) {
    return (
      <AuthPageLayout
        title="Mot de passe modifié"
        subtitle="Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter."
        backHref="/customer/login"
        backLabel="Se connecter"
      >
        <Button
          variant="luxury"
          className="w-full"
          onClick={() => router.push("/customer/login")}
        >
          Se connecter
        </Button>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un nouveau mot de passe sécurisé"
      backHref="/customer/login"
      backLabel="Retour à la connexion"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="luxury"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Réinitialisation...
              </>
            ) : (
              "Réinitialiser le mot de passe"
            )}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/customer/login"
          className="font-medium text-luxury-accent hover:underline"
        >
          Retour à la connexion
        </Link>
      </p>
    </AuthPageLayout>
  );
}
