const medicalCertificateService = require("../services/medicalCertificate.service");

async function createMedicalCertificate(req, res) {
  try {
    const patientId = req.params.patientId; // from clicked patient in frontend

    const certificateData = {
      ...req.body,
      patient_id: patientId,
    };

    const result = await medicalCertificateService.createMedicalCertificate(certificateData);

    return res.status(201).json({
      message: "Medical certificate created successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error in medicalCertificate.controller.js:", error);

    return res.status(500).json({
      message: "Error creating medical certificate",
      error: error.message,
    });
  }
}

module.exports = { createMedicalCertificate };
