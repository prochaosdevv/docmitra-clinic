"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Plus, User, Users } from "lucide-react";
import { AddAppointmentModal } from "./modals/add-appointment-modal";
import { useState } from "react";
import { AddPatientModal } from "./modals/add-patient-modal";

export function MobileNavigation() {
  const pathname = usePathname();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [addedPatient, setAddedPatient] = useState(null);

  // Updated isActive function to consider dashboard-related paths
  const isActive = (path: string, additionalPaths: string[] = []) => {
    if (path === pathname) return true;
    if (additionalPaths.some((p) => pathname === p)) return true;
    return false;
  };

  // Define the active and inactive colors
  const activeColor = "text-blue-500";
  const inactiveColor = "text-muted-foreground";

  // Dashboard-related paths that should highlight the Home icon
  const homePaths = ["/", "/dashboard", "/doctor-dashboard"];

  const handleAddPatient = (patient: any) => {
    setAddedPatient(patient);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/", homePaths) ? activeColor : inactiveColor
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/appointments"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/appointments") ? activeColor : inactiveColor
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Appointments</span>
        </Link>

        <div className="flex items-center justify-center w-full h-full">
          <button
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-primary-foreground rounded-full shadow-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        <Link
          href="/patients"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/patients") ? activeColor : inactiveColor
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Patients</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/profile") ? activeColor : inactiveColor
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>

      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        setOpenAddPatientModal={setOpenAddPatientModal}
        addedPatient={addedPatient} // Pass the added patient to the modal
      />

      <AddPatientModal
        isOpen={openAddPatientModal}
        onClose={() => setOpenAddPatientModal(false)}
        handleAddPatient={handleAddPatient}
      />
    </div>
  );
}
