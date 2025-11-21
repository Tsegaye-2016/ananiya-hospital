import React,{ useState} from 'react'
import { patientService } from '../../../Services/PatientService';
import dayjs from 'dayjs';
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
          <div className="row mb-3">
          <div className="col-md-4 col-12">
            <p><strong>Name:</strong> {patientData.patient.first_name} {patientData.patient.last_name}</p>
          </div>
          <div className="col-md-4 col-12">
            <p><strong>Gender:</strong> {patientData.patient.gender}</p>
          </div>
          <div className="col-md-4 col-12">
            <p><strong>DOB:</strong> {dayjs(patientData.patient.dob).format("MMMM D, YYYY")}</p>
          </div>
          <div className="col-md-4 col-12">
            <p><strong>Biometric Number:</strong> {patientData.patient.biometric_id}</p>
          </div>
          <div className="col-md-4 col-12">
            <p><strong>Passport Number:</strong> {patientData.patient.passport_number}</p>
          </div>
        </div>

          <h3 className="mt-4">Medical Certificates</h3>
          {patientData.medicalCertificates.map((mc) => (
          <div key={mc.id} className="card mb-3 shadow-sm p-3">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Medical Certificate - {dayjs(mc.declaration_date).format("MMMM D, YYYY")}</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-2"><strong>Weight:</strong> {mc.weight} kg</div>
                <div className="col-md-6 mb-2"><strong>Height:</strong> {mc.height} cm</div>
                <div className="col-md-6 mb-2"><strong>Previous Illness:</strong> {mc.previous_illness_history}</div>
                <div className="col-md-6 mb-2"><strong>Hospital History:</strong> {mc.hospitalization_history}</div>
                <div className="col-md-6 mb-2"><strong>General Appearance:</strong> {mc.general_appearance}</div>
                <div className="col-md-6 mb-2"><strong>Hearing Ability:</strong> {mc.hearing_ability}</div>
                <div className="col-md-6 mb-2"><strong>Vision Accuracy:</strong> {mc.vision_accuracy}</div>
                <div className="col-md-6 mb-2"><strong>Respiratory System:</strong> {mc.respiratory_system}</div>
                <div className="col-md-6 mb-2"><strong>Cardiovascular System:</strong> {mc.cardiovascular_system}</div>
                <div className="col-md-6 mb-2"><strong>Nervous System:</strong> {mc.nervous_system}</div>
                <div className="col-md-6 mb-2"><strong>Pregnancy Status:</strong> {mc.pregnancy_status}</div>
                <div className="col-md-6 mb-2"><strong>RBS Level:</strong> {mc.rbs_level}</div>
                <div className="col-md-6 mb-2"><strong>Urine Analysis:</strong> {mc.urine_analysis}</div>
                <div className="col-md-6 mb-2"><strong>Liver Function:</strong> {mc.liver_function}</div>
                <div className="col-md-6 mb-2"><strong>Renal Function:</strong> {mc.renal_function}</div>
                <div className="col-md-6 mb-2"><strong>ESR Level:</strong> {mc.esr_level}</div>
                <div className="col-md-6 mb-2"><strong>CBC Count:</strong> {mc.cbc_count}</div>
                <div className="col-md-6 mb-2"><strong>HBsAg:</strong> {mc.hbsag}</div>
                <div className="col-md-6 mb-2"><strong>HcAb:</strong> {mc.heab}</div>
                <div className="col-md-6 mb-2"><strong>VDRL:</strong> {mc.vdrl}</div>
                <div className="col-md-6 mb-2"><strong>HIV Test:</strong> {mc.hiv_test}</div>
                <div className="col-md-6 mb-2"><strong>Blood Film:</strong> {mc.blood_film}</div>
                <div className="col-md-6 mb-2"><strong>Chest X-Ray:</strong> {mc.chest_xray}</div>
                <div className="col-md-6 mb-2"><strong>ECG:</strong> {mc.ecg}</div>
                <div className="col-md-6 mb-2"><strong>LFT:</strong> {mc.lft}</div>
                <div className="col-md-6 mb-2"><strong>RFT:</strong> {mc.rft}</div>
              </div>
            </div>
          </div>
        ))}

        </div>
      )}
      <button className="btn btn-success mt-3" onClick={downloadPDF}>Download PDF</button>
    </div>
  )
}

export default PatientInfo
