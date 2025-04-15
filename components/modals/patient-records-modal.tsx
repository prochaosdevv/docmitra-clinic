"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { VitalsTable } from "@/components/medical-records/vitals-table"

// Mock patient records data
const PATIENT_RECORDS = {
  "P-1001": [
    {
      id: "MR-1001",
      date: "Apr 23, 2023",
      type: "Consultation",
      doctor: "Dr. Michael Chen",
      diagnosis: "Hypertension (Primary)",
      notes: "Patient reports occasional headaches, dizziness, and fatigue. No chest pain or shortness of breath.",
    },
    {
      id: "MR-1002",
      date: "Apr 23, 2023",
      type: "Lab Results",
      doctor: "Dr. Michael Chen",
      diagnosis: "Elevated Cholesterol",
      notes:
        "Lipid panel shows slightly elevated LDL at 130 mg/dL. Recommended dietary changes and follow-up in 3 months.",
    },
    {
      id: "MR-1003",
      date: "Feb 15, 2023",
      type: "Prescription",
      doctor: "Dr. Michael Chen",
      diagnosis: "Hypertension",
      notes: "Prescribed Lisinopril 10mg daily. Patient to monitor blood pressure at home.",
    },
  ],
  "P-1002": [
    {
      id: "MR-2001",
      date: "Apr 24, 2023",
      type: "Consultation",
      doctor: "Dr. Sarah Lee",
      diagnosis: "Eczema",
      notes: "Patient presents with dry, itchy patches on arms and legs. Prescribed topical corticosteroid.",
    },
  ],
  "P-1003": [
    {
      id: "MR-3001",
      date: "Apr 25, 2023",
      type: "Consultation",
      doctor: "Dr. Robert Johnson",
      diagnosis: "Migraine",
      notes: "Patient reports recurring headaches with visual aura. Prescribed sumatriptan as needed.",
    },
  ],
}

interface PatientRecordsModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  patientName: string
}

export function PatientRecordsModal({ isOpen, onClose, patientId, patientName }: PatientRecordsModalProps) {
  const [activeTab, setActiveTab] = useState("records")

  // Get patient records
  const records = PATIENT_RECORDS[patientId as keyof typeof PATIENT_RECORDS] || []

  return (
    <Modal title={`${patientName}'s Records`} isOpen={isOpen} onClose={onClose} className="sm:max-w-[700px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-10 mb-4">
          <TabsTrigger value="records" className="text-xs">
            Medical Records
          </TabsTrigger>
          <TabsTrigger value="vitals" className="text-xs">
            Vitals
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            Visit History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-0 space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">No medical records found.</div>
          ) : (
            records.map((record) => (
              <div key={record.id} className="rounded-lg border overflow-hidden">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{record.diagnosis}</div>
                    <Badge variant="outline" className="text-xs">
                      {record.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{record.notes}</div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {record.date}
                    </div>
                    <div>{record.doctor}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="vitals" className="mt-0">
          <VitalsTable patientId={patientId} />
        </TabsContent>

        <TabsContent value="history" className="mt-0 space-y-3">
          <div className="rounded-lg border overflow-hidden">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">Check-up</div>
                <Badge variant="outline" className="text-xs">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Apr 23, 2023
                </div>
                <div>Dr. Michael Chen</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border overflow-hidden">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">Follow-up</div>
                <Badge variant="outline" className="text-xs">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Feb 15, 2023
                </div>
                <div>Dr. Michael Chen</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  )
}
