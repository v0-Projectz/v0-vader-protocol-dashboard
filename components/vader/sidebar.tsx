"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  Box,
  Shield,
  Terminal,
  Settings,
  ChevronDown,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Templates", href: "/templates", icon: FileCode2 },
  { name: "Sandboxes", href: "/sandboxes", icon: Box },
  { name: "Integrity", href: "/integrity", icon: Shield },
]

const operations = [
  { name: "Scripts", href: "/operations/scripts" },
  { name: "Ports", href: "/operations/ports" },
  { name: "Env Vars", href: "/operations/env" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [operationsOpen, setOperationsOpen] = useState(pathname.startsWith("/operations"))

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-[#2a2a2a] bg-[#0a0a0a]"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="flex h-12 items-center gap-3 border-b border-[#2a2a2a] px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
          <span className="text-xs font-bold text-primary-foreground">V</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight">Vader Engine</span>
          <span className="text-[10px] text-muted-foreground font-mono">v2.5.0</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3" data-testid="sidebar-nav">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
              )}
              data-testid={`nav-${item.name.toLowerCase()}`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}

        {/* Operations Collapsible */}
        <Collapsible open={operationsOpen} onOpenChange={setOperationsOpen}>
          <CollapsibleTrigger
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/operations")
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
            )}
            data-testid="nav-operations"
          >
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4" />
              Operations
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                operationsOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 pt-1 space-y-1">
            {operations.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`nav-${item.name.toLowerCase().replace(" ", "-")}`}
                >
                  {item.name}
                </Link>
              )
            })}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {/* Settings */}
      <div className="border-t border-[#2a2a2a] p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
          )}
          data-testid="nav-settings"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
