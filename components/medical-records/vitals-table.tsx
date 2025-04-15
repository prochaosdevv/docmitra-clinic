"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTable } from "@/components/ui/responsive-table"

// Mock vitals data
const PATIENT_VITALS = {
  "P-1001": [
    {
      date: "May 15, 2023",
      bloodPressure: "138/85",
      systolic: 138,
      diastolic: 85,
      heartRate: 76,
      weight: 75,
      temperature: 98.6,
      oxygenSaturation: 98,
      glucose: 95,
    },
    {
      date: "Apr 23, 2023",
      bloodPressure: "140/88",
      systolic: 140,
      diastolic: 88,
      heartRate: 78,
      weight: 75.5,
      temperature: 98.4,
      oxygenSaturation: 97,
      glucose: 98,
    },
    {
      date: "Feb 15, 2023",
      bloodPressure: "142/90",
      systolic: 142,
      diastolic: 90,
      heartRate: 80,
      weight: 76.2,
      temperature: 98.8,
      oxygenSaturation: 98,
      glucose: 102,
    },
    {
      date: "Dec 10, 2022",
      bloodPressure: "145/92",
      systolic: 145,
      diastolic: 92,
      heartRate: 82,
      weight: 77.1,
      temperature: 98.6,
      oxygenSaturation: 97,
      glucose: 105,
    },
  ],
  "P-1002": [
    {
      date: "Apr 24, 2023",
      bloodPressure: "120/80",
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      weight: 84,
      temperature: 98.6,
      oxygenSaturation: 99,
      glucose: 90,
    },
    {
      date: "Jan 15, 2023",
      bloodPressure: "122/82",
      systolic: 122,
      diastolic: 82,
      heartRate: 74,
      weight: 85.2,
      temperature: 98.4,
      oxygenSaturation: 98,
      glucose: 92,
    },
  ],
  "P-1003": [
    {
      date: "Apr 25, 2023",
      bloodPressure: "118/78",
      systolic: 118,
      diastolic: 78,
      heartRate: 68,
      weight: 62.5,
      temperature: 98.2,
      oxygenSaturation: 99,
      glucose: 88,
    },
  ],
}

// Normal ranges for vitals
const NORMAL_RANGES = {
  systolic: { min: 90, max: 120 },
  diastolic: { min: 60, max: 80 },
  heartRate: { min: 60, max: 100 },
  temperature: { min: 97, max: 99 },
  oxygenSaturation: { min: 95, max: 100 },
  glucose: { min: 70, max: 100 },
}

// Helper function to determine if a value is within normal range
const getStatus = (value: number, type: keyof typeof NORMAL_RANGES) => {
  const range = NORMAL_RANGES[type]
  if (value < range.min) return "low"
  if (value > range.max) return "high"
  return "normal"
}

// Helper function to get badge variant based on status
const getBadgeVariant = (status: string) => {
  switch (status) {
    case "high":
      return "destructive"
    case "low":
      return "secondary"
    default:
      return "success"
  }
}

interface VitalsTableProps {
  patientId: string
}

export function VitalsTable({ patientId }: VitalsTableProps) {
  const [selectedVital, setSelectedVital] = useState<string>("bloodPressure")

  // Get patient vitals
  const vitals = PATIENT_VITALS[patientId as keyof typeof PATIENT_VITALS] || []

  // Prepare data for the selected vital chart
  const getChartData = () => {
    if (selectedVital === "bloodPressure") {
      return vitals
        .map((v) => ({
          date: v.date,
          systolic: v.systolic,
          diastolic: v.diastolic,
        }))
        .reverse()
    }

    return vitals
      .map((v) => ({
        date: v.date,
        value: v[selectedVital as keyof typeof v] as number,
      }))
      .reverse()
  }

  const chartData = getChartData()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={selectedVital === "bloodPressure" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("bloodPressure")}
        >
          Blood Pressure
        </Button>
        <Button
          size="sm"
          variant={selectedVital === "heartRate" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("heartRate")}
        >
          Heart Rate
        </Button>
        <Button
          size="sm"
          variant={selectedVital === "weight" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("weight")}
        >
          Weight
        </Button>
        <Button
          size="sm"
          variant={selectedVital === "temperature" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("temperature")}
        >
          Temperature
        </Button>
        <Button
          size="sm"
          variant={selectedVital === "oxygenSaturation" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("oxygenSaturation")}
        >
          O₂ Saturation
        </Button>
        <Button
          size="sm"
          variant={selectedVital === "glucose" ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => setSelectedVital("glucose")}
        >
          Glucose
        </Button>
      </div>

      {/* Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {selectedVital === "bloodPressure" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[60, 160]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <ReferenceLine y={NORMAL_RANGES.systolic.max} stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={NORMAL_RANGES.systolic.min} stroke="orange" strokeDasharray="3 3" />
              <ReferenceLine y={NORMAL_RANGES.diastolic.max} stroke="red" strokeDasharray="3 3" />
              <ReferenceLine y={NORMAL_RANGES.diastolic.min} stroke="orange" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="systolic" stroke="#ef4444" dot={{ r: 3 }} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" dot={{ r: 3 }} name="Diastolic" />
            </LineChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              {selectedVital !== "weight" && (
                <>
                  <ReferenceLine
                    y={NORMAL_RANGES[selectedVital as keyof typeof NORMAL_RANGES]?.max}
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <ReferenceLine
                    y={NORMAL_RANGES[selectedVital as keyof typeof NORMAL_RANGES]?.min}
                    stroke="orange"
                    strokeDasharray="3 3"
                  />
                </>
              )}
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" dot={{ r: 3 }} name={selectedVital} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <ResponsiveTable>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Blood Pressure</TableHead>
              <TableHead>Heart Rate</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>O₂ Sat.</TableHead>
              <TableHead>Glucose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vitals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-sm text-muted-foreground">
                  No vitals data available.
                </TableCell>
              </TableRow>
            ) : (
              vitals.map((vital, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-xs">{vital.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {vital.bloodPressure}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(getStatus(vital.heartRate, "heartRate"))} className="text-xs">
                      {vital.heartRate} bpm
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {vital.weight} kg
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(getStatus(vital.temperature, "temperature"))} className="text-xs">
                      {vital.temperature} °F
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getBadgeVariant(getStatus(vital.oxygenSaturation, "oxygenSaturation"))}
                      className="text-xs"
                    >
                      {vital.oxygenSaturation}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(getStatus(vital.glucose, "glucose"))} className="text-xs">
                      {vital.glucose} mg/dL
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ResponsiveTable>
    </div>
  )
}
