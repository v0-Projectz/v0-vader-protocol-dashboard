"use client"

import { Bug, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Issue {
  id: string
  title: string
  project: string
  severity: "critical" | "warning" | "low"
  time: string
}

const issues: Issue[] = [
  {
    id: "1",
    title: "Build failing on CI",
    project: "boilerplate-v2",
    severity: "critical",
    time: "10m ago",
  },
  {
    id: "2",
    title: "Type errors in tests",
    project: "node-launcher",
    severity: "warning",
    time: "45m ago",
  },
  {
    id: "3",
    title: "Outdated dependencies",
    project: "ai-experiments",
    severity: "low",
    time: "2h ago",
  },
]

export function SupportTickets() {
  return (
    <div
      className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c]"
      data-testid="support-tickets"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-4 py-3">
        <Bug className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Issues</span>
      </div>

      {/* Issue List */}
      <div className="divide-y divide-[#2a2a2a]">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-start gap-3 px-4 py-3"
            data-testid={`issue-${issue.id}`}
          >
            <AlertCircle className={cn(
              "mt-0.5 h-4 w-4 flex-shrink-0",
              issue.severity === "critical" && "text-destructive",
              issue.severity === "warning" && "text-warning",
              issue.severity === "low" && "text-muted-foreground"
            )} />
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">
                  {issue.title}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-medium flex-shrink-0",
                    issue.severity === "critical" &&
                      "border-destructive/50 bg-destructive/10 text-destructive",
                    issue.severity === "warning" &&
                      "border-warning/50 bg-warning/10 text-warning",
                    issue.severity === "low" &&
                      "border-muted-foreground/50 text-muted-foreground"
                  )}
                >
                  {issue.severity}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-primary/70 truncate">{issue.project}</span>
                <span className="flex-shrink-0 ml-2">{issue.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
