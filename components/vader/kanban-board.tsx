"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Project {
  name: string
  type: string
  progress: number
  status: "active" | "paused" | "complete"
  tasks: { done: number; total: number }
}

const columns = [
  {
    id: "setup",
    title: "Setup",
    projects: [
      {
        name: "ai-experiments",
        type: "Python",
        progress: 15,
        status: "active" as const,
        tasks: { done: 2, total: 12 },
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    projects: [
      {
        name: "boilerplate-v2",
        type: "Next.js",
        progress: 65,
        status: "active" as const,
        tasks: { done: 39, total: 61 },
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    projects: [
      {
        name: "node-launcher",
        type: "Electron",
        progress: 80,
        status: "active" as const,
        tasks: { done: 8, total: 10 },
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    projects: [] as Project[],
  },
  {
    id: "deployed",
    title: "Deployed",
    projects: [
      {
        name: "vaderlabz-site",
        type: "Next.js",
        progress: 100,
        status: "complete" as const,
        tasks: { done: 24, total: 24 },
      },
    ],
  },
]

function ProjectCard({ name, type, progress, status, tasks }: Project) {
  return (
    <div
      className="rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] p-3 hover:border-primary/30 transition-colors cursor-pointer"
      data-testid={`project-card-${name}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-[#2a2a2a] rounded w-fit">
            {type}
          </span>
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] ${
            status === "active"
              ? "border-primary/50 text-primary"
              : status === "complete"
              ? "border-green-500/50 text-green-500"
              : "border-yellow-500/50 text-yellow-500"
          }`}
        >
          {status}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} className="h-1.5" />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{progress}% complete</span>
          <span>{tasks.done}/{tasks.total} tasks</span>
        </div>
      </div>
    </div>
  )
}

export function KanbanBoard() {
  return (
    <div data-testid="kanban-board">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col gap-3 rounded-xl border border-[#2a2a2a] bg-[#141414] p-3"
            data-testid={`kanban-column-${column.id}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    column.projects.length > 0 ? "bg-primary" : "bg-muted-foreground/50"
                  }`}
                />
                <span className="text-sm font-medium text-foreground">
                  {column.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {column.projects.length}
              </span>
            </div>

            {/* Project Cards */}
            <div className="flex flex-col gap-2 min-h-[120px]">
              {column.projects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
              {column.projects.length === 0 && (
                <div className="flex h-full min-h-[100px] items-center justify-center rounded-lg border border-dashed border-[#2a2a2a]">
                  <span className="text-xs text-muted-foreground">No projects</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
