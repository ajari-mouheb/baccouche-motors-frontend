"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { NewsArticle } from "@/lib/types";
import { useUploadNewsImage } from "@/lib/hooks/use-news";
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

const newsSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().min(1, "L'extrait est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  date: z.string().min(1, "La date est requise"),
  image: z.string().optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9-]/g, "");
}

interface NewsFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article?: NewsArticle | null;
  onSave: (data: NewsFormValues) => void;
}

export function NewsFormDialog({
  open,
  onOpenChange,
  article,
  onSave,
}: NewsFormDialogProps) {
  const isEdit = !!article;
  const uploadNewsImage = useUploadNewsImage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      image: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        article
          ? {
              slug: article.slug,
              title: article.title,
              excerpt: article.excerpt,
              content: article.content,
              date: article.date,
              image: article.image ?? "",
            }
          : {
              slug: "",
              title: "",
              excerpt: "",
              content: "",
              date: new Date().toISOString().slice(0, 10),
              image: "",
            }
      );
    }
  }, [open, article, form]);

  function resetForm() {
    form.reset(
      article
        ? {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            date: article.date,
            image: article.image ?? "",
          }
        : {
            slug: "",
            title: "",
            excerpt: "",
            content: "",
            date: new Date().toISOString().slice(0, 10),
            image: "",
          }
    );
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  async function handleFileUpload(file: File): Promise<string | null> {
    const articleId = article?.id || `news-${Date.now()}`;
    try {
      const uploadedUrl = await uploadNewsImage.mutateAsync({ id: articleId, file });
      return uploadedUrl;
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  }

  async function onSubmit(data: NewsFormValues) {
    setIsSubmitting(true);
    try {
      onSave(data);
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
            {isEdit ? "Modifier l'article" : "Nouvel article"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Informations gnrales</h3>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Titre de l'article"
                        {...field}
                        onChange={(e) => {
                          const v = e.target.value;
                          field.onChange(v);
                          if (!isEdit) form.setValue("slug", slugify(v));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="mon-article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Contenu</h3>
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extrait</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Rsum court..."
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenu</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contenu complet de l'article..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Mtdonnes</h3>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                          disabled={uploadNewsImage.isPending}
                          placeholder="Glissez une image ou cliquez"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <Button type="submit" disabled={isSubmitting || uploadNewsImage.isPending}>
                {(isSubmitting || uploadNewsImage.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploadNewsImage.isPending ? "Tlchargement..." : "Enregistrement..."}
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
