import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, FileCode, Network, Variable, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const operationsSections = [
  {
    title: "Scripts",
    description: "Run npm scripts and custom commands",
    href: "/operations/scripts",
    icon: FileCode,
    stats: "12 Scripts",
  },
  {
    title: "Ports",
    description: "Monitor and manage active ports",
    href: "/operations/ports",
    icon: Network,
    stats: "4 Active",
  },
  {
    title: "Environment",
    description: "View and validate environment variables",
    href: "/operations/env",
    icon: Variable,
    stats: "18 Vars",
  },
]

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Operations</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            System operations, scripts, and environment management
          </p>
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
              <Terminal className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div>
              <CardTitle className="text-lg">Operations Center</CardTitle>
              <p className="text-sm text-[var(--msc-text-muted)]">System command and control</p>
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
                  All operational systems initialized
                </p>
              </div>
            </div>
            <Badge className="bg-[#1D9E75]/10 text-[#1D9E75]">Operational</Badge>
          </div>

          {/* Operations Sections */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {operationsSections.map((section) => (
              <Link key={section.href} href={section.href}>
                <Card className="h-full border-[var(--msc-border)] bg-[#141414] transition-colors hover:border-[#1D9E75]/50 hover:bg-[var(--msc-card-hover)]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75]/10">
                        <section.icon className="h-5 w-5 text-[#1D9E75]" />
                      </div>
                      <Badge variant="outline" className="border-[var(--msc-border)]">
                        {section.stats}
                      </Badge>
                    </div>
                    <h3 className="mt-4 font-medium text-[var(--msc-text-primary)]">{section.title}</h3>
                    <p className="mt-1 text-sm text-[var(--msc-text-muted)]">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
