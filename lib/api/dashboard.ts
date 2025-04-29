import { api, type ApiResponse } from "../api-service"

export interface DashboardStats {
  todayAppointments: number
  remainingAppointments: number
  totalRevenue: number
  revenueGrowth: number
  activeStaff: number
  staffOnLeave: number
  patientStats: {
    total: number
    new: number
    active: number
  }
  appointmentStats: {
    total: number
    completed: number
    cancelled: number
    upcoming: number
  }
}

export interface AppointmentChartData {
  month: string
  scheduled: number
  completed: number
  cancelled: number
}

export const dashboardService = {
  // Get dashboard statistics
  getDashboardStats: () => {
    return api.get<ApiResponse<DashboardStats>>("/dashboard/stats")
  },

  // Get appointment chart data
  getAppointmentChartData: (period: "week" | "month" | "year" = "month") => {
    return api.get<ApiResponse<AppointmentChartData[]>>("/dashboard/appointment-chart", { period })
  },

  // Get recent patients
  getRecentPatients: (limit = 5) => {
    return api.get<ApiResponse<any[]>>("/dashboard/recent-patients", { limit })
  },

  // Get upcoming appointments
  getUpcomingAppointments: (limit = 5) => {
    return api.get<ApiResponse<any[]>>("/dashboard/upcoming-appointments", { limit })
  },
}
