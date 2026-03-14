"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Reply, Check, Eye } from "lucide-react";
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
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-luxury-accent border-t-transparent" />
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
      <div className="space-y-6">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold">{contact.name}</p>
                {contact.subject && (
                  <Badge variant="outline" className="text-xs">
                    {contact.subject}
                  </Badge>
                )}
                {!contact.read && <Badge variant="unread">Non lu</Badge>}
              </div>
              {!contact.read && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRead(contact.id)}
                  className="gap-1.5"
                >
                  <Check className="size-4" />
                  Marquer comme lu
                </Button>
              )}
            </div>
            <div className="mb-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-luxury-accent hover:underline"
              >
                {contact.email}
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {contact.phone}
                </a>
              )}
            </div>
            <p className="text-muted-foreground">{contact.message}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {new Date(contact.createdAt).toLocaleString("fr-FR")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    setDetailContact(contact);
                    setDetailOpen(true);
                  }}
                >
                  <Eye className="size-4" />
                  Voir détails
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
                    className="inline-flex items-center gap-2"
                  >
                    <Reply className="size-4" />
                    Répondre
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setDeleteId(contact.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Aucun message pour ce filtre.
        </p>
      )}

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
        description="Cette action est irréversible."
        confirmLabel="Supprimer"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
