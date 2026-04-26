"use client";

import { useTestDrives } from "@/lib/hooks/use-test-drives";
import { useContacts } from "@/lib/hooks/use-contacts";
import { Car, Mail, CheckCircle, Clock, XCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  pending: "en attente",
  confirmed: "confirmée",
  completed: "terminée",
  rejected: "refusée",
  cancelled: "annulée",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500",
  confirmed: "bg-blue-500/10 text-blue-500",
  completed: "bg-emerald-500/10 text-emerald-500",
  rejected: "bg-red-500/10 text-red-500",
  cancelled: "bg-gray-500/10 text-gray-500",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  rejected: XCircle,
  cancelled: XCircle,
};

interface ActivityFeedProps {
  className?: string;
  limit?: number;
}

export function ActivityFeed({ className, limit = 10 }: ActivityFeedProps) {
  const { data: testDrives = [] } = useTestDrives();
  const { data: contacts = [] } = useContacts();

  // Create activity items from test drives and contacts
  const activities = [
    ...testDrives.map((td) => ({
      id: td.id,
      type: "test_drive" as const,
      title: `Demande Test Drive`,
      description: `${td.name} - ${td.model}`,
      status: td.status,
      createdAt: td.createdAt,
    })),
    ...contacts.map((c) => ({
      id: c.id,
      type: "contact" as const,
      title: `Nouveau message`,
      description: `${c.name}: ${c.subject || "Sans sujet"}`,
      status: c.read ? "read" : "unread",
      createdAt: c.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }

  return (
    <div className={className}>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Activité Récente
      </h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Aucune activité récente
          </p>
        ) : (
          activities.map((activity) => {
            const Icon = activity.type === "test_drive"
              ? statusIcons[activity.status] || Clock
              : Mail;

            return (
              <div
                key={`${activity.type}-${activity.id}`}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  activity.type === "test_drive"
                    ? statusColors[activity.status]
                    : activity.status === "unread"
                    ? "bg-luxury-accent/10 text-luxury-accent"
                    : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground/60 shrink-0">
                  {formatTime(activity.createdAt)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}