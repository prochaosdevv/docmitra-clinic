"use client"

import { useState, useEffect } from "react"
import { ApiError } from "@/lib/api-service"

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
  initialData?: T
  deps?: any[]
}

export function useApi<T>(apiCall: () => Promise<T>, options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const [isRefetching, setIsRefetching] = useState(false)

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true)
    } else {
      setIsRefetching(true)
    }

    setError(null)

    try {
      const result = await apiCall()
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const apiError = err instanceof ApiError ? err : new ApiError("An unexpected error occurred", 500)

      setError(apiError)
      options.onError?.(apiError)
      return undefined
    } finally {
      setIsLoading(false)
      setIsRefetching(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options.deps || [])

  const refetch = () => fetchData(false)

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  }
}
