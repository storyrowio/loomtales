import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-md",
        outline:
          "border !bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "!bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        tonal: ""
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        iconRounded: "size-9 rounded-full"
      },
      color: {
        default: "bg-gray-200 text-secondary-foreground hover:text-accent-foreground",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-primary-foreground hover:bg-secondary-600",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        success: "bg-emerald"
      }
    },
    compoundVariants: [
      {
        variant: "ghost",
        color: "default",
        className: "text-accent-foreground"
      },
      {
        variant: "outline",
        color: "default",
        className: "border-muted-foreground text-muted-foreground hover:text-secondary-foreground hover:!bg-muted-foreground/10"
      },
      {
        variant: "outline",
        color: "primary",
        className: "border-primary text-primary hover:text-primary-700 hover:!bg-primary/10"
      },
      {
        variant: "tonal",
        color: "default",
        className: "!bg-primary/20 text-primary-600 shadow-primary/10 hover:!bg-primary/30"
      },
      {
        variant: "tonal",
        color: "secondary",
        className: "!bg-secondary/15 text-secondary shadow-secondary/10 hover:!bg-secondary/20"
      },
      {
        variant: "tonal",
        color: "destructive",
        className: "!bg-destructive/15 text-destructive shadow-destructive/10 hover:!bg-destructive/20"
      }
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
    color,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
