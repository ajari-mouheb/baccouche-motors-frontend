"use client";

import type { Contact } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactDetailDialogProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkRead?: (id: string) => void;
}

export function ContactDetailDialog({
  contact,
  open,
  onOpenChange,
  onMarkRead,
}: ContactDetailDialogProps) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Message de {contact.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-luxury-accent hover:underline"
            >
              {contact.email}
            </a>
          </div>
          {contact.phone && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
              <a
                href={`tel:${contact.phone}`}
                className="text-foreground hover:text-luxury-accent"
              >
                {contact.phone}
              </a>
            </div>
          )}
          {contact.subject && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sujet</p>
              <p>{contact.subject}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Message</p>
            <p className="whitespace-pre-wrap text-foreground">{contact.message}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Reçu le {new Date(contact.createdAt).toLocaleString("fr-FR")}
          </p>
          <div className="flex gap-2">
            {!contact.read && onMarkRead && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onMarkRead(contact.id);
                  onOpenChange(false);
                }}
              >
                Marquer comme lu
              </Button>
            )}
            <Button size="sm" variant="outline" asChild>
              <a
                href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
              >
                Répondre
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
