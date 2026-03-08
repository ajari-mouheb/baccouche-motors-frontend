"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { User, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { updateProfile, changePassword } from "@/lib/api/auth";
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

const profileSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function CustomerProfileForm() {
  const { user, updateUser } = useAuth();
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, profileForm]);

  async function onProfileSubmit(values: ProfileFormValues) {
    if (!user) return;
    setIsProfileSaving(true);
    try {
      const updated = await updateProfile(user.id, {
        name: values.name,
        phone: values.phone || undefined,
        address: values.address || undefined,
      });
      if (updated) {
        updateUser(updated);
        toast.success("Profil mis à jour");
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setIsProfileSaving(false);
  }

  async function onPasswordSubmit(values: PasswordFormValues) {
    if (!user) return;
    setIsPasswordSaving(true);
    try {
      const result = await changePassword(
        user.id,
        values.currentPassword,
        values.newPassword
      );
      if (result.success) {
        toast.success("Mot de passe modifié");
        passwordForm.reset();
      } else {
        toast.error(result.error ?? "Erreur lors du changement");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setIsPasswordSaving(false);
  }

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
              Modifiez vos informations personnelles
            </p>
          </div>
        </div>
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  value={user?.email ?? ""}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  L&apos;email ne peut pas être modifié
                </p>
              </FormItem>
            </div>
            <FormField
              control={profileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+216 XX XXX XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre adresse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isProfileSaving}>
              {isProfileSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Lock className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Changer le mot de passe</h2>
            <p className="text-sm text-muted-foreground">
              Mettez à jour votre mot de passe
            </p>
          </div>
        </div>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe actuel</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
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
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" disabled={isPasswordSaving}>
              {isPasswordSaving ? "Modification..." : "Changer le mot de passe"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
