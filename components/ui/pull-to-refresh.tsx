"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ArrowDown, RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  pullDownThreshold?: number
  backgroundColor?: string
  loadingColor?: string
}

export function PullToRefresh({
  onRefresh,
  children,
  pullDownThreshold = 80,
  backgroundColor = "bg-background",
  loadingColor = "text-primary",
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const currentYRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only activate pull-to-refresh when at the top of the page
      if (window.scrollY <= 0) {
        startYRef.current = e.touches[0].clientY
        currentYRef.current = startYRef.current
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return

      currentYRef.current = e.touches[0].clientY
      const distance = Math.max(0, currentYRef.current - startYRef.current)

      // Only apply pull effect if we're at the top of the page
      if (window.scrollY <= 0 && distance > 0) {
        // Prevent default scrolling behavior when pulling
        e.preventDefault()

        // Apply resistance to make the pull feel more natural
        const pullWithResistance = Math.min(distance * 0.5, pullDownThreshold * 1.5)
        setPullDistance(pullWithResistance)
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      if (pullDistance >= pullDownThreshold) {
        // Trigger refresh
        setIsRefreshing(true)
        setPullDistance(pullDownThreshold / 2) // Keep some visual indication

        try {
          await onRefresh()
        } catch (error) {
          console.error("Refresh failed:", error)
        }

        // Reset after refresh
        setTimeout(() => {
          setPullDistance(0)
          setIsRefreshing(false)
        }, 500)
      } else {
        // Not enough pull, reset
        setPullDistance(0)
      }

      setIsPulling(false)
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isPulling, pullDistance, pullDownThreshold, onRefresh])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Pull indicator */}
      <div
        className={`absolute left-0 right-0 flex items-center justify-center transition-transform duration-200 ${backgroundColor} z-10`}
        style={{
          transform: `translateY(${pullDistance > 0 ? "0" : "-100%"})`,
          height: `${Math.max(pullDistance, 60)}px`,
          top: -60,
        }}
      >
        {isRefreshing ? (
          <RefreshCw className={`animate-spin ${loadingColor}`} size={24} />
        ) : (
          <div className="flex flex-col items-center">
            <ArrowDown
              className={`transition-transform ${loadingColor}`}
              size={24}
              style={{
                transform: `rotate(${Math.min(180, (pullDistance / pullDownThreshold) * 180)}deg)`,
              }}
            />
            <span className="text-sm mt-1">
              {pullDistance >= pullDownThreshold ? "Release to refresh" : "Pull down to refresh"}
            </span>
          </div>
        )}
      </div>

      {/* Content with pull effect */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling ? "none" : "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
