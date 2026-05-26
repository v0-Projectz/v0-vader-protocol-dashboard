"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/vader/sidebar"
import { Header } from "@/components/vader/header"
import { Footer } from "@/components/vader/footer"
import { CommandPalette, CommandBar } from "@/components/vader/command-palette"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Collapsed by default

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

  const sidebarWidth = sidebarCollapsed ? 60 : 220

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212]" data-testid="app-shell">
      {/* Collapsible Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "flex flex-1 flex-col min-w-0 transition-all duration-300"
        )}
        style={{ marginLeft: sidebarWidth }}
      >
        <Header />
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4" data-testid="main-content">
          {children}
        </main>
        
        <Footer />
      </div>
      
      {/* Command Bar - Fixed at bottom left, adjusts for sidebar width */}
      <div 
        className="fixed bottom-3 z-50 transition-all duration-300"
        style={{ left: sidebarWidth + 16 }}
      >
        <CommandBar onOpen={() => setCommandOpen(true)} />
      </div>
      
      {/* Command Palette Modal */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
