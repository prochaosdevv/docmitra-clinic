import { api, type ApiResponse, type PaginatedResponse } from "../api-service"

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  age: number
  gender: string
  address: string
  bloodType: string
  allergies: string[]
  lastVisit?: string
  status: "Active" | "Inactive"
  avatar?: string
}

export interface PatientFilters {
  search?: string
  status?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export const patientService = {
  // Get all patients with pagination and filters
  getPatients: (filters?: PatientFilters) => {
    return api.get<PaginatedResponse<Patient>>("/patients", filters)
  },

  // Get a single patient by ID
  getPatient: (id: string) => {
    return api.get<ApiResponse<Patient>>(`/patients/${id}`)
  },

  // Create a new patient
  createPatient: (patientData: Omit<Patient, "id">) => {
    return api.post<ApiResponse<Patient>>("/patients", patientData)
  },

  // Update a patient
  updatePatient: (id: string, patientData: Partial<Patient>) => {
    return api.put<ApiResponse<Patient>>(`/patients/${id}`, patientData)
  },

  // Delete a patient
  deletePatient: (id: string) => {
    return api.delete<ApiResponse<null>>(`/patients/${id}`)
  },

  // Get patient medical records
  getPatientMedicalRecords: (patientId: string) => {
    return api.get<ApiResponse<any[]>>(`/patients/${patientId}/medical-records`)
  },

  // Get patient appointments
  getPatientAppointments: (patientId: string) => {
    return api.get<ApiResponse<any[]>>(`/patients/${patientId}/appointments`)
  },

  // Get patient vitals history
  getPatientVitals: (patientId: string) => {
    return api.get<ApiResponse<any[]>>(`/patients/${patientId}/vitals`)
  },
}
