"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Car } from "@/lib/data/cars";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";

const carSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.string().min(1, "L'année est requise").refine(
    (v) => {
      const n = parseInt(v, 10);
      return !isNaN(n) && n >= 1900 && n <= 2100;
    },
    { message: "Année invalide (1900-2100)" }
  ),
  price: z.string().optional(),
  image: z.string().min(1, "L'URL de l'image est requise"),
  description: z.string().min(1, "La description est requise"),
});

type CarFormValues = z.infer<typeof carSchema>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface CarFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car?: Car | null;
  onSave: (data: Omit<CarFormValues, "year"> & {
    year: number;
    id: string;
    slug: string;
  }) => void;
}

export function CarFormDialog({
  open,
  onOpenChange,
  car,
  onSave,
}: CarFormDialogProps) {
  const isEdit = !!car;

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: "",
      model: "",
      year: String(new Date().getFullYear()),
      price: "Sur demande",
      image: "/bmw-placeholder.svg",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        car
          ? {
              name: car.name,
              model: car.model,
              year: String(car.year),
              price: car.price ?? "Sur demande",
              image: car.image,
              description: car.description,
            }
          : {
              name: "",
              model: "",
              year: String(new Date().getFullYear()),
              price: "Sur demande",
              image: "/bmw-placeholder.svg",
              description: "",
            }
      );
    }
  }, [open, car, form]);

  function resetForm() {
    form.reset(
      car
        ? {
            name: car.name,
            model: car.model,
            year: String(car.year),
            price: car.price ?? "Sur demande",
            image: car.image,
            description: car.description,
          }
        : {
            name: "",
            model: "",
            year: String(new Date().getFullYear()),
            price: "Sur demande",
            image: "/bmw-placeholder.svg",
            description: "",
          }
    );
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function onSubmit(data: CarFormValues) {
    const year = parseInt(data.year, 10);
    const base = {
      ...data,
      year,
      price: data.price,
    };
    const payload = isEdit
      ? { ...base, id: car!.id, slug: car!.slug }
      : {
          ...base,
          id: `car-${Date.now()}`,
          slug: slugify(`${data.name} ${data.model}`) || "nouveau-vehicule",
        };
    onSave(payload);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier le véhicule" : "Ajouter un véhicule"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom (ex: BMW Série 3)</FormLabel>
                    <FormControl>
                      <Input placeholder="BMW Série 3" {...field} />
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
                    <FormLabel>Modèle (ex: 320i)</FormLabel>
                    <FormControl>
                      <Input placeholder="320i" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Année</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sur demande" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l&apos;image</FormLabel>
                  <FormControl>
                    <Input placeholder="/bmw-placeholder.svg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du véhicule..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">{isEdit ? "Enregistrer" : "Ajouter"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
