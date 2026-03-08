import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive/20 text-destructive dark:bg-destructive/30 dark:text-destructive",
        outline: "text-foreground border-border",
        pending:
          "border-transparent bg-amber-500/20 text-amber-600 dark:text-amber-400",
        confirmed:
          "border-transparent bg-blue-500/20 text-blue-600 dark:text-blue-400",
        completed:
          "border-transparent bg-green-500/20 text-green-600 dark:text-green-400",
        rejected:
          "border-transparent bg-red-500/20 text-red-600 dark:text-red-400",
        unread:
          "border-transparent bg-luxury-accent/20 text-luxury-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
