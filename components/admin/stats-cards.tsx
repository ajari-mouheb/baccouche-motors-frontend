import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "accent" | "success" | "warning" | "info";
}

const variantStyles = {
  default: {
    card: "bg-card hover:bg-card/80",
    icon: "bg-muted text-muted-foreground",
    value: "text-foreground",
    accent: "bg-muted/50",
  },
  accent: {
    card: "bg-gradient-to-br from-luxury-accent/10 to-luxury-accent/5 hover:from-luxury-accent/15 hover:to-luxury-accent/5",
    icon: "bg-luxury-accent/20 text-luxury-accent",
    value: "text-foreground",
    accent: "bg-luxury-accent/10",
  },
  success: {
    card: "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 hover:from-emerald-500/15 hover:to-emerald-500/5",
    icon: "bg-emerald-500/20 text-emerald-500",
    value: "text-foreground",
    accent: "bg-emerald-500/10",
  },
  warning: {
    card: "bg-gradient-to-br from-amber-500/10 to-amber-500/5 hover:from-amber-500/15 hover:to-amber-500/5",
    icon: "bg-amber-500/20 text-amber-500",
    value: "text-foreground",
    accent: "bg-amber-500/10",
  },
  info: {
    card: "bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:from-blue-500/15 hover:to-blue-500/5",
    icon: "bg-blue-500/20 text-blue-500",
    value: "text-foreground",
    accent: "bg-blue-500/10",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "group rounded-xl border border-border/50 p-6 shadow-sm transition-all duration-200",
        styles.card
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p
            className={cn(
              "mt-2 text-3xl font-bold tracking-tight",
              styles.value
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground/70">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-emerald-500",
                  trend === "down" && "text-red-500",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trend === "neutral" && "→"} {trendValue}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
              styles.icon
            )}
          >
            <Icon className="size-6" />
          </div>
        )}
      </div>
    </div>
  );
}