"use client"

import { useState, useEffect, useCallback } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  Box,
  Shield,
  Settings,
  Terminal,
  Plus,
  Search,
  Moon,
  Sun,
  LogOut,
  User,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        data-testid="command-palette-input"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/"))}
            data-testid="cmd-dashboard"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/projects"))}
            data-testid="cmd-projects"
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/templates"))}
            data-testid="cmd-templates"
          >
            <FileCode2 className="mr-2 h-4 w-4" />
            <span>Templates</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/sandboxes"))}
            data-testid="cmd-sandboxes"
          >
            <Box className="mr-2 h-4 w-4" />
            <span>Sandboxes</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/integrity"))}
            data-testid="cmd-integrity"
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Integrity</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Operations">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/operations/scripts"))}
            data-testid="cmd-scripts"
          >
            <Terminal className="mr-2 h-4 w-4" />
            <span>Run Script</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/operations/env"))}
            data-testid="cmd-env"
          >
            <Zap className="mr-2 h-4 w-4" />
            <span>Environment Variables</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem data-testid="cmd-new-project">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Project</span>
          </CommandItem>
          <CommandItem data-testid="cmd-new-client">
            <User className="mr-2 h-4 w-4" />
            <span>Add Client</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/settings"))}
            data-testid="cmd-settings"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem data-testid="cmd-theme-toggle">
            <Moon className="mr-2 h-4 w-4" />
            <span>Toggle Theme</span>
          </CommandItem>
          <CommandItem data-testid="cmd-signout">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function CommandBar({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      data-testid="command-bar-trigger"
    >
      <Terminal className="h-4 w-4 text-primary" />
      <span>Type</span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        /
      </kbd>
      <span>for commands</span>
    </button>
  )
}
