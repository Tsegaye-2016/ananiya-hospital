import React,{ useState} from 'react';
import { patientService } from '../../../Services/PatientService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
function AddPatient() {
    const [formData, setFormData] = useState({
        biometric_id: "",
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
        passport_number: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const result = await patientService.createPatient(formData);
            setMessage("Patient created successfully!");
            setError("");
            setFormData({
                biometric_id: "",
                first_name: "",
                last_name: "",
                gender: "",
                dob: "",
                phone: "",
                address: "",
                passport_number: "",
            });
            navigate("/ananiya-webs/patients");
        } catch (error) {
            setError(error.message);
        }
    }
  return (
     <div className="container mt-4" style={{ maxWidth: "500px" }}>
  <h2 className="mb-4 fw-bold">Create Patient</h2>

  {message && <div className="alert alert-success">{message}</div>}
  {error && <div className="alert alert-danger">{error}</div>}

  <form onSubmit={handleSubmit}>

    <div className="mb-3">
      <input
        type="text"
        name="biometric_id"
        placeholder="Biometric ID"
        value={formData.biometric_id}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="form-select"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

      <div className="mb-3">
      <DatePicker
        selected={formData.dob ? new Date(formData.dob) : null}
        onChange={(date) =>
          handleChange({
            target: { name: "dob", value: date.toISOString().split("T")[0] }
          })
        }
        dateFormat="yyyy-MM-dd"
        className="form-control"
        placeholderText="Select DOB"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <input
        type="text"
        name="passport_number"
        value={formData.passport_number}
        onChange={handleChange}
        placeholder="Passport Number"
        className="form-control"
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">
      Create Patient
    </button>
  </form>
</div>

  )
}

export default AddPatient
