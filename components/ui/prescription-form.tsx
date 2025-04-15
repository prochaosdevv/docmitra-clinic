"use client"

import { useState } from "react"
import { X, Plus, Clock, Sun, Coffee, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Prescription {
  name: string
  dosage: string
  schedule: string
  timeOfDay?: string[]
  withFood?: string
}

interface PrescriptionFormProps {
  prescriptions: Prescription[]
  onChange: (prescriptions: Prescription[]) => void
  previousPrescriptions?: Prescription[]
  onRemovePrevious?: (prescription: Prescription) => void
}

export function PrescriptionForm({
  prescriptions,
  onChange,
  previousPrescriptions = [],
  onRemovePrevious,
}: PrescriptionFormProps) {
  const [newPrescription, setNewPrescription] = useState<Prescription>({
    name: "",
    dosage: "",
    schedule: "",
    timeOfDay: [],
    withFood: "",
  })
  const [scheduleType, setScheduleType] = useState<string>("daily")
  const [timesPerDay, setTimesPerDay] = useState<string>("1")
  const [customSchedule, setCustomSchedule] = useState<string>("")

  const handleAddPrescription = () => {
    if (
      newPrescription.name.trim() === "" ||
      newPrescription.dosage.trim() === "" ||
      newPrescription.schedule.trim() === ""
    ) {
      return
    }

    const updatedPrescriptions = [...prescriptions, { ...newPrescription }]
    onChange(updatedPrescriptions)
    setNewPrescription({
      name: "",
      dosage: "",
      schedule: "",
      timeOfDay: [],
      withFood: "",
    })
    setScheduleType("daily")
    setTimesPerDay("1")
    setCustomSchedule("")
  }

  const handleRemovePrescription = (index: number) => {
    const updatedPrescriptions = [...prescriptions]
    updatedPrescriptions.splice(index, 1)
    onChange(updatedPrescriptions)
  }

  const updateSchedule = () => {
    let scheduleText = ""

    switch (scheduleType) {
      case "daily":
        scheduleText =
          timesPerDay === "1"
            ? "Once daily"
            : timesPerDay === "2"
              ? "Twice daily"
              : timesPerDay === "3"
                ? "Three times daily"
                : timesPerDay === "4"
                  ? "Four times daily"
                  : `${timesPerDay} times daily`
        break
      case "weekly":
        scheduleText = "Once weekly"
        break
      case "alternate":
        scheduleText = "Every other day"
        break
      case "custom":
        scheduleText = customSchedule
        break
    }

    setNewPrescription((prev) => ({ ...prev, schedule: scheduleText }))
  }

  const handleTimeOfDayChange = (time: string) => {
    const currentTimes = newPrescription.timeOfDay || []
    const updatedTimes = currentTimes.includes(time) ? currentTimes.filter((t) => t !== time) : [...currentTimes, time]

    setNewPrescription((prev) => ({ ...prev, timeOfDay: updatedTimes }))
  }

  // Helper to format time of day for display
  const formatTimeOfDay = (times: string[] | undefined) => {
    if (!times || times.length === 0) return ""
    return times.join(", ")
  }

  // Helper to get icon for time of day
  const getTimeIcon = (time: string) => {
    switch (time) {
      case "Morning":
        return <Sun className="h-3 w-3 mr-1" />
      case "Noon":
        return <Coffee className="h-3 w-3 mr-1" />
      case "Evening":
      case "Night":
        return <Moon className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Previous prescriptions */}
      {previousPrescriptions.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1">Previous prescriptions:</div>
          <div className="flex flex-col gap-2">
            {previousPrescriptions.map((prescription, index) => (
              <div key={`prev-${index}`} className="flex items-center gap-2 rounded-md border p-2 text-xs">
                <div className="flex-1">
                  <div className="font-medium">{prescription.name}</div>
                  <div className="text-muted-foreground">{prescription.dosage}</div>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {prescription.schedule}
                  </div>
                  {prescription.timeOfDay && prescription.timeOfDay.length > 0 && (
                    <div className="flex items-center mt-1 text-muted-foreground">
                      {getTimeIcon(prescription.timeOfDay[0])}
                      {formatTimeOfDay(prescription.timeOfDay)}
                    </div>
                  )}
                  {prescription.withFood && <div className="mt-1 text-muted-foreground">{prescription.withFood}</div>}
                </div>
                {onRemovePrevious && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onRemovePrevious(prescription)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current prescriptions */}
      {prescriptions.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium mb-1">Current prescriptions:</div>
          <div className="flex flex-col gap-2">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="flex items-center gap-2 rounded-md border p-2 text-xs">
                <div className="flex-1">
                  <div className="font-medium">{prescription.name}</div>
                  <div className="text-muted-foreground">{prescription.dosage}</div>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {prescription.schedule}
                  </div>
                  {prescription.timeOfDay && prescription.timeOfDay.length > 0 && (
                    <div className="flex items-center mt-1 text-muted-foreground">
                      {getTimeIcon(prescription.timeOfDay[0])}
                      {formatTimeOfDay(prescription.timeOfDay)}
                    </div>
                  )}
                  {prescription.withFood && <div className="mt-1 text-muted-foreground">{prescription.withFood}</div>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleRemovePrescription(index)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add new prescription form */}
      <div className="space-y-3 rounded-md border p-3">
        <div className="text-xs font-medium">Add new prescription</div>

        <div className="grid gap-2">
          <Label htmlFor="medication-name" className="text-xs">
            Medication Name
          </Label>
          <Input
            id="medication-name"
            placeholder="e.g., Lisinopril"
            value={newPrescription.name}
            onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="medication-dosage" className="text-xs">
            Dosage
          </Label>
          <Input
            id="medication-dosage"
            placeholder="e.g., 10mg"
            value={newPrescription.dosage}
            onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-xs">Schedule</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={scheduleType}
              onValueChange={(value) => {
                setScheduleType(value)
                setTimeout(() => {
                  if (value === "daily") {
                    const scheduleText =
                      timesPerDay === "1"
                        ? "Once daily"
                        : timesPerDay === "2"
                          ? "Twice daily"
                          : timesPerDay === "3"
                            ? "Three times daily"
                            : timesPerDay === "4"
                              ? "Four times daily"
                              : `${timesPerDay} times daily`
                    setNewPrescription((prev) => ({ ...prev, schedule: scheduleText }))
                  } else if (value === "weekly") {
                    setNewPrescription((prev) => ({ ...prev, schedule: "Once weekly" }))
                  } else if (value === "alternate") {
                    setNewPrescription((prev) => ({ ...prev, schedule: "Every other day" }))
                  } else if (value === "custom") {
                    setNewPrescription((prev) => ({ ...prev, schedule: customSchedule }))
                  }
                }, 0)
              }}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="alternate">Alternate Days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            {scheduleType === "daily" && (
              <Select
                value={timesPerDay}
                onValueChange={(value) => {
                  setTimesPerDay(value)
                  setTimeout(() => {
                    const scheduleText =
                      value === "1"
                        ? "Once daily"
                        : value === "2"
                          ? "Twice daily"
                          : value === "3"
                            ? "Three times daily"
                            : value === "4"
                              ? "Four times daily"
                              : `${value} times daily`
                    setNewPrescription((prev) => ({ ...prev, schedule: scheduleText }))
                  }, 0)
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Times per day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Once daily</SelectItem>
                  <SelectItem value="2">Twice daily</SelectItem>
                  <SelectItem value="3">Three times daily</SelectItem>
                  <SelectItem value="4">Four times daily</SelectItem>
                </SelectContent>
              </Select>
            )}

            {scheduleType === "custom" && (
              <Input
                placeholder="e.g., Every Monday and Thursday"
                value={customSchedule}
                onChange={(e) => {
                  setCustomSchedule(e.target.value)
                  setNewPrescription({ ...newPrescription, schedule: e.target.value })
                }}
                className="h-8 text-xs"
              />
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label className="text-xs">Time of Day</Label>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="morning"
                checked={newPrescription.timeOfDay?.includes("Morning")}
                onCheckedChange={() => handleTimeOfDayChange("Morning")}
              />
              <Label htmlFor="morning" className="text-xs cursor-pointer">
                Morning
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="noon"
                checked={newPrescription.timeOfDay?.includes("Noon")}
                onCheckedChange={() => handleTimeOfDayChange("Noon")}
              />
              <Label htmlFor="noon" className="text-xs cursor-pointer">
                Noon
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="evening"
                checked={newPrescription.timeOfDay?.includes("Evening")}
                onCheckedChange={() => handleTimeOfDayChange("Evening")}
              />
              <Label htmlFor="evening" className="text-xs cursor-pointer">
                Evening
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="night"
                checked={newPrescription.timeOfDay?.includes("Night")}
                onCheckedChange={() => handleTimeOfDayChange("Night")}
              />
              <Label htmlFor="night" className="text-xs cursor-pointer">
                Night
              </Label>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label className="text-xs">With Food</Label>
          <Select
            value={newPrescription.withFood}
            onValueChange={(value) => setNewPrescription({ ...newPrescription, withFood: value })}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select food instructions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Take with food">Take with food</SelectItem>
              <SelectItem value="Take after meals">Take after meals</SelectItem>
              <SelectItem value="Take on empty stomach">Take on empty stomach</SelectItem>
              <SelectItem value="Take 30 minutes before meals">Take 30 minutes before meals</SelectItem>
              <SelectItem value="Take 1 hour after meals">Take 1 hour after meals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          size="sm"
          className="w-full mt-2"
          onClick={handleAddPrescription}
          disabled={!newPrescription.name || !newPrescription.dosage || !newPrescription.schedule}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Prescription
        </Button>
      </div>
    </div>
  )
}
