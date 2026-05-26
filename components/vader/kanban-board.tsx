"use client"

import { ClientCard } from "@/components/vader/client-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const columns = [
  {
    id: "prep",
    title: "Prep",
    color: "bg-primary",
    clients: [
      {
        name: "Devon Carter",
        initials: "DC",
        project: "proj_2",
        progress: 0,
        status: { paid: false, called: false },
        step: 1,
        notification: 3,
      },
    ],
  },
  {
    id: "domain",
    title: "Step 1: Domain",
    color: "bg-muted-foreground",
    clients: [
      {
        name: "Marcus Johnson",
        initials: "MJ",
        project: "proj_1",
        progress: 20,
        status: { paid: false, called: true },
        step: 2,
        notification: 4,
      },
    ],
  },
  {
    id: "hosting",
    title: "Step 2: Hosting",
    color: "bg-muted-foreground",
    clients: [
      {
        name: "Tyrone Mitchell",
        initials: "TM",
        project: "proj_3",
        progress: 40,
        status: { paid: true, called: true },
        step: 2,
      },
    ],
  },
  {
    id: "collab",
    title: "Step 3: Collab",
    color: "bg-muted-foreground",
    clients: [
      {
        name: "Antwuan Smith",
        initials: "AS",
        project: "proj_1",
        progress: 60,
        status: { paid: true, called: true },
        step: 3,
      },
    ],
  },
  {
    id: "theme",
    title: "Step 4: Theme",
    color: "bg-muted-foreground",
    clients: [
      {
        name: "Keisha Williams",
        initials: "KW",
        project: "proj_1",
        progress: 80,
        status: { paid: true, called: true },
        step: 4,
      },
    ],
  },
]

export function KanbanBoard() {
  return (
    <div className="rounded-xl border border-border bg-card p-4" data-testid="kanban-board">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex min-w-[240px] flex-col gap-3"
              data-testid={`kanban-column-${column.id}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      column.id === "prep" ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {column.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {column.clients.length}
                </span>
              </div>

              {/* Client Cards */}
              <div className="flex flex-col gap-3">
                {column.clients.map((client) => (
                  <ClientCard key={client.initials} {...client} />
                ))}
                {column.clients.length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border">
                    <span className="text-sm text-muted-foreground">No projects</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
