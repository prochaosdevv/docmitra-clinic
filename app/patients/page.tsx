"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientsList } from "@/components/patients/patients-list"
import { AddPatientModal } from "@/components/modals/add-patient-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PatientsPage() {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <MainLayout title="Patients">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold md:hidden">Patients</h1>
          </div>
          <Button onClick={() => setIsAddPatientModalOpen(true)} className="md:ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Patient
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 mb-4">
            <TabsTrigger
              value="all"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Patients
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <PatientsList filter="all" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <PatientsList filter="active" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <PatientsList filter="inactive" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddPatientModal isOpen={isAddPatientModalOpen} onClose={() => setIsAddPatientModalOpen(false)} />
      </div>
    </MainLayout>
  )
}
