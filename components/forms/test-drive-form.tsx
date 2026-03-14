"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useCreateTestDrive } from "@/lib/hooks/use-test-drives";
import { useCars } from "@/lib/hooks/use-cars";
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const guestSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  model: z.string().min(1, "Veuillez sélectionner un modèle"),
  preferredDate: z.string().min(1, "La date est requise"),
  timeSlot: z.enum(["morning", "afternoon"], {
    error: "Veuillez sélectionner un créneau",
  }),
});

const loggedInSchema = z.object({
  carId: z.string().min(1, "Veuillez sélectionner un véhicule"),
  scheduledAt: z.string().min(1, "La date et l'heure sont requises"),
  notes: z.string().optional(),
});

type GuestFormValues = z.infer<typeof guestSchema>;
type LoggedInFormValues = z.infer<typeof loggedInSchema>;

export function TestDriveForm() {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const { data: cars = [] } = useCars();
  const createTestDrive = useCreateTestDrive();
  const isLoggedIn = !!user;

  const guestForm = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      model: "",
      preferredDate: "",
      timeSlot: undefined,
    },
  });

  const loggedInForm = useForm<LoggedInFormValues>({
    resolver: zodResolver(loggedInSchema),
    defaultValues: {
      carId: "",
      scheduledAt: "",
      notes: "",
    },
  });

  async function onGuestSubmit(data: GuestFormValues) {
    try {
      const selectedCar = cars.find((c) => c.slug === data.model);
      await createTestDrive.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        model: selectedCar ? `${selectedCar.name} ${selectedCar.model}` : data.model,
        preferredDate: data.preferredDate,
        timeSlot: data.timeSlot,
      });
      setSubmitted(true);
      guestForm.reset();
      toast.success("Demande envoyée avec succès");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  async function onLoggedInSubmit(data: LoggedInFormValues) {
    try {
      await createTestDrive.mutateAsync({
        carId: data.carId,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
        notes: data.notes || undefined,
      });
      setSubmitted(true);
      loggedInForm.reset();
      toast.success("Test drive réservé avec succès");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
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

  if (isLoggedIn) {
    return (
      <Form {...loggedInForm}>
        <form
          onSubmit={loggedInForm.handleSubmit(onLoggedInSubmit)}
          className="space-y-6"
        >
          <FormField
            control={loggedInForm.control}
            name="carId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Véhicule</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Sélectionnez un véhicule" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.name} {car.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loggedInForm.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Date et heure souhaitées</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loggedInForm.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Notes (optionnel)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informations complémentaires..."
                    rows={3}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-14 w-full text-base"
            size="lg"
            disabled={createTestDrive.isPending}
          >
            {createTestDrive.isPending ? "Envoi en cours..." : "Réserver mon test drive"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...guestForm}>
      <form onSubmit={guestForm.handleSubmit(onGuestSubmit)} className="space-y-6">
        <FormField
          control={guestForm.control}
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
          control={guestForm.control}
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
          control={guestForm.control}
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
          control={guestForm.control}
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
            control={guestForm.control}
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
            control={guestForm.control}
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
          disabled={createTestDrive.isPending}
        >
          {createTestDrive.isPending ? "Envoi en cours..." : "Envoyer ma demande"}
        </Button>
      </form>
    </Form>
  );
}
