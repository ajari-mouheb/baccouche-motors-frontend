"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X, Car } from "lucide-react";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMAGE = "/placeholder-car.svg";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const validImages = images.filter(Boolean).length > 0 
    ? images.filter(Boolean) 
    : [PLACEHOLDER_IMAGE];

  if (!validImages.length) {
    return (
      <div className={cn("aspect-video w-full rounded-xl bg-muted", className)}>
        <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
          <Car className="h-16 w-16 opacity-50" />
          <p>Aucune image disponible</p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Main Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          {validImages[selectedIndex] === PLACEHOLDER_IMAGE ? (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={alt}
                width={200}
                height={120}
                className="object-contain opacity-50"
              />
            </div>
          ) : (
            <Image
              src={validImages[selectedIndex]}
              alt={`${alt} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              priority
            />
          )}

          {/* Zoom Button */}
          {validImages[selectedIndex] !== PLACEHOLDER_IMAGE && (
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Zoom"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          )}

          {/* Navigation Arrows - only show if multiple images */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {selectedIndex + 1} / {validImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails - only show if multiple images */}
        {validImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {validImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg transition-all",
                  selectedIndex === index
                    ? "ring-2 ring-luxury-accent ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                {img === PLACEHOLDER_IMAGE ? (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Image
                      src={PLACEHOLDER_IMAGE}
                      alt={`${alt} - Miniature ${index + 1}`}
                      width={56}
                      height={32}
                      className="object-contain opacity-50"
                    />
                  </div>
                ) : (
                  <Image
                    src={img}
                    alt={`${alt} - Miniature ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative h-[85vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={validImages[selectedIndex]}
              alt={`${alt} - Image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Counter in lightbox */}
          {validImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">
              {selectedIndex + 1} / {validImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}