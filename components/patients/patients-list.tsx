"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Mock patient data with Indian names in English
const patients = [
  {
    id: "P-1001",
    name: "Amit Sharma",
    email: "amit.s@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "May 15, 1985",
    lastVisit: "Apr 23, 2023",
    status: "Active",
  },
  {
    id: "P-1002",
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 87654 32109",
    dateOfBirth: "Jan 28, 1976",
    lastVisit: "Apr 24, 2023",
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Rahul Verma",
    email: "rahul.v@example.com",
    phone: "+91 76543 21098",
    dateOfBirth: "Nov 12, 1990",
    lastVisit: "Apr 25, 2023",
    status: "Inactive",
  },
  {
    id: "P-1004",
    name: "Neha Gupta",
    email: "neha.g@example.com",
    phone: "+91 65432 10987",
    dateOfBirth: "Mar 3, 1982",
    lastVisit: "Apr 26, 2023",
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Vikas Mehta",
    email: "vikas.m@example.com",
    phone: "+91 54321 09876",
    dateOfBirth: "Jul 22, 1995",
    lastVisit: "Apr 27, 2023",
    status: "Active",
  },
  {
    id: "P-1006",
    name: "Anushka Singh",
    email: "anushka.s@example.com",
    phone: "+91 43210 98765",
    dateOfBirth: "Sep 8, 1970",
    lastVisit: "Apr 28, 2023",
    status: "Active",
  },
  {
    id: "P-1007",
    name: "Sanjay Agarwal",
    email: "sanjay.a@example.com",
    phone: "+91 32109 87654",
    dateOfBirth: "Feb 17, 1988",
    lastVisit: "Apr 29, 2023",
    status: "Inactive",
  },
  {
    id: "P-1008",
    name: "Deepika Chaudhary",
    email: "deepika.c@example.com",
    phone: "+91 21098 76543",
    dateOfBirth: "Dec 5, 1992",
    lastVisit: "Apr 30, 2023",
    status: "Active",
  },
]

interface PatientsListProps {
  filter: "all" | "active" | "inactive"
}

export function PatientsList({ filter }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter patients based on search term and filter type
  const filteredPatients = patients.filter((patient) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    // Status filter
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && patient.status === "Active") ||
      (filter === "inactive" && patient.status === "Inactive")

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search patients..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPatients.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No patients found matching your criteria.</div>
      ) : (
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Link href={`/patients/${patient.id}`} key={patient.id} className="block">
              <div className="rounded-lg border overflow-hidden">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
