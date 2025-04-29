import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { authRoutes } from "./routes/auth.js"
import { patientRoutes } from "./routes/patients.js"
import { doctorRoutes } from "./routes/doctors.js"
import { appointmentRoutes } from "./routes/appointments.js"
import { staffRoutes } from "./routes/staff.js"
import { medicalRecordRoutes } from "./routes/medical-records.js"
import { dashboardRoutes } from "./routes/dashboard.js"
import { authenticateToken } from "./middleware/auth.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/patients", authenticateToken, patientRoutes)
app.use("/api/doctors", authenticateToken, doctorRoutes)
app.use("/api/appointments", authenticateToken, appointmentRoutes)
app.use("/api/staff", authenticateToken, staffRoutes)
app.use("/api/medical-records", authenticateToken, medicalRecordRoutes)
app.use("/api/dashboard", authenticateToken, dashboardRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("Clinic Management API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
