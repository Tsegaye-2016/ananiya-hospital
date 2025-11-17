const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const auth = require("../middleware/auth.middleware");
const { route } = require("./auth.route");

// Routes
router.post("/api/patient", auth, patientController.createPatient);
router.get("/api/patients", auth, patientController.getPatients);
router.get("/api/patient/:biometricId", patientController.getPatientByBiometric);
router.get("/api/patient/download/:biometricId", patientController.downloadPatientPDF);
module.exports = router;