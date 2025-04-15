"use client"

import { useAuth } from "@/contexts/auth-context"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ClipboardList, Users } from "lucide-react"
import { DoctorAppointments } from "@/components/dashboard/doctor-appointments"
import { DoctorPatients } from "@/components/dashboard/doctor-patients"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

export default function DoctorDashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("appointments")

  // Load saved tab preference on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem("doctorDashboardTab")
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  // Save tab preference when it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem("doctorDashboardTab", value)
  }

  if (!user || user.role !== "doctor") {
    return null // This should be handled by ProtectedRoute, but just in case
  }

  return (
    <MainLayout title="Doctor Dashboard">
      <div className="flex flex-col gap-6">
        <div className="flex overflow-x-auto pb-2 gap-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Today's Appointments</div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground">3 remaining</div>
            </CardContent>
          </Card>

          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Your Patients</div>
              <div className="text-2xl font-bold">124</div>
              <div className="text-xs text-green-500">+3 this week</div>
            </CardContent>
          </Card>

          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Medical Records</div>
              <div className="text-2xl font-bold">28</div>
              <div className="text-xs text-muted-foreground">Updated today</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Your Dashboard</h3>
                <p className="text-sm text-muted-foreground">Manage appointments and patients</p>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="appointments" className="flex-1">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="patients" className="flex-1">
                  Patients
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <DoctorAppointments doctorId={user.doctorId || ""} />
              </TabsContent>

              <TabsContent value="patients">
                <DoctorPatients doctorId={user.doctorId || ""} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
