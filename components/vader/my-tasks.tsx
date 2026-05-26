"use client"

import { useState } from "react"
import { CheckCircle2, Circle, AlertTriangle, Clock, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  project: string
  category: string
  timeLeft?: string
  isOverdue?: boolean
  isDone?: boolean
  isPriority?: boolean
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Configure CI/CD pipeline",
    project: "boilerplate-v2",
    category: "DevOps",
    timeLeft: "2h left",
    isPriority: true,
  },
  {
    id: "2",
    title: "Fix integrity grader errors",
    project: "boilerplate-v2",
    category: "Testing",
    timeLeft: "4h left",
  },
  {
    id: "3",
    title: "Update Electron forge config",
    project: "node-launcher",
    category: "Config",
    timeLeft: "1d left",
  },
  {
    id: "4",
    title: "Add dark mode toggle",
    project: "vaderlabz-site",
    category: "UI",
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
        project: "",
        category: "",
      },
    ])
    setNewTask("")
  }

  return (
    <div
      className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c]"
      data-testid="my-tasks"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-4 py-3">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Tasks</span>
        <Badge variant="outline" className="ml-auto text-[10px] border-[#2a2a2a]">
          {tasks.filter(t => !t.isDone).length} active
        </Badge>
      </div>

      {/* Task List */}
      <div className="divide-y divide-[#2a2a2a]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 transition-colors hover:bg-[#222]",
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
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : task.isOverdue ? (
                  <Circle className="h-4 w-4 text-warning" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  {task.isPriority && !task.isDone && (
                    <AlertTriangle className="h-3 w-3 text-warning" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      task.isDone
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {task.project && (
                    <span className="font-mono text-primary/70">{task.project}</span>
                  )}
                  {task.category && (
                    <Badge
                      variant="outline"
                      className="h-4 px-1.5 text-[10px] font-normal border-[#2a2a2a]"
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
                <Clock className="h-3 w-3" />
                {task.timeLeft}
              </div>
            )}
            {task.isDone && (
              <span className="text-[10px] text-muted-foreground">Done</span>
            )}
          </div>
        ))}
      </div>

      {/* Add Task */}
      <div className="flex items-center gap-2 border-t border-[#2a2a2a] px-4 py-2">
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
          className="text-primary text-xs h-7"
          data-testid="add-task-btn"
        >
          Add
        </Button>
      </div>
    </div>
  )
}
