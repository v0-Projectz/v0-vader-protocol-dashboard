"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileCode, Play, Search } from "lucide-react"

const scripts = [
  { name: "dev", command: "next dev", description: "Start development server" },
  { name: "build", command: "next build", description: "Build for production" },
  { name: "start", command: "next start", description: "Start production server" },
  { name: "lint", command: "next lint", description: "Run ESLint" },
  { name: "grade", command: "msc grade", description: "Run MSC grader" },
  { name: "msc:lint", command: "msc lint", description: "Run MSC linter" },
  { name: "format", command: "prettier --write .", description: "Format all files" },
  { name: "typecheck", command: "tsc --noEmit", description: "Run TypeScript check" },
  { name: "test", command: "jest", description: "Run tests" },
  { name: "test:watch", command: "jest --watch", description: "Run tests in watch mode" },
  { name: "e2e", command: "playwright test", description: "Run E2E tests" },
  { name: "analyze", command: "next build --analyze", description: "Analyze bundle" },
]

export default function ScriptsPage() {
  const [search, setSearch] = useState("")
  const [terminal, setTerminal] = useState<string[]>([
    "$ Ready to run scripts...",
    "Type a command or click Run on any script below.",
  ])

  const filteredScripts = scripts.filter(
    (script) =>
      script.name.toLowerCase().includes(search.toLowerCase()) ||
      script.description.toLowerCase().includes(search.toLowerCase())
  )

  const runScript = (script: (typeof scripts)[0]) => {
    setTerminal((prev) => [
      ...prev,
      "",
      `$ npm run ${script.name}`,
      `> ${script.command}`,
      "Running...",
    ])
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--msc-text-primary)]">Scripts</h1>
          <p className="mt-1 text-sm text-[var(--msc-text-muted)]">
            Run npm scripts and custom commands
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Scripts List */}
        <Card
          className="border-[var(--msc-border)] bg-[var(--msc-card)]"
          data-testid="protocol-readiness-card"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1D9E75]/10">
                  <FileCode className="h-5 w-5 text-[#1D9E75]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Available Scripts</CardTitle>
                  <p className="text-sm text-[var(--msc-text-muted)]">{scripts.length} scripts configured</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--msc-text-muted)]" />
              <Input
                placeholder="Search scripts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[var(--msc-border)] bg-[#141414] pl-9"
              />
            </div>

            {/* Scripts */}
            <div className="space-y-2 max-h-[400px] overflow-auto scrollbar-thin">
              {filteredScripts.map((script) => (
                <div
                  key={script.name}
                  className="flex items-center justify-between rounded-lg border border-[var(--msc-border)] bg-[#141414] p-3 transition-colors hover:bg-[var(--msc-card-hover)]"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm font-medium text-[#1D9E75]">{script.name}</code>
                      <Badge variant="outline" className="border-[var(--msc-border)] text-xs">
                        {script.command.split(" ")[0]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-[var(--msc-text-muted)]">{script.description}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => runScript(script)}
                    className="gap-2 bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20"
                  >
                    <Play className="h-3 w-3" />
                    Run
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terminal Output */}
        <Card className="border-[var(--msc-border)] bg-[var(--msc-card)]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--msc-border)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--msc-text-primary)]" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-10-6l4 3-4 3v-6z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Terminal Output</CardTitle>
                <p className="text-sm text-[var(--msc-text-muted)]">Command execution log</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] overflow-auto rounded-lg bg-[#0a0a0a] p-4 font-mono text-sm scrollbar-thin">
              {terminal.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.startsWith("$")
                      ? "text-[#1D9E75]"
                      : line.startsWith(">")
                        ? "text-[#BA7517]"
                        : "text-[var(--msc-text-muted)]"
                  }
                >
                  {line}
                </div>
              ))}
              <div className="mt-2 flex items-center text-[#1D9E75]">
                <span>$</span>
                <span className="ml-1 animate-pulse">_</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
