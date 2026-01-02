import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = ({ 
  variant = "default", 
  size = "default", 
  className = "" 
}: { 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "system", 
  size?: "default" | "sm" | "lg" | "icon",
  className?: string
}) => {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-widest ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 clip-corner active:scale-95",
    {
      "bg-system-blue text-black hover:bg-system-blue/80 hover:shadow-[0_0_15px_theme('colors.system-blue')]": variant === "default",
      "bg-danger text-white hover:bg-danger/90": variant === "destructive",
      "border border-white/20 bg-transparent hover:bg-white/10 hover:border-white/50 text-white": variant === "outline",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
      "hover:bg-white/5 hover:text-white": variant === "ghost",
      "text-system-blue underline-offset-4 hover:underline": variant === "link",
      // System Variant
      "bg-transparent border border-system-blue text-system-blue hover:bg-system-blue hover:text-black hover:shadow-[0_0_20px_theme('colors.system-blue')]": variant === "system",
      "h-10 px-6 py-2": size === "default",
      "h-9 px-4": size === "sm",
      "h-12 px-8 text-lg": size === "lg",
      "h-10 w-10": size === "icon",
    },
    className
  );
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "system"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }