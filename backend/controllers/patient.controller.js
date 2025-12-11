const patientService = require('../services/patient.service');
// const PDFDocument = require("pdfkit");
const puppeteer = require("puppeteer");
const qrcode = require('qrcode');
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

    // Generate complete base64 logo
    const fs = require('fs');
    const path = require('path');
    const logoPath = path.join(__dirname, '../assets/ananiya.png'); 
    const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath, 'base64')}`;

    // Dynamically get base URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Generate QR Code with patient info
    const patientInfo = {
      biometricId: patient.biometric_id,
      name: `${patient.first_name} ${patient.last_name}`,
      gender: patient.gender,
      dob: `${calculateAge(patient.dob)} years old`,
      phone: patient.phone,
      passportNumber: patient.passport_number,
      verifyUrl: `${baseUrl}/api/patient/${patient.biometric_id}`, // dynamic URL
      medicalCertificates: medicalCertificates.map(mc => ({
        weight: mc.weight,
        height: mc.height,
        bmi: mc.weight && mc.height ? (mc.weight / ((mc.height / 100) ** 2)).toFixed(2) : null,
        previousIllnessHistory: mc.previous_illness_history,
        hospitalizationHistory: mc.hospitalization_history,
        generalAppearance: mc.general_appearance,
        hearingAbility: mc.hearing_ability,
        visionAccuracy: mc.vision_accuracy,
      }))
    };

    const qrcode = require('qrcode');
    const qrCodeBase64 = await qrcode.toDataURL(JSON.stringify(patientInfo), {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 200,
      margin: 1
    });

    // HTML template
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h4 { color: #1a73e8; margin-bottom: 5px; }
            .patient-container { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; margin-bottom: 20px; }
            .patient-details { flex: 1; min-width: 200px; }
            .qr-code { width: 150px; height: 150px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            a { color: #1a73e8; text-decoration: none; }
            /* Watermark styling */
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 200px;
              color: rgba(19, 148, 14, 0.2);
              z-index: 0;
              pointer-events: none;
              user-select: none;
            }
            .content { position: relative; z-index: 1; }
          </style>
        </head>
        <body>
         <!-- Watermark -->
         <div class="watermark">Ananiya Hospital</div>


      <div class="content">
          <div class="patient-container">
           <!-- Patient Photo Frame -->
              <div style="width:150px; height:140px; border: 3px solid #1a73e8; padding:5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); border-radius:8px;">
                <img src="" 
                    alt="Patient Photo" 
                    style="width:100%; height:100%; object-fit: cover; border-radius:5px;" />
              </div>
            <div class="patient-details">
              <div><strong>Name:</strong> ${patient.first_name} ${patient.last_name}</div>
              <div><strong>Gender:</strong> ${patient.gender}</div>
              <div><strong>Age:</strong> ${calculateAge(patient.dob)} years</div>
              <div><strong>Phone:</strong> ${patient.phone}</div>
              <div><strong>Address:</strong> ${patient.address}</div>
              <div><strong>Biometric ID:</strong> ${patient.biometric_id}</div>
              <div><strong>Passport Number:</strong> ${patient.passport_number}</div>
            </div>

            <div style="text-align:center; display:flex; flex-direction: column; align-items:center; gap:10px;">
              <!-- QR Code -->
              <img src="${qrCodeBase64}" alt="QR Code" class="qr-code" />
              
              <!-- Verification Link -->
              <div style="margin-top:8px; font-size:12px;">
                <a href="${patientInfo.verifyUrl}" target="_blank">Verify Patient</a>
              </div>
            </div>
          </div>


          ${medicalCertificates.map((mc) => `
            <div class="certificate-info">
              <table>
                <tr>
                  <th>Weight (kg)</th><td>${mc.weight}</td>
                  <th>Height (cm)</th><td>${mc.height}</td>  
                  <th>BMI</th><td>${mc.weight && mc.height ? (mc.weight / ((mc.height / 100) ** 2)).toFixed(2) : "-"}</td>
                </tr>
              </table>
              <h4>Examination Summary</h4>
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
              <h4>Laboratory Results</h4>
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
          `).join('')}
        </div>
        </body>
      </html>
    `;

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      margin: { top: "120px", bottom: "60px", left: "20px", right: "20px" },
      headerTemplate: `
        <div style="width:100%; font-size:12px; display:flex; align-items:center; flex-direction:column; ">
          <img src="${logoBase64}" alt="Logo" style="height:50px; object-fit: contain;" />
          <div style="text-align:center; flex:1; font-weight:bold; font-size:16px;">
            Medical Certificate
          </div>
          <div style="width:50px;"></div>
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

const verifyPatient = async (req, res) => {
  try {
    const { biometricId } = req.params;
    const patient = await patientService.getPatientByBiometric(biometricId);
    
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    
    res.json({
      verified: true,
      patient: {
        name: `${patient.first_name} ${patient.last_name}`,
        biometricId: patient.biometric_id,
        passportNumber: patient.passport_number
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};
// Helper function for age calculation
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
// module.exports = { downloadPatientPDF };

module.exports = {
    createPatient,
    getPatients,
    getPatientByBiometric,
    downloadPatientPDF,
    verifyPatient
}