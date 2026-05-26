"use client"

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  title: string
  user: string
  time: string
  type: "success" | "warning" | "info"
}

const activities: Activity[] = [
  {
    id: "1",
    title: "Theme Install completed",
    user: "Keisha Williams",
    time: "2m ago",
    type: "success",
  },
  {
    id: "2",
    title: "Deposit overdue",
    user: "Marcus Johnson",
    time: "15m ago",
    type: "warning",
  },
  {
    id: "3",
    title: "Domain configured",
    user: "Tyrone Mitchell",
    time: "1h ago",
    type: "success",
  },
  {
    id: "4",
    title: "Client onboarded",
    user: "Devon Carter",
    time: "2h ago",
    type: "info",
  },
]

export function ActivityPulse() {
  return (
    <div
      className="rounded-xl border border-border bg-card"
      data-testid="activity-pulse"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Clock className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Activity Pulse</span>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 px-4 py-3"
            data-testid={`activity-${activity.id}`}
          >
            <span
              className={cn(
                "mt-1.5 h-2 w-2 rounded-full",
                activity.type === "success" && "bg-primary",
                activity.type === "warning" && "bg-warning",
                activity.type === "info" && "bg-blue-500"
              )}
            />
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {activity.title}
              </span>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activity.user}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
