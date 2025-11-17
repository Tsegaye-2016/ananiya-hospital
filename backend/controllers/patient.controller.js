const patientService = require('../services/patient.service');

// const PDFDocument = require("pdfkit");
const puppeteer = require("puppeteer");
const QRCode = require("qrcode");
async function createPatient(req, res) {
    try {
        const patient = {
            ...req.body,
            created_by:req.user.id
        };
        const result = await patientService.createPatient(patient);
        
        return res.status(201).json({
            message: "Patient created successfully",
            data: result,
        });

    } catch (error) {
        console.error("Error in patient.controller.js:", error);

    return res.status(500).json({
      message: "Error creating patient",
      error: error.message,
    });
  }
    
}
async function getPatients(req, res) {
    try {
        const patients = await patientService.getPatients();
        return res.status(200).json({
            message: "Patients fetched successfully",
            data: patients,
        });
    } catch (error) {
        console.error("Error in patient.controller.js:", error);
        return res.status(500).json({
        message: "Error fetching patients",
        error: error.message,
        });
    }
}
async function getPatientByBiometric(req, res) {
    try {
    const { biometricId } = req.params;

    const data = await patientService.getPatientByBiometric(biometricId);

    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetchPatientByBiometric:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
const downloadPatientPDF = async (req, res) => {
  try {
    const { biometricId } = req.params;
    const data = await patientService.getPatientByBiometric(biometricId);

    if (!data) return res.status(404).json({ message: "Patient not found" });

    const { patient, medicalCertificates } = data;

    // Generate HTML with logo and CSS
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            header { text-align: center; margin-bottom: 20px; }
            header img { width: 120px; }
            h1 { color: #1a73e8; margin-bottom: 5px; }
            .patient-info, .certificate-info { margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <header>
            <img src="https://yourserver.com/logo.png" alt="Hospital Logo" />
            <h1>Medical Certificate</h1>
          </header>

          <div class="patient-info">
            <strong>Name:</strong> ${patient.first_name} ${patient.last_name} <br/>
            <strong>Gender:</strong> ${patient.gender} <br/>
            <strong>DOB:</strong> ${patient.dob} <br/>
            <strong>Phone:</strong> ${patient.phone} <br/>
            <strong>Address:</strong> ${patient.address} <br/>
          </div>

          <h2>Medical Certificates</h2>
          ${medicalCertificates
            .map(
              (mc, idx) => `
            <div class="certificate-info">
              <h3>Certificate #${idx + 1}</h3>
              <table>
                <tr><th>Declaration Date</th><td>${mc.declaration_date}</td></tr>
                <tr><th>Previous Illness History</th><td>${mc.previous_illness_history}</td></tr>
                <tr><th>Hospitalization History</th><td>${mc.hospitalization_history}</td></tr>
                <tr><th>General Appearance</th><td>${mc.general_appearance}</td></tr>
                <tr><th>Hearing Ability</th><td>${mc.hearing_ability}</td></tr>
                <tr><th>Vision Accuracy</th><td>${mc.vision_accuracy}</td></tr>
                <tr><th>Respiratory System</th><td>${mc.respiratory_system}</td></tr>
                <tr><th>Cardiovascular System</th><td>${mc.cardiovascular_system}</td></tr>
              </table>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${patient.first_name}_${patient.last_name}_medical_certificate.pdf`
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error generating PDF" });
  }
};
module.exports = { downloadPatientPDF };

module.exports = {
    createPatient,
    getPatients,
    getPatientByBiometric,
    downloadPatientPDF
}