"use client"

import { useState } from "react"
import { CheckCircle2, Circle, AlertTriangle, Clock, Plus, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  assignee: string
  category: string
  timeLeft?: string
  isOverdue?: boolean
  isDone?: boolean
  isPriority?: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Setup Domain DNS",
    assignee: "Marcus Johnson",
    category: "Domain",
    timeLeft: "30m overdue",
    isOverdue: true,
    isPriority: true,
  },
  {
    id: "2",
    title: "Send Collab Invite",
    assignee: "Tyrone Mitchell",
    category: "Invite",
    timeLeft: "44m left",
  },
  {
    id: "3",
    title: "Configure Hosting",
    assignee: "",
    category: "",
    timeLeft: "1h left",
    isPriority: true,
  },
  {
    id: "4",
    title: "Install Theme",
    assignee: "Antwuan Smith",
    category: "Theme",
    timeLeft: "23h left",
  },
  {
    id: "5",
    title: "Verify SSL Certificate",
    assignee: "Jasmine Lee",
    category: "Hosting",
    isDone: true,
  },
]

export function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState("")

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask,
        assignee: "",
        category: "",
      },
    ])
    setNewTask("")
  }

  return (
    <div
      className="rounded-xl border border-border bg-card"
      data-testid="my-tasks"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">My Tasks</span>
      </div>

      {/* Task List */}
      <div className="divide-y divide-border">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50",
              task.isDone && "opacity-50"
            )}
            data-testid={`task-${task.id}`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="flex h-5 w-5 items-center justify-center"
                data-testid={`task-toggle-${task.id}`}
              >
                {task.isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : task.isOverdue ? (
                  <Circle className="h-5 w-5 text-warning" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  {task.isPriority && (
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      task.isOverdue && !task.isDone
                        ? "text-destructive"
                        : task.isPriority && !task.isDone
                        ? "text-destructive"
                        : task.isDone
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {task.title}
                  </span>
                  {task.isPriority && !task.isDone && (
                    <User className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {task.assignee && <span>{task.assignee}</span>}
                  {task.category && (
                    <Badge
                      variant="outline"
                      className="h-4 px-1.5 text-[10px] font-normal"
                    >
                      {task.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {task.timeLeft && !task.isDone && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  task.isOverdue ? "text-warning" : "text-muted-foreground"
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                {task.timeLeft}
              </div>
            )}
            {task.isDone && (
              <span className="text-xs text-muted-foreground">Done</span>
            )}
          </div>
        ))}
      </div>

      {/* Add Task */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <Plus className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="h-8 flex-1 border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
          data-testid="add-task-input"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={addTask}
          className="text-primary"
          data-testid="add-task-btn"
        >
          Add
        </Button>
      </div>
    </div>
  )
}
