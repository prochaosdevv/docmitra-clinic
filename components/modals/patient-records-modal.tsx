"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VitalsTable } from "@/components/medical-records/vitals-table";

// Modified patient records with vitals
const PATIENT_RECORDS = {
  "P-2001": [
    // {
    //   id: "MR-1001",
    //   date: "Apr 24, 2025",
    //   type: "Consultation",
    //   doctor: "Dr. Amit Sharma",
    //   diagnosis: "Hypertension (Primary)",
    //   notes:
    //     "Patient reports occasional headaches, dizziness, and fatigue. No chest pain or shortness of breath.",
    //   sgpt: 35,
    //   sgot: 40,
    //   heartRate: 76,
    //   temperature: 98.6,
    // },
    {
      id: "MR-1002",
      date: "Apr 24, 2025",
      type: "Lab Results",
      doctor: "Dr. Amit Sharma",
      diagnosis: "Elevated Cholesterol",
      notes:
        "Lipid panel shows slightly elevated LDL at 130 mg/dL. Recommended dietary changes and follow-up in 3 months.",
      sgpt: 33,
      sgot: 38,
      heartRate: 78,
      temperature: 98.4,
    },
    {
      id: "MR-1003",
      date: "Apr 29, 2024",
      type: "Lab Results",
      doctor: "Dr. Mehul Patel",
      diagnosis: "Hypertension",
      notes:
        "Prescribed Lisinopril 10mg daily. Patient to monitor blood pressure at home.",
      sgpt: 30,
      sgot: 34,
      heartRate: 74,
      temperature: 98.2,
    },
  ],
  "P-2002": [
    {
      id: "MR-2002",
      date: "Apr 24, 2023",
      type: "Consultation",
      doctor: "Dr. Sunil Patel",
      diagnosis: "Eczema",
      notes:
        "Patient presents with dry, itchy patches on arms and legs. Prescribed topical corticosteroid.",
      sgpt: 25,
      sgot: 29,
      heartRate: 72,
      temperature: 98.1,
    },
  ],
  "P-2003": [
    {
      id: "MR-3001",
      date: "Apr 25, 2023",
      type: "Consultation",
      doctor: "Dr. Sunil Patel",
      diagnosis: "Migraine",
      notes:
        "Patient reports recurring headaches with visual aura. Prescribed sumatriptan as needed.",
      sgpt: 27,
      sgot: 32,
      heartRate: 80,
      temperature: 98.7,
    },
  ],
};

interface PatientRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
}

export function PatientRecordsModal({
  isOpen,
  onClose,
  patientId,
  patientName,
}: PatientRecordsModalProps) {
  const [activeTab, setActiveTab] = useState("records");

  const records =
    PATIENT_RECORDS[patientId as keyof typeof PATIENT_RECORDS] || [];

  // Group records by date
  const recordsByDate = records.reduce(
    (acc: Record<string, typeof records>, record) => {
      acc[record.date] = acc[record.date] || [];
      acc[record.date].push(record);
      return acc;
    },
    {}
  );

  return (
    <Modal
      title={`${patientName}'s Records`}
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[95vw] sm:max-w-[800px] max-h-[90vh] overflow-auto"
    >
      <div className="w-full h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-auto mb-4">
            <TabsTrigger value="records" className="text-xs py-2">
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="vitals" className="text-xs py-2">
              Vitals
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs py-2">
              Visit History
            </TabsTrigger>
          </TabsList>

          {/* MEDICAL RECORDS TAB */}
          <TabsContent value="records" className="mt-0">
            {records.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No medical records found.
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <Accordion type="multiple" className="w-full">
                  {Object.entries(recordsByDate).map(([date, recs]) => (
                    <AccordionItem key={date} value={date} className="mb-4">
                      <AccordionTrigger className="px-2 sm:px-4">
                        {date}
                      </AccordionTrigger>
                      <AccordionContent>
                        {recs.map((record) => (
                          <div
                            key={record.id}
                            className="border rounded-lg p-3 mb-3 bg-muted/30 mt-2"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-sm">
                                {record.type}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {record.doctor}
                              </Badge>
                            </div>
                            <div className="text-xs mb-2 text-muted-foreground">
                              <strong>Diagnosis:</strong> {record.diagnosis}
                            </div>

                            <div className="flex flex-col gap-1 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">SGPT</span>
                                <span>{record.sgpt} U/L</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">SGOT</span>
                                <span>{record.sgot} U/L</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Heart Rate</span>
                                <span>{record.heartRate} bpm</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Temperature</span>
                                <span>{record.temperature} °F</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </TabsContent>

          {/* VITALS TAB */}
          <TabsContent value="vitals" className="mt-0">
            <div className="w-full overflow-x-auto">
              <VitalsTable patientId={patientId} />
            </div>
          </TabsContent>

          {/* VISIT HISTORY TAB */}
          <TabsContent value="history" className="mt-0 space-y-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="p-2 sm:p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Check-up</div>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <Calendar className="h-3 w-3 mr-1" />
                    May 2, 2025
                  </div>
                  <div>Dr. Amit Sharma</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="p-2 sm:p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Follow-up</div>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <Calendar className="h-3 w-3 mr-1" />
                    May 2, 2025
                  </div>
                  <div>Dr. Amit Sharma</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}
