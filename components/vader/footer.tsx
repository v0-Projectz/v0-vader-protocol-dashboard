"use client"

export function Footer() {
  return (
    <footer
      className="flex h-10 items-center justify-center border-t border-[#2a2a2a] bg-[#0a0a0a]"
      data-testid="footer"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Powered by</span>
        <span className="font-semibold text-primary" data-testid="footer-brand">Vader Engine</span>
        <span className="text-[10px] font-mono">v2.5.0</span>
      </div>
    </footer>
  )
}
