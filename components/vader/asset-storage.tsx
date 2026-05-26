"use client"

import { HardDrive, Folder } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface StorageItem {
  id: string
  name: string
  type: string
  used: number
  total: number
}

const storageItems: StorageItem[] = [
  { id: "1", name: "boilerplate-v2", type: "Next.js", used: 2.4, total: 5 },
  { id: "2", name: "node-launcher", type: "Electron", used: 3.8, total: 5 },
  { id: "3", name: "msc-projectz", type: "React", used: 1.2, total: 5 },
  { id: "4", name: "ai-experiments", type: "Python", used: 0.8, total: 5 },
]

export function AssetStorage() {
  return (
    <div
      className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c]"
      data-testid="asset-storage"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-4 py-3">
        <HardDrive className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Project Storage</span>
      </div>

      {/* Storage List */}
      <div className="divide-y divide-[#2a2a2a]">
        {storageItems.map((item) => {
          const percentage = (item.used / item.total) * 100
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3"
              data-testid={`storage-${item.id}`}
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-primary/70" />
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-[#2a2a2a] rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
                <Progress value={percentage} className="h-1.5" />
                <span className="text-xs text-muted-foreground">
                  {item.used}GB / {item.total}GB
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
