"use client"

import { KanbanBoard } from "@/components/vader/kanban-board"
import { MyTasks } from "@/components/vader/my-tasks"
import { ActivityPulse } from "@/components/vader/activity-pulse"
import { AssetStorage } from "@/components/vader/asset-storage"
import { SupportTickets } from "@/components/vader/support-tickets"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6" data-testid="dashboard">
      {/* Kanban Board - Full Width */}
      <KanbanBoard />
      
      {/* My Tasks - Full Width */}
      <MyTasks />
      
      {/* Bottom Bento Grid - 3 Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivityPulse />
        <AssetStorage />
        <SupportTickets />
      </div>
    </div>
  )
}
