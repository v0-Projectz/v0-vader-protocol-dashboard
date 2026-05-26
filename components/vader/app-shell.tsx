"use client"

import { useState, useEffect } from "react"
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
    <div className="flex h-screen overflow-hidden bg-[#121212]" data-testid="app-shell">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col ml-[220px] min-w-0">
        <Header />
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4" data-testid="main-content">
          {children}
        </main>
        
        <Footer />
      </div>
      
      {/* Command Bar - Fixed at bottom left */}
      <div className="fixed bottom-3 left-[236px] z-50">
        <CommandBar onOpen={() => setCommandOpen(true)} />
      </div>
      
      {/* Command Palette Modal */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
