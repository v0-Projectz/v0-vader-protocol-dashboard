"use client"

import { Zap } from "lucide-react"

export function VelocitySparkline() {
  // Sample data points for the sparkline
  const points = [20, 35, 25, 45, 30, 55, 40, 60, 50, 70]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const height = 24
  const width = 60

  const pathData = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - ((point - min) / (max - min)) * height
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div className="flex items-center gap-1.5" data-testid="velocity-sparkline">
      <Zap className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Velocity</span>
      <svg
        width={width}
        height={height}
        className="overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="text-primary"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
