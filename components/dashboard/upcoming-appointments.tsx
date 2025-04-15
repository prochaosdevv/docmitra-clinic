import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const appointments = [
  {
    id: "A-1001",
    patientName: "Emma Johnson",
    patientId: "P-1001",
    doctorName: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "Today",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "A-1002",
    patientName: "James Wilson",
    patientId: "P-1002",
    doctorName: "Dr. Sarah Lee",
    specialty: "Dermatology",
    date: "Today",
    time: "11:30 AM",
    status: "Confirmed",
  },
  {
    id: "A-1003",
    patientName: "Sophia Martinez",
    patientId: "P-1003",
    doctorName: "Dr. Robert Johnson",
    specialty: "Neurology",
    date: "Today",
    time: "2:15 PM",
    status: "Pending",
  },
  {
    id: "A-1004",
    patientName: "William Taylor",
    patientId: "P-1004",
    doctorName: "Dr. Emily Davis",
    specialty: "Pediatrics",
    date: "Tomorrow",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: "A-1005",
    patientName: "Olivia Brown",
    patientId: "P-1005",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    date: "Tomorrow",
    time: "3:30 PM",
    status: "Confirmed",
  },
]

export function UpcomingAppointments() {
  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-start justify-between rounded-lg border p-3">
          <div className="flex items-start gap-2 min-w-0 max-w-[65%]">
            <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=36&width=36&query=${appointment.patientName}`}
                alt={appointment.patientName}
              />
              <AvatarFallback>
                {appointment.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-medium truncate">{appointment.patientName}</div>
              <div className="text-xs text-muted-foreground truncate">{appointment.patientId}</div>
              <div className="mt-1 text-xs text-muted-foreground truncate">{appointment.doctorName}</div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <div className="text-xs whitespace-nowrap">
                {appointment.date}, {appointment.time}
              </div>
              <Badge
                variant={appointment.status === "Confirmed" ? "default" : "secondary"}
                className="text-xs px-1.5 py-0"
              >
                {appointment.status}
              </Badge>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{appointment.specialty}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
