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
     // 🔥 Base64 logo (PNG)
    const logoBase64 =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAYAAABNoSZLAAAABHNCSVQICAgIfAhkiAAAIABJREFUeJzt3X2QZHV9x/HfC+ShFYVUaCJlGkS0VYiVwCVVURqMisqGiBvUX0WK6KiAZKqKjRVVVBWFRqKqgoNQKCVJsohQEEgkGSdCEGASJg0kSEISQpnf993zszuzO+Xb3nntmZ2b2z8y533vOuXNndmbOzH333HN3fOc755xzznnOuTcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACE0pQMAAAAAAAAAAAAAAAAAAAAAgOV2CQAAAAAAAAAAAAAAAAAAAADgNW6SAwAAAAAAAAAAAAAAAAAAABhp2CQAAAAAAAAAAAAAAAAAAAADgNW6SAwAAAAAAAAAAAAAAAAAAABhp2CQAAAAAAAAAAAAAAAAAAAADgNW6SAwAAAAA…gTahSkCdJ7EYyCNDdIBwEBKYoiTYqACohIOaj0ItIUEFQUEZAQaq";
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

          <div class="patient-info" style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <div><strong>Name:</strong> ${patient.first_name} ${patient.last_name}</div>
            <div><strong>Gender:</strong> ${patient.gender}</div>
            <div>
            <strong>Age:</strong> 
            <script>
              const dob = new Date("${patient.dob}");
              const ageDifMs = Date.now() - dob.getTime();
              const ageDate = new Date(ageDifMs); // miliseconds from epoch
              document.write(Math.abs(ageDate.getUTCFullYear() - 1970));
            </script> years
          </div>
            <div><strong>Phone:</strong> ${patient.phone}</div>
            <div><strong>Address:</strong> ${patient.address}</div>
            <div><strong>Biometric ID:</strong> ${patient.biometric_id}</div>
            <div><strong>Passport Number:</strong> ${patient.passport_number}</div>
          </div>

          ${medicalCertificates
            .map(
              (mc, idx) => `
            <div class="certificate-info">
            <table>
              <tr>
                <th>Weight (kg)</th><td>${mc.weight}</td>
                <th>Height (cm)</th><td>${mc.height}</td>  
                <th>BMI</th><td>
                  ${
                    mc.weight && mc.height
                      ? (mc.weight / ((mc.height / 100) ** 2)).toFixed(2)
                      : "-"
                  }
                </td>
              </tr>
            </table>
              <h4 style="color: #1a73e8">Examination Summary</h4>
              <table>
                <tr><th>Previous Illness History</th><td>${mc.previous_illness_history}</td>
                <th>Hospitalization History</th><td>${mc.hospitalization_history}</td></tr>
                <tr><th>General Appearance</th><td>${mc.general_appearance}</td>
                <th>Hearing Ability</th><td>${mc.hearing_ability}</td></tr>
                <tr><th>Vision Accuracy</th><td>${mc.vision_accuracy}</td>
                <th>Respiratory System</th><td>${mc.respiratory_system}</td></tr>
                <tr><th>Cardiovascular System</th><td>${mc.cardiovascular_system}</td>
                <th>Nervious System</th><td>${mc.nervous_system}</td></tr>
                </table>
                <h4 style="color: #1a73e8">Laboratory Results</h4>
                <table>
                <tr><th>Pregnancy Status</th><td>${mc.pregnancy_status}</td>
                <th>RBS Level</th><td>${mc.rbs_level}</td></tr>
                <tr><th>Urine Analysis</th><td>${mc.urine_analysis}</td>
                <th>Liver Function</th><td>${mc.liver_function}</td></tr>
                <tr><th>Renal Function</th><td>${mc.renal_function}</td>
                <th>ESR Level</th><td>${mc.esr_level}</td></tr>
                <tr><th>CBC Count</th><td>${mc.cbc_count}</td>
                <th>HBsAg</th><td>${mc.hbsag}</td></tr> 
                <tr><th>HcAb</th><td>${mc.heab}</td>
                <th>VDRL</th><td>${mc.vdrl}</td></tr> 
                <tr><th>HIV Test</th><td>${mc.hiv_test}</td>
                <th>Blood Film</th><td>${mc.blood_film}</td></tr> 
                <tr><th>Chest X-Ray</th><td>${mc.chest_xray}</td>
                <th>ECG</th><td>${mc.ecg}</td></tr> 
                <tr><th>LFT</th><td>${mc.lft}</td>
                <th>RFT</th><td>${mc.rft}</td></tr> 
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

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      margin: { top: "120px", bottom: "60px", left: "20px", right: "20px" },
      headerTemplate: `
        <div style="width:100%; font-size:12px; display:flex; align-items:center; justify-content:space-between; padding:0 20px;">
          <img src="${logoBase64}" alt="Logo" style="height:50px;" />
          <div style="text-align:center; flex:1; font-weight:bold; font-size:16px;">
            Medical Certificate
          </div>
          <div style="width:50px;"></div> <!-- Empty space to balance the flex layout -->
        </div>
      `,
      footerTemplate: `
        <div style="width:100%; text-align:center; font-size:10px; padding:0 20px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });


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