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
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { AddPatientModal } from "@/components/modals/add-patient-modal"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import Link from "next/link"

const patients = [
  {
    id: "P-1001",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "May 15, 1985",
    lastVisit: "Apr 23, 2023",
    status: "Active",
  },
  {
    id: "P-1002",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 234-5678",
    dateOfBirth: "Jan 28, 1976",
    lastVisit: "Apr 24, 2023",
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "(555) 345-6789",
    dateOfBirth: "Nov 12, 1990",
    lastVisit: "Apr 25, 2023",
    status: "Inactive",
  },
  {
    id: "P-1004",
    name: "William Taylor",
    email: "william.t@example.com",
    phone: "(555) 456-7890",
    dateOfBirth: "Mar 3, 1982",
    lastVisit: "Apr 26, 2023",
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    phone: "(555) 567-8901",
    dateOfBirth: "Jul 22, 1995",
    lastVisit: "Apr 27, 2023",
    status: "Active",
  },
  {
    id: "P-1006",
    name: "Benjamin Davis",
    email: "benjamin.d@example.com",
    phone: "(555) 678-9012",
    dateOfBirth: "Sep 8, 1970",
    lastVisit: "Apr 28, 2023",
    status: "Active",
  },
  {
    id: "P-1007",
    name: "Mia Garcia",
    email: "mia.g@example.com",
    phone: "(555) 789-0123",
    dateOfBirth: "Feb 17, 1988",
    lastVisit: "Apr 29, 2023",
    status: "Inactive",
  },
  {
    id: "P-1008",
    name: "Ethan Rodriguez",
    email: "ethan.r@example.com",
    phone: "(555) 890-1234",
    dateOfBirth: "Dec 5, 1992",
    lastVisit: "Apr 30, 2023",
    status: "Active",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Filter patients based on search term and status filter
  const filteredPatients = patients.filter((patient) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    // Status filter
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <MainLayout title="Patients">
      <div className="flex flex-col gap-6">
        {/* Mobile patient cards - visible only on mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="ml-2" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "Active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("Active")}
              className="rounded-full"
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "Inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("Inactive")}
              className="rounded-full"
            >
              Inactive
            </Button>
          </div>

          <div className="space-y-3">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No patients found matching your filters.</div>
            ) : (
              filteredPatients.map((patient) => (
                <Link href={`/patients/${patient.id}`} key={patient.id}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={`/abstract-geometric-shapes.png?height=48&width=48&query=${patient.name}`}
                            alt={patient.name}
                          />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{patient.name}</h3>
                            <Badge variant={patient.status === "Active" ? "default" : "secondary"} className="ml-2">
                              {patient.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">{patient.id}</div>
                          <div className="text-xs mt-1">{patient.phone}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 divide-x border-t">
                        <div className="p-2 text-center">
                          <div className="text-xs text-muted-foreground">Last Visit</div>
                          <div className="text-sm font-medium">{patient.lastVisit}</div>
                        </div>
                        <div className="p-2 text-center">
                          <div className="text-xs text-muted-foreground">Date of Birth</div>
                          <div className="text-sm font-medium">{patient.dateOfBirth}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Desktop table - hidden on mobile */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center pb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {statusFilter === "all"
                        ? "All Patients"
                        : statusFilter === "Active"
                          ? "Active Patients"
                          : "Inactive Patients"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Patients</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active Patients</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive Patients</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Patient
                </Button>
              </div>

              <ResponsiveTable>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No patients found matching your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={`/abstract-geometric-shapes.png?height=36&width=36&query=${patient.name}`}
                                  alt={patient.name}
                                />
                                <AvatarFallback>
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-xs text-muted-foreground">{patient.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{patient.email}</div>
                              <div className="text-xs text-muted-foreground">{patient.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{patient.dateOfBirth}</TableCell>
                          <TableCell>{patient.lastVisit}</TableCell>
                          <TableCell>
                            <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                              {patient.status}
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
                                <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                                <DropdownMenuItem>Medical Records</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ResponsiveTable>
            </CardContent>
          </Card>
        </div>
      </div>
      <AddPatientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MainLayout>
  )
}
