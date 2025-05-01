import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-transparent",
                secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                tonal: "border-0"
            },
            color: {
                primary: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary: "bg-secondary text-primary-foreground [a&]:hover:bg-secondary/90",
                warning: "bg-amber-500 text-amber-600 [a&]:hover:bg-amber/90"
            }
        },
        compoundVariants: [
            {
                variant: "tonal",
                color: "primary",
                className: "!bg-primary/10 text-primary-500 shadow-primary/10 [a&]:hover:!bg-primary/30"
            },
            {
                variant: "tonal",
                color: "secondary",
                className: "!bg-secondary/15 text-secondary shadow-secondary/10 [a&]:hover:!bg-secondary/20"
            },
            {
                variant: "tonal",
                color: "destructive",
                className: "!bg-destructive/15 text-destructive shadow-destructive/10 [a&]:hover:!bg-destructive/20"
            },
            {
                variant: "tonal",
                color: "warning",
                className: "!bg-amber-500/15 text-amber-500 shadow-amber/10 [a&]:hover:!bg-amber/20"
            },
        ],
        defaultVariants: {
            // color: "primary",
            variant: "default",
        },
    }
)

function Badge({
                   className,
                   variant,
    color,
                   asChild = false,
                   ...props
               }) {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant, color }), className)}
            {...props} />
    );
}

export { Badge, badgeVariants }
