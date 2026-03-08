"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Reply, Check } from "lucide-react";
import type { MockContact } from "@/lib/data/mock-admin";
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

type ReadFilter = "all" | "unread" | "read";

interface AdminContactsListProps {
  contacts: MockContact[];
}

export function AdminContactsList({ contacts }: AdminContactsListProps) {
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());

  const contactsWithRead = useMemo(
    () =>
      contacts.map((c) => ({
        ...c,
        read: c.read || readIds.has(c.id),
      })),
    [contacts, readIds]
  );

  function toggleRead(id: string) {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = contactsWithRead.filter((c) => {
    if (readFilter === "all") return true;
    if (readFilter === "unread") return !c.read;
    return c.read === true;
  });

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
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
                  className="inline-flex items-center gap-2"
                >
                  <Reply className="size-4" />
                  Répondre
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Aucun message pour ce filtre.
        </p>
      )}
    </div>
  );
}
