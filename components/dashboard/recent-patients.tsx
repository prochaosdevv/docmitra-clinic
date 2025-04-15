import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

// Import the ResponsiveTable component
import { ResponsiveTable } from "@/components/ui/responsive-table"

const patients = [
  {
    id: "P-1001",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "(555) 123-4567",
    dateRegistered: "Apr 23, 2023",
    status: "Active",
  },
  {
    id: "P-1002",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 234-5678",
    dateRegistered: "Apr 24, 2023",
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "(555) 345-6789",
    dateRegistered: "Apr 25, 2023",
    status: "Inactive",
  },
  {
    id: "P-1004",
    name: "William Taylor",
    email: "william.t@example.com",
    phone: "(555) 456-7890",
    dateRegistered: "Apr 26, 2023",
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Olivia Brown",
    email: "olivia.b@example.com",
    phone: "(555) 567-8901",
    dateRegistered: "Apr 27, 2023",
    status: "Active",
  },
]

export function RecentPatients() {
  return (
    // Wrap the Table component with ResponsiveTable
    <ResponsiveTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
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
              <TableCell>{patient.dateRegistered}</TableCell>
              <TableCell>
                <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">View records</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ResponsiveTable>
  )
}
