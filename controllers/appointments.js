import { findById, findAll, create, update, remove } from "../db/index.js"

export const getAppointments = (req, res) => {
  try {
    const result = findAll("appointments", req.query)

    // Enrich with patient and doctor information
    const enrichedAppointments = result.data.map((appointment) => {
      const patient = findById("patients", appointment.patientId)
      const doctor = findById("doctors", appointment.doctorId)

      return {
        ...appointment,
        patient: patient
          ? {
              id: patient.id,
              name: `${patient.firstName} ${patient.lastName}`,
              avatar: patient.avatar,
            }
          : null,
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
      pagination: result.pagination,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getAppointmentById = (req, res) => {
  try {
    const appointment = findById("appointments", req.params.id)

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Enrich with patient and doctor information
    const patient = findById("patients", appointment.patientId)
    const doctor = findById("doctors", appointment.doctorId)

    const enrichedAppointment = {
      ...appointment,
      patient: patient
        ? {
            id: patient.id,
            name: `${patient.firstName} ${patient.lastName}`,
            avatar: patient.avatar,
          }
        : null,
      doctor: doctor
        ? {
            id: doctor.id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            specialization: doctor.specialization,
          }
        : null,
    }

    res.json(enrichedAppointment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createAppointment = (req, res) => {
  try {
    const newAppointment = create("appointments", req.body)
    res.status(201).json(newAppointment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateAppointment = (req, res) => {
  try {
    const updatedAppointment = update("appointments", req.params.id, req.body)

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    res.json(updatedAppointment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteAppointment = (req, res) => {
  try {
    const deletedAppointment = remove("appointments", req.params.id)

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    res.json({ message: "Appointment deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
