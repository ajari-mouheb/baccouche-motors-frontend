"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createTestDrive } from "@/lib/api/test-drives";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cars } from "@/lib/data/cars";
import Link from "next/link";

const testDriveSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  model: z.string().min(1, "Veuillez sélectionner un modèle"),
  preferredDate: z.string().optional(),
  timeSlot: z.string().optional(),
});

type TestDriveFormValues = z.infer<typeof testDriveSchema>;

export function TestDriveForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestDriveFormValues>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      model: "",
      preferredDate: "",
      timeSlot: "",
    },
  });

  async function onSubmit(data: TestDriveFormValues) {
    setIsSubmitting(true);
    try {
      await createTestDrive({
        name: data.name,
        email: data.email,
        phone: data.phone,
        model: data.model,
        preferredDate: data.preferredDate || undefined,
        timeSlot: (data.timeSlot as "morning" | "afternoon") || undefined,
      });
      setSubmitted(true);
      form.reset();
      toast.success("Demande envoyée avec succès");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-luxury-accent/30 bg-luxury-accent/5 p-10 text-center">
        <div
          className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-luxury-accent/20 animate-in zoom-in duration-500"
          aria-hidden
        >
          <span className="text-2xl font-bold text-luxury-accent">✓</span>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Demande envoyée avec succès
        </h2>
        <p className="mb-8 text-muted-foreground">
          Notre équipe vous contactera dans les plus brefs délais pour
          organiser votre test drive.
        </p>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href="/cars">Découvrir nos véhicules</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom"
                  className="h-12 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="+216 XX XXX XXX"
                  className="h-12 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="h-12 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Modèle souhaité</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Sélectionnez un modèle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.slug}>
                      {car.name} {car.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Date préférée</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Créneau</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Matin / Après-midi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">Matin (9h - 12h)</SelectItem>
                    <SelectItem value="afternoon">Après-midi (14h - 18h)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="h-14 w-full text-base"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </Button>
      </form>
    </Form>
  );
}
