const express = require("express");
const router = express.Router();
const medicalCertificateController = require("../controllers/medicalCertificate.controller");
const auth = require("../middleware/auth.middleware");

// Routes
router.post("/api/medicalCertificate/:patientId", auth, medicalCertificateController.createMedicalCertificate);
module.exports = router;