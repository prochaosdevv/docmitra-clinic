"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  openAddPatientModal?: () => void;
  setOpenAddPatientModal?: (value: boolean) => void;
  addedPatient?: any; // Replace with the correct type if available
  setOpenHealthCheckModal?: (value: boolean) => void;
}

type AppointmentFormValues = {
  patient: string;
  date: string;
  time: string;
  type: string;
  complaint?: string;
};

const dummyPatients = [
  { _id: "627264hn827cg28424", name: "John Doe", phone: "123-456-7890" },
  { _id: "6714627cb2847db246", name: "Jane Smith", phone: "987-654-3210" },
  { _id: "62894982cv824gb247", name: "Alice Johnson", phone: "555-123-4567" },
  { _id: "6034924vf24872db24", name: "Bob Williams", phone: "444-222-1111" },
];

const timeSlots = [
  "10:00 AM - 10:30 AM",
  "12:00 PM - 12:30 PM",
  "2:00 PM - 2:30 PM",
  "4:00 PM - 4:30 PM",
  "6:00 PM - 6:30 PM",
];

export function AddAppointmentModal({
  isOpen,
  onClose,
  setOpenAddPatientModal,
  addedPatient,
  setOpenHealthCheckModal,
}: AddAppointmentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    control,
    watch,
  } = useForm<AppointmentFormValues>({
    defaultValues: {
      patient: "",
      date: "",
      time: "",
      type: "Consultation",
      complaint: "",
    },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<typeof dummyPatients>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!!addedPatient) {
      setValue("patient", addedPatient.name, { shouldValidate: true });
      setSearchTerm(addedPatient.name);
      setSuggestions([]); // Clear suggestions after selecting a patient
    }
  }, [addedPatient]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = dummyPatients.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchTerm]);

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Appointment scheduled successfully",
        description: `Appointment scheduled for ${data.date} at ${data.time}.`,
      });
      // onClose();
      reset();
      setShowConfirmation(true);
      // setOpenHealthCheckModal?.(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      title={
        showConfirmation
          ? "Do You want to add a health record or continue without it?"
          : "Schedule New Appointment"
      }
      description={
        showConfirmation
          ? "You can add a health record for the patient after scheduling the appointment"
          : "Schedule a new appointment for a patient."
      }
      isOpen={isOpen}
      onClose={onClose}
      className={`sm:max-w-[500px] md:max-w-[${
        showConfirmation ? `600px` : `700px`
      }] w-full max-h-[90vh] overflow-auto`}
    >
      {showConfirmation ? (
        <div>
          <div className="flex items-center justify-start py-4 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setShowConfirmation(false);
                onClose();
              }}
            >
              No, Continue without it
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowConfirmation(false);
                onClose();
                setOpenHealthCheckModal?.(true);
              }}
            >
              Yes, Add Health Record
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <div className="flex flex-col md:flex-row items-start gap-2">
                <div className="relative w-full">
                  <Input
                    id="patient"
                    type="text"
                    placeholder="Search patient name..."
                    {...register("patient", {
                      required: "Patient name is required",
                      onChange: (e) => {
                        setSearchTerm(e.target.value);
                        setValue("patient", e.target.value, {
                          shouldValidate: true,
                        });
                      },
                    })}
                    autoComplete="off"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-48 overflow-y-auto">
                      {suggestions.map((patient) => (
                        <li
                          key={patient._id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSuggestions([]);
                            setSearchTerm("");
                            setValue("patient", patient.name, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {patient.phone}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {errors.patient && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.patient.message}
                    </p>
                  )}
                </div>
                <Button
                  variant="secondary"
                  type="button"
                  className="w-1/4 text-blue-600"
                  onClick={() => {
                    setOpenAddPatientModal?.(true);
                  }}
                >
                  Add Patient
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  // disable past dates
                  min={new Date().toISOString().split("T")[0]}
                  id="date"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "Time is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.time && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consultation">
                          Consultation
                        </SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Procedure">Procedure</SelectItem>
                        <SelectItem value="Check-up">Check-up</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="complaint">Complaint (optional)</Label>
              <Textarea
                id="complaint"
                placeholder="Enter the patient's complaint"
                {...register("complaint")}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
