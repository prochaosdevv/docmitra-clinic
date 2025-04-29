import express from "express"
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
  getDoctorPatients,
} from "../controllers/doctors.js"

const router = express.Router()

router.get("/", getDoctors)
router.get("/:id", getDoctorById)
router.post("/", createDoctor)
router.put("/:id", updateDoctor)
router.delete("/:id", deleteDoctor)
router.get("/:id/appointments", getDoctorAppointments)
router.get("/:id/patients", getDoctorPatients)

export const doctorRoutes = router
