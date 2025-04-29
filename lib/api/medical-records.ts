import { api, type ApiResponse, type PaginatedResponse } from "../api-service"

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  type: string
  diagnosis: string
  notes: string
  status: "Complete" | "Pending"
}

export interface MedicalRecordFilters {
  search?: string
  patientId?: string
  doctorId?: string
  type?: string
  dateFrom?: string
  dateTo?: string
  status?: string
  page?: number
  limit?: number
}

export const medicalRecordService = {
  // Get all medical records with pagination and filters
  getMedicalRecords: (filters?: MedicalRecordFilters) => {
    return api.get<PaginatedResponse<MedicalRecord>>("/medical-records", filters)
  },

  // Get a single medical record by ID
  getMedicalRecord: (id: string) => {
    return api.get<ApiResponse<MedicalRecord>>(`/medical-records/${id}`)
  },

  // Create a new medical record
  createMedicalRecord: (recordData: Omit<MedicalRecord, "id">) => {
    return api.post<ApiResponse<MedicalRecord>>("/medical-records", recordData)
  },

  // Update a medical record
  updateMedicalRecord: (id: string, recordData: Partial<MedicalRecord>) => {
    return api.put<ApiResponse<MedicalRecord>>(`/medical-records/${id}`, recordData)
  },

  // Delete a medical record
  deleteMedicalRecord: (id: string) => {
    return api.delete<ApiResponse<null>>(`/medical-records/${id}`)
  },

  // Get recent medical records
  getRecentMedicalRecords: (limit?: number) => {
    return api.get<ApiResponse<MedicalRecord[]>>("/medical-records/recent", { limit })
  },

  // Get critical medical records
  getCriticalMedicalRecords: () => {
    return api.get<ApiResponse<MedicalRecord[]>>("/medical-records/critical")
  },
}
