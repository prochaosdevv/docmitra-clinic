"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddDoctorModal } from "@/components/modals/add-doctor-modal"
import { ResponsiveTable } from "@/components/ui/responsive-table"

const doctors = [
  {
    id: "D-1001",
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiology",
    email: "rajesh.sharma@mediclinic.com",
    phone: "(555) 123-4567",
    joinDate: "Jan 15, 2018",
    patients: 124,
    status: "Active",
  },
  {
    id: "D-1002",
    name: "Dr. Priya Patel",
    specialty: "Dermatology",
    email: "priya.patel@mediclinic.com",
    phone: "(555) 234-5678",
    joinDate: "Mar 10, 2019",
    patients: 98,
    status: "Active",
  },
  {
    id: "D-1003",
    name: "Dr. Vikram Singh",
    specialty: "Neurology",
    email: "vikram.singh@mediclinic.com",
    phone: "(555) 345-6789",
    joinDate: "Jun 5, 2017",
    patients: 87,
    status: "On Leave",
  },
  {
    id: "D-1004",
    name: "Dr. Anjali Desai",
    specialty: "Pediatrics",
    email: "anjali.desai@mediclinic.com",
    phone: "(555) 456-7890",
    joinDate: "Sep 20, 2020",
    patients: 156,
    status: "Active",
  },
  {
    id: "D-1005",
    name: "Dr. Arjun Kapoor",
    specialty: "Orthopedic Surgery",
    email: "arjun.kapoor@mediclinic.com",
    phone: "(555) 567-8901",
    joinDate: "Feb 12, 2016",
    patients: 112,
    status: "Active",
  },
  {
    id: "D-1006",
    name: "Dr. Meera Reddy",
    specialty: "Obstetrics & Gynecology",
    email: "meera.r@mediclinic.com",
    phone: "(555) 678-9012",
    joinDate: "Jul 8, 2019",
    patients: 143,
    status: "Active",
  },
  {
    id: "D-1007",
    name: "Dr. Sanjay Kumar",
    specialty: "Psychiatry",
    email: "sanjay.kumar@mediclinic.com",
    phone: "(555) 789-0123",
    joinDate: "Apr 15, 2018",
    patients: 76,
    status: "Active",
  },
  {
    id: "D-1008",
    name: "Dr. Neha Gupta",
    specialty: "General Medicine",
    email: "neha.g@mediclinic.com",
    phone: "(555) 890-1234",
    joinDate: "Oct 30, 2017",
    patients: 189,
    status: "Active",
  },
  {
    id: "D-1009",
    name: "Dr. Rahul Verma",
    specialty: "Ophthalmology",
    email: "rahul.v@mediclinic.com",
    phone: "(555) 901-2345",
    joinDate: "May 17, 2020",
    patients: 92,
    status: "Inactive",
  },
  {
    id: "D-1010",
    name: "Dr. Kavita Malhotra",
    specialty: "Endocrinology",
    email: "kavita.m@mediclinic.com",
    phone: "(555) 012-3456",
    joinDate: "Nov 3, 2019",
    patients: 68,
    status: "Active",
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Filter doctors based on search term and filters
  const filteredDoctors = doctors.filter((doctor) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    // Specialty filter
    const matchesSpecialty =
      specialtyFilter === "all" || doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || doctor.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Doctors</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Doctors Directory</CardTitle>
            <CardDescription>Manage healthcare professionals and specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search doctors..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="obstetrics">Obstetrics & Gynecology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                    <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ResponsiveTable>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDoctors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No doctors found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=36&width=36&query=${doctor.name}`}
                                alt={doctor.name}
                              />
                              <AvatarFallback>
                                {doctor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-xs text-muted-foreground">{doctor.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{doctor.email}</div>
                            <div className="text-xs text-muted-foreground">{doctor.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doctor.status === "Active"
                                ? "default"
                                : doctor.status === "On Leave"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {doctor.status}
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
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Patient List</DropdownMenuItem>
                              {doctor.status === "Active" ? (
                                <DropdownMenuItem>Set On Leave</DropdownMenuItem>
                              ) : doctor.status === "On Leave" ? (
                                <DropdownMenuItem>Set Active</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>Reactivate</DropdownMenuItem>
                              )}
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
      <AddDoctorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MainLayout>
  )
}
