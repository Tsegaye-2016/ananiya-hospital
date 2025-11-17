const express = require('express');
const cors = require('cors');
const pool = require('./config/db.config');
require('dotenv').config();
const authRoutes = require('./routes/auth.route.js');
const patientRoutes = require('./routes/patient.route.js');
const medicalCertificateRoutes = require('./routes/medicalCertificate.route.js');
const app = express();
//middleware 
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.use('/api/auth', authRoutes);
app.use(patientRoutes);
app.use(medicalCertificateRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});