"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Clock } from "lucide-react"

// Update the APPOINTMENTS mock data to include patient age
const APPOINTMENTS = [
  {
    id: "A-1001",
    patientName: "John Doe",
    patientId: "P-2001",
    patientAge: 45,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=John Doe",
    date: "Today",
    time: "10:00 AM",
    type: "Check-up",
    status: "Upcoming",
    doctorId: "D-1001",
  },
  {
    id: "A-1002",
    patientName: "Jane Smith",
    patientId: "P-2002",
    patientAge: 32,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Jane Smith",
    date: "Today",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Upcoming",
    doctorId: "D-1001",
  },
  {
    id: "A-1003",
    patientName: "Robert Brown",
    patientId: "P-2003",
    patientAge: 28,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Robert Brown",
    date: "Today",
    time: "2:15 PM",
    type: "Consultation",
    status: "Upcoming",
    doctorId: "D-1001",
  },
  {
    id: "A-1004",
    patientName: "Emily Johnson",
    patientId: "P-2004",
    patientAge: 52,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Emily Johnson",
    date: "Tomorrow",
    time: "9:00 AM",
    type: "Check-up",
    status: "Scheduled",
    doctorId: "D-1001",
  },
  {
    id: "A-1005",
    patientName: "Michael Wilson",
    patientId: "P-2005",
    patientAge: 41,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Michael Wilson",
    date: "Tomorrow",
    time: "3:30 PM",
    type: "Follow-up",
    status: "Scheduled",
    doctorId: "D-1001",
  },
  {
    id: "A-1006",
    patientName: "Sarah Davis",
    patientId: "P-2006",
    patientAge: 36,
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Sarah Davis",
    date: "May 20, 2023",
    time: "10:45 AM",
    type: "Consultation",
    status: "Scheduled",
    doctorId: "D-1002",
  },
]

interface DoctorAppointmentsProps {
  doctorId: string
}

export function DoctorAppointments({ doctorId }: DoctorAppointmentsProps) {
  const router = useRouter()

  // Filter appointments for this doctor
  const doctorAppointments = APPOINTMENTS.filter((app) => app.doctorId === doctorId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {doctorAppointments.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">No upcoming appointments found.</div>
      ) : (
        doctorAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-lg border p-2 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/appointments/${appointment.id}`)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patientName} />
                <AvatarFallback>
                  {appointment.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{appointment.patientName}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{appointment.patientId}</span>
                  <span>•</span>
                  <span>Age: {appointment.patientAge}</span>
                </div>
              </div>
              <Badge
                variant={
                  appointment.status === "Upcoming"
                    ? "default"
                    : appointment.status === "Scheduled"
                      ? "outline"
                      : "secondary"
                }
                className="ml-auto text-xs py-0 h-5"
              >
                {appointment.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-1 text-xs">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                <span>{appointment.type}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
