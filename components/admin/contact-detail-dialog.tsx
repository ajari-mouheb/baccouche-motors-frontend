"use client";

import type { Contact } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, User, MessageSquare, Clock, Check, Reply } from "lucide-react";

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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="size-5 text-luxury-accent" />
            Message de {contact.name}
          </DialogTitle>
        </DialogHeader>

        {/* Status Badge */}
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${contact.read ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
              {contact.read ? (
                <Check className="size-5 text-emerald-500" />
              ) : (
                <Clock className="size-5 text-amber-500" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <p className="font-semibold">{contact.read ? "Lu" : "Non lu"}</p>
            </div>
          </div>
          <Badge variant={contact.read ? "confirmed" : "unread"}>
            {contact.read ? "Lu" : "Non lu"}
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Subject */}
          {contact.subject && (
            <div className="rounded-lg border border-border/50 bg-gradient-to-br from-luxury-accent/5 to-transparent p-4">
              <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sujet
              </p>
              <p className="text-lg font-semibold text-foreground">
                {contact.subject}
              </p>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Coordonnées
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <User className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Mail className="size-4 text-muted-foreground" />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-luxury-accent hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Phone className="size-4 text-muted-foreground" />
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-foreground hover:text-luxury-accent transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Message */}
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Message
            </p>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {contact.message}
              </p>
            </div>
          </div>

          <Separator />

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground">
            Reçu le{" "}
            {new Date(contact.createdAt).toLocaleString("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {!contact.read && onMarkRead && (
              <Button
                variant="outline"
                onClick={() => {
                  onMarkRead(contact.id);
                  onOpenChange(false);
                }}
                className="flex-1 gap-2"
              >
                <Check className="size-4" />
                Marquer comme lu
              </Button>
            )}
            <Button variant="outline" asChild className="flex-1 gap-2">
              <a
                href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
              >
                <Reply className="size-4" />
                Répondre
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}