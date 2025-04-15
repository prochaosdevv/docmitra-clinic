"use client"

import { Clock, Calendar, User, Pill } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Prescription {
  name: string
  dosage: string
  schedule: string
  timeOfDay?: string[]
  withFood?: string
}

interface PrescriptionPreviewProps {
  patientName: string
  patientId: string
  patientAge: number
  doctorName: string
  date: string
  prescriptions: Prescription[]
  previousPrescriptions?: Prescription[]
  complaints?: string[]
  diagnosis?: string[]
  instructions?: string[]
  previousComplaints?: string[]
  previousDiagnosis?: string[]
  previousInstructions?: string[]
}

export function PrescriptionPreview({
  patientName,
  patientId,
  patientAge,
  doctorName,
  date,
  prescriptions,
  previousPrescriptions = [],
  complaints = [],
  diagnosis = [],
  instructions = [],
  previousComplaints = [],
  previousDiagnosis = [],
  previousInstructions = [],
}: PrescriptionPreviewProps) {
  // Format the current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-4">
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-base">Prescription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Header Information */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Date: {formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Dr: {doctorName}</span>
              </div>
            </div>

            <div className="rounded-md border p-2 text-xs">
              <div className="font-medium">{patientName}</div>
              <div className="text-muted-foreground flex gap-2">
                <span>ID: {patientId}</span>
                <span>•</span>
                <span>Age: {patientAge}</span>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          {(diagnosis.length > 0 || previousDiagnosis.length > 0) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-xs font-medium">Diagnosis:</div>
                <div className="flex flex-wrap gap-1">
                  {diagnosis.map((item, i) => (
                    <Badge key={`current-${i}`} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {previousDiagnosis.map((item, i) => (
                    <Badge key={`prev-${i}`} variant="secondary" className="text-xs">
                      {item} (previous)
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Prescriptions */}
          <Separator />
          <div className="space-y-2">
            <div className="text-xs font-medium">Medications:</div>

            {prescriptions.map((prescription, index) => (
              <div key={`current-${index}`} className="rounded-md border p-2 text-xs">
                <div className="flex items-center gap-1 font-medium">
                  <Pill className="h-3 w-3" />
                  {prescription.name} - {prescription.dosage}
                </div>

                <div className="mt-1 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{prescription.schedule}</span>
                  </div>

                  {prescription.timeOfDay && prescription.timeOfDay.length > 0 && (
                    <div className="mt-0.5">Time: {prescription.timeOfDay.join(", ")}</div>
                  )}

                  {prescription.withFood && <div className="mt-0.5">Note: {prescription.withFood}</div>}
                </div>
              </div>
            ))}

            {previousPrescriptions.map((prescription, index) => (
              <div key={`prev-${index}`} className="rounded-md border border-dashed p-2 text-xs">
                <div className="flex items-center gap-1 font-medium text-muted-foreground">
                  <Pill className="h-3 w-3" />
                  {prescription.name} - {prescription.dosage} (previous)
                </div>

                <div className="mt-1 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{prescription.schedule}</span>
                  </div>

                  {prescription.timeOfDay && prescription.timeOfDay.length > 0 && (
                    <div className="mt-0.5">Time: {prescription.timeOfDay.join(", ")}</div>
                  )}

                  {prescription.withFood && <div className="mt-0.5">Note: {prescription.withFood}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          {(instructions.length > 0 || previousInstructions.length > 0) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-xs font-medium">Instructions:</div>
                <div className="flex flex-wrap gap-1">
                  {instructions.map((item, i) => (
                    <Badge key={`current-${i}`} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {previousInstructions.map((item, i) => (
                    <Badge key={`prev-${i}`} variant="secondary" className="text-xs">
                      {item} (previous)
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Footer */}
          <div className="flex justify-between items-end text-xs">
            <div className="border-t border-dashed pt-1 w-1/3 text-center">Doctor's Signature</div>
            <div className="text-muted-foreground text-right">
              <div>Valid for 30 days from issue date</div>
              <div>Refills: 0 unless specified</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
