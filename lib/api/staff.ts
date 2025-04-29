import { api, type ApiResponse, type PaginatedResponse } from "../api-service"

export interface StaffMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  joinDate: string
  status: "Active" | "On Leave" | "Inactive"
  avatar?: string
}

export interface StaffFilters {
  search?: string
  role?: string
  status?: string
  page?: number
  limit?: number
}

export const staffService = {
  // Get all staff with pagination and filters
  getStaff: (filters?: StaffFilters) => {
    return api.get<PaginatedResponse<StaffMember>>("/staff", filters)
  },

  // Get a single staff member by ID
  getStaffMember: (id: string) => {
    return api.get<ApiResponse<StaffMember>>(`/staff/${id}`)
  },

  // Create a new staff member
  createStaffMember: (staffData: Omit<StaffMember, "id">) => {
    return api.post<ApiResponse<StaffMember>>("/staff", staffData)
  },

  // Update a staff member
  updateStaffMember: (id: string, staffData: Partial<StaffMember>) => {
    return api.put<ApiResponse<StaffMember>>(`/staff/${id}`, staffData)
  },

  // Delete a staff member
  deleteStaffMember: (id: string) => {
    return api.delete<ApiResponse<null>>(`/staff/${id}`)
  },

  // Update staff status
  updateStaffStatus: (id: string, status: StaffMember["status"]) => {
    return api.patch<ApiResponse<StaffMember>>(`/staff/${id}/status`, { status })
  },
}
