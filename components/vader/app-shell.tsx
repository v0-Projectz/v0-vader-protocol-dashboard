"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/vader/sidebar"
import { Header } from "@/components/vader/header"
import { Footer } from "@/components/vader/footer"
import { CommandPalette, CommandBar } from "@/components/vader/command-palette"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)

  // Handle keyboard shortcut for command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return
        }
        e.preventDefault()
        setCommandOpen(true)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex min-h-screen bg-background" data-testid="app-shell">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-[220px]">
        <Header />
        <main className="flex-1 overflow-auto p-6" data-testid="main-content">
          {children}
        </main>
        <Footer />
        {/* Command Bar at bottom left */}
        <div className="fixed bottom-4 left-[236px] z-50">
          <CommandBar onOpen={() => setCommandOpen(true)} />
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
