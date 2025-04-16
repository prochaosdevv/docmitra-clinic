"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowDown, RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  pullDownThreshold?: number
  maxPullDownDistance?: number
  backgroundColor?: string
}

export function PullToRefresh({
  onRefresh,
  children,
  pullDownThreshold = 80,
  maxPullDownDistance = 120,
  backgroundColor = "bg-background",
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number | null>(null)
  const currentYRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull to refresh when at the top of the page
      if (window.scrollY <= 0) {
        startYRef.current = e.touches[0].clientY
        currentYRef.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || startYRef.current === null) return

      currentYRef.current = e.touches[0].clientY
      const deltaY = currentYRef.current - startYRef.current

      // Only allow pulling down, not up
      if (deltaY > 0 && window.scrollY <= 0) {
        // Apply resistance to make it harder to pull down
        const resistance = 0.4
        const newDistance = Math.min(deltaY * resistance, maxPullDownDistance)
        setPullDistance(newDistance)

        // Prevent default scrolling behavior when pulling
        e.preventDefault()
      } else {
        setPullDistance(0)
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      if (pullDistance >= pullDownThreshold && !isRefreshing) {
        setIsRefreshing(true)
        setPullDistance(pullDownThreshold) // Snap to threshold

        try {
          await onRefresh()
        } catch (error) {
          console.error("Refresh failed:", error)
        } finally {
          setIsRefreshing(false)
          setPullDistance(0)
        }
      } else {
        // Animate back to 0
        setPullDistance(0)
      }

      setIsPulling(false)
      startYRef.current = null
      currentYRef.current = null
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)
    container.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
      container.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [isPulling, pullDistance, isRefreshing, maxPullDownDistance, pullDownThreshold, onRefresh])

  // Calculate progress percentage
  const progress = Math.min((pullDistance / pullDownThreshold) * 100, 100)

  return (
    <div ref={containerRef} className="relative overflow-hidden h-full">
      {/* Pull indicator */}
      <div
        className={`absolute left-0 right-0 flex items-center justify-center z-10 transition-transform ${backgroundColor}`}
        style={{
          height: `${pullDownThreshold}px`,
          transform: `translateY(${pullDistance - pullDownThreshold}px)`,
        }}
      >
        {isRefreshing ? (
          <RefreshCw className="animate-spin h-6 w-6 text-primary" />
        ) : (
          <div className="flex flex-col items-center">
            <ArrowDown
              className="h-6 w-6 text-primary transition-transform"
              style={{
                transform: `rotate(${Math.min(progress * 1.8, 180)}deg)`,
                opacity: Math.min(progress / 50, 1),
              }}
            />
            <span className="text-xs mt-1 text-muted-foreground">
              {progress >= 100 ? "Release to refresh" : "Pull down to refresh"}
            </span>
          </div>
        )}
      </div>

      {/* Content container */}
      <div
        className="transition-transform will-change-transform"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
