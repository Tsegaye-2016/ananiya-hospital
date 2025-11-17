import React, { useState} from 'react'
import { medicalCertificateService} from '../../Services/MedicalCertificate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from 'date-fns';
function AddMedicalCertificate({patientId}) {
    const [formData, setFormData] = useState({
    weight: "",
    height: "",
    previous_illness_history: "",
    hospitalization_history: "",
    declaration_date: "",
    general_appearance: "",
    hearing_ability: "",
    vision_accuracy: "",
    respiratory_system: "",
    cardiovascular_system: "",
    nervous_system: "",
    pregnancy_status: "",
    rbs_level: "",
    urine_analysis: "",
    liver_function: "",
    renal_function: "",
    esr_level: "",
    cbc_count: "",
    hbsag: "",
    heab: "",
    vdrl: "",
    hiv_test: "",
    blood_film: "",
    chest_xray: "",
    ecg: "",
    lft: "",
    rft: "",
  });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await medicalCertificateService.createMedicalCertificate(patientId,formData);
      setMessage("Medical certificate created successfully!");
      setError("");
      setFormData({
        weight: "",
        height: "",
        previous_illness_history: "",
        hospitalization_history: "",
        declaration_date: "",
        general_appearance: "",
        hearing_ability: "",
        vision_accuracy: "",
        respiratory_system: "",
        cardiovascular_system: "",
        nervous_system: "",
        pregnancy_status: "",
        rbs_level: "",
        urine_analysis: "",
        liver_function: "",
        renal_function: "",
        esr_level: "",
        cbc_count: "",
        hbsag: "",
        heab: "",
        vdrl: "",
        hiv_test: "",
        blood_film: "",
        chest_xray: "",
        ecg: "",
        lft: "",
        rft: "",
      })
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="container mt-3">
      <h3>Add Medical Certificate for Patient: {patientId}</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
          className="form-control mb-3"
        />
    <div className="mb-3">
        <label>Previous Illness History</label>
      <select name="previous_illness_history"  value={formData.previous_illness_history} onChange={handleChange} className="form-select">
        <option value="">Select</option>
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>
</div>
        <label>Hospitalization History</label>
        <select name="hospitalization_history" value={formData.hospitalization_history} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
        {/* <input
          type="date"
          name="declaration_date"
          placeholder="Declaration Date"
          value={formData.declaration_date}
          onChange={handleChange}
          className="form-control mb-3"
        /> */}
        <div className="mb-3">
              <DatePicker
                selected={formData.declaration_date ? new Date(formData.declaration_date) : null}
                onChange={(date) =>
                  handleChange({
                    target: { name: "declaration_date", value: date.toISOString().split("T")[0] }
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Select Declaration Date"
              />
            </div>
        <input
          type="text"
          name="general_appearance"
          placeholder="General Appearance"
          value={formData.general_appearance}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="hearing_ability"
          placeholder="Hearing Ability"
          value={formData.hearing_ability}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="vision_accuracy"
          placeholder="Vision Accuracy"
          value={formData.vision_accuracy}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="respiratory_system"
          placeholder="Respiratory System"
          value={formData.respiratory_system}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="cardiovascular_system"
          placeholder="Cardiovascular System"
          value={formData.cardiovascular_system}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="nervous_system"
          placeholder="Nervous System"
          value={formData.nervous_system}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <label>Pregnancy Status</label>
        <select name="pregnancy_status" value={formData.pregnancy_status} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <input
          type="text"
          name="rbs_level"
          placeholder="RBS Level"
          value={formData.rbs_level}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <label>Urin Analysis </label>
        <select name="urine_analysis" value={formData.urine_analysis} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <input
          type="text"
          name="liver_function"
          placeholder="Liver Function"
          value={formData.liver_function}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="renal_function"
          placeholder="Renal Function"
          value={formData.renal_function}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="esr_level"
          placeholder="ESR Level"
          value={formData.esr_level}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="cbc_count"
          placeholder="CBC Count"
          value={formData.cbc_count}
          onChange={handleChange}
          className="form-control mb-3"
        />
        
        <label>HBsAg</label>
        <select name="hbsag" value={formData.hbsag} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <label>HcAb</label>
        <select name="heab" value={formData.heab} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <label>VDRL</label>
        <select name="vdrl" value={formData.vdrl} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <label>HIV Test</label>
        <select name="hiv_test" value={formData.hiv_test} onChange={handleChange} className="form-select">
          <option value="">Select</option>
          <option value="YES">Negative</option>
          <option value="NO">Positive</option>
        </select>
        <input 
          type="text"
          name="blood_film" 
          placeholder="Blood Film"
          value={formData.blood_film}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="chest_xray"
          placeholder="Chest Xray"
          value={formData.chest_xray}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="ecg"
          placeholder="ECG"
          value={formData.ecg}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="lft"
          placeholder="LFT"
          value={formData.lft}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          type="text"
          name="rft"
          placeholder="RFT"
          value={formData.rft}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddMedicalCertificate
