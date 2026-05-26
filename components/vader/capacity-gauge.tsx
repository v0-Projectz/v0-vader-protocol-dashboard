"use client"

export function CapacityGauge({ percentage }: { percentage: number }) {
  const radius = 36
  const strokeWidth = 6
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative h-20 w-20" data-testid="capacity-gauge">
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {/* Background circle */}
        <circle
          stroke="currentColor"
          className="text-muted/30"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke="currentColor"
          className="text-primary transition-all duration-500 ease-out"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">{percentage}%</span>
      </div>
    </div>
  )
}
