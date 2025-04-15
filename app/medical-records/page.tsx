"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalRecordsList } from "@/components/medical-records/medical-records-list"
import { AddMedicalRecordModal } from "@/components/modals/add-medical-record-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MedicalRecordsPage() {
  const [isAddMedicalRecordModalOpen, setIsAddMedicalRecordModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <MainLayout title="Medical Records">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold md:hidden">Medical Records</h1>
          </div>
          <Button onClick={() => setIsAddMedicalRecordModalOpen(true)} className="md:ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Record
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 mb-4">
            <TabsTrigger
              value="all"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Records
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="critical"
              className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Critical
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <MedicalRecordsList filter="all" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <MedicalRecordsList filter="recent" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <MedicalRecordsList filter="critical" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddMedicalRecordModal
          isOpen={isAddMedicalRecordModalOpen}
          onClose={() => setIsAddMedicalRecordModalOpen(false)}
        />
      </div>
    </MainLayout>
  )
}
