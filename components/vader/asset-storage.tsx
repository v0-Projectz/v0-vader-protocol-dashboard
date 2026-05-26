"use client"

import { HardDrive, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface StorageItem {
  id: string
  name: string
  used: number
  total: number
}

const storageItems: StorageItem[] = [
  { id: "1", name: "Antwuan Smith", used: 2.4, total: 5 },
  { id: "2", name: "Keisha Williams", used: 3.8, total: 5 },
  { id: "3", name: "Jasmine Lee", used: 4.2, total: 5 },
  { id: "4", name: "Tyrone Mitchell", used: 1.1, total: 5 },
]

export function AssetStorage() {
  return (
    <div
      className="rounded-xl border border-border bg-card"
      data-testid="asset-storage"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <HardDrive className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Asset Storage</span>
      </div>

      {/* Storage List */}
      <div className="divide-y divide-border">
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
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <FileText className="h-4 w-4 text-muted-foreground" />
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
