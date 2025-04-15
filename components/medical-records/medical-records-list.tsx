"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Mock medical records data
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
    isCritical: false,
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
    isCritical: true,
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
    isCritical: false,
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
    isCritical: true,
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
    isCritical: false,
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
    isCritical: false,
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
    isCritical: false,
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
    isCritical: false,
  },
]

interface MedicalRecordsListProps {
  filter: "all" | "recent" | "critical"
}

export function MedicalRecordsList({ filter }: MedicalRecordsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Get current date for "recent" filter (last 7 days)
  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate)
  sevenDaysAgo.setDate(currentDate.getDate() - 7)

  // Filter medical records based on search term and filter type
  const filteredRecords = medicalRecords.filter((record) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesFilter =
      filter === "all" ||
      (filter === "recent" && new Date(record.lastUpdated) >= sevenDaysAgo) ||
      (filter === "critical" && record.isCritical)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search records..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No medical records found matching your criteria.</div>
      ) : (
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <Link href={`/medical-records/${record.id}`} key={record.id} className="block">
              <div className="rounded-lg border overflow-hidden">
                <div className="flex items-center p-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=${record.patientName}`}
                      alt={record.patientName}
                    />
                    <AvatarFallback>
                      {record.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{record.patientName}</h3>
                      <Badge variant={record.status === "Complete" ? "success" : "secondary"} className="ml-2">
                        {record.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{record.patientId}</div>
                    <div className="text-xs text-muted-foreground">{record.recordType}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x border-t">
                  <div className="p-2 text-center">
                    <div className="text-xs text-muted-foreground">Last Updated</div>
                    <div className="text-sm font-medium">{record.lastUpdated}</div>
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-xs text-muted-foreground">Doctor</div>
                    <div className="text-sm font-medium">{record.doctor}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
