"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Reply, Check, Eye, Mail, Phone, Clock, User, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Contact } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/shared/empty-state";
import { ContactDetailDialog } from "./contact-detail-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  useContacts,
  useUpdateContact,
  useDeleteContact,
} from "@/lib/hooks/use-contacts";

type ReadFilter = "all" | "unread" | "read";

export function AdminContactsList() {
  const { data: contacts = [], isLoading } = useContacts();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [detailContact, setDetailContact] = useState<Contact | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      contacts.filter((c) => {
        if (readFilter === "all") return true;
        if (readFilter === "unread") return !c.read;
        return c.read === true;
      }),
    [contacts, readFilter]
  );

  async function toggleRead(id: string) {
    try {
      const updated = await updateContact.mutateAsync({
        id,
        data: { read: true },
      });
      if (updated) {
        setDetailContact((prev) => (prev?.id === id ? updated : prev));
        toast.success("Message marqué comme lu");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      const ok = await deleteContact.mutateAsync(deleteId);
      if (ok) {
        setDetailContact((prev) => (prev?.id === deleteId ? null : prev));
        if (detailContact?.id === deleteId) setDetailOpen(false);
        toast.success("Message supprimé");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
    setDeleteId(null);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-luxury-accent border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <EmptyState
        icon="default"
        title="Aucun message"
        description="Les messages envoyés depuis le formulaire de contact apparaîtront ici."
        action={
          <Link
            href="/contact"
            className="text-sm font-medium text-luxury-accent hover:underline"
          >
            Voir le formulaire de contact
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex justify-end">
        <Select
          value={readFilter}
          onValueChange={(v) => setReadFilter(v as ReadFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="unread">Non lus</SelectItem>
            <SelectItem value="read">Lus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className={`group overflow-hidden rounded-xl border transition-all hover:shadow-md ${
              contact.read
                ? "border-border/50 bg-card/50"
                : "border-luxury-accent/30 bg-gradient-to-br from-luxury-accent/5 to-transparent"
            }`}
          >
            <div className="p-5">
              {/* Header */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    contact.read ? "bg-muted" : "bg-luxury-accent/10"
                  }`}>
                    <User className={`size-5 ${contact.read ? "text-muted-foreground" : "text-luxury-accent"}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{contact.name}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-1 text-luxury-accent hover:underline"
                      >
                        <Mail className="size-3" />
                        {contact.email}
                      </a>
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-1 hover:text-foreground"
                        >
                          <Phone className="size-3" />
                          {contact.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {contact.subject && (
                    <Badge variant="outline" className="text-xs">
                      {contact.subject}
                    </Badge>
                  )}
                  {!contact.read && (
                    <Badge variant="unread" className="gap-1">
                      <Clock className="size-3" />
                      Non lu
                    </Badge>
                  )}
                </div>
              </div>

              {/* Message Preview */}
              <p className="mb-4 line-clamp-2 text-muted-foreground">
                {contact.message}
              </p>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  <Clock className="mr-1 inline size-3" />
                  {new Date(contact.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {!contact.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(contact.id)}
                      className="gap-1.5"
                    >
                      <Check className="size-4" />
                      Marquer lu
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDetailContact(contact);
                      setDetailOpen(true);
                    }}
                    className="gap-1.5"
                  >
                    <Eye className="size-4" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-1.5">
                    <a
                      href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
                    >
                      <Reply className="size-4" />
                      Répondre
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setDeleteId(contact.id)}
                  >
                    <Trash2 className="size-4" />
                    <span className="hidden sm:inline">Supprimer</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <MessageSquare className="mb-2 size-8 text-muted-foreground/50" />
          <p>Aucun message pour ce filtre.</p>
        </div>
      )}

      {/* Dialogs */}
      <ContactDetailDialog
        contact={detailContact}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onMarkRead={toggleRead}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Supprimer le message"
        description="Cette action est irréversible. Le message sera définitivement supprimé."
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}