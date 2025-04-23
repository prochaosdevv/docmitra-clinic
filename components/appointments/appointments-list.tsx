"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Mock appointment data with Indian names in English
const appointments = [
  {
    id: "A-1001",
    patientName: "Amit Sharma",
    patientId: "P-1001",
    doctorName: "Dr. Aditya Kapoor",
    specialty: "Cardiology",
    date: "May 15, 2023",
    time: "10:00 AM",
    status: "Completed",
    isToday: false,
  },
  {
    id: "A-1002",
    patientName: "Priya Patel",
    patientId: "P-1002",
    doctorName: "Dr. Sanjana Desai",
    specialty: "Dermatology",
    date: "May 15, 2023",
    time: "11:30 AM",
    status: "Completed",
    isToday: false,
  },
  {
    id: "A-1003",
    patientName: "Rahul Verma",
    patientId: "P-1003",
    doctorName: "Dr. Vikram Mehta",
    specialty: "Neurology",
    date: "May 15, 2023",
    time: "2:15 PM",
    status: "Cancelled",
    isToday: false,
  },
  {
    id: "A-1004",
    patientName: "Neha Gupta",
    patientId: "P-1004",
    doctorName: "Dr. Anjali Sharma",
    specialty: "Pediatrics",
    date: "Today",
    time: "9:00 AM",
    status: "Confirmed",
    isToday: true,
  },
  {
    id: "A-1005",
    patientName: "Vikas Mehta",
    patientId: "P-1005",
    doctorName: "Dr. Rajesh Khanna",
    specialty: "Orthopedics",
    date: "Today",
    time: "3:30 PM",
    status: "Confirmed",
    isToday: true,
  },
  {
    id: "A-1006",
    patientName: "Anushka Singh",
    patientId: "P-1006",
    doctorName: "Dr. Preeti Verma",
    specialty: "Ophthalmology",
    date: "May 17, 2023",
    time: "10:45 AM",
    status: "Pending",
    isToday: false,
  },
  {
    id: "A-1007",
    patientName: "Sanjay Agarwal",
    patientId: "P-1007",
    doctorName: "Dr. Amit Gupta",
    specialty: "Dentistry",
    date: "May 17, 2023",
    time: "1:00 PM",
    status: "Confirmed",
    isToday: false,
  },
  {
    id: "A-1008",
    patientName: "Deepika Chaudhary",
    patientId: "P-1008",
    doctorName: "Dr. Sunil Sharma",
    specialty: "General Medicine",
    date: "May 18, 2023",
    time: "11:15 AM",
    status: "Confirmed",
    isToday: false,
  },
]

interface AppointmentsListProps {
  filter: "all" | "upcoming" | "today" | "past"
}

export function AppointmentsList({ filter }: AppointmentsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter appointments based on search term and filter type
  const filteredAppointments = appointments.filter((appointment) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Tab filter
    const matchesFilter =
      filter === "all" ||
      (filter === "upcoming" &&
        (appointment.status === "Confirmed" || appointment.status === "Pending") &&
        !appointment.isToday) ||
      (filter === "today" && appointment.isToday) ||
      (filter === "past" && appointment.status === "Completed")

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search appointments..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No appointments found matching your criteria.</div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <Link href={`/appointments/${appointment.id}`} key={appointment.id} className="block">
              <div className="rounded-lg border overflow-hidden">
                <div className="flex items-center p-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=${appointment.patientName}`}
                      alt={appointment.patientName}
                    />
                    <AvatarFallback>
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{appointment.patientName}</h3>
                      <Badge
                        variant={
                          appointment.status === "Confirmed"
                            ? "confirmed"
                            : appointment.status === "Completed"
                              ? "success"
                              : appointment.status === "Cancelled"
                                ? "destructive"
                                : "secondary"
                        }
                        className="ml-2"
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{appointment.doctorName}</div>
                    <div className="text-xs text-muted-foreground">{appointment.specialty}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-2 text-center">
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="text-sm font-medium">{appointment.date}</div>
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-xs text-muted-foreground">Time</div>
                    <div className="text-sm font-medium">{appointment.time}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
