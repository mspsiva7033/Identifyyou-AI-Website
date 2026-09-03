'use client'

import { useEffect, useRef, useState } from 'react'

export interface MetricItemData {
  stat: string
  label: string
}

interface AnimatedMetricsProps {
  metrics: MetricItemData[]
  gridClassName?: string
  itemClassName?: string
  numClassName?: string
  labelClassName?: string
}

function ScrambleCounter({
  stat,
  label,
  itemClassName,
  numClassName,
  labelClassName,
}: MetricItemData & {
  itemClassName?: string
  numClassName?: string
  labelClassName?: string
}) {
  const [displayValue, setDisplayValue] = useState(stat)
  const cardRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  // Parse target number and suffix (e.g. "150+" -> num=150, suffix="+"; "1M+" -> num=1, suffix="M+")
  const match = stat.match(/^(\d+)(.*)$/)
  const targetNum = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (targetNum === null) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          runScrambleAnimation()
        }
      },
      { threshold: 0.25 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [targetNum])

  const runScrambleAnimation = () => {
    if (targetNum === null) return

    const duration = 1600 // ms duration of scramble animation
    const startTime = performance.now()

    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 1) {
        // High-tech random scramble effect
        const randomFactor = Math.floor(Math.random() * (targetNum * 1.8 || 99))
        const easedProgress = Math.pow(progress, 3) // cubic ease-in-out
        const currentVal = Math.floor(randomFactor * (1 - easedProgress) + targetNum * easedProgress)
        setDisplayValue(`${currentVal}${suffix}`)
        requestAnimationFrame(update)
      } else {
        setDisplayValue(`${targetNum}${suffix}`)
      }
    }

    requestAnimationFrame(update)
  }

  return (
    <div ref={cardRef} className={itemClassName}>
      <div className={numClassName}>{displayValue}</div>
      <div className={labelClassName}>{label}</div>
    </div>
  )
}

export default function AnimatedMetrics({
  metrics,
  gridClassName,
  itemClassName,
  numClassName,
  labelClassName,
}: AnimatedMetricsProps) {
  return (
    <div className={gridClassName}>
      {metrics.map((m) => (
        <ScrambleCounter
          key={m.label}
          stat={m.stat}
          label={m.label}
          itemClassName={itemClassName}
          numClassName={numClassName}
          labelClassName={labelClassName}
        />
      ))}
    </div>
  )
}
