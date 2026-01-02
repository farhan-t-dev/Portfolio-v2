import * as React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "rank-s" | "rank-a" | "system"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase tracking-wider clip-corner",
        {
          "border-transparent bg-system-blue text-black hover:bg-system-blue/80": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "border-transparent bg-danger text-white hover:bg-danger/80": variant === "destructive",
          "text-white border-white/20": variant === "outline",
          // System Ranks
          "border-rank-s text-rank-s bg-rank-s/10 shadow-[0_0_10px_theme('colors.rank-s')]": variant === "rank-s",
          "border-white/40 text-white bg-white/5": variant === "rank-a",
          "border-system-blue text-system-blue bg-system-blue/10": variant === "system",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
