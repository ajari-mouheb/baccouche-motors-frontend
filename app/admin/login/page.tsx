"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
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
  password: z.string().min(1, "Mot de passe requis"),
});

type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { login, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin/dashboard";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const result = await login(values.email, values.password);
    setIsSubmitting(false);

    if (result.success) {
      const user = JSON.parse(sessionStorage.getItem("baccouche-auth") ?? "{}");
      if (user.role !== "admin") {
        logout();
        toast.error("Accès réservé aux administrateurs");
        return;
      }
      toast.success("Connexion réussie");
      router.push(redirect);
    } else {
      toast.error(result.error ?? "Échec de connexion");
    }
  }

  return (
    <AuthPageLayout
      title="Connexion Admin"
      subtitle="Connectez-vous pour accéder à l'administration"
      backHref="/"
      backLabel="Retour au site"
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
                    placeholder="admin@baccouche-motors.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
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
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-xs text-muted-foreground/80">
        Démo : admin@baccouche-motors.com / Admin123!
      </p>
    </AuthPageLayout>
  );
}
