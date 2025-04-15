"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MoreHorizontal, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddAppointmentModal } from "@/components/modals/add-appointment-modal"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Fab } from "@/components/ui/fab"
import Link from "next/link"

const appointments = [
  {
    id: "A-1001",
    patientName: "Emma Johnson",
    patientId: "P-1001",
    doctorName: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "May 15, 2023",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: "A-1002",
    patientName: "James Wilson",
    patientId: "P-1002",
    doctorName: "Dr. Sarah Lee",
    specialty: "Dermatology",
    date: "May 15, 2023",
    time: "11:30 AM",
    status: "Completed",
  },
  {
    id: "A-1003",
    patientName: "Sophia Martinez",
    patientId: "P-1003",
    doctorName: "Dr. Robert Johnson",
    specialty: "Neurology",
    date: "May 15, 2023",
    time: "2:15 PM",
    status: "Cancelled",
  },
  {
    id: "A-1004",
    patientName: "William Taylor",
    patientId: "P-1004",
    doctorName: "Dr. Emily Davis",
    specialty: "Pediatrics",
    date: "May 16, 2023",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: "A-1005",
    patientName: "Olivia Brown",
    patientId: "P-1005",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    date: "May 16, 2023",
    time: "3:30 PM",
    status: "Confirmed",
  },
  {
    id: "A-1006",
    patientName: "Benjamin Davis",
    patientId: "P-1006",
    doctorName: "Dr. Lisa Wang",
    specialty: "Ophthalmology",
    date: "May 17, 2023",
    time: "10:45 AM",
    status: "Pending",
  },
  {
    id: "A-1007",
    patientName: "Mia Garcia",
    patientId: "P-1007",
    doctorName: "Dr. David Kim",
    specialty: "Dentistry",
    date: "May 17, 2023",
    time: "1:00 PM",
    status: "Confirmed",
  },
  {
    id: "A-1008",
    patientName: "Ethan Rodriguez",
    patientId: "P-1008",
    doctorName: "Dr. Jennifer Smith",
    specialty: "General Medicine",
    date: "May 18, 2023",
    time: "11:15 AM",
    status: "Confirmed",
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Filter appointments based on search term and active tab
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
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && (appointment.status === "Confirmed" || appointment.status === "Pending")) ||
      (activeTab === "completed" && appointment.status === "Completed") ||
      (activeTab === "cancelled" && appointment.status === "Cancelled")

    return matchesSearch && matchesTab
  })

  return (
    <MainLayout title="Appointments">
      <div className="flex flex-col gap-6">
        {/* Mobile appointment cards - visible only on mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search appointments..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-1">
                Cancelled
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No appointments found matching your search.
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <Link href={`/appointments/${appointment.id}`} key={appointment.id}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
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
                                      ? "default"
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
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="m-0">
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming appointments found matching your search.
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <Link href={`/appointments/${appointment.id}`} key={appointment.id}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
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
                                  variant={appointment.status === "Confirmed" ? "default" : "secondary"}
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
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="m-0">
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed appointments found matching your search.
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <Link href={`/appointments/${appointment.id}`} key={appointment.id}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
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
                                <Badge variant="success" className="ml-2">
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
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="cancelled" className="m-0">
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No cancelled appointments found matching your search.
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <Link href={`/appointments/${appointment.id}`} key={appointment.id}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
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
                                <Badge variant="destructive" className="ml-2">
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
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop table - hidden on mobile */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
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
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar View
                    </Button>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </div>
                </div>

                <TabsContent value="all" className="m-0">
                  <ResponsiveTable>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              No appointments found matching your search.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
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
                                  <div>
                                    <div className="font-medium">{appointment.patientName}</div>
                                    <div className="text-xs text-muted-foreground">{appointment.patientId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{appointment.doctorName}</div>
                                <div className="text-xs text-muted-foreground">{appointment.specialty}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
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
                                >
                                  {appointment.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                    <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                                    <DropdownMenuItem>Patient Records</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ResponsiveTable>
                </TabsContent>

                {/* Similar TabsContent for other tabs (upcoming, completed, cancelled) */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button - visible only on mobile */}
      <Fab icon={<Plus className="h-6 w-6" />} label="Add Appointment" onClick={() => setIsAddModalOpen(true)} />

      <AddAppointmentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MainLayout>
  )
}
