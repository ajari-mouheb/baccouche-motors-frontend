import * as React from "react"
import { Car, FileText, Inbox, LayoutDashboard } from "lucide-react"

import { cn } from "@/lib/utils"

const iconMap = {
  default: Inbox,
  cars: Car,
  news: FileText,
  dashboard: LayoutDashboard,
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: keyof typeof iconMap
  action?: React.ReactNode
}

function EmptyState({
  title,
  description,
  icon = "default",
  action,
  className,
  ...props
}: EmptyStateProps) {
  const Icon = iconMap[icon]

  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center",
        className
      )}
      {...props}
    >
      <div
        className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted"
        aria-hidden
      >
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export { EmptyState }
