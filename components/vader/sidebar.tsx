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
  Cpu,
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
      className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-border bg-[#0a0a0a]"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Cpu className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-primary">MSC</span>
          <span className="text-[10px] text-muted-foreground">Media Pro</span>
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
                  ? "bg-[#1c1c1c] text-primary"
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
                ? "bg-[#1c1c1c] text-primary"
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
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
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
      <div className="border-t border-border p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-[#1c1c1c] text-primary"
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
