import { api, type ApiResponse } from "../api-service"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "doctor"
  avatar?: string
  doctorId?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export const authService = {
  // Login
  login: (credentials: LoginCredentials) => {
    return api.post<ApiResponse<LoginResponse>>("/auth/login", credentials)
  },

  // Logout
  logout: () => {
    return api.post<ApiResponse<null>>("/auth/logout")
  },

  // Get current user
  getCurrentUser: () => {
    return api.get<ApiResponse<User>>("/auth/me")
  },

  // Update user profile
  updateProfile: (userData: Partial<User>) => {
    return api.put<ApiResponse<User>>("/auth/profile", userData)
  },

  // Change password
  changePassword: (data: { currentPassword: string; newPassword: string }) => {
    return api.post<ApiResponse<null>>("/auth/change-password", data)
  },

  // Request password reset
  requestPasswordReset: (email: string) => {
    return api.post<ApiResponse<null>>("/auth/forgot-password", { email })
  },

  // Reset password
  resetPassword: (data: { token: string; password: string }) => {
    return api.post<ApiResponse<null>>("/auth/reset-password", data)
  },
}
