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
import { Calendar, MoreHorizontal, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientRecordDetails } from "@/components/medical-records/patient-record-details"
import { AddMedicalRecordModal } from "@/components/modals/add-medical-record-modal"
// Import the ResponsiveTable component
import { ResponsiveTable } from "@/components/ui/responsive-table"

const medicalRecords = [
  {
    id: "MR-1001",
    patientName: "Emma Johnson",
    patientId: "P-1001",
    dateOfBirth: "May 15, 1985",
    lastUpdated: "Apr 23, 2023",
    recordType: "Consultation",
    doctor: "Dr. Michael Chen",
    status: "Complete",
  },
  {
    id: "MR-1002",
    patientName: "James Wilson",
    patientId: "P-1002",
    dateOfBirth: "Jan 28, 1976",
    lastUpdated: "Apr 24, 2023",
    recordType: "Lab Results",
    doctor: "Dr. Sarah Lee",
    status: "Pending",
  },
  {
    id: "MR-1003",
    patientName: "Sophia Martinez",
    patientId: "P-1003",
    dateOfBirth: "Nov 12, 1990",
    lastUpdated: "Apr 25, 2023",
    recordType: "Prescription",
    doctor: "Dr. Robert Johnson",
    status: "Complete",
  },
  {
    id: "MR-1004",
    patientName: "William Taylor",
    patientId: "P-1004",
    dateOfBirth: "Mar 3, 1982",
    lastUpdated: "Apr 26, 2023",
    recordType: "Surgery",
    doctor: "Dr. James Wilson",
    status: "Complete",
  },
  {
    id: "MR-1005",
    patientName: "Olivia Brown",
    patientId: "P-1005",
    dateOfBirth: "Jul 22, 1995",
    lastUpdated: "Apr 27, 2023",
    recordType: "Consultation",
    doctor: "Dr. Emily Davis",
    status: "Complete",
  },
  {
    id: "MR-1006",
    patientName: "Benjamin Davis",
    patientId: "P-1006",
    dateOfBirth: "Sep 8, 1970",
    lastUpdated: "Apr 28, 2023",
    recordType: "Imaging",
    doctor: "Dr. Lisa Wang",
    status: "Pending",
  },
  {
    id: "MR-1007",
    patientName: "Mia Garcia",
    patientId: "P-1007",
    dateOfBirth: "Feb 17, 1988",
    lastUpdated: "Apr 29, 2023",
    recordType: "Prescription",
    doctor: "Dr. David Kim",
    status: "Complete",
  },
  {
    id: "MR-1008",
    patientName: "Ethan Rodriguez",
    patientId: "P-1008",
    dateOfBirth: "Dec 5, 1992",
    lastUpdated: "Apr 30, 2023",
    recordType: "Consultation",
    doctor: "Dr. Jennifer Smith",
    status: "Complete",
  },
]

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<string | null>("MR-1001") // Default to first record
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Filter records based on search term and active tab
  const filteredRecords = medicalRecords.filter((record) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase())

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "consultations" && record.recordType === "Consultation") ||
      (activeTab === "lab" && record.recordType === "Lab Results") ||
      (activeTab === "prescriptions" && record.recordType === "Prescription")

    return matchesSearch && matchesTab
  })

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Record
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View and manage patient medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
                <TabsList>
                  <TabsTrigger value="all">All Records</TabsTrigger>
                  <TabsTrigger value="consultations">Consultations</TabsTrigger>
                  <TabsTrigger value="lab">Lab Results</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>
                <div className="relative flex-1 sm:max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search records..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                {/* Wrap the Table component with ResponsiveTable */}
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No medical records found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow
                            key={record.id}
                            className={selectedRecord === record.id ? "bg-muted/50" : ""}
                            onClick={() => setSelectedRecord(record.id)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={`/abstract-geometric-shapes.png?height=36&width=36&query=${record.patientName}`}
                                    alt={record.patientName}
                                  />
                                  <AvatarFallback>
                                    {record.patientName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{record.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{record.patientId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{record.lastUpdated}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Complete" ? "success" : "secondary"}>
                                {record.status}
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
                                  <DropdownMenuItem onClick={() => setSelectedRecord(record.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                  <DropdownMenuItem>Patient History</DropdownMenuItem>
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

              <TabsContent value="consultations" className="m-0">
                {/* Wrap the Table component with ResponsiveTable */}
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No consultation records found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow
                            key={record.id}
                            className={selectedRecord === record.id ? "bg-muted/50" : ""}
                            onClick={() => setSelectedRecord(record.id)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={`/abstract-geometric-shapes.png?height=36&width=36&query=${record.patientName}`}
                                    alt={record.patientName}
                                  />
                                  <AvatarFallback>
                                    {record.patientName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{record.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{record.patientId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{record.lastUpdated}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Complete" ? "success" : "secondary"}>
                                {record.status}
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
                                  <DropdownMenuItem onClick={() => setSelectedRecord(record.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                  <DropdownMenuItem>Patient History</DropdownMenuItem>
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

              <TabsContent value="lab" className="m-0">
                {/* Wrap the Table component with ResponsiveTable */}
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No lab results found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow
                            key={record.id}
                            className={selectedRecord === record.id ? "bg-muted/50" : ""}
                            onClick={() => setSelectedRecord(record.id)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={`/abstract-geometric-shapes.png?height=36&width=36&query=${record.patientName}`}
                                    alt={record.patientName}
                                  />
                                  <AvatarFallback>
                                    {record.patientName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{record.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{record.patientId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{record.lastUpdated}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Complete" ? "success" : "secondary"}>
                                {record.status}
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
                                  <DropdownMenuItem onClick={() => setSelectedRecord(record.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                  <DropdownMenuItem>Patient History</DropdownMenuItem>
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

              <TabsContent value="prescriptions" className="m-0">
                {/* Wrap the Table component with ResponsiveTable */}
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No prescription records found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRecords.map((record) => (
                          <TableRow
                            key={record.id}
                            className={selectedRecord === record.id ? "bg-muted/50" : ""}
                            onClick={() => setSelectedRecord(record.id)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={`/abstract-geometric-shapes.png?height=36&width=36&query=${record.patientName}`}
                                    alt={record.patientName}
                                  />
                                  <AvatarFallback>
                                    {record.patientName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{record.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{record.patientId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{record.recordType}</TableCell>
                            <TableCell>{record.doctor}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{record.lastUpdated}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Complete" ? "success" : "secondary"}>
                                {record.status}
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
                                  <DropdownMenuItem onClick={() => setSelectedRecord(record.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                  <DropdownMenuItem>Patient History</DropdownMenuItem>
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
            </Tabs>
          </CardContent>
        </Card>

        {selectedRecord && <PatientRecordDetails />}
      </div>
      <AddMedicalRecordModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </MainLayout>
  )
}
