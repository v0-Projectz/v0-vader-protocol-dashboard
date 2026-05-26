"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Calendar, Bell, ChevronDown } from "lucide-react"
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
import { CapacityGauge } from "@/components/vader/capacity-gauge"
import { VelocitySparkline } from "@/components/vader/velocity-sparkline"

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
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-6"
      data-testid="header"
    >
      {/* Left Section - Status & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-primary pulse-dot" />
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">{currentDate}</span>
        <span className="text-sm font-medium">{currentTime}</span>
      </div>

      {/* Center Section - Logo, Project Selector, Velocity, View Toggle, Capacity */}
      <div className="flex items-center gap-6">
        {/* Project Selector */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20">
            <span className="text-xs font-bold text-primary">M</span>
          </div>
          <span className="text-sm font-semibold text-primary">MSC</span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm font-medium">Studio</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 gap-1 px-2"
                data-testid="project-selector"
              >
                <span className="text-xs text-muted-foreground">All Projects</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Label Services</DropdownMenuItem>
              <DropdownMenuItem>Web Development</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Velocity */}
        <div className="flex items-center gap-2">
          <VelocitySparkline />
          <span className="text-sm text-primary">+12%</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 bg-primary/20 px-3 text-primary"
            data-testid="view-technical"
          >
            <span className="text-xs">Technical</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-3 text-muted-foreground"
            data-testid="view-executive"
          >
            <span className="text-xs">Executive</span>
          </Button>
        </div>

        {/* Capacity Gauge */}
        <div className="flex items-center gap-3">
          <CapacityGauge percentage={85} />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Capacity</span>
            <span className="text-sm font-medium">On Schedule</span>
          </div>
        </div>
      </div>

      {/* Right Section - Search, Calendar, Add Client, User */}
      <div className="flex items-center gap-3">
        {/* Quick Stats */}
        <div className="hidden items-center gap-4 text-xs text-muted-foreground xl:flex">
          <span>
            Active <span className="text-foreground font-medium">5</span>
          </span>
          <span>
            Done Today <span className="text-foreground font-medium">0</span>
          </span>
          <span>
            Overdue <span className="text-warning font-medium">1</span>
          </span>
          <span>
            Projects <span className="text-foreground font-medium">4</span>
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-9 w-40 bg-card pl-9"
            data-testid="header-search"
          />
        </div>

        {/* Calendar */}
        <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="calendar-btn">
          <Calendar className="h-4 w-4" />
        </Button>

        {/* Add Client */}
        <Button
          className="h-9 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="add-client-btn"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 px-2"
              data-testid="user-menu-trigger"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  JB
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Jon Beatz</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Jon Beatz</p>
                <p className="text-xs text-muted-foreground">
                  jon@mscstudio.com
                </p>
                <Badge variant="outline" className="w-fit text-xs mt-1">
                  Admin
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Projects</span>
                <span className="text-foreground">4</span>
              </div>
              <div className="flex justify-between">
                <span>Clients</span>
                <span className="text-foreground">6</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="text-foreground">24</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="user-dashboard">
              My Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="user-theme">
              Theme
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="user-settings">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              data-testid="user-signout"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
