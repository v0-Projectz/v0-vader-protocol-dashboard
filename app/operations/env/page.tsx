import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Variable, CheckCircle2, AlertTriangle, Lock } from "lucide-react"

const envVars = [
  { key: "NODE_ENV", value: "development", required: true, status: "set" },
  { key: "NEXT_PUBLIC_APP_URL", value: "http://localhost:3000", required: true, status: "set" },
  { key: "DATABASE_URL", value: "postgresql://...", required: true, status: "set", sensitive: true },
  { key: "NEXTAUTH_SECRET", value: "***", required: true, status: "set", sensitive: true },
  { key: "NEXTAUTH_URL", value: "http://localhost:3000", required: true, status: "set" },
  { key: "STRIPE_SECRET_KEY", value: "sk_test_***", required: false, status: "set", sensitive: true },
  { key: "STRIPE_WEBHOOK_SECRET", value: "whsec_***", required: false, status: "set", sensitive: true },
  { key: "RESEND_API_KEY", value: "re_***", required: false, status: "set", sensitive: true },
  { key: "OPENAI_API_KEY", value: "sk-***", required: false, status: "set", sensitive: true },
  { key: "AWS_ACCESS_KEY_ID", value: "***", required: false, status: "missing", sensitive: true },
  { key: "AWS_SECRET_ACCESS_KEY", value: "***", required: false, status: "missing", sensitive: true },
  { key: "REDIS_URL", value: "redis://...", required: false, status: "set", sensitive: true },
  { key: "SENTRY_DSN", value: "https://...", required: false, status: "set" },
  { key: "ANALYTICS_ID", value: "G-***", required: false, status: "set" },
  { key: "LOG_LEVEL", value: "debug", required: false, status: "set" },
  { key: "ENABLE_CACHE", value: "true", required: false, status: "set" },
  { key: "MAX_FILE_SIZE", value: "10485760", required: false, status: "set" },
  { key: "RATE_LIMIT_MAX", value: "100", required: false, status: "set" },
]

const setCount = envVars.filter((v) => v.status === "set").length
const missingCount = envVars.filter((v) => v.status === "missing").length
const requiredSet = envVars.filter((v) => v.required && v.status === "set").length
const requiredTotal = envVars.filter((v) => v.required).length

export default function EnvPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Environment</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            View and validate environment variables (read-only)
          </p>
        </div>
        <Badge variant="outline" className="border-[var(--msc-border)]">
          Read Only
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <CardContent className="p-4">
            <p className="text-sm text-[var(--msc-text-muted)]">Total Variables</p>
            <p className="mt-1 text-2xl font-bold text-[var(--msc-text-primary)]">{envVars.length}</p>
          </CardContent>
        </Card>
        <Card className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <CardContent className="p-4">
            <p className="text-sm text-[var(--msc-text-muted)]">Set</p>
            <p className="mt-1 text-2xl font-bold text-[#1D9E75]">{setCount}</p>
          </CardContent>
        </Card>
        <Card className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <CardContent className="p-4">
            <p className="text-sm text-[var(--msc-text-muted)]">Missing</p>
            <p className="mt-1 text-2xl font-bold text-[#BA7517]">{missingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <CardContent className="p-4">
            <p className="text-sm text-[var(--msc-text-muted)]">Required</p>
            <p className="mt-1 text-2xl font-bold text-[var(--msc-text-primary)]">
              {requiredSet}/{requiredTotal}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Protocol Readiness Card */}
      <Card
        className="border-[var(--msc-border)] bg-[var(--msc-card)]"
        data-testid="protocol-readiness-card"
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75]/10">
              <Variable className="h-5 w-5 text-[#1D9E75]" />
            </div>
            <div>
              <CardTitle className="text-lg">Environment Registry</CardTitle>
              <p className="text-sm text-[var(--msc-text-muted)]">validate-env status</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-4">
            <div className="flex items-center gap-3">
              {missingCount > 0 ? (
                <AlertTriangle className="h-5 w-5 text-[#BA7517]" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-[#1D9E75]" />
              )}
              <div>
                <p className="font-medium text-[var(--msc-text-primary)]">
                  {missingCount > 0 ? "Warnings Present" : "All Required Variables Set"}
                </p>
                <p className="text-sm text-[var(--msc-text-muted)]">
                  {missingCount > 0
                    ? `${missingCount} optional variables missing`
                    : "Environment validation passed"}
                </p>
              </div>
            </div>
            <Badge
              className={
                missingCount > 0 ? "bg-[#BA7517]/10 text-[#BA7517]" : "bg-[#1D9E75]/10 text-[#1D9E75]"
              }
            >
              {missingCount > 0 ? "Warnings" : "Valid"}
            </Badge>
          </div>

          {/* Env Table */}
          <div className="mt-6 rounded-lg border border-[var(--msc-border)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--msc-border)] bg-[#141414]">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Variable
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Required
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--msc-text-muted)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--msc-border)]">
                {envVars.map((envVar) => (
                  <tr key={envVar.key} className="hover:bg-[var(--msc-card-hover)]">
                    <td className="px-4 py-3">
                      <code className="font-mono text-sm font-medium text-[var(--msc-text-primary)]">
                        {envVar.key}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {envVar.sensitive && <Lock className="h-3 w-3 text-[var(--msc-text-muted)]" />}
                        <code className="font-mono text-sm text-[var(--msc-text-muted)]">
                          {envVar.status === "missing" ? "-" : envVar.sensitive ? "***" : envVar.value}
                        </code>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          envVar.required
                            ? "border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75]"
                            : "border-[var(--msc-border)] text-[var(--msc-text-muted)]"
                        }
                      >
                        {envVar.required ? "Required" : "Optional"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          envVar.status === "set"
                            ? "border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75]"
                            : "border-[#BA7517]/30 bg-[#BA7517]/10 text-[#BA7517]"
                        }
                      >
                        {envVar.status === "set" ? (
                          <CheckCircle2 className="mr-1.5 h-3 w-3" />
                        ) : (
                          <AlertTriangle className="mr-1.5 h-3 w-3" />
                        )}
                        {envVar.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
