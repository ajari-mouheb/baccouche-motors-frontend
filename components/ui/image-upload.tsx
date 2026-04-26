"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onFileSelect?: (file: File) => Promise<string | null>;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  aspectRatio?: "video" | "square" | "wide";
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export function ImageUpload({
  value,
  onChange,
  onFileSelect,
  disabled = false,
  className,
  placeholder = "Glissez une image ici ou cliquez pour sélectionner",
  aspectRatio = "video",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      return false;
    }
    return true;
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    if (onFileSelect) {
      setIsUploading(true);
      try {
        const uploadedUrl = await onFileSelect(file);
        if (uploadedUrl) {
          onChange(uploadedUrl);
          URL.revokeObjectURL(objectUrl);
          setPreviewUrl(null);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setPreviewUrl(null);
        URL.revokeObjectURL(objectUrl);
      } finally {
        setIsUploading(false);
      }
    } else {
      onChange(objectUrl);
    }
  }, [onFileSelect, onChange, validateFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        await handleFile(files[0]);
      }
    },
    [disabled, handleFile]
  );

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleClear = useCallback(() => {
    onChange("");
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onChange]);

  const handleUrlInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setPreviewUrl(null);
  }, [onChange]);

  const displayUrl = previewUrl || value;

  return (
    <div className={cn("space-y-3", className)}>
      {displayUrl ? (
        <div className="relative group">
          <div className={cn(
            "relative overflow-hidden rounded-xl border border-border bg-muted",
            aspectRatioClasses[aspectRatio]
          )}>
            <img
              src={displayUrl}
              alt="Aperçu"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Changer
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleClear}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Téléchargement...
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
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative overflow-hidden rounded-xl border-2 border-dashed cursor-pointer transition-all",
            aspectRatioClasses[aspectRatio],
            isDragging
              ? "border-luxury-accent bg-luxury-accent/5"
              : "border-border hover:border-luxury-accent/50 hover:bg-muted/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Upload className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">{placeholder}</p>
              <p className="text-sm text-muted-foreground mt-1">
                JPG, PNG, GIF • Max 5 Mo
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {!onFileSelect && (
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}

      {!onFileSelect && (
        <input
          type="text"
          value={value || ""}
          onChange={handleUrlInput}
          placeholder="Ou entrez une URL d'image..."
          disabled={disabled}
          className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      )}
    </div>
  );
}