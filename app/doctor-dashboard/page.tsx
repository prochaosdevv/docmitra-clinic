"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { DoctorAppointments } from "@/components/dashboard/doctor-appointments"

export default function DoctorDashboardPage() {
  const { user } = useAuth()

  if (!user || user.role !== "doctor") {
    return null // This should be handled by ProtectedRoute, but just in case
  }

  return (
    <MainLayout title="Doctor Dashboard">
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mr-2">
                  <Calendar className="h-3 w-3 text-primary" />
                </div>
                <span className="text-xs">Today's Appointments</span>
              </div>
              <div className="font-bold text-base">8</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">Upcoming Appointments</h3>
                <p className="text-xs text-muted-foreground">Your schedule</p>
              </div>
            </div>
            <DoctorAppointments doctorId={user.doctorId || ""} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
