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
import { AddStaffModal } from "@/components/modals/add-staff-modal"
import { ResponsiveTable } from "@/components/ui/responsive-table"

const staff = [
  {
    id: "S-1006",
    name: "Nurse Lisa Wang",
    role: "Head Nurse",
    email: "lisa.wang@mediclinic.com",
    phone: "(555) 678-9012",
    joinDate: "Apr 15, 2019",
    status: "Active",
  },
  {
    id: "S-1007",
    name: "Nurse David Kim",
    role: "Registered Nurse",
    email: "david.kim@mediclinic.com",
    phone: "(555) 789-0123",
    joinDate: "Jul 8, 2021",
    status: "Active",
  },
  {
    id: "S-1008",
    name: "Jennifer Smith",
    role: "Receptionist",
    email: "jennifer.smith@mediclinic.com",
    phone: "(555) 890-1234",
    joinDate: "Oct 30, 2022",
    status: "Active",
  },
  {
    id: "S-1009",
    name: "Mark Thompson",
    role: "Lab Technician",
    email: "mark.thompson@mediclinic.com",
    phone: "(555) 901-2345",
    joinDate: "May 17, 2020",
    status: "Inactive",
  },
  {
    id: "S-1010",
    name: "Amanda Garcia",
    role: "Pharmacist",
    email: "amanda.garcia@mediclinic.com",
    phone: "(555) 012-3456",
    joinDate: "Nov 3, 2019",
    status: "Active",
  },
  {
    id: "S-1011",
    name: "Carlos Rodriguez",
    role: "Medical Assistant",
    email: "carlos.r@mediclinic.com",
    phone: "(555) 123-4567",
    joinDate: "Jun 12, 2020",
    status: "Active",
  },
  {
    id: "S-1012",
    name: "Sophia Chen",
    role: "Administrative Assistant",
    email: "sophia.c@mediclinic.com",
    phone: "(555) 234-5678",
    joinDate: "Aug 5, 2021",
    status: "Active",
  },
  {
    id: "S-1013",
    name: "Daniel Jackson",
    role: "IT Specialist",
    email: "daniel.j@mediclinic.com",
    phone: "(555) 345-6789",
    joinDate: "Jan 15, 2022",
    status: "Active",
  },
  {
    id: "S-1014",
    name: "Olivia Martinez",
    role: "Billing Specialist",
    email: "olivia.m@mediclinic.com",
    phone: "(555) 456-7890",
    joinDate: "Mar 22, 2020",
    status: "Active",
  },
  {
    id: "S-1015",
    name: "Nathan Wilson",
    role: "Security Officer",
    email: "nathan.w@mediclinic.com",
    phone: "(555) 567-8901",
    joinDate: "Sep 8, 2021",
    status: "On Leave",
  },
]

// Map roles to categories for filtering
const roleCategories = {
  "Head Nurse": "nurse",
  "Registered Nurse": "nurse",
  Receptionist: "admin",
  "Administrative Assistant": "admin",
  "Billing Specialist": "admin",
  "Lab Technician": "technical",
  "IT Specialist": "technical",
  Pharmacist: "other",
  "Medical Assistant": "other",
  "Security Officer": "other",
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Filter staff based on search term and filters
  const filteredStaff = staff.filter((member) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())

    // Role filter
    const matchesRole =
      roleFilter === "all" || roleCategories[member.role as keyof typeof roleCategories] === roleFilter

    // Status filter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>Manage clinic support staff and administrative personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="nurse">Nurses</SelectItem>
                    <SelectItem value="admin">Administrative</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="other">Other Staff</SelectItem>
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
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No staff members found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStaff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=36&width=36&query=${member.name}`}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{member.email}</div>
                            <div className="text-xs text-muted-foreground">{member.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              member.status === "Active"
                                ? "default"
                                : member.status === "On Leave"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {member.status}
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
                              <DropdownMenuItem>Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Performance</DropdownMenuItem>
                              {member.status === "Active" ? (
                                <DropdownMenuItem>Set On Leave</DropdownMenuItem>
                              ) : member.status === "On Leave" ? (
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
      <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MainLayout>
  )
}
