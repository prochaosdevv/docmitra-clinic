"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface AddMedicalRecordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddMedicalRecordModal({ isOpen, onClose }: AddMedicalRecordModalProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    recordType: "Consultation",
    diagnosis: "",
    notes: "",
    date: "",
    status: "Complete",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      toast({
        title: "Medical record added successfully",
        description: `Medical record has been added for the patient.`,
      })

      // Close modal and reset form
      onClose()
      setFormData({
        patientId: "",
        doctorId: "",
        recordType: "Consultation",
        diagnosis: "",
        notes: "",
        date: "",
        status: "Complete",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the medical record. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for patients and doctors
  const patients = [
    { id: "P-1001", name: "Emma Johnson" },
    { id: "P-1002", name: "James Wilson" },
    { id: "P-1003", name: "Sophia Martinez" },
    { id: "P-1004", name: "William Taylor" },
    { id: "P-1005", name: "Olivia Brown" },
  ]

  const doctors = [
    { id: "D-1001", name: "Dr. Michael Chen", specialty: "Cardiology" },
    { id: "D-1002", name: "Dr. Sarah Lee", specialty: "Dermatology" },
    { id: "D-1003", name: "Dr. Robert Johnson", specialty: "Neurology" },
    { id: "D-1004", name: "Dr. Emily Davis", specialty: "Pediatrics" },
    { id: "D-1005", name: "Dr. James Wilson", specialty: "Orthopedic Surgery" },
  ]

  return (
    <Modal
      title="Add New Medical Record"
      description="Add a new medical record for a patient."
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="patientId">Patient</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) => handleSelectChange("patientId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="doctorId">Doctor</Label>
            <Select value={formData.doctorId} onValueChange={(value) => handleSelectChange("doctorId", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="recordType">Record Type</Label>
              <Select
                value={formData.recordType}
                onValueChange={(value) => handleSelectChange("recordType", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Lab Results">Lab Results</SelectItem>
                  <SelectItem value="Prescription">Prescription</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Imaging">Imaging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              name="diagnosis"
              placeholder="Primary diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Detailed clinical notes"
              value={formData.notes}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Medical Record"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
