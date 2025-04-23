import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const appointments = [
  {
    id: "A-1001",
    patientName: "Ravi Sharma",
    patientId: "P-1001",
    doctorName: "Dr. Anand Desai",
    specialty: "Cardiology",
    date: "Today",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "A-1002",
    patientName: "Sunita Patel",
    patientId: "P-1002",
    doctorName: "Dr. Meera Reddy",
    specialty: "Dermatology",
    date: "Today",
    time: "11:30 AM",
    status: "Confirmed",
  },
  {
    id: "A-1003",
    patientName: "Mohan Verma",
    patientId: "P-1003",
    doctorName: "Dr. Vikram Singh",
    specialty: "Neurology",
    date: "Today",
    time: "2:15 PM",
    status: "Pending",
  },
  {
    id: "A-1004",
    patientName: "Deepa Gupta",
    patientId: "P-1004",
    doctorName: "Dr. Priya Joshi",
    specialty: "Pediatrics",
    date: "Tomorrow",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: "A-1005",
    patientName: "Suresh Mehta",
    patientId: "P-1005",
    doctorName: "Dr. Rajesh Kumar",
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
                variant={appointment.status === "Confirmed" ? "confirmed" : "secondary"}
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
