"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import { ResponsiveTable } from "@/components/ui/responsive-table"

// Mock data for doctor appointments
const APPOINTMENTS = [
  {
    id: "A-1001",
    patientName: "John Doe",
    patientId: "P-2001",
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
    <ResponsiveTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctorAppointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No upcoming appointments found.
              </TableCell>
            </TableRow>
          ) : (
            doctorAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patientName} />
                      <AvatarFallback>
                        {appointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-xs text-muted-foreground">{appointment.patientId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{appointment.date}</div>
                  <div className="text-xs text-muted-foreground">{appointment.time}</div>
                </TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "Upcoming"
                        ? "default"
                        : appointment.status === "Scheduled"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => router.push(`/appointments/${appointment.id}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  )
}
