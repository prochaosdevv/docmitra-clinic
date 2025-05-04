"use client";

import { useAuth } from "@/contexts/auth-context";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { DoctorAppointments } from "@/components/dashboard/doctor-appointments";
import { AddAppointmentModal } from "@/components/modals/add-appointment-modal";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddPatientModal } from "@/components/modals/add-patient-modal";
import AddHealthCheckModal from "@/components/modals/add-healthcheck-modal";
import { StaffAppointments } from "@/components/dashboard/staff-appoinments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { VitalsHistoryRecord } from "../appointments/[id]/page";

const completed = 8;
const total = 18;
const remaining = total - completed;

export const APPOINTMENTS = [
  {
    id: "A-1001",
    patientName: "Ravi Sharma",
    patientId: "P-2001",
    patientAge: 45,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Ravi Sharma",
    date: "Today",
    patientEmail: "priya.p@example.com",
    patientPhone: "+91 87654 32109",
    doctorName: "Dr. Sanjana Desai",
    doctorId: "D-1002",
    doctorAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Sanjana Desai",
    specialty: "Dermatology",
    detailsDate: "May 15, 2023",
    time: "11:30 AM",
    duration: "45 minutes",
    type: "Consultation",
    status: "Confirmed",
    location: "Main Clinic, Room 203",
    notes:
      "Initial consultation for skin condition. Patient has reported persistent rash on arms.",
    previousComplaints: ["Skin rash", "Itching"],
    previousDiagnosis: [],
    previousPrescriptions: [],
    previousInstructions: [],
    mode: "in-clinic",
    vitalsHistory: [
      {
        date: "Apr 23, 2023",
        blood_pressure: "140/88",
        hemoglobin: 13.5,
        height: 170,
        weight: 75,
        temprature: 98.6,
        glucose: 90,
        systolic: 140,
        diastolic: 88,
      },
      {
        date: "May 1, 2023",
        blood_pressure: "135/85",
        hemoglobin: 13.8,
        height: 170,
        weight: 77,
        temprature: 98.4,
        glucose: 92,
        systolic: 135,
        diastolic: 85,
      },
      {
        date: "May 10, 2023",
        blood_pressure: "130/80",
        hemoglobin: 14.0,
        height: 170,
        weight: 76,
        temprature: 98.7,
        glucose: 88,
        systolic: 130,
        diastolic: 80,
      },
    ] as VitalsHistoryRecord[],
  },
  {
    id: "A-1002",
    patientName: "Sunita Patel",
    patientId: "P-2002",
    patientAge: 32,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Sunita Patel",
    date: "Today",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Upcoming",
    doctorId: "D-1001",
    mode: "upcoming",
    patientEmail: "priya.p@example.com",
    patientPhone: "+91 87654 32109",
    doctorName: "Dr. Sanjana Desai",
    doctorAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Sanjana Desai",
    specialty: "Dermatology",
    detailsDate: "May 15, 2023",
    duration: "45 minutes",
    location: "Main Clinic, Room 203",
    notes:
      "Initial consultation for skin condition. Patient has reported persistent rash on arms.",
    previousComplaints: ["Skin rash", "Itching"],
    previousDiagnosis: [],
    previousPrescriptions: [],
    previousInstructions: [],
    vitalsHistory: [] as VitalsHistoryRecord[],
  },
  {
    id: "A-1003",
    patientName: "Mohan Verma",
    patientId: "P-2003",
    patientAge: 28,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Mohan Verma",
    date: "Today",
    time: "2:15 PM",
    type: "Consultation",
    status: "Upcoming",
    doctorId: "D-1001",
    mode: "upcoming",
    patientEmail: "rahul.v@example.com",
    patientPhone: "+91 76543 21098",
    doctorName: "Dr. Vikram Mehta",
    doctorAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Vikram Mehta",
    specialty: "Neurology",
    detailsDate: "May 15, 2023",
    duration: "60 minutes",
    location: "Main Clinic, Room 302",
    notes:
      "Follow-up after MRI scan. Patient experiencing recurring headaches.",
    previousComplaints: ["Recurring headaches", "Visual aura"],
    previousDiagnosis: ["Migraine"],
    previousPrescriptions: [],
    previousInstructions: ["Avoid triggers", "Keep headache diary"],
    vitalsHistory: [] as VitalsHistoryRecord[],
  },
  {
    id: "A-1004",
    patientName: "Deepa Gupta",
    patientId: "P-2004",
    patientAge: 52,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Deepa Gupta",
    date: "Tomorrow",
    time: "9:00 AM",
    type: "Check-up",
    status: "Scheduled",
    doctorId: "D-1001",
    mode: "in-clinic",
    vitalsHistory: [
      {
        date: "Apr 23, 2023",
        blood_pressure: "140/88",
        hemoglobin: 13.5,
        height: 170,
        weight: 75,
        temprature: 98.6,
        glucose: 90,
        systolic: 140,
        diastolic: 88,
      },
      {
        date: "May 1, 2023",
        blood_pressure: "135/85",
        hemoglobin: 13.8,
        height: 170,
        weight: 77,
        temprature: 98.4,
        glucose: 92,
        systolic: 135,
        diastolic: 85,
      },
      {
        date: "May 10, 2023",
        blood_pressure: "130/80",
        hemoglobin: 14.0,
        height: 170,
        weight: 76,
        temprature: 98.7,
        glucose: 88,
        systolic: 130,
        diastolic: 80,
      },
    ],
  },
  {
    id: "A-1005",
    patientName: "Suresh Mehta",
    patientId: "P-2005",
    patientAge: 41,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Suresh Mehta",
    date: "Tomorrow",
    time: "3:30 PM",
    type: "Follow-up",
    status: "Scheduled",
    doctorId: "D-1001",
    mode: "in-clinic",
    vitalsHistory: [
      {
        date: "Apr 23, 2025",
        blood_pressure: "140/88",
        hemoglobin: 13.5,
        height: 170,
        weight: 75,
        temprature: 98.6,
        glucose: 90,
        systolic: 140,
        diastolic: 88,
      },
      {
        date: "Apr 28, 2025",
        blood_pressure: "135/85",
        hemoglobin: 13.8,
        height: 170,
        weight: 77,
        temprature: 98.4,
        glucose: 92,
        systolic: 135,
        diastolic: 85,
      },
      {
        date: "May 1, 2025",
        blood_pressure: "130/80",
        hemoglobin: 14.0,
        height: 170,
        weight: 76,
        temprature: 98.7,
        glucose: 88,
        systolic: 130,
        diastolic: 80,
      },
    ] as VitalsHistoryRecord[],
  },
  {
    id: "A-1006",
    patientName: "Pooja Singh",
    patientId: "P-2006",
    patientAge: 36,
    patientAvatar:
      "/abstract-geometric-shapes.png?height=36&width=36&query=Pooja Singh",
    date: "May 20, 2023",
    time: "10:45 AM",
    type: "Consultation",
    status: "Scheduled",
    doctorId: "D-1002",
    mode: "in-clinic",
    vitalsHistory: [
      {
        date: "Apr 24, 2025",
        blood_pressure: "140/88",
        hemoglobin: 13.5,
        height: 170,
        weight: 75,
        temprature: 98.6,
        glucose: 90,
        systolic: 140,
        diastolic: 88,
      },
      {
        date: "Apr 29, 2025",
        blood_pressure: "135/85",
        hemoglobin: 13.8,
        height: 170,
        weight: 77,
        temprature: 98.4,
        glucose: 92,
        systolic: 135,
        diastolic: 85,
      },
      {
        date: "May 1, 2025",
        blood_pressure: "130/80",
        hemoglobin: 14.0,
        height: 170,
        weight: 76,
        temprature: 98.7,
        glucose: 88,
        systolic: 130,
        diastolic: 80,
      },
    ],
  },
];

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [addedPatient, setAddedPatient] = useState(null);
  const [openHealthCheckModal, setOpenHealthCheckModal] = useState(false);
  const [appoinmentsList, setAppoinmentsList] = useState(APPOINTMENTS);
  const [appointmentId, setAppointmentId] = useState("");

  const [inClinicSearch, setInClinicSearch] = useState("");
  const [upcomingSearch, setUpcomingSearch] = useState("");

  if (!user || user.role !== "staff") {
    return null; // This should be handled by ProtectedRoute, but just in case
  }

  const handleAddPatient = (patient: any) => {
    setAddedPatient(patient);
  };

  const filteredInClinic = useCallback(
    () =>
      appoinmentsList.filter(
        (a) =>
          a.mode === "in-clinic" &&
          (a.patientName.toLowerCase().includes(inClinicSearch.toLowerCase()) ||
            a.patientId.toLowerCase().includes(inClinicSearch.toLowerCase()))
      ),
    [inClinicSearch]
  );
  console.log("Appointments List", appoinmentsList);

  const filteredUpcoming = useCallback(
    () =>
      appoinmentsList.filter(
        (a) =>
          a.mode === "upcoming" &&
          (a.patientName.toLowerCase().includes(upcomingSearch.toLowerCase()) ||
            a.patientId.toLowerCase().includes(upcomingSearch.toLowerCase()))
      ),
    [upcomingSearch]
  );

  const checkHealthCheckModal = (appointmentId: string): boolean => {
    setAppointmentId(appointmentId);
    const appointment = appoinmentsList.find((a) => a.id === appointmentId);
    if (!appointment) return false;

    if (appointment.vitalsHistory?.length === 0) {
      setOpenHealthCheckModal(true);
      return false; // Don't redirect
    }

    return true; // Proceed with redirection
  };

  const submitFunction = (data: any) => {
    setAppoinmentsList((prev: any) =>
      prev.map((app: any) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            vitalsHistory: [
              ...app.vitalsHistory,
              {
                date: new Date().toLocaleDateString(),
                ...data,
              },
            ],
          };
        }
        return app;
      })
    );
  };

  return (
    <MainLayout title="Staff Dashboard">
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
              <div className="flex items-center">
                <div className="text-base font-bold text-primary">
                  {completed}
                </div>
                <div className="mx-1 text-xs text-gray-500">/</div>
                <div className="text-sm text-gray-500">{total}</div>
                <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                  {remaining} remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">Appointments</h3>
                <p className="text-xs text-muted-foreground">Your schedule</p>
              </div>

              <Button
                onClick={() => setIsAddModalOpen(true)}
                // className="hidden md:flex"
                size={"sm"}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>

            <div className="my-5">
              <Tabs defaultValue="in-clinic" className="w-full">
                <TabsList className="w-full grid grid-cols-2 h-12 mb-4">
                  <TabsTrigger
                    value="in-clinic"
                    className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    In Clinic Appointments
                  </TabsTrigger>
                  <TabsTrigger
                    value="upcoming"
                    className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Upcoming Appointments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="in-clinic" className="mt-0">
                  <Input
                    placeholder="Search by name..."
                    className="mb-4"
                    value={inClinicSearch}
                    onChange={(e) => setInClinicSearch(e.target.value)}
                  />
                  <StaffAppointments
                    appointments={filteredInClinic()}
                    checkHealthCheckModal={checkHealthCheckModal}
                  />
                </TabsContent>

                <TabsContent value="upcoming" className="mt-0">
                  <Input
                    placeholder="Search by name..."
                    className="mb-4"
                    value={upcomingSearch}
                    onChange={(e) => setUpcomingSearch(e.target.value)}
                  />
                  <StaffAppointments
                    appointments={filteredUpcoming()}
                    checkHealthCheckModal={checkHealthCheckModal}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <AddAppointmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          setOpenAddPatientModal={setOpenAddPatientModal}
          addedPatient={addedPatient}
          setOpenHealthCheckModal={setOpenHealthCheckModal}
        />

        <AddPatientModal
          isOpen={openAddPatientModal}
          onClose={() => setOpenAddPatientModal(false)}
          handleAddPatient={handleAddPatient}
        />

        <AddHealthCheckModal
          isOpen={openHealthCheckModal}
          onClose={() => setOpenHealthCheckModal(false)}
          submitFunction={submitFunction}
        />
      </div>
    </MainLayout>
  );
}
