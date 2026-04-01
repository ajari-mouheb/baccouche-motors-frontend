"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, Save, FileText, Link2, Calendar, Image, Upload, X } from "lucide-react";
import Link from "next/link";
import type { NewsArticle } from "@/lib/types";
import { useUploadNewsImage, useCreateNews, useUpdateNews, useNewsById } from "@/lib/hooks/use-news";
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
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

interface NewsFormProps {
  articleId?: string;
}

export function NewsForm({ articleId }: NewsFormProps) {
  const router = useRouter();
  const isEdit = !!articleId;

  const { data: article, isLoading: loadingArticle } = useNewsById(articleId || "");
  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const uploadNewsImage = useUploadNewsImage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Load article data when editing
  useEffect(() => {
    if (article && isEdit) {
      form.reset({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        date: article.date,
        image: article.image ?? "",
      });
      if (article.image) {
        setImagePreview(article.image);
      }
    }
  }, [article, isEdit, form]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (!isEdit) {
      form.setValue("slug", slugify(value));
    }
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    const id = articleId || `news-${Date.now()}`;
    try {
      const uploadedUrl = await uploadNewsImage.mutateAsync({ id, file });
      if (uploadedUrl) {
        setImagePreview(uploadedUrl);
        form.setValue("image", uploadedUrl);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Erreur lors du téléchargement de l'image");
    }
  }, [articleId, form, uploadNewsImage]);

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

  async function onSubmit(data: NewsFormValues) {
    setIsSubmitting(true);
    try {
      if (isEdit && article) {
        const updated = await updateNews.mutateAsync({
          id: articleId,
          data: {
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            date: data.date,
            image: data.image || undefined,
            slug: data.slug,
          },
        });
        if (updated) {
          toast.success("Article modifié avec succès");
          router.push("/admin/news");
        }
      } else {
        await createNews.mutateAsync({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          date: data.date,
          image: data.image || undefined,
          slug: data.slug,
        });
        toast.success("Article publié avec succès");
        router.push("/admin/news");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isEdit && loadingArticle) {
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
          href="/admin/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Retour aux articles
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-accent/10">
            <FileText className="size-6 text-luxury-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEdit ? "Modifier l'article" : "Nouvel article"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Mettez à jour le contenu de l'article" : "Rédigez un nouvel article pour le blog"}
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title and Slug */}
          <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                <FileText className="size-5 text-luxury-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Informations générales</h2>
                <p className="text-sm text-muted-foreground">Titre et identifiant de l&apos;article</p>
              </div>
            </div>

            <div className="space-y-4">
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
                        onChange={(e) => handleTitleChange(e.target.value)}
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
                    <FormLabel className="flex items-center gap-2">
                      <Link2 className="size-3" />
                      Slug (URL)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="mon-article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Content */}
          <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Contenu</h2>
                <p className="text-sm text-muted-foreground">Texte de l&apos;article</p>
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extrait</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Résumé court affiché dans les listes..."
                        rows={2}
                        className="resize-none"
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
                    <FormLabel>Contenu complet</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Écrivez le contenu de votre article..."
                        className="min-h-[300px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Metadata and Image */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Metadata */}
            <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                  <Calendar className="size-5 text-luxury-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Métadonnées</h2>
                  <p className="text-sm text-muted-foreground">Date de publication</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de publication</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Image */}
            <section className="rounded-xl border border-border/50 bg-card p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-accent/20 to-luxury-accent/5">
                  <Image className="size-5 text-luxury-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Image</h2>
                  <p className="text-sm text-muted-foreground">Image de couverture</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Drag and Drop Zone / Preview */}
                {imagePreview || form.watch("image") ? (
                  <div className="relative group">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                      <img
                        src={imagePreview || form.watch("image")}
                        alt="Aperçu"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadNewsImage.isPending}
                        >
                          <Upload className="mr-2 size-4" />
                          Changer
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={clearImage}
                          disabled={uploadNewsImage.isPending}
                        >
                          <X className="mr-2 size-4" />
                          Supprimer
                        </Button>
                      </div>
                      {uploadNewsImage.isPending && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-white">
                            <Loader2 className="h-5 w-5 animate-spin" />
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
                      "relative aspect-video overflow-hidden rounded-lg border-2 border-dashed cursor-pointer transition-all",
                      isDragging
                        ? "border-luxury-accent bg-luxury-accent/5"
                        : "border-border hover:border-luxury-accent/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground text-center">
                        Glissez une image ou cliquez
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={uploadNewsImage.isPending}
                  className="hidden"
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Ou entrez une URL d'image..."
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
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link href="/admin/news">
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Annuler
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || uploadNewsImage.isPending}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  {isEdit ? "Enregistrer" : "Publier"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}