"use client"

import { useState, useCallback } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddDoctorModal } from "@/components/modals/add-doctor-modal"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { useApi } from "@/hooks/use-api"
import { doctorService, type DoctorFilters } from "@/lib/api/doctors"
import { useToast } from "@/components/ui/use-toast"

export default function DoctorsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<DoctorFilters>({
    page: 1,
    limit: 10,
  })

  // Fetch doctors with filters
  const {
    data: doctorsResponse,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useApi(() => doctorService.getDoctors(filters), {
    deps: [filters],
    onError: (err) => {
      toast({
        title: "Error fetching doctors",
        description: err.message,
        variant: "destructive",
      })
    },
  })

  // Apply filters
  const applyFilters = useCallback(() => {
    const newFilters: DoctorFilters = {
      page: currentPage,
      limit: 10,
    }

    if (searchTerm) {
      newFilters.search = searchTerm
    }

    if (specialtyFilter !== "all") {
      newFilters.specialty = specialtyFilter
    }

    if (statusFilter !== "all") {
      newFilters.status = statusFilter
    }

    setFilters(newFilters)
  }, [searchTerm, specialtyFilter, statusFilter, currentPage])

  // Handle doctor deletion
  const handleDeleteDoctor = async (id: string) => {
    try {
      await doctorService.deleteDoctor(id)
      toast({
        title: "Doctor deleted",
        description: "The doctor has been successfully deleted.",
      })
      refetch()
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete doctor",
        variant: "destructive",
      })
    }
  }

  // Handle doctor status update
  const handleStatusUpdate = async (id: string, status: "Active" | "On Leave" | "Inactive") => {
    try {
      await doctorService.updateDoctor(id, { status })
      toast({
        title: "Status updated",
        description: `Doctor status has been updated to ${status}.`,
      })
      refetch()
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update status",
        variant: "destructive",
      })
    }
  }

  // Handle add doctor success
  const handleAddDoctorSuccess = () => {
    setIsAddModalOpen(false)
    refetch()
    toast({
      title: "Doctor added",
      description: "The doctor has been successfully added.",
    })
  }

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
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                  value={specialtyFilter}
                  onValueChange={(value) => {
                    setSpecialtyFilter(value)
                    setCurrentPage(1)
                    setTimeout(applyFilters, 0)
                  }}
                >
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
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1)
                    setTimeout(applyFilters, 0)
                  }}
                >
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
                <Button variant="outline" onClick={applyFilters} disabled={isLoading || isRefetching}>
                  {isLoading || isRefetching ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Filter
                </Button>
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
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span>Loading doctors...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-red-500">
                        Error loading doctors: {error.message}
                      </TableCell>
                    </TableRow>
                  ) : doctorsResponse?.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No doctors found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    doctorsResponse?.data.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={
                                  doctor.avatar ||
                                  `/abstract-geometric-shapes.png?height=36&width=36&query=${doctor.name}`
                                }
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
                              <DropdownMenuItem onClick={() => (window.location.href = `/doctors/${doctor.id}`)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => (window.location.href = `/doctors/${doctor.id}/edit`)}>
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => (window.location.href = `/doctors/${doctor.id}/schedule`)}
                              >
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => (window.location.href = `/doctors/${doctor.id}/patients`)}
                              >
                                Patient List
                              </DropdownMenuItem>
                              {doctor.status === "Active" ? (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(doctor.id, "On Leave")}>
                                  Set On Leave
                                </DropdownMenuItem>
                              ) : doctor.status === "On Leave" ? (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(doctor.id, "Active")}>
                                  Set Active
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleStatusUpdate(doctor.id, "Active")}>
                                  Reactivate
                                </DropdownMenuItem>
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

            {doctorsResponse && doctorsResponse.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(doctorsResponse.page - 1) * doctorsResponse.limit + 1} to{" "}
                  {Math.min(doctorsResponse.page * doctorsResponse.limit, doctorsResponse.total)} of{" "}
                  {doctorsResponse.total} doctors
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                      setTimeout(applyFilters, 0)
                    }}
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {doctorsResponse.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, doctorsResponse.totalPages))
                      setTimeout(applyFilters, 0)
                    }}
                    disabled={currentPage === doctorsResponse.totalPages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddDoctorSuccess}
      />
    </MainLayout>
  )
}
