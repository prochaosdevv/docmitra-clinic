"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0", className)} {...props}>
      <div className="min-w-[640px]">{children}</div>
    </div>
  )
}
