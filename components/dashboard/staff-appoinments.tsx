"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Clock } from "lucide-react";

// Update the APPOINTMENTS mock data with Indian names in English

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientAge: number;
  avatar: string;
  date: string;
  time: string;
  type: string;
  status: string;
  doctorId: string;
}

export function StaffAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {appointments.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No upcoming appointments found.
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-lg border p-2 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/appointments/${appointment.id}`)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={appointment.avatar || "/placeholder.svg"}
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
                <div className="font-medium text-sm truncate">
                  {appointment.patientName}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{appointment.patientId}</span>
                  <span>•</span>
                  <span>Age: {appointment.patientAge}</span>
                </div>
              </div>
              <Badge
                variant={
                  appointment.status === "Upcoming"
                    ? "confirmed"
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
  );
}
