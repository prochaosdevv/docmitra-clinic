"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label?: string
}

export function Fab({ icon, label, className, ...props }: FabProps) {
  return (
    <Button
      className={cn(
        "fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:hidden",
        className,
      )}
      size="icon"
      {...props}
    >
      {icon}
      {label && <span className="sr-only">{label}</span>}
    </Button>
  )
}
