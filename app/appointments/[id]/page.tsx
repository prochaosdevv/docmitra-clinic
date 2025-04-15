"use client"

import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, FileText, MapPin, MessageSquare, Phone, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock appointment data
const APPOINTMENTS = [
  {
    id: "A-1001",
    patientName: "Emma Johnson",
    patientId: "P-1001",
    patientAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Emma Johnson",
    patientEmail: "emma.j@example.com",
    patientPhone: "(555) 123-4567",
    doctorName: "Dr. Michael Chen",
    doctorId: "D-1001",
    doctorAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Michael Chen",
    specialty: "Cardiology",
    date: "May 15, 2023",
    time: "10:00 AM",
    duration: "30 minutes",
    type: "Check-up",
    status: "Confirmed",
    location: "Main Clinic, Room 105",
    notes: "Follow-up on blood pressure medication. Patient to bring recent test results.",
  },
  {
    id: "A-1002",
    patientName: "James Wilson",
    patientId: "P-1002",
    patientAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=James Wilson",
    patientEmail: "james.w@example.com",
    patientPhone: "(555) 234-5678",
    doctorName: "Dr. Sarah Lee",
    doctorId: "D-1002",
    doctorAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Sarah Lee",
    specialty: "Dermatology",
    date: "May 15, 2023",
    time: "11:30 AM",
    duration: "45 minutes",
    type: "Consultation",
    status: "Confirmed",
    location: "Main Clinic, Room 203",
    notes: "Initial consultation for skin condition. Patient has reported persistent rash on arms.",
  },
  {
    id: "A-1003",
    patientName: "Sophia Martinez",
    patientId: "P-1003",
    patientAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Sophia Martinez",
    patientEmail: "sophia.m@example.com",
    patientPhone: "(555) 345-6789",
    doctorName: "Dr. Robert Johnson",
    doctorId: "D-1003",
    doctorAvatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Robert Johnson",
    specialty: "Neurology",
    date: "May 15, 2023",
    time: "2:15 PM",
    duration: "60 minutes",
    type: "Follow-up",
    status: "Cancelled",
    location: "Main Clinic, Room 302",
    notes: "Follow-up after MRI scan. Patient experiencing recurring headaches.",
  },
]

export default function AppointmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.id as string

  // Find the appointment by ID
  const appointment = APPOINTMENTS.find((app) => app.id === appointmentId)

  if (!appointment) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Appointment Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The appointment you're looking for doesn't exist or has been removed.
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
          <h1 className="text-3xl font-bold">Appointment Details</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Appointment #{appointment.id}</CardTitle>
                <CardDescription>Detailed information about this appointment</CardDescription>
              </div>
              <Badge
                variant={
                  appointment.status === "Confirmed"
                    ? "default"
                    : appointment.status === "Completed"
                      ? "success"
                      : appointment.status === "Cancelled"
                        ? "destructive"
                        : "secondary"
                }
                className="text-sm"
              >
                {appointment.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appointment Information</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Date:</span>
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time:</span>
                    <span>
                      {appointment.time} ({appointment.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Type:</span>
                    <span>{appointment.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notes</h3>
                <div className="rounded-md border p-3 text-sm">{appointment.notes}</div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Patient Information</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={appointment.patientAvatar || "/placeholder.svg"} alt={appointment.patientName} />
                    <AvatarFallback>
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm text-muted-foreground">{appointment.patientId}</div>
                    <div className="mt-2 flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{appointment.patientPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        <span>{appointment.patientEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => router.push(`/patients/${appointment.patientId}`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Patient Records
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Doctor Information</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={appointment.doctorAvatar || "/placeholder.svg"} alt={appointment.doctorName} />
                    <AvatarFallback>
                      {appointment.doctorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.doctorName}</div>
                    <div className="text-sm text-muted-foreground">{appointment.specialty}</div>
                    <div className="mt-2 flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{appointment.doctorId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => router.back()}>
              Back to Appointments
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Reschedule</Button>
              {appointment.status === "Confirmed" && <Button variant="destructive">Cancel Appointment</Button>}
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}
