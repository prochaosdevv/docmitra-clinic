// API base URL - can be configured based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.docmitr.com/v1"

// Types for API responses
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Error handling
export class ApiError extends Error {
  status: number
  data?: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(errorData.message || `API error with status ${response.status}`, response.status, errorData)
  }

  return await response.json()
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("docmitr-auth-token")
  }
  return null
}

// Base API request function
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  return handleResponse<T>(response)
}

// API methods
export const api = {
  // GET request
  get: <T,>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    return apiRequest<T>(url.toString().replace(API_BASE_URL, ""), {
      method: "GET",
    })
  },

  // POST request
  post: <T,>(endpoint: string, data?: any): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // PUT request
  put: <T,>(endpoint: string, data?: any): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // PATCH request
  patch: <T,>(endpoint: string, data?: any): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // DELETE request
  delete: <T,>(endpoint: string): Promise<T> =>
    apiRequest<T>(endpoint, {
      method: "DELETE",
    }),
}
