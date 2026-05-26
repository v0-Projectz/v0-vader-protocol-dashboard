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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [operationsOpen, setOperationsOpen] = useState(pathname.startsWith("/operations"))

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#2a2a2a] bg-[#0a0a0a] transition-all duration-300",
          collapsed ? "w-[60px]" : "w-[220px]"
        )}
        data-testid="sidebar"
      >
        {/* Logo */}
        <div className={cn(
          "flex h-12 items-center border-b border-[#2a2a2a]",
          collapsed ? "justify-center px-2" : "gap-3 px-4"
        )}>
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary flex-shrink-0">
            <span className="text-xs font-bold text-primary-foreground">V</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold tracking-tight truncate">Vader Engine</span>
              <span className="text-[10px] text-muted-foreground font-mono">v2.5.0</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2" data-testid="sidebar-nav">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const linkContent = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  collapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
                )}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#1c1c1c] border-[#2a2a2a]">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              )
            }
            return linkContent
          })}

          {/* Operations Collapsible */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/operations/scripts"
                  className={cn(
                    "flex items-center justify-center rounded-lg p-2 transition-colors",
                    pathname.startsWith("/operations")
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
                  )}
                  data-testid="nav-operations"
                >
                  <Terminal className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1c1c1c] border-[#2a2a2a]">
                Operations
              </TooltipContent>
            </Tooltip>
          ) : (
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
          )}
        </nav>

        {/* Settings & Toggle */}
        <div className="border-t border-[#2a2a2a] p-2 space-y-1">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    "flex items-center justify-center rounded-lg p-2 transition-colors",
                    pathname === "/settings"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-[#1c1c1c] hover:text-foreground"
                  )}
                  data-testid="nav-settings"
                >
                  <Settings className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1c1c1c] border-[#2a2a2a]">
                Settings
              </TooltipContent>
            </Tooltip>
          ) : (
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
          )}

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "w-full text-muted-foreground hover:text-foreground hover:bg-[#1c1c1c]",
              collapsed ? "justify-center p-2" : "justify-start gap-3 px-3"
            )}
            data-testid="sidebar-toggle"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
