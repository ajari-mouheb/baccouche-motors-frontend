"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Car } from "@/lib/types";
import { useUploadCarImage } from "@/lib/hooks/use-cars";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const carSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  model: z.string().min(1, "Le modle est requis"),
  year: z.string().min(1, "L'anne est requise").refine(
    (v) => {
      const n = parseInt(v, 10);
      return !isNaN(n) && n >= 1900 && n <= 2100;
    },
    { message: "Anne invalide (1900-2100)" }
  ),
  price: z.string().optional(),
  image: z.string().optional(),
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
    image: string;
  }) => void;
}

export function CarFormDialog({
  open,
  onOpenChange,
  car,
  onSave,
}: CarFormDialogProps) {
  const isEdit = !!car;
  const uploadCarImage = useUploadCarImage();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              image: car.image || "/bmw-placeholder.svg",
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
            image: car.image || "/bmw-placeholder.svg",
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

  async function handleFileUpload(file: File): Promise<string | null> {
    const carId = car?.id || `car-${Date.now()}`;
    try {
      const uploadedUrl = await uploadCarImage.mutateAsync({ id: carId, file });
      return uploadedUrl;
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  }

  async function onSubmit(data: CarFormValues) {
    setIsSubmitting(true);
    try {
      const year = parseInt(data.year, 10);
      const base = {
        ...data,
        year,
        price: data.price,
      };
      const payload = isEdit
        ? { ...base, id: car!.id, slug: car!.slug, image: data.image || "/bmw-placeholder.svg" }
        : {
            ...base,
            id: `car-${Date.now()}`,
            slug: slugify(`${data.name} ${data.model}`) || "nouveau-vhicule",
            image: data.image || "/bmw-placeholder.svg",
          };
      onSave(payload);
      handleOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier le vhicule" : "Ajouter un vhicule"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Informations gnrales</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="BMW Srie 3" {...field} />
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
                      <FormLabel>Modle</FormLabel>
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
                      <FormLabel>Anne</FormLabel>
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
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Image</h3>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        onFileSelect={handleFileUpload}
                        disabled={uploadCarImage.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Description du vhicule..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting || uploadCarImage.isPending}>
                {(isSubmitting || uploadCarImage.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploadCarImage.isPending ? "Tlchargement..." : "Enregistrement..."}
                  </>
                ) : (
                  isEdit ? "Enregistrer" : "Ajouter"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
