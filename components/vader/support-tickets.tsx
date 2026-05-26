"use client"

import { Headphones, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Ticket {
  id: string
  title: string
  client: string
  status: "open" | "pending" | "closed"
  time: string
}

const tickets: Ticket[] = [
  {
    id: "1",
    title: "Login Issue",
    client: "Marcus Johnson",
    status: "open",
    time: "10m ago",
  },
  {
    id: "2",
    title: "Theme Customization Help",
    client: "Keisha Williams",
    status: "pending",
    time: "45m ago",
  },
  {
    id: "3",
    title: "Domain Transfer",
    client: "Devon Carter",
    status: "open",
    time: "2h ago",
  },
]

export function SupportTickets() {
  return (
    <div
      className="rounded-xl border border-border bg-card"
      data-testid="support-tickets"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Headphones className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Support Tickets</span>
      </div>

      {/* Ticket List */}
      <div className="divide-y divide-border">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-start gap-3 px-4 py-3"
            data-testid={`ticket-${ticket.id}`}
          >
            <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {ticket.title}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-medium",
                    ticket.status === "open" &&
                      "border-primary/50 bg-primary/10 text-primary",
                    ticket.status === "pending" &&
                      "border-warning/50 bg-warning/10 text-warning",
                    ticket.status === "closed" &&
                      "border-muted-foreground/50 text-muted-foreground"
                  )}
                >
                  {ticket.status === "open"
                    ? "Open"
                    : ticket.status === "pending"
                    ? "Pending"
                    : "Closed"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{ticket.client}</span>
                <span>{ticket.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
