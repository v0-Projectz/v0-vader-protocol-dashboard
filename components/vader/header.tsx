"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a] px-4"
      data-testid="header"
    >
      {/* Left Section - Status & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
        <div className="h-4 w-px bg-[#2a2a2a]" />
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">{currentDate}</span>
          <span className="font-mono font-medium text-foreground">{currentTime}</span>
        </div>
      </div>

      {/* Center - Signature */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          // VADER_CONSTRUCT :: CONTROL_PLANE
        </span>
      </div>

      {/* Right Section - Search, Notifications, New Project, User */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-8 w-40 bg-[#1c1c1c] pl-8 text-xs border-[#2a2a2a] focus:border-primary/50"
            data-testid="header-search"
          />
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-[#1c1c1c]"
          data-testid="notifications-btn"
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* New Project */}
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3"
          data-testid="new-project-btn"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Project</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-2 px-2 hover:bg-[#1c1c1c]"
              data-testid="user-menu-trigger"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-semibold">
                  JB
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium hidden md:inline">Jon Beatz</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1c1c1c] border-[#2a2a2a]">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Jon Beatz</p>
                <p className="text-xs text-muted-foreground">jon@vaderlabz.com</p>
                <Badge variant="outline" className="w-fit text-[10px] mt-1 border-primary/50 text-primary">
                  Admin
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem data-testid="user-profile">Profile</DropdownMenuItem>
            <DropdownMenuItem data-testid="user-settings">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem className="text-destructive" data-testid="user-signout">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
