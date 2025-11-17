import React,{ useState} from 'react'
import { patientService } from '../../../Services/PatientService';
const API_URL = import.meta.env.VITE_API_URL;
function PatientInfo() {
  const [biometricId, setBiometricId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPatientData(null);

    try {
      const data = await patientService.getPatientByBiometric(biometricId);
      setPatientData(data);
    } catch (err) {
      setError(err.message);
    }
  };
   const downloadPDF = () => {
    const url = `${API_URL}/api/patient/download/${biometricId}`;
    window.open(url, "_blank"); // opens the PDF in a new tab and allows download
  };
  return (
     <div className="container mt-4">
      <h2>Enter Your Biometric ID</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          value={biometricId}
          onChange={(e) => setBiometricId(e.target.value)}
          className="form-control mb-2"
          placeholder="Enter Biometric ID"
        />
        <button type="submit" className="btn btn-primary">Fetch Info</button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {patientData && (
        <div>
          <h3>Patient Info</h3>
          <p><strong>Name:</strong> {patientData.patient.first_name} {patientData.patient.last_name}</p>
          <p><strong>Gender:</strong> {patientData.patient.gender}</p>
          <p><strong>DOB:</strong> {patientData.patient.dob}</p>

          <h3 className="mt-4">Medical Certificates</h3>
          {patientData.medicalCertificates.map((mc) => (
            <div key={mc.id} className="card mb-2 p-2">
              <p><strong>Date:</strong> {mc.declaration_date}</p>
              <p><strong>General Appearance:</strong> {mc.general_appearance}</p>
              <p><strong>Hearing Ability:</strong> {mc.hearing_ability}</p>
              <p><strong>Vision Accuracy:</strong> {mc.vision_accuracy}</p>
              {/* Add other fields here */}
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-success mt-3" onClick={downloadPDF}>Download PDF</button>
    </div>
  )
}

export default PatientInfo
