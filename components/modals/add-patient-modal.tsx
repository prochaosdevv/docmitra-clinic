"use client";

import type React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddPatient: (patient: PatientFormValues & { _id: string }) => void;
}

// Define form validation schema with Zod
const patientFormSchema = z.object({
  patientUID: z.string().optional(),
  thirdPartyUID: z.string().optional(),
  patientClinicID: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  gender: z.string().min(1, "Please select a gender"),
  dobYear: z
    .string()
    .min(1, "Please enter a year")
    .regex(/^\d*$/, "Year must contain only digits"),
  dobMonth: z
    .string()
    .min(1, "Please enter a month")
    .regex(/^\d*$/, "Month must contain only digits")
    .refine((val) => !val || (Number(val) >= 0 && Number(val) < 12), {
      message: "Month must be between 0-11",
    }),
  parentName: z.string().optional(),
  bloodGroup: z.string().optional(),
  adhar: z
    .string()
    .min(1, "Please enter an adhar number")
    .regex(/^\d*$/, "Adhar number must contain only digits")
    .refine((val) => !val || val.length === 12, {
      message: "Adhar number must be 12 digits",
    }),
  language: z.string().default("English"),
  abhaAddress: z.string().optional(),
  purposeOfVisit: z.string().optional(),
  otherPurpose: z.string().optional(),
  address: z.string().min(5, "Please enter a valid address"),
  area: z.string().min(1, "Please enter an area"),
  pincode: z
    .string()
    .min(1, {
      message: "Please enter a pincode",
    })
    .refine((val) => !val || val.length === 6, {
      message: "Pincode must be 6 digits",
    }),
  country: z.string().min(1, "Please enter a country"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please enter a city"),
  district: z.string().min(1, "Please enter a district"),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

const purposeOptions = [
  "Consultation",
  "Follow-up",
  "Check-up",
  "Procedure",
  "Emergency",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export function AddPatientModal({
  isOpen,
  onClose,
  handleAddPatient,
}: AddPatientModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  // For development/debugging: show validation state in real-time
  const [showFormState, setShowFormState] = useState(false);

  // Initialize react-hook-form
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      patientUID: "",
      thirdPartyUID: "",
      patientClinicID: "",
      dobYear: "",
      dobMonth: "",
      parentName: "",
      bloodGroup: "",
      adhar: "",
      language: "English",
      abhaAddress: "",
      purposeOfVisit: "",
      otherPurpose: "",
      area: "",
      pincode: "",
      country: "",
      state: "",
      city: "",
      district: "",
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  const onSubmit = async (data: PatientFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPatient = {
        ...data,
        _id: Math.random().toString(36).substring(2, 15),
      };

      console.log("Inside modal onSubmit, newPatient:", newPatient);
      handleAddPatient(newPatient);
      // Show success toast
      toast({
        title: "Patient added successfully",
        description: `${data.name} has been added to the system.`,
      });

      // Close modal and reset form
      onClose();
      // form.reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "There was an error adding the patient. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      title="Add New Patient"
      description="Add a new patient to the clinic system."
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-[500px] md:max-w-[700px] w-full max-h-[90vh] overflow-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="space-y-4 py-4"
        >
          <div className="grid gap-4">
            {/* Patient UID */}
            <FormField
              control={form.control}
              name="patientUID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient UID</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient UID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Third Party UID */}
            <FormField
              control={form.control}
              name="thirdPartyUID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Third Party UID</FormLabel>
                  <FormControl>
                    <Input placeholder="Third Party UID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Patient Clinic ID */}
            <FormField
              control={form.control}
              name="patientClinicID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Clinic ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient Clinic ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="patient@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="dobYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="YY" {...field} />
                      </FormControl>
                      <span className="text-xs text-gray-500">Years</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dobMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="MM" {...field} />
                      </FormControl>
                      <span className="text-xs text-gray-500">Months</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Gender and Adhar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adhar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adhar</FormLabel>
                    <FormControl>
                      <Input placeholder="Adhar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Language" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ABHA Address */}
            <FormField
              control={form.control}
              name="abhaAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ABHA Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. doctor@121@abdm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Purpose of Visit */}
            <FormField
              control={form.control}
              name="purposeOfVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of visit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {purposeOptions.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Purpose (Conditional) */}
            {form.watch("purposeOfVisit") === "Other" && (
              <FormField
                control={form.control}
                name="otherPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other purpose of visit</FormLabel>
                    <FormControl>
                      <Input placeholder="Please specify" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, State, ZIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Area and Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="Pincode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter district" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between space-x-2 pt-4">
            <div>
              {process.env.NODE_ENV === "development" && (
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={() => setShowFormState(!showFormState)}
                >
                  {showFormState ? "Hide Debug" : "Show Debug"}
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Patient"}
              </Button>
            </div>
          </div>

          {/* Form state debug information (development only) */}
          {showFormState && process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-gray-50 rounded border text-xs overflow-auto max-h-60">
              <h4 className="font-bold">Form State:</h4>
              <div>
                <p>
                  <strong>Form Errors:</strong>
                  {Object.keys(form.formState.errors).length > 0
                    ? Object.entries(form.formState.errors).map(
                        ([key, error]) => (
                          <span key={key} className="block ml-2">
                            {key}: {error?.message?.toString()}
                          </span>
                        )
                      )
                    : " No errors"}
                </p>
                <p className="mt-2">
                  <strong>Fields:</strong>
                </p>
                <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
              </div>
            </div>
          )}
        </form>
      </Form>
    </Modal>
  );
}
