"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"

// WHO standard ranges for adult vitals
const WHO_STANDARDS = {
  bloodPressure: {
    systolic: { min: 90, max: 120, unit: "mmHg" },
    diastolic: { min: 60, max: 80, unit: "mmHg" },
  },
  heartRate: { min: 60, max: 100, unit: "bpm" },
  weight: { min: 50, max: 100, unit: "kg" },
  glucose: { min: 70, max: 100, unit: "mg/dL" },
  bmi: { min: 18.5, max: 24.9, unit: "" },
  oxygenSaturation: { min: 95, max: 100, unit: "%" },
}

// Mock historical vitals data (in a real app, this would come from the API)
const mockVitalsHistory = {
  bloodPressure: [
    { date: "Jan 2023", value: "135/85", systolic: 135, diastolic: 85 },
    { date: "Feb 2023", value: "138/87", systolic: 138, diastolic: 87 },
    { date: "Mar 2023", value: "140/88", systolic: 140, diastolic: 88 },
    { date: "Apr 2023", value: "138/85", systolic: 138, diastolic: 85 },
    { date: "May 2023", value: "135/83", systolic: 135, diastolic: 83 },
  ],
  heartRate: [
    { date: "Jan 2023", value: 78 },
    { date: "Feb 2023", value: 76 },
    { date: "Mar 2023", value: 80 },
    { date: "Apr 2023", value: 76 },
    { date: "May 2023", value: 74 },
  ],
  weight: [
    { date: "Jan 2023", value: 75.2 },
    { date: "Feb 2023", value: 74.8 },
    { date: "Mar 2023", value: 74.5 },
    { date: "Apr 2023", value: 74.1 },
    { date: "May 2023", value: 73.6 },
  ],
  glucose: [
    { date: "Jan 2023", value: 95 },
    { date: "Feb 2023", value: 92 },
    { date: "Mar 2023", value: 98 },
    { date: "Apr 2023", value: 94 },
    { date: "May 2023", value: 90 },
  ],
  bmi: [
    { date: "Jan 2023", value: 27.1 },
    { date: "Feb 2023", value: 26.9 },
    { date: "Mar 2023", value: 26.8 },
    { date: "Apr 2023", value: 26.7 },
    { date: "May 2023", value: 26.6 },
  ],
  oxygenSaturation: [
    { date: "Jan 2023", value: 97 },
    { date: "Feb 2023", value: 98 },
    { date: "Mar 2023", value: 98 },
    { date: "Apr 2023", value: 97 },
    { date: "May 2023", value: 98 },
  ],
}

interface VitalsChartProps {
  currentVitals: {
    bloodPressure: string
    heartRate: string
    weight: string
    glucose: string
    bmi: string
    oxygenSaturation: string
  }
}

export function VitalsChart({ currentVitals }: VitalsChartProps) {
  const [activeTab, setActiveTab] = useState("bloodPressure")

  // Parse current vitals for comparison
  const parsedCurrentVitals = {
    bloodPressure: {
      systolic: Number.parseInt(currentVitals.bloodPressure.split("/")[0]),
      diastolic: Number.parseInt(currentVitals.bloodPressure.split("/")[1]),
    },
    heartRate: Number.parseInt(currentVitals.heartRate),
    weight: Number.parseFloat(currentVitals.weight),
    glucose: Number.parseInt(currentVitals.glucose),
    bmi: Number.parseFloat(currentVitals.bmi),
    oxygenSaturation: Number.parseInt(currentVitals.oxygenSaturation),
  }

  // Helper function to determine if a value is within WHO standards
  const getStatusForVital = (vitalType: keyof typeof WHO_STANDARDS, value: number) => {
    if (vitalType === "bloodPressure") {
      // Special case for blood pressure which has systolic and diastolic
      return null
    }

    const standard = WHO_STANDARDS[vitalType]
    if (value < standard.min) return "low"
    if (value > standard.max) return "high"
    return "normal"
  }

  // Helper function to get status badge for blood pressure
  const getBpStatus = (systolic: number, diastolic: number) => {
    const systolicStatus =
      systolic < WHO_STANDARDS.bloodPressure.systolic.min
        ? "low"
        : systolic > WHO_STANDARDS.bloodPressure.systolic.max
          ? "high"
          : "normal"

    const diastolicStatus =
      diastolic < WHO_STANDARDS.bloodPressure.diastolic.min
        ? "low"
        : diastolic > WHO_STANDARDS.bloodPressure.diastolic.max
          ? "high"
          : "normal"

    // If either is high, the overall status is high
    if (systolicStatus === "high" || diastolicStatus === "high") return "high"
    // If either is low, the overall status is low
    if (systolicStatus === "low" || diastolicStatus === "low") return "low"
    // Otherwise normal
    return "normal"
  }

  const renderStatusBadge = (status: string | null) => {
    if (status === null) return null

    return (
      <Badge
        variant={status === "normal" ? "success" : status === "high" ? "destructive" : "secondary"}
        className="ml-2"
      >
        {status === "normal" ? "Normal" : status === "high" ? "High" : "Low"}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vitals History</CardTitle>
            <CardDescription>Patient vitals over time with WHO standards</CardDescription>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <InfoIcon className="h-3 w-3 mr-1" />
            <span>Showing WHO standard ranges</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 md:grid-cols-6">
            <TabsTrigger value="bloodPressure" className="px-1 text-xs md:text-sm">
              BP
            </TabsTrigger>
            <TabsTrigger value="heartRate" className="px-1 text-xs md:text-sm">
              Heart
            </TabsTrigger>
            <TabsTrigger value="weight" className="px-1 text-xs md:text-sm">
              Weight
            </TabsTrigger>
            <TabsTrigger value="glucose" className="px-1 text-xs md:text-sm">
              Glucose
            </TabsTrigger>
            <TabsTrigger value="bmi" className="px-1 text-xs md:text-sm">
              BMI
            </TabsTrigger>
            <TabsTrigger value="oxygenSaturation" className="px-1 text-xs md:text-sm">
              O2
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-2 md:mb-0">
              <h3 className="text-lg font-medium">
                {activeTab === "bloodPressure" && "Blood Pressure"}
                {activeTab === "heartRate" && "Heart Rate"}
                {activeTab === "weight" && "Weight"}
                {activeTab === "glucose" && "Glucose"}
                {activeTab === "bmi" && "Body Mass Index (BMI)"}
                {activeTab === "oxygenSaturation" && "Oxygen Saturation"}
              </h3>

              {activeTab === "bloodPressure" &&
                renderStatusBadge(
                  getBpStatus(parsedCurrentVitals.bloodPressure.systolic, parsedCurrentVitals.bloodPressure.diastolic),
                )}

              {activeTab !== "bloodPressure" &&
                renderStatusBadge(
                  getStatusForVital(
                    activeTab as keyof typeof WHO_STANDARDS,
                    parsedCurrentVitals[activeTab as keyof typeof parsedCurrentVitals] as number,
                  ),
                )}
            </div>

            <div className="flex items-center text-sm">
              <div className="flex items-center mr-4">
                <div className="h-3 w-3 rounded-full bg-primary mr-1"></div>
                <span>Current</span>
              </div>
              {activeTab === "bloodPressure" && (
                <>
                  <div className="flex items-center mr-4">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>Systolic</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span>Diastolic</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === "bloodPressure" ? (
                <LineChart data={mockVitalsHistory.bloodPressure}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[40, 180]} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "systolic" || name === "diastolic") {
                        return [`${value} mmHg`, name.charAt(0).toUpperCase() + name.slice(1)]
                      }
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <ReferenceLine
                    y={WHO_STANDARDS.bloodPressure.systolic.max}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: "Max Systolic", position: "right" }}
                  />
                  <ReferenceLine y={WHO_STANDARDS.bloodPressure.systolic.min} stroke="orange" strokeDasharray="3 3" />
                  <ReferenceLine
                    y={WHO_STANDARDS.bloodPressure.diastolic.max}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: "Max Diastolic", position: "right" }}
                  />
                  <ReferenceLine y={WHO_STANDARDS.bloodPressure.diastolic.min} stroke="orange" strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : (
                <LineChart data={mockVitalsHistory[activeTab as keyof typeof mockVitalsHistory]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => {
                      const unit = WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].unit
                      return [`${value} ${unit}`, activeTab]
                    }}
                  />
                  <Legend />
                  <ReferenceLine
                    y={WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].max}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={{ value: "Max", position: "right" }}
                  />
                  <ReferenceLine
                    y={WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].min}
                    stroke="orange"
                    strokeDasharray="3 3"
                    label={{ value: "Min", position: "left" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-center">
              <InfoIcon className="h-3 w-3 mr-1" />
              WHO Standard Range:
              {activeTab === "bloodPressure" ? (
                <span className="ml-1">
                  Systolic: {WHO_STANDARDS.bloodPressure.systolic.min}-{WHO_STANDARDS.bloodPressure.systolic.max} mmHg,
                  Diastolic: {WHO_STANDARDS.bloodPressure.diastolic.min}-{WHO_STANDARDS.bloodPressure.diastolic.max}{" "}
                  mmHg
                </span>
              ) : (
                <span className="ml-1">
                  {WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].min}-
                  {WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].max}
                  {WHO_STANDARDS[activeTab as keyof typeof WHO_STANDARDS].unit}
                </span>
              )}
            </p>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
