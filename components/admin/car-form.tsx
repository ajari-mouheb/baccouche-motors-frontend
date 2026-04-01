"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, Save, CarFront, Calendar, DollarSign, FileText, Image, Upload, X, Link2 } from "lucide-react";
import Link from "next/link";
import type { Car } from "@/lib/types";
import { useUploadCarImage, useCreateCar, useUpdateCar, useCarById } from "@/lib/hooks/use-cars";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

interface CarFormProps {
  carId?: string;
}

export function CarForm({ carId }: CarFormProps) {
  const router = useRouter();
  const isEdit = !!carId;

  const { data: car, isLoading: loadingCar } = useCarById(carId || "");
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const uploadCarImage = useUploadCarImage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: "",
      model: "",
      year: String(new Date().getFullYear()),
      price: "",
      image: "",
      description: "",
    },
  });

  // Load car data when editing
  useEffect(() => {
    if (car && isEdit) {
      form.reset({
        name: car.name,
        model: car.model,
        year: String(car.year),
        price: car.price ?? "",
        image: car.image || "",
        description: car.description,
      });
      if (car.image) {
        setImagePreview(car.image);
      }
    }
  }, [car, isEdit, form]);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    const id = carId || `car-${Date.now()}`;
    try {
      const uploadedUrl = await uploadCarImage.mutateAsync({ id, file });
      if (uploadedUrl) {
        setImagePreview(uploadedUrl);
        form.setValue("image", uploadedUrl);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Erreur lors du téléchargement de l'image");
    }
  }, [carId, form, uploadCarImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setImagePreview(null);
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [form]);

  async function onSubmit(data: CarFormValues) {
    setIsSubmitting(true);
    try {
      const year = parseInt(data.year, 10);

      if (isEdit && car) {
        const updated = await updateCar.mutateAsync({
          id: carId,
          data: {
            name: data.name,
            model: data.model,
            year,
            price: data.price || undefined,
            image: data.image || car.image || undefined,
            description: data.description,
            specs: car.specs,
          },
        });
        if (updated) {
          toast.success("Véhicule modifié avec succès");
          router.push("/admin/cars");
        }
      } else {
        await createCar.mutateAsync({
          name: data.name,
          model: data.model,
          year,
          price: data.price || undefined,
          image: data.image || "",
          description: data.description,
        });
        toast.success("Véhicule ajouté avec succès");
        router.push("/admin/cars");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isEdit && loadingCar) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-luxury-accent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/cars"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Retour aux véhicules
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-accent/10">
            <CarFront className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEdit ? "Modifier le véhicule" : "Ajouter un véhicule"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Mettez à jour les informations du véhicule" : "Ajoutez un nouveau véhicule au catalogue"}
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* General Information */}
          <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                <CarFront className="size-5 text-luxury-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Informations générales</h2>
                <p className="text-sm text-muted-foreground">Informations de base du véhicule</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du véhicule</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: BMW Série 3" {...field} />
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
                    <FormLabel>Modèle</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 320i M Sport" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Prix <span className="text-muted-foreground">(optionnel)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 125 000 TND" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Image Upload */}
          <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                <Image className="size-5 text-luxury-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Image du véhicule</h2>
                <p className="text-sm text-muted-foreground">Photo principale du véhicule</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Drag and Drop Zone / Preview */}
              {imagePreview || form.watch("image") ? (
                <div className="relative group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                    <img
                      src={imagePreview || form.watch("image")}
                      alt="Aperçu"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadCarImage.isPending}
                      >
                        <Upload className="mr-2 size-4" />
                        Changer
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={clearImage}
                        disabled={uploadCarImage.isPending}
                      >
                        <X className="mr-2 size-4" />
                        Supprimer
                      </Button>
                    </div>
                    {uploadCarImage.isPending && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="flex items-center gap-3 text-white">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Téléchargement...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-dashed cursor-pointer transition-all",
                    isDragging
                      ? "border-luxury-accent bg-luxury-accent/5"
                      : "border-border hover:border-luxury-accent/50 hover:bg-muted/50"
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">
                        Glissez une image ici
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ou cliquez pour sélectionner
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-muted">JPG</span>
                      <span className="px-2 py-1 rounded bg-muted">PNG</span>
                      <span className="px-2 py-1 rounded bg-muted">GIF</span>
                      <span className="text-muted-foreground">Max 5 Mo</span>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                disabled={uploadCarImage.isPending}
                className="hidden"
              />

              {/* URL Input */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link2 className="size-3" />
                      URL de l&apos;image
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://exemple.com/image.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setImagePreview(null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Description */}
          <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                <FileText className="size-5 text-luxury-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-sm text-muted-foreground">Décrivez le véhicule en détail</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez le véhicule, ses équipements, options, historique, état général..."
                      rows={6}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link href="/admin/cars">
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Annuler
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || uploadCarImage.isPending}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  {isEdit ? "Enregistrer" : "Ajouter le véhicule"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}