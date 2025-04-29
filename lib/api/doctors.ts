import { api, type ApiResponse, type PaginatedResponse } from "../api-service"

export interface Doctor {
  id: string
  name: string
  specialty: string
  email: string
  phone: string
  joinDate: string
  patients: number
  status: "Active" | "On Leave" | "Inactive"
  avatar?: string
}

export interface DoctorFilters {
  search?: string
  specialty?: string
  status?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export const doctorService = {
  // Get all doctors with pagination and filters
  getDoctors: (filters?: DoctorFilters) => {
    return api.get<PaginatedResponse<Doctor>>("/doctors", filters)
  },

  // Get a single doctor by ID
  getDoctor: (id: string) => {
    return api.get<ApiResponse<Doctor>>(`/doctors/${id}`)
  },

  // Create a new doctor
  createDoctor: (doctorData: Omit<Doctor, "id">) => {
    return api.post<ApiResponse<Doctor>>("/doctors", doctorData)
  },

  // Update a doctor
  updateDoctor: (id: string, doctorData: Partial<Doctor>) => {
    return api.put<ApiResponse<Doctor>>(`/doctors/${id}`, doctorData)
  },

  // Delete a doctor
  deleteDoctor: (id: string) => {
    return api.delete<ApiResponse<null>>(`/doctors/${id}`)
  },

  // Get doctor's patients
  getDoctorPatients: (doctorId: string) => {
    return api.get<ApiResponse<any[]>>(`/doctors/${doctorId}/patients`)
  },

  // Get doctor's appointments
  getDoctorAppointments: (doctorId: string) => {
    return api.get<ApiResponse<any[]>>(`/doctors/${doctorId}/appointments`)
  },

  // Get doctor's schedule
  getDoctorSchedule: (doctorId: string, date?: string) => {
    return api.get<ApiResponse<any[]>>(`/doctors/${doctorId}/schedule`, { date })
  },
}
