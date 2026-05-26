"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Network, Square, Trash2, CheckCircle2, RefreshCw } from "lucide-react"

const ports = [
  { port: 3000, process: "next-server", pid: 12345, status: "active", uptime: "2h 34m" },
  { port: 3001, process: "express", pid: 12346, status: "active", uptime: "1h 12m" },
  { port: 3002, process: "storybook", pid: 12347, status: "inactive", uptime: "-" },
  { port: 3010, process: "admin-server", pid: 12348, status: "active", uptime: "45m" },
]

export default function PortsPage() {
  const [killDialogOpen, setKillDialogOpen] = useState(false)
  const [selectedPort, setSelectedPort] = useState<(typeof ports)[0] | null>(null)
  const [killAllDialogOpen, setKillAllDialogOpen] = useState(false)

  const handleKill = (port: (typeof ports)[0]) => {
    setSelectedPort(port)
    setKillDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Ports</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            Monitor and manage active ports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-[var(--msc-border)]">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => setKillAllDialogOpen(true)}
            className="gap-2 border-[#e02b20]/30 text-[#e02b20] hover:bg-[#e02b20]/10"
          >
            <Trash2 className="h-4 w-4" />
            Kill All Dev Ports
          </Button>
        </div>
      </div>

      {/* Protocol Readiness Card */}
      <Card
        className="border-[var(--msc-border)] bg-[var(--msc-card)]"
        data-testid="protocol-readiness-card"
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75]/10">
              <Network className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div>
              <CardTitle className="text-lg">Port Registry</CardTitle>
              <p className="text-sm text-[var(--msc-text-muted)]">Active port monitoring</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
              <div>
                <p className="font-medium text-[var(--msc-text-primary)]">Protocol Ready</p>
                <p className="text-sm text-[var(--msc-text-muted)]">
                  Port monitoring system active
                </p>
              </div>
            </div>
            <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">
              {ports.filter((p) => p.status === "active").length} Active
            </Badge>
          </div>

          {/* Ports Table */}
          <div className="mt-6 rounded-lg border border-[var(--msc-border)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--msc-border)] bg-[#141414]">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Port
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Process
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    PID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Uptime
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--msc-border)]">
                {ports.map((port) => (
                  <tr key={port.port} className="hover:bg-[var(--msc-card-hover)]">
                    <td className="px-4 py-3">
                      <code className="font-mono text-sm font-medium text-[#1D9E75]">{port.port}</code>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[var(--msc-text-primary)]">{port.process}</span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-sm text-[var(--msc-text-muted)]">{port.pid}</code>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          port.status === "active"
                            ? "border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75]"
                            : "border-[var(--msc-border)] text-[var(--msc-text-muted)]"
                        }
                      >
                        <span
                          className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                            port.status === "active" ? "bg-[#1D9E75]" : "bg-[var(--msc-text-muted)]"
                          }`}
                        />
                        {port.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--msc-text-muted)]">{port.uptime}</td>
                    <td className="px-4 py-3 text-right">
                      {port.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleKill(port)}
                          className="gap-2 border-[#e02b20]/30 text-[#e02b20] hover:bg-[#e02b20]/10"
                        >
                          <Square className="h-3 w-3" />
                          Kill
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Kill Port Dialog */}
      <AlertDialog open={killDialogOpen} onOpenChange={setKillDialogOpen}>
        <AlertDialogContent className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Kill Process PID {selectedPort?.pid}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--msc-text-muted)]">
              This will terminate the {selectedPort?.process} process running on port {selectedPort?.port}.
              Any unsaved work may be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[var(--msc-border)]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#e02b20] text-white hover:bg-[#e02b20]/90"
              data-testid="kill-port-confirm"
            >
              Kill & Restart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Kill All Dialog */}
      <AlertDialog open={killAllDialogOpen} onOpenChange={setKillAllDialogOpen}>
        <AlertDialogContent className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Kill All Dev Ports?</AlertDialogTitle>
            <AlertDialogDescription className="text-[var(--msc-text-muted)]">
              This will terminate all development processes on ports 3000, 3001, 3002, and 3010.
              Any unsaved work will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[var(--msc-border)]">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#e02b20] text-white hover:bg-[#e02b20]/90">
              Kill All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
