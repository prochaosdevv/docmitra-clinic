"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { appointmentService } from "@/lib/api/appointments"
import { useToast } from "@/components/ui/use-toast"

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true)
        const response = await appointmentService.getUpcomingAppointments(5)
        setAppointments(response.data)
        setError(null)
      } catch (err) {
        setError(err.message || "Failed to load upcoming appointments")
        toast({
          title: "Error",
          description: "Failed to load upcoming appointments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading appointments...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  if (appointments.length === 0) {
    return <div className="text-center text-muted-foreground p-4">No upcoming appointments found.</div>
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-start justify-between rounded-lg border p-3">
          <div className="flex items-start gap-2 min-w-0 max-w-[65%]">
            <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
              <AvatarImage
                src={
                  appointment.patientAvatar ||
                  `/abstract-geometric-shapes.png?height=36&width=36&query=${appointment.patientName}`
                }
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
