"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ClientCardProps {
  name: string
  initials: string
  project: string
  progress: number
  status: {
    paid: boolean
    called: boolean
  }
  step: number
  notification?: number
}

export function ClientCard({
  name,
  initials,
  project,
  progress,
  status,
  step,
  notification,
}: ClientCardProps) {
  const radius = 24
  const strokeWidth = 3
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      className="relative flex flex-col gap-2.5 rounded-lg border border-border bg-[#1a1a1a] p-3"
      data-testid={`client-card-${initials.toLowerCase()}`}
    >
      {/* Header with Avatar and Progress */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {notification && notification > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {notification}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">
              {name}
            </span>
            <span className="text-[10px] text-muted-foreground">{project}</span>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="relative h-12 w-12 shrink-0">
          <svg
            className="h-full w-full -rotate-90"
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          >
            <circle
              stroke="currentColor"
              className="text-[#2a2a2a]"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="currentColor"
              className="text-primary transition-all duration-500 ease-out"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-1.5">
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] px-1.5 py-0 h-5",
            status.paid
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-destructive/50 bg-destructive/10 text-destructive"
          )}
        >
          {status.paid ? "Paid" : "Unpaid"}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] px-1.5 py-0 h-5",
            status.called
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-muted-foreground/50 bg-secondary/50 text-muted-foreground"
          )}
        >
          {status.called ? "Called" : "No Call"}
        </Badge>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded text-[10px] font-medium transition-colors",
              s <= step
                ? "bg-primary text-primary-foreground"
                : "bg-[#2a2a2a] text-muted-foreground"
            )}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
