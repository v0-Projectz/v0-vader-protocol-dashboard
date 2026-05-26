"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Calendar, ChevronDown } from "lucide-react"
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
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 gap-4"
      data-testid="header"
    >
      {/* Left Section - Status & Time */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 rounded-full bg-primary pulse-dot" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <span className="text-xs text-muted-foreground hidden sm:inline">{currentDate}</span>
        <span className="text-xs font-medium">{currentTime}</span>
      </div>

      {/* Center Section - Logo, Project Selector, Velocity, View Toggle, Capacity */}
      <div className="flex items-center gap-4 flex-1 justify-center min-w-0">
        {/* Project Selector */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 shrink-0">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/20">
            <span className="text-[10px] font-bold text-primary">M</span>
          </div>
          <span className="text-xs font-semibold text-primary">MSC</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs font-medium">Studio</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 gap-1 px-1.5"
                data-testid="project-selector"
              >
                <span className="text-[10px] text-muted-foreground hidden lg:inline">All Projects</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-card border-border">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Label Services</DropdownMenuItem>
              <DropdownMenuItem>Web Development</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Velocity - hidden on smaller screens */}
        <div className="hidden lg:flex items-center gap-2">
          <VelocitySparkline />
          <span className="text-xs text-primary font-medium">+12%</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5 bg-card shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 gap-1 px-2.5 bg-primary/20 text-primary hover:bg-primary/30"
            data-testid="view-technical"
          >
            <span className="text-[10px]">Technical</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 gap-1 px-2.5 text-muted-foreground hover:bg-secondary"
            data-testid="view-executive"
          >
            <span className="text-[10px]">Executive</span>
          </Button>
        </div>

        {/* Capacity Gauge */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <CapacityGauge percentage={85} />
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground leading-tight">Capacity</span>
            <span className="text-xs font-medium leading-tight">On Schedule</span>
          </div>
        </div>
      </div>

      {/* Right Section - Stats, Search, Add Client, User */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Quick Stats - hidden on smaller screens */}
        <div className="hidden xl:flex items-center gap-3 text-[10px] text-muted-foreground mr-2">
          <span>Active <span className="text-foreground font-medium">5</span></span>
          <span>Done <span className="text-foreground font-medium">0</span></span>
          <span>Overdue <span className="text-warning font-medium">1</span></span>
          <span>Projects <span className="text-foreground font-medium">4</span></span>
        </div>

        <div className="h-3 w-px bg-border hidden lg:block" />

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-8 w-32 bg-card pl-7 text-xs border-border"
            data-testid="header-search"
          />
        </div>

        {/* Calendar */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" data-testid="calendar-btn">
          <Calendar className="h-4 w-4" />
        </Button>

        {/* Add Client */}
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3"
          data-testid="add-client-btn"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Client</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-2 px-2 hover:bg-secondary"
              data-testid="user-menu-trigger"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-semibold">
                  JB
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium hidden lg:inline">Jon Beatz</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Jon Beatz</p>
                <p className="text-xs text-muted-foreground">jon@mscstudio.com</p>
                <Badge variant="outline" className="w-fit text-[10px] mt-1 border-primary/50 text-primary">
                  Admin
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Projects</span><span className="text-foreground">4</span></div>
              <div className="flex justify-between"><span>Clients</span><span className="text-foreground">6</span></div>
              <div className="flex justify-between"><span>Completed</span><span className="text-foreground">24</span></div>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem data-testid="user-dashboard">My Dashboard</DropdownMenuItem>
            <DropdownMenuItem data-testid="user-theme">Theme</DropdownMenuItem>
            <DropdownMenuItem data-testid="user-settings">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-destructive" data-testid="user-signout">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
