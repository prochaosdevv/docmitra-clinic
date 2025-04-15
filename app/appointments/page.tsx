"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentsList } from "@/components/appointments/appointments-list"
import { AddAppointmentModal } from "@/components/modals/add-appointment-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Fab } from "@/components/ui/fab"

export default function AppointmentsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <MainLayout title="Appointments">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="md:hidden">
            <h1 className="text-xl font-bold">Appointments</h1>
            <p className="text-sm text-muted-foreground">Manage your schedule</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 mb-4">
            <TabsTrigger
              value="upcoming"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="today"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <AppointmentsList filter="upcoming" />
          </TabsContent>

          <TabsContent value="today" className="mt-0">
            <AppointmentsList filter="today" />
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <AppointmentsList filter="past" />
          </TabsContent>
        </Tabs>

        {/* Floating Action Button for mobile */}
        <Fab icon={<Plus className="h-6 w-6" />} label="Add Appointment" onClick={() => setIsAddModalOpen(true)} />

        <AddAppointmentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </MainLayout>
  )
}
