"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  FileTextIcon as FileText2,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PatientRecordsModal } from "@/components/modals/patient-records-modal";
import { EditableTagsArea } from "@/components/ui/editable-tags-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PrescriptionForm } from "@/components/ui/prescription-form";
import { Modal } from "@/components/ui/modal";
import { PrescriptionPreview } from "@/components/ui/prescription-preview";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/components/ui/use-toast";
import AddHealthCheckModal from "@/components/modals/add-healthcheck-modal";
import { APPOINTMENTS } from "@/app/staff-dashboard/page";
import { cn } from "@/lib/utils";

export interface VitalsHistoryRecord {
  date: string;
  [key: string]: string | number; // Allow dynamic vital fields
}

// Mock appointment data with Indian names in English
// const APPOINTMENTS = [
//   {
//     id: "A-1001",
//     patientName: "Amit Sharma",
//     patientId: "P-1001",
//     patientAge: 38,
//     patientAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Amit Sharma",
//     patientEmail: "amit.s@example.com",
//     patientPhone: "+91 98765 43210",
//     doctorName: "Dr. Aditya Kapoor",
//     doctorId: "D-1001",
//     doctorAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Aditya Kapoor",
//     specialty: "Cardiology",
//     date: "May 15, 2023",
//     time: "10:00 AM",
//     duration: "30 minutes",
//     type: "Check-up",
//     status: "Confirmed",
//     location: "Main Clinic, Room 105",
//     notes:
//       "Follow-up on blood pressure medication. Patient to bring recent test results.",
//     previousComplaints: ["Headaches", "Dizziness", "Fatigue"],
//     previousDiagnosis: ["Hypertension (Primary)"],
//     previousPrescriptions: [
//       { name: "Lisinopril", dosage: "10mg", schedule: "Once daily" },
//       { name: "Aspirin", dosage: "81mg", schedule: "Once daily" },
//     ].map((p) => `${p.name} - ${p.dosage} - ${p.schedule}`),
//     previousInstructions: [
//       "Monitor blood pressure at home",
//       "Reduce sodium intake",
//       "Regular exercise",
//     ],
//     vitalsHistory: [] as VitalsHistoryRecord[],
//   },
//   {
//     id: "A-1002",
//     patientName: "Priya Patel",
//     patientId: "P-1002",
//     patientAge: 47,
//     patientAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Priya Patel",
//     patientEmail: "priya.p@example.com",
//     patientPhone: "+91 87654 32109",
//     doctorName: "Dr. Sanjana Desai",
//     doctorId: "D-1002",
//     doctorAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Sanjana Desai",
//     specialty: "Dermatology",
//     date: "May 15, 2023",
//     time: "11:30 AM",
//     duration: "45 minutes",
//     type: "Consultation",
//     status: "Confirmed",
//     location: "Main Clinic, Room 203",
//     notes:
//       "Initial consultation for skin condition. Patient has reported persistent rash on arms.",
//     previousComplaints: ["Skin rash", "Itching"],
//     previousDiagnosis: [],
//     previousPrescriptions: [],
//     previousInstructions: [],
//     vitalsHistory: [
//       {
//         date: "Apr 23, 2023",
//         blood_pressure: "140/88",
//         hemoglobin: 13.5,
//         glucose: 90,
//         sgpt: 25,
//         sgot: 30,
//         urea: 20,
//         systolic: 140,
//         diastolic: 88,
//       },
//       {
//         date: "May 1, 2023",
//         blood_pressure: "135/85",
//         hemoglobin: 13.8,
//         glucose: 92,
//         sgpt: 28,
//         sgot: 32,
//         urea: 22,
//         systolic: 135,
//         diastolic: 85,
//       },
//       {
//         date: "May 10, 2023",
//         blood_pressure: "130/80",
//         hemoglobin: 14.0,
//         glucose: 88,
//         sgpt: 26,
//         sgot: 29,
//         urea: 21,
//         systolic: 130,
//         diastolic: 80,
//       },
//     ],
//   },
//   {
//     id: "A-1003",
//     patientName: "Rahul Verma",
//     patientId: "P-1003",
//     patientAge: 33,
//     patientAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Rahul Verma",
//     patientEmail: "rahul.v@example.com",
//     patientPhone: "+91 76543 21098",
//     doctorName: "Dr. Vikram Mehta",
//     doctorId: "D-1003",
//     doctorAvatar:
//       "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Vikram Mehta",
//     specialty: "Neurology",
//     date: "May 15, 2023",
//     time: "2:15 PM",
//     duration: "60 minutes",
//     type: "Follow-up",
//     status: "Cancelled",
//     location: "Main Clinic, Room 302",
//     notes:
//       "Follow-up after MRI scan. Patient experiencing recurring headaches.",
//     previousComplaints: ["Recurring headaches", "Visual aura"],
//     previousDiagnosis: ["Migraine"],
//     previousPrescriptions: [],
//     previousInstructions: ["Avoid triggers", "Keep headache diary"],
//     vitalsHistory: [] as VitalsHistoryRecord[],
//   },
// ];

// Define normal ranges for vitals
const NORMAL_RANGES = {
  systolic: { min: 90, max: 120, unit: "mmHg" },
  diastolic: { min: 60, max: 80, unit: "mmHg" },
  heartRate: { min: 60, max: 100, unit: "bpm" },
  temperature: { min: 97, max: 99, unit: "°F" },
  oxygenSaturation: { min: 95, max: 100, unit: "%" },
  weight: { unit: "kg" },
  height: { unit: "cm" },
};

export default function AppointmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;
  const { toast } = useToast();
  const [appoinmentsList, setAppoinmentsList] = useState(APPOINTMENTS);
  const [openHealthCheckModal, setOpenHealthCheckModal] = useState(false);

  // State for patient records modal
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState(false);

  // State for appointment finalization
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // State for editable tags
  const [diagnosis, setDiagnosis] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<string[]>([]);
  const [prescriptions, setPrescriptions] = useState<
    {
      name: string;
      dosage: string;
      schedule: string;
      timeOfDay?: string[];
      withFood?: string;
    }[]
  >([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  // State for active vital tab
  const [activeVitalTab, setActiveVitalTab] = useState("bloodPressure");

  // Find the appointment by ID
  const appointment = appoinmentsList.find((app) => app.id === appointmentId);

  // Handle removing previous tags
  const handleRemovePreviousTag = (type: string, tag: string) => {
    // In a real app, this would call an API to update the patient's record
    console.log(`Removing ${type}: ${tag}`);
  };

  // Helper function to determine if a value is within normal range
  // const getStatus = (value: number, type: keyof typeof NORMAL_RANGES) => {
  //   const range = NORMAL_RANGES[type]
  //   if (!range.min || !range.max) return "normal" // Skip for values without ranges
  //   if (value < range.min) return "low"
  //   if (value > range.max) return "high"
  //   return "normal"
  // }

  // Helper function to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "high":
        return "destructive";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Handle finalize button click
  const handleFinalize = () => {
    // Check if any data has been entered
    if (
      complaints.length === 0 &&
      diagnosis.length === 0 &&
      prescriptions.length === 0 &&
      instructions.length === 0
    ) {
      toast({
        title: "No data entered",
        description:
          "Please enter at least one complaint, diagnosis, prescription, or instruction before finalizing.",
        variant: "destructive",
      });
      return;
    }
    setIsConfirmationOpen(true);
  };

  // Handle confirmation dialog confirm
  const handleConfirmFinalize = () => {
    setIsConfirmationOpen(false);
    setIsPreviewOpen(true);
  };

  // Handle saving the appointment
  const handleSaveAppointment = () => {
    // In a real app, this would save all the appointment data to the database
    setIsPreviewOpen(false);
    toast({
      title: "Appointment finalized",
      description: "The appointment has been successfully finalized and saved.",
      variant: "default",
    });

    // In a real app, we would redirect to the appointments list or update the status
    // For now, we'll just simulate a status change
    setTimeout(() => {
      router.push("/appointments");
    }, 1500);
  };

  if (!appointment) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-xl font-bold mb-2">Appointment Not Found</h1>
          <p className="text-muted-foreground mb-4 text-sm">
            The appointment you're looking for doesn't exist or has been
            removed.
          </p>
          <Button size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Get latest vitals
  const latestVitals =
    appointment.vitalsHistory && appointment.vitalsHistory.length > 0
      ? appointment.vitalsHistory[0]
      : null;

  const vitalsHistory = appointment.vitalsHistory || [];

  const formatVitalValue = (key: string, value: string) => {
    switch (key) {
      case "blood_pressure":
        return `${value} mmHg`;
      case "hemoglobin":
        return `${value} g/dL`;
      case "glucose":
        return `${value} mg/dL`;
      case "sgpt":
      case "sgot":
      case "urea":
        return `${value} U/L`;
      case "temprature":
        return `${value} °F`; // Or use °C if appropriate
      case "height":
        return `${value} cm`; // Or use inches/feet if required
      case "weight":
        return `${value} kg`; // Or use lbs if required
      default:
        return value;
    }
  };

  // Prepare data for charts
  const getChartData = (field: string) => {
    return vitalsHistory
      .filter((v) => v[field])
      .map((v) => {
        const val = v[field as keyof typeof v];
        if (field === "blood_pressure") {
          const [systolic, diastolic] =
            typeof val === "string" ? val.split("/").map(Number) : [0, 0];
          return {
            date: v.date,
            systolic,
            diastolic,
          };
        }
        return {
          date: v.date,
          value: Number(val),
        };
      });
  };

  const submitFunction = (data: any) => {
    setAppoinmentsList((prev: any) =>
      prev.map((app: any) => {
        if (app.id === appointmentId) {
          return {
            ...app,
            vitalsHistory: [
              ...app.vitalsHistory,
              {
                date: new Date().toLocaleDateString(),
                ...data,
              },
            ],
          };
        }
        return app;
      })
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold">Appointment Details</h1>
        </div>

        {/* Patient Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={appointment.patientAvatar || "/placeholder.svg"}
                  alt={appointment.patientName}
                />
                <AvatarFallback>
                  {appointment.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {appointment.patientName}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{appointment.patientId}</span>
                  <span>•</span>
                  <span>Age: {appointment.patientAge}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  {appointment.patientPhone}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      appointment.status === "Confirmed"
                        ? "default"
                        : appointment.status === "Completed"
                        ? "success"
                        : appointment.status === "Cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                    className={cn(
                      "text-xs py-0 h-6 flex items-center justify-center",
                      appointment.status === "Confirmed"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : appointment.status === "Completed" ||
                          appointment.status === "Cancelled"
                        ? "text-white"
                        : ""
                    )}
                  >
                    <span className="pt-[2px]">{appointment.status}</span>
                  </Badge>
                  <Badge
                    variant={"default"}
                    className={"bg-yellow-500 hover:bg-yellow-600 text-white"}
                  >
                    <span className="pt-[2px]">VIP</span>
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => setIsRecordsModalOpen(true)}
                >
                  <FileText2 className="h-3 w-3 mr-1" />
                  View Records
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details Card */}
        <Card>
          <CardContent className="p-3 space-y-3">
            {/* <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  {appointment.date}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Time</div>
                <div className="flex items-center text-sm">
                  <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                  {appointment.time} ({appointment.duration})
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Type</div>
                <div className="flex items-center text-sm">
                  <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                  {appointment.type}
                </div>
              </div>
            </div>

            <Separator className="my-2" /> */}

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Notes</div>
              <div className="text-xs p-2 bg-muted rounded-md">
                {appointment.notes}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information Card with Accordions */}
        <Card>
          <CardContent className="p-3">
            <Accordion
              type="multiple"
              defaultValue={["vitals", "complaints"]}
              className="space-y-2"
            >
              <AccordionItem value="vitals" className="border rounded-md">
                <AccordionTrigger className="py-2 px-2 text-sm font-medium hover:no-underline">
                  <div className="w-full flex items-center justify-between">
                    <span>Vitals</span>

                    <span
                      className="text-sm mr-2 py-1 px-2 bg-blue-500 rounded-md text-white"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion toggle
                        setOpenHealthCheckModal(true);
                      }}
                    >
                      Add vitals
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 px-2">
                  {latestVitals ? (
                    <div className="space-y-4">
                      {/* Latest Vitals Display */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.entries(latestVitals)
                          .filter(([key]) => key !== "date") // Exclude date field
                          .map(([key, value]) => {
                            // Find display name for the key
                            const displayName = (() => {
                              switch (key) {
                                case "blood_pressure":
                                  return "Blood Pressure";
                                case "hemoglobin":
                                  return "Hemoglobin";
                                case "glucose":
                                  return "Glucose";
                                case "sgpt":
                                  return "SGPT";
                                case "sgot":
                                  return "SGOT";
                                case "urea":
                                  return "Urea";
                                default:
                                  return (
                                    key.charAt(0).toUpperCase() +
                                    key.slice(1).replace(/_/g, " ")
                                  );
                              }
                            })();

                            return (
                              <div key={key} className="rounded-lg border p-2">
                                <div className="text-xs text-muted-foreground">
                                  {displayName}
                                </div>
                                <div className="text-sm font-medium">
                                  {formatVitalValue(key, value as string)}
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      {/* Vitals History Charts */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-medium flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Vitals History
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last recorded: {latestVitals.date}
                          </div>
                        </div>

                        <Tabs
                          value={activeVitalTab}
                          onValueChange={setActiveVitalTab}
                        >
                          <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 h-8">
                            <TabsTrigger
                              value="bloodPressure"
                              className="text-xs"
                            >
                              BP
                            </TabsTrigger>
                            <TabsTrigger value="hemoglobin" className="text-xs">
                              Hemoglobin
                            </TabsTrigger>

                            <TabsTrigger value="glucose" className="text-xs">
                              Glucose
                            </TabsTrigger>
                            <TabsTrigger value="temprature" className="text-xs">
                              Temprature
                            </TabsTrigger>

                            <TabsTrigger value="weight" className="text-xs">
                              Weight
                            </TabsTrigger>
                            <TabsTrigger value="height" className="text-xs">
                              Height
                            </TabsTrigger>
                          </TabsList>
                          {vitalsHistory.some((v) => v.blood_pressure) && (
                            <TabsContent value="bloodPressure" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart
                                    data={getChartData("blood_pressure")}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis
                                      domain={[60, 160]}
                                      tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="systolic"
                                      stroke="#ef4444"
                                      name="Systolic"
                                      dot={{ r: 3 }}
                                    />
                                    <Line
                                      type="monotone"
                                      dataKey="diastolic"
                                      stroke="#3b82f6"
                                      name="Diastolic"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}

                          {vitalsHistory.some((v) => v.hemoglobin) && (
                            <TabsContent value="hemoglobin" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getChartData("hemoglobin")}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#10b981"
                                      name="Hemoglobin"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}

                          {vitalsHistory.some((v) => v.glucose) && (
                            <TabsContent value="glucose" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getChartData("glucose")}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#f59e0b"
                                      name="Glucose"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}

                          {vitalsHistory.some((v) => v.temprature) && (
                            <TabsContent value="temprature" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getChartData("temprature")}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis
                                      domain={[97, 100]}
                                      tick={{ fontSize: 10 }}
                                    />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#f59e0b"
                                      name="Temprature"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}

                          {vitalsHistory.some((v) => v.weight) && (
                            <TabsContent value="weight" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getChartData("weight")}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#0ea5e9"
                                      name="Weight"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}

                          {vitalsHistory.some((v) => v.weight) && (
                            <TabsContent value="height" className="mt-2">
                              <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={getChartData("height")}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey="date"
                                      tick={{ fontSize: 10 }}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Line
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#0ea5e9"
                                      name="Height"
                                      dot={{ r: 3 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </TabsContent>
                          )}
                        </Tabs>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3 text-sm text-muted-foreground">
                      No vitals history available for this patient.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="complaints" className="border rounded-md">
                <AccordionTrigger className="py-2 px-2 text-sm font-medium hover:no-underline">
                  Complaints
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 px-2">
                  <EditableTagsArea
                    tags={complaints}
                    onChange={setComplaints}
                    placeholder="Enter patient complaints..."
                    previousTags={appointment.previousComplaints}
                    onRemovePrevious={(tag) =>
                      handleRemovePreviousTag("complaint", tag)
                    }
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="diagnosis" className="border rounded-md">
                <AccordionTrigger className="py-2 px-2 text-sm font-medium hover:no-underline">
                  Diagnosis
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 px-2">
                  <EditableTagsArea
                    tags={diagnosis}
                    onChange={setDiagnosis}
                    placeholder="Enter diagnosis..."
                    previousTags={appointment.previousDiagnosis}
                    onRemovePrevious={(tag) =>
                      handleRemovePreviousTag("diagnosis", tag)
                    }
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="prescriptions"
                className="border rounded-md"
              >
                <AccordionTrigger className="py-2 px-2 text-sm font-medium hover:no-underline">
                  Prescriptions
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 px-2">
                  <PrescriptionForm
                    prescriptions={prescriptions}
                    onChange={setPrescriptions}
                    previousPrescriptions={appointment.previousPrescriptions?.map(
                      (text: string) => {
                        // Try to parse existing prescriptions into structured format
                        const parts = (text as string).split(" - ");
                        if (parts.length >= 3) {
                          return {
                            name: parts[0],
                            dosage: parts[1],
                            schedule: parts.slice(2).join(" - "),
                            timeOfDay: [],
                            withFood: "",
                          };
                        }
                        return {
                          name: text,
                          dosage: "",
                          schedule: "",
                          timeOfDay: [],
                          withFood: "",
                        };
                      }
                    )}
                    onRemovePrevious={(prescription) =>
                      handleRemovePreviousTag(
                        "prescription",
                        `${prescription.name} - ${prescription.dosage} - ${prescription.schedule}`
                      )
                    }
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="instructions" className="border rounded-md">
                <AccordionTrigger className="py-2 px-2 text-sm font-medium hover:no-underline">
                  Instructions
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 px-2">
                  <EditableTagsArea
                    tags={instructions}
                    onChange={setInstructions}
                    placeholder="Enter patient instructions..."
                    previousTags={appointment.previousInstructions}
                    onRemovePrevious={(tag) =>
                      handleRemovePreviousTag("instruction", tag)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Finalize Appointment Button - Moved outside of accordion */}
        <Button
          className="w-full mt-2"
          onClick={handleFinalize}
          disabled={
            complaints.length === 0 &&
            diagnosis.length === 0 &&
            prescriptions.length === 0 &&
            instructions.length === 0
          }
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Finalize Appointment
        </Button>
      </div>

      {/* Patient Records Modal */}
      <PatientRecordsModal
        isOpen={isRecordsModalOpen}
        onClose={() => setIsRecordsModalOpen(false)}
        patientId={appointment.patientId}
        patientName={appointment.patientName}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmFinalize}
        title="Finalize Appointment"
        description="Are you sure you want to finalize this appointment? This will save all entered data and mark the appointment as completed."
        confirmText="Yes, Finalize"
        cancelText="Cancel"
      />

      {/* Appointment Summary Modal */}
      <Modal
        title="Prescription Preview"
        description="Review the prescription before finalizing"
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        showCloseButton={true}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Edit
            </Button>
            <Button onClick={handleSaveAppointment}>Save & Complete</Button>
          </div>
        }
      >
        <div>
          <PrescriptionPreview
            patientName={appointment.patientName}
            patientId={appointment.patientId}
            patientAge={appointment.patientAge}
            doctorName={appointment.doctorName || "Dr. Smith"}
            date={appointment.date}
            prescriptions={prescriptions}
            previousPrescriptions={appointment.previousPrescriptions?.map(
              (text) => {
                // Try to parse existing prescriptions into structured format
                const parts = (text as string).split(" - ");
                if (parts.length >= 3) {
                  return {
                    name: parts[0],
                    dosage: parts[1],
                    schedule: parts.slice(2).join(" - "),
                    timeOfDay: [],
                    withFood: "",
                  };
                }
                return {
                  name: text,
                  dosage: "",
                  schedule: "",
                  timeOfDay: [],
                  withFood: "",
                };
              }
            )}
            complaints={complaints}
            diagnosis={diagnosis}
            instructions={instructions}
            previousComplaints={appointment.previousComplaints}
            previousDiagnosis={appointment.previousDiagnosis}
            previousInstructions={appointment.previousInstructions}
          />
        </div>
      </Modal>

      <AddHealthCheckModal
        isOpen={openHealthCheckModal}
        onClose={() => setOpenHealthCheckModal(false)}
        submitFunction={submitFunction}
      />
    </MainLayout>
  );
}
