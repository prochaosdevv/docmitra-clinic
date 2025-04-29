import { db, findById, findAll, create, update, remove } from "../db/index.js"

export const getPatients = (req, res) => {
  try {
    const result = findAll("patients", req.query)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getPatientById = (req, res) => {
  try {
    const patient = findById("patients", req.params.id)

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" })
    }

    res.json(patient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createPatient = (req, res) => {
  try {
    const newPatient = create("patients", req.body)
    res.status(201).json(newPatient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updatePatient = (req, res) => {
  try {
    const updatedPatient = update("patients", req.params.id, req.body)

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" })
    }

    res.json(updatedPatient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deletePatient = (req, res) => {
  try {
    const deletedPatient = remove("patients", req.params.id)

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" })
    }

    res.json({ message: "Patient deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getPatientAppointments = (req, res) => {
  try {
    const patientId = req.params.id
    const appointments = db.appointments.filter((a) => a.patientId === patientId)

    // Enrich with doctor information
    const enrichedAppointments = appointments.map((appointment) => {
      const doctor = findById("doctors", appointment.doctorId)
      return {
        ...appointment,
        doctor: doctor
          ? {
              id: doctor.id,
              name: `${doctor.firstName} ${doctor.lastName}`,
              specialization: doctor.specialization,
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

export const getPatientMedicalRecords = (req, res) => {
  try {
    const patientId = req.params.id
    const records = db.medicalRecords.filter((r) => r.patientId === patientId)

    // Enrich with doctor information
    const enrichedRecords = records.map((record) => {
      const doctor = findById("doctors", record.doctorId)
      return {
        ...record,
        doctor: doctor
          ? {
              id: doctor.id,
              name: `${doctor.firstName} ${doctor.lastName}`,
              specialization: doctor.specialization,
            }
          : null,
      }
    })

    res.json({
      data: enrichedRecords,
      pagination: {
        total: enrichedRecords.length,
        page: 1,
        limit: enrichedRecords.length,
        pages: 1,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getPatientVitals = (req, res) => {
  try {
    const patientId = req.params.id
    const vitals = db.vitals.filter((v) => v.patientId === patientId)

    res.json({
      data: vitals,
      pagination: {
        total: vitals.length,
        page: 1,
        limit: vitals.length,
        pages: 1,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
