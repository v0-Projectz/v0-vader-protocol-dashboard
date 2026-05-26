"use client"

import { Cpu } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="flex h-12 items-center justify-center border-t border-border bg-background"
      data-testid="footer"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Cpu className="h-4 w-4" />
        <span>Powered by</span>
        <span className="font-semibold text-primary">MSC Media Engine</span>
      </div>
    </footer>
  )
}
