# Clinic Management Backend Server

This is a Node.js backend server for the Clinic Management System. It provides all the necessary API endpoints for the frontend to interact with.

## Setup

1. Clone this repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file in the root directory with the following content:
   \`\`\`
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   \`\`\`
4. Seed the database:
   \`\`\`
   npm run seed
   \`\`\`
5. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register a new user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/:id` - Update a patient
- `DELETE /api/patients/:id` - Delete a patient
- `GET /api/patients/:id/appointments` - Get patient appointments
- `GET /api/patients/:id/medical-records` - Get patient medical records
- `GET /api/patients/:id/vitals` - Get patient vitals

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create a new doctor
- `PUT /api/doctors/:id` - Update a doctor
- `DELETE /api/doctors/:id` - Delete a doctor
- `GET /api/doctors/:id/appointments` - Get doctor appointments
- `GET /api/doctors/:id/patients` - Get doctor patients

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create a new appointment
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Delete an appointment

### Staff
- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff by ID
- `POST /api/staff` - Create a new staff
- `PUT /api/staff/:id` - Update a staff
- `DELETE /api/staff/:id` - Delete a staff

### Medical Records
- `GET /api/medical-records` - Get all medical records
- `GET /api/medical-records/:id` - Get medical record by ID
- `POST /api/medical-records` - Create a new medical record
- `PUT /api/medical-records/:id` - Update a medical record
- `DELETE /api/medical-records/:id` - Delete a medical record
- `GET /api/medical-records/vitals` - Get vitals
- `POST /api/medical-records/vitals` - Create vitals
- `PUT /api/medical-records/vitals/:id` - Update vitals
- `DELETE /api/medical-records/vitals/:id` - Delete vitals

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Test Users

- Admin: admin@docmitr.com / admin123
- Doctor: ananya.gupta@docmitr.com / doctor123

## Development

For development, you can use:
\`\`\`
npm run dev
\`\`\`

This will start the server with nodemon, which will automatically restart the server when you make changes to the code.
