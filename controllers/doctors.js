import { db, findById, findAll, create, update, remove } from "../db/index.js"

export const getDoctors = (req, res) => {
  try {
    const result = findAll("doctors", req.query)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getDoctorById = (req, res) => {
  try {
    const doctor = findById("doctors", req.params.id)

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" })
    }

    res.json(doctor)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createDoctor = (req, res) => {
  try {
    const newDoctor = create("doctors", req.body)
    res.status(201).json(newDoctor)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateDoctor = (req, res) => {
  try {
    const updatedDoctor = update("doctors", req.params.id, req.body)

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" })
    }

    res.json(updatedDoctor)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteDoctor = (req, res) => {
  try {
    const deletedDoctor = remove("doctors", req.params.id)

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" })
    }

    res.json({ message: "Doctor deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getDoctorAppointments = (req, res) => {
  try {
    const doctorId = req.params.id
    const appointments = db.appointments.filter((a) => a.doctorId === doctorId)

    // Enrich with patient information
    const enrichedAppointments = appointments.map((appointment) => {
      const patient = findById("patients", appointment.patientId)
      return {
        ...appointment,
        patient: patient
          ? {
              id: patient.id,
              name: `${patient.firstName} ${patient.lastName}`,
              avatar: patient.avatar,
            }
          : null,
      }
    })

    res.json({
      data: enrichedAppointments,
      pagination: {
        total: enrichedAppointments.length,
        page: 1,
        limit: enrichedAppointments.length,
        pages: 1,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getDoctorPatients = (req, res) => {
  try {
    const doctorId = req.params.id

    // Get all appointments for this doctor
    const appointments = db.appointments.filter((a) => a.doctorId === doctorId)

    // Get unique patient IDs
    const patientIds = [...new Set(appointments.map((a) => a.patientId))]

    // Get patient details
    const patients = patientIds.map((id) => findById("patients", id)).filter(Boolean)

    res.json({
      data: patients,
      pagination: {
        total: patients.length,
        page: 1,
        limit: patients.length,
        pages: 1,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
