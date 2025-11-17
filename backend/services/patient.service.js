const pool = require('../config/db.config');

async function createPatient(patient) {
    try {
        const patientQuery = "INSERT INTO patients(biometric_id,first_name,last_name,gender,dob,phone,address,passport_number,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
        const values = [
            patient.biometric_id,
            patient.first_name,
            patient.last_name,
            patient.gender,
            patient.dob,
            patient.phone,
            patient.address,
            patient.passport_number,
            patient.created_by
        ]
        const result = await pool.query(patientQuery, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating patient:", error);
        throw error;
    }
}
async function getPatients() {
    const patientQuery = "SELECT *FROM patients ORDER BY created_at DESC";
    const result = await pool.query(patientQuery);
    return result.rows;
}
const getPatientByBiometric = async (biometricId) => {
  try {
    // Fetch patient demographic info
    const patientResult = await pool.query(
      `SELECT id, first_name, last_name, gender, dob, phone, address, passport_number, biometric_id
       FROM patients 
       WHERE biometric_id = $1`,
      [biometricId]
    );

    if (patientResult.rows.length === 0) {
      return null; // patient not found
    }

    const patient = patientResult.rows[0];

    // Fetch medical certificates for the patient
    const medicalResult = await pool.query(
      `SELECT * FROM medical_certificate 
       WHERE patient_id = $1 
       ORDER BY declaration_date DESC`,
      [patient.id]
    );

    return {
      patient,
      medicalCertificates: medicalResult.rows,
    };
  } catch (error) {
    console.error("Error fetching patient by biometric:", error);
    throw error;
  }
};
module.exports = {
    createPatient,
    getPatients,
    getPatientByBiometric
}