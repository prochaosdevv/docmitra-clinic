"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { MainLayout } from "@/components/layout/main-layout"
import { Activity, Calendar, DollarSign, Loader2 } from "lucide-react"
import { AppointmentChart } from "@/components/dashboard/appointment-chart"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApi } from "@/hooks/use-api"
import { dashboardService } from "@/lib/api/dashboard"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Fetch dashboard stats
  const {
    data: dashboardStats,
    isLoading,
    error,
  } = useApi(() => dashboardService.getDashboardStats(), {
    onError: (err) => {
      toast({
        title: "Error fetching dashboard data",
        description: err.message,
        variant: "destructive",
      })
    },
  })

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
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading dashboard data...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error loading dashboard data: {error.message}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-2xl font-bold">{dashboardStats?.data.todayAppointments || 0}</div>
                  <div className="text-xs text-muted-foreground">
                    {dashboardStats?.data.remainingAppointments || 0} remaining
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">Today's Appointments</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-2xl font-bold">₹{dashboardStats?.data.totalRevenue.toLocaleString() || 0}</div>
                  <div
                    className={`text-xs ${dashboardStats?.data.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {dashboardStats?.data.revenueGrowth >= 0 ? "+" : ""}
                    {dashboardStats?.data.revenueGrowth || 0}% from last month
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col items-center md:items-start">
                  <div className="text-2xl font-bold">{dashboardStats?.data.activeStaff || 0}</div>
                  <div className="text-xs text-muted-foreground">{dashboardStats?.data.staffOnLeave || 0} on leave</div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-2">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground">Active Staff</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="upcoming" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Appointments</h3>
                      <p className="text-sm text-muted-foreground">Manage your clinic schedule</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/appointments")}>
                      View All
                    </Button>
                  </div>

                  <TabsList className="w-full grid grid-cols-2 h-12 mb-4">
                    <TabsTrigger
                      value="upcoming"
                      className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Upcoming Appointments
                    </TabsTrigger>
                    <TabsTrigger
                      value="statistics"
                      className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Appointment Statistics
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-0">
                    <UpcomingAppointments />
                  </TabsContent>

                  <TabsContent value="statistics" className="mt-0">
                    <AppointmentChart />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  )
}
