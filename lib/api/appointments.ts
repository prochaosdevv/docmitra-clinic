import { api, type ApiResponse, type PaginatedResponse } from "../api-service"

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientAge?: number
  patientAvatar?: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  duration: string
  type: string
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed"
  notes?: string
  location?: string
}

export interface AppointmentFilters {
  search?: string
  status?: string
  type?: string
  doctorId?: string
  patientId?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export const appointmentService = {
  // Get all appointments with pagination and filters
  getAppointments: (filters?: AppointmentFilters) => {
    return api.get<PaginatedResponse<Appointment>>("/appointments", filters)
  },

  // Get upcoming appointments
  getUpcomingAppointments: (limit?: number) => {
    return api.get<ApiResponse<Appointment[]>>("/appointments/upcoming", { limit })
  },

  // Get today's appointments
  getTodayAppointments: () => {
    return api.get<ApiResponse<Appointment[]>>("/appointments/today")
  },

  // Get a single appointment by ID
  getAppointment: (id: string) => {
    return api.get<ApiResponse<Appointment>>(`/appointments/${id}`)
  },

  // Create a new appointment
  createAppointment: (appointmentData: Omit<Appointment, "id">) => {
    return api.post<ApiResponse<Appointment>>("/appointments", appointmentData)
  },

  // Update an appointment
  updateAppointment: (id: string, appointmentData: Partial<Appointment>) => {
    return api.put<ApiResponse<Appointment>>(`/appointments/${id}`, appointmentData)
  },

  // Cancel an appointment
  cancelAppointment: (id: string, reason?: string) => {
    return api.patch<ApiResponse<Appointment>>(`/appointments/${id}/cancel`, { reason })
  },

  // Complete an appointment
  completeAppointment: (id: string, notes?: string) => {
    return api.patch<ApiResponse<Appointment>>(`/appointments/${id}/complete`, { notes })
  },

  // Get appointment details including medical data
  getAppointmentDetails: (id: string) => {
    return api.get<ApiResponse<any>>(`/appointments/${id}/details`)
  },
}
