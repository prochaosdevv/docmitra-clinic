"use client"

import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, Download, FileText, Phone, Printer, Stethoscope, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { VitalsChart } from "@/components/medical-records/vitals-chart"
import { useState } from "react"

// Mock patient data with Indian names
const PATIENTS = [
  {
    id: "P-1001",
    name: "Amit Sharma",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Amit Sharma",
    email: "amit.s@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "May 15, 1985",
    age: 38,
    gender: "Male",
    address: "123 Patel Road, Mumbai, MH 400001",
    bloodType: "A+",
    allergies: ["Penicillin", "Peanuts"],
    lastVisit: "Apr 23, 2023",
    status: "Active",
    appointments: [
      {
        id: "A-1001",
        date: "Apr 23, 2023",
        time: "10:00 AM",
        doctor: "Dr. Rajesh Patel",
        specialty: "Cardiology",
        type: "Check-up",
        status: "Completed",
      },
      {
        id: "A-1009",
        date: "Feb 15, 2023",
        time: "2:30 PM",
        doctor: "Dr. Rajesh Patel",
        specialty: "Cardiology",
        type: "Follow-up",
        status: "Completed",
      },
      {
        id: "A-1015",
        date: "May 30, 2023",
        time: "11:15 AM",
        doctor: "Dr. Rajesh Patel",
        specialty: "Cardiology",
        type: "Check-up",
        status: "Scheduled",
      },
    ],
    medicalRecords: [
      {
        id: "MR-1001",
        date: "Apr 23, 2023",
        type: "Consultation",
        doctor: "Dr. Rajesh Patel",
        diagnosis: "Hypertension (Primary)",
        notes: "Patient reports occasional headaches, dizziness, and fatigue. No chest pain or shortness of breath.",
      },
      {
        id: "MR-1002",
        date: "Apr 23, 2023",
        type: "Lab Results",
        doctor: "Dr. Rajesh Patel",
        diagnosis: "Elevated Cholesterol",
        notes:
          "Lipid panel shows slightly elevated LDL at 130 mg/dL. Recommended dietary changes and follow-up in 3 months.",
      },
      {
        id: "MR-1003",
        date: "Feb 15, 2023",
        type: "Prescription",
        doctor: "Dr. Rajesh Patel",
        diagnosis: "Hypertension",
        notes: "Prescribed Lisinopril 10mg daily. Patient to monitor blood pressure at home.",
      },
    ],
    medications: [
      {
        name: "Lisinopril",
        type: "ACE Inhibitor",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "Apr 23, 2023",
        status: "Active",
      },
      {
        name: "Aspirin",
        type: "Blood Thinner",
        dosage: "81mg",
        frequency: "Once daily",
        startDate: "Apr 23, 2023",
        status: "Active",
      },
      {
        name: "Atorvastatin",
        type: "Statin",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "Jan 10, 2023",
        status: "Discontinued",
      },
    ],
    vitals: {
      bloodPressure: "138/85 mmHg",
      heartRate: "76 bpm",
      weight: "75 kg",
      glucose: "95 mg/dL",
      bmi: "26.6",
      oxygenSaturation: "98%",
    },
  },
  {
    id: "P-1002",
    name: "Priya Patel",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 87654 32109",
    dateOfBirth: "Jan 28, 1976",
    age: 47,
    gender: "Female",
    address: "456 Gandhi Nagar, Delhi, DL 110001",
    bloodType: "O-",
    allergies: ["Sulfa drugs"],
    lastVisit: "Apr 24, 2023",
    status: "Active",
    appointments: [
      {
        id: "A-1002",
        date: "Apr 24, 2023",
        time: "11:30 AM",
        doctor: "Dr. Anjali Desai",
        specialty: "Dermatology",
        type: "Consultation",
        status: "Completed",
      },
    ],
    medicalRecords: [
      {
        id: "MR-2001",
        date: "Apr 24, 2023",
        type: "Consultation",
        doctor: "Dr. Anjali Desai",
        diagnosis: "Eczema",
        notes: "Patient presents with dry, itchy patches on arms and legs. Prescribed topical corticosteroid.",
      },
    ],
    medications: [
      {
        name: "Triamcinolone",
        type: "Corticosteroid",
        dosage: "0.1% cream",
        frequency: "Twice daily",
        startDate: "Apr 24, 2023",
        status: "Active",
      },
    ],
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      weight: "84 kg",
      glucose: "90 mg/dL",
      bmi: "26.5",
      oxygenSaturation: "99%",
    },
  },
]

export default function PatientRecordsPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  // Find the patient by ID
  const patient = PATIENTS.find((p) => p.id === patientId)

  // First, add a useState hook to track the selected appointment
  // Add this near the top of the component, after the patient is found
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null)

  // Find the selected appointment when an ID is set
  const selectedAppointment = selectedAppointmentId
    ? patient.appointments.find((app) => app.id === selectedAppointmentId)
    : null

  if (!patient) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Patient Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The patient record you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Patient Records</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Detailed patient profile and medical history</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{patient.name}</h3>
                  <div className="text-sm text-muted-foreground">Patient ID: {patient.id}</div>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="text-sm">DOB: {patient.dateOfBirth}</div>
                    <div className="text-sm">Age: {patient.age}</div>
                    <Badge>{patient.gender}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Blood Type: {patient.bloodType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex">
                <TabsTrigger value="summary" className="px-2 md:px-3">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="records" className="px-2 md:px-3">
                  Reports
                </TabsTrigger>
                <TabsTrigger value="appointments" className="px-2 md:px-3">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="medications" className="px-2 md:px-3">
                  Medications
                </TabsTrigger>
                <TabsTrigger value="vitals" className="px-2 md:px-3">
                  Vitals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium">Personal Information</h4>
                    <div className="mt-2 rounded-lg border p-3">
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Full Name:</span>
                          <span>{patient.name}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Date of Birth:</span>
                          <span>{patient.dateOfBirth}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Gender:</span>
                          <span>{patient.gender}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Email:</span>
                          <span>{patient.email}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Phone:</span>
                          <span>{patient.phone}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Address:</span>
                          <span>{patient.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium">Medical Information</h4>
                    <div className="mt-2 rounded-lg border p-3">
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Blood Type:</span>
                          <span>{patient.bloodType}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Allergies:</span>
                          <div className="flex flex-wrap gap-1">
                            {patient.allergies.map((allergy) => (
                              <Badge key={allergy} variant="outline">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Last Visit:</span>
                          <span>{patient.lastVisit}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="font-medium">Status:</span>
                          <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Recent Reports</h4>
                  <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Diagnosis</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.medicalRecords.slice(0, 3).map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.type}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>{record.diagnosis}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ResponsiveTable>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Upcoming Appointments</h4>
                  <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.appointments
                          .filter((app) => app.status === "Scheduled")
                          .map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>{appointment.date}</TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>{appointment.doctor}</TableCell>
                              <TableCell>{appointment.type}</TableCell>
                              <TableCell>
                                <Badge variant="default">{appointment.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        {patient.appointments.filter((app) => app.status === "Scheduled").length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              No upcoming appointments
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ResponsiveTable>
                </div>
              </TabsContent>

              <TabsContent value="records" className="pt-4">
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patient.medicalRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.id}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.type}</TableCell>
                          <TableCell>{record.doctor}</TableCell>
                          <TableCell>{record.diagnosis}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
                <div className="mt-4 rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">Clinical Notes</h4>
                  {patient.medicalRecords.length > 0 && (
                    <div className="text-sm">
                      <p className="mb-2">
                        <span className="font-medium">
                          {patient.medicalRecords[0].date} - {patient.medicalRecords[0].doctor}:
                        </span>{" "}
                        {patient.medicalRecords[0].notes}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="pt-4">
                {selectedAppointment ? (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Appointment Details</h3>
                      <Button variant="outline" size="sm" onClick={() => setSelectedAppointmentId(null)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Appointment #{selectedAppointment.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedAppointment.date} at {selectedAppointment.time}
                            </p>
                          </div>
                          <Badge
                            variant={
                              selectedAppointment.status === "Completed"
                                ? "success"
                                : selectedAppointment.status === "Scheduled"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {selectedAppointment.status}
                          </Badge>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Appointment Information</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Date:</span>
                                <span>{selectedAppointment.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Time:</span>
                                <span>{selectedAppointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Type:</span>
                                <span>{selectedAppointment.type}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-2">Doctor Information</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Doctor:</span>
                                <span>{selectedAppointment.doctor}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Specialty:</span>
                                <span>{selectedAppointment.specialty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Appointment ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.id}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.type}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  appointment.status === "Completed"
                                    ? "success"
                                    : appointment.status === "Scheduled"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAppointmentId(appointment.id)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ResponsiveTable>
                )}
              </TabsContent>

              <TabsContent value="medications" className="pt-4">
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patient.medications.map((medication, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{medication.name}</div>
                            <div className="text-xs text-muted-foreground">{medication.type}</div>
                          </TableCell>
                          <TableCell>{medication.dosage}</TableCell>
                          <TableCell>{medication.frequency}</TableCell>
                          <TableCell>{medication.startDate}</TableCell>
                          <TableCell>
                            <Badge variant={medication.status === "Active" ? "success" : "destructive"}>
                              {medication.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4 pt-4">
                {/* Replace the grid of vitals with the VitalsChart component */}
                <VitalsChart currentVitals={patient.vitals} />

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Current Vitals</h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Blood Pressure</div>
                      <div className="text-lg font-medium">{patient.vitals.bloodPressure}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Heart Rate</div>
                      <div className="text-lg font-medium">{patient.vitals.heartRate}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Weight</div>
                      <div className="text-lg font-medium">{patient.vitals.weight}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Glucose</div>
                      <div className="text-lg font-medium">{patient.vitals.glucose}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">BMI</div>
                      <div className="text-lg font-medium">{patient.vitals.bmi}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xs text-muted-foreground">Oxygen Saturation</div>
                      <div className="text-lg font-medium">{patient.vitals.oxygenSaturation}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
