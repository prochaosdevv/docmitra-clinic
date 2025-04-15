"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { MainLayout } from "@/components/layout/main-layout"
import { Activity, Calendar, DollarSign, Users } from "lucide-react"
import { AppointmentChart } from "@/components/dashboard/appointment-chart"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect doctors to their dashboard
  useEffect(() => {
    if (user?.role === "doctor") {
      router.push("/doctor-dashboard")
    }
  }, [user, router])

  // Only show admin dashboard to admins
  if (user?.role !== "admin") {
    return null
  }

  return (
    <MainLayout title="Dashboard">
      <div className="flex flex-col gap-6">
        <div className="flex overflow-x-auto pb-2 gap-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4">
          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Total Patients</div>
              <div className="text-2xl font-bold">1,248</div>
              <div className="text-xs text-green-500">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Today's Appointments</div>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs text-muted-foreground">6 remaining</div>
            </CardContent>
          </Card>

          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
              <div className="text-2xl font-bold">$24,568</div>
              <div className="text-xs text-green-500">+8.2% from last month</div>
            </CardContent>
          </Card>

          <Card className="min-w-[160px] flex-shrink-0 md:min-w-0">
            <CardContent className="p-4 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Active Staff</div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-xs text-muted-foreground">3 on leave</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Appointment Statistics</h3>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <AppointmentChart />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                  <p className="text-sm text-muted-foreground">Next 5 scheduled</p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Recent Patients</h3>
                <p className="text-sm text-muted-foreground">Recently registered</p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <RecentPatients />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
