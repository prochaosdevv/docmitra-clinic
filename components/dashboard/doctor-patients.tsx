"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import { ResponsiveTable } from "@/components/ui/responsive-table"

// Mock data for doctor patients
const PATIENTS = [
  {
    id: "P-1001",
    name: "John Doe",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=John Doe",
    age: 45,
    gender: "Male",
    lastVisit: "May 15, 2023",
    condition: "Hypertension",
    status: "Active",
    doctorId: "D-1001",
  },
  {
    id: "P-1002",
    name: "Jane Smith",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Jane Smith",
    age: 32,
    gender: "Female",
    lastVisit: "May 10, 2023",
    condition: "Diabetes",
    status: "Active",
    doctorId: "D-1001",
  },
  {
    id: "P-1003",
    name: "Robert Brown",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Robert Brown",
    age: 28,
    gender: "Male",
    lastVisit: "April 28, 2023",
    condition: "Asthma",
    status: "Active",
    doctorId: "D-1001",
  },
  {
    id: "P-1004",
    name: "Emily Johnson",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Emily Johnson",
    age: 52,
    gender: "Female",
    lastVisit: "May 5, 2023",
    condition: "Arthritis",
    status: "Active",
    doctorId: "D-1001",
  },
  {
    id: "P-1005",
    name: "Michael Wilson",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Michael Wilson",
    age: 41,
    gender: "Male",
    lastVisit: "May 12, 2023",
    condition: "Migraine",
    status: "Active",
    doctorId: "D-1001",
  },
  {
    id: "P-1006",
    name: "Sarah Davis",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Sarah Davis",
    age: 36,
    gender: "Female",
    lastVisit: "May 8, 2023",
    condition: "Anxiety",
    status: "Active",
    doctorId: "D-1002",
  },
]

interface DoctorPatientsProps {
  doctorId: string
}

export function DoctorPatients({ doctorId }: DoctorPatientsProps) {
  const router = useRouter()

  // Filter patients for this doctor
  const doctorPatients = PATIENTS.filter((patient) => patient.doctorId === doctorId)

  return (
    <ResponsiveTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Age/Gender</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctorPatients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No patients found.
              </TableCell>
            </TableRow>
          ) : (
            doctorPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
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
                  {patient.age} / {patient.gender}
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Badge variant="outline">{patient.condition}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => router.push(`/patients/${patient.id}`)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Records
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ResponsiveTable>
  )
}
