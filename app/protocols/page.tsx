import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollText, CheckCircle2, Play, Square, FileText } from "lucide-react"

const protocols = [
  {
    id: 1,
    name: "Project Initialization",
    description: "Standard workflow for starting a new project",
    steps: ["Create scaffold", "Configure environment", "Initialize Git", "Install dependencies"],
    status: "available",
  },
  {
    id: 2,
    name: "Deployment Pipeline",
    description: "Production deployment checklist and automation",
    steps: ["Run tests", "Build production", "Deploy to staging", "Deploy to production"],
    status: "available",
  },
  {
    id: 3,
    name: "Code Review",
    description: "Standardized code review process",
    steps: ["Lint check", "Type check", "Test coverage", "Security scan"],
    status: "available",
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Safe database schema migration workflow",
    steps: ["Backup database", "Run migrations", "Validate schema", "Update seeds"],
    status: "available",
  },
]

export default function ProtocolsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Protocols</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            Standardized workflows and operational procedures
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 bg-[#1D9E75] text-white hover:bg-[#1D9E75]/90">
            <Play className="h-4 w-4" />
            Start Project
          </Button>
          <Button variant="outline" className="gap-2 border-[#e02b20]/30 text-[#e02b20] hover:bg-[#e02b20]/10">
            <Square className="h-4 w-4" />
            End Project
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
              <ScrollText className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div>
              <CardTitle className="text-lg">Protocol Registry</CardTitle>
              <p className="text-sm text-[var(--msc-text-muted)]">Operational workflow definitions</p>
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
                  All operational protocols loaded and validated
                </p>
              </div>
            </div>
            <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">{protocols.length} Available</Badge>
          </div>

          {/* Protocols Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {protocols.map((protocol) => (
              <Card key={protocol.id} className="border-[var(--msc-border)] bg-[#141414]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--msc-border)]">
                        <FileText className="h-5 w-5 text-[var(--msc-text-muted)]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[var(--msc-text-primary)]">{protocol.name}</h3>
                        <Badge
                          variant="outline"
                          className="mt-1 border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75]"
                        >
                          {protocol.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[var(--msc-text-muted)]">{protocol.description}</p>

                  {/* Steps */}
                  <div className="mt-4 space-y-2">
                    {protocol.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--msc-border)] text-xs text-[var(--msc-text-muted)]">
                          {index + 1}
                        </div>
                        <span className="text-[var(--msc-text-secondary)]">{step}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-4 w-full gap-2 bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20"
                  >
                    <Play className="h-4 w-4" />
                    Execute Protocol
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
