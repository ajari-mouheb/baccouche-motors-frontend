"use client";

import { useState } from "react";
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

const schema = z.object({
  email: z.string().email("Email invalide"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const result = await authApi.forgotPassword(values.email);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      toast.success("Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.");
    } else {
      toast.error(result.error ?? "Une erreur est survenue");
    }
  }

  if (submitted) {
    return (
      <AuthPageLayout
        title="Email envoyé"
        subtitle="Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe."
        backHref="/customer/login"
        backLabel="Retour à la connexion"
      >
        <p className="text-center text-sm text-muted-foreground">
          Consultez votre boîte de réception et vos spams.
        </p>
        <Button asChild variant="luxury" className="w-full">
          <Link href="/customer/login">Retour à la connexion</Link>
        </Button>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout
      title="Mot de passe oublié"
      subtitle="Entrez votre email pour recevoir un lien de réinitialisation"
      backHref="/customer/login"
      backLabel="Retour à la connexion"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    {...field}
                  />
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
                Envoi en cours...
              </>
            ) : (
              "Envoyer le lien"
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
