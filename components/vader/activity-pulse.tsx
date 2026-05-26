"use client"

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  title: string
  project: string
  time: string
  type: "success" | "warning" | "info"
}

const activities: Activity[] = [
  {
    id: "1",
    title: "Build completed",
    project: "boilerplate-v2",
    time: "2m ago",
    type: "success",
  },
  {
    id: "2",
    title: "Test suite failed",
    project: "node-launcher",
    time: "15m ago",
    type: "warning",
  },
  {
    id: "3",
    title: "Deployed to production",
    project: "vaderlabz-site",
    time: "1h ago",
    type: "success",
  },
  {
    id: "4",
    title: "New sandbox created",
    project: "ai-experiments",
    time: "2h ago",
    type: "info",
  },
]

export function ActivityPulse() {
  return (
    <div
      className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c]"
      data-testid="activity-pulse"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-4 py-3">
        <Clock className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Activity Pulse</span>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-[#2a2a2a]">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 px-4 py-3"
            data-testid={`activity-${activity.id}`}
          >
            <span
              className={cn(
                "mt-1.5 h-2 w-2 rounded-full flex-shrink-0",
                activity.type === "success" && "bg-primary",
                activity.type === "warning" && "bg-warning",
                activity.type === "info" && "bg-blue-500"
              )}
            />
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <span className="text-sm font-medium text-foreground">
                {activity.title}
              </span>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-primary/70 truncate">{activity.project}</span>
                <span className="flex-shrink-0 ml-2">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
