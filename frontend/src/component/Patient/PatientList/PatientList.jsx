import React, { useState, useEffect } from "react";
import { patientService } from "../../../Services/PatientService";
import { Link } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // SORTING
  const [sortField, setSortField] = useState("first_name");
  const [sortOrder, setSortOrder] = useState("asc");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // SEARCH & FILTER
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [dobFrom, setDobFrom] = useState("");
  const [dobTo, setDobTo] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await patientService.getPatients();
        setPatients(res.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // FILTER + SEARCH
  const filteredPatients = patients
    .filter((p) => {
      const text = searchTerm.toLowerCase();
      return (
        p.first_name.toLowerCase().includes(text) ||
        p.last_name.toLowerCase().includes(text) ||
        p.biometric_id.toLowerCase().includes(text) ||
        p.phone.toLowerCase().includes(text) ||
        p.address.toLowerCase().includes(text) ||
        p.passport_number.toLowerCase().includes(text)
      );
    })
    .filter((p) => (genderFilter ? p.gender === genderFilter : true))
    .filter((p) => (dobFrom ? p.dob >= dobFrom : true))
    .filter((p) => (dobTo ? p.dob <= dobTo : true));

  // SORTING
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // PAGINATION
  const totalPages = Math.ceil(sortedPatients.length / pageSize);
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <div className="text-center mt-5">Loading patients...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">

      {/* HEADER + ADD BUTTON */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h2 className="mb-2 mb-md-0 text-center text-md-start">Patient List</h2>
        <Link to="/ananiya-webs/patient">
          <button className="btn btn-primary w-100 w-md-auto">Add Patient</button>
        </Link>
      </div>

      {/* SEARCH & FILTER */}
      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, phone, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-2">
            <select
              className="form-control"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <input
              type="date"
              className="form-control"
              value={dobFrom}
              onChange={(e) => setDobFrom(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-3">
            <input
              type="date"
              className="form-control"
              value={dobTo}
              onChange={(e) => setDobTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("biometric_id")}>
                Biometric ID {sortField === "biometric_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("first_name")}>
                Name {sortField === "first_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("gender")}>
                Gender {sortField === "gender" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("dob")}>
                DOB {sortField === "dob" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Phone</th>
              <th>Address</th>
              <th>Passport</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.biometric_id}</td>
                {/* <td>{p.first_name} {p.last_name}</td> */}
                <td>
                <Link to={`/medicalcertificate/${p.id}`} className="text-primary" style={{ textDecoration: "none", cursor: "pointer" }}>
                  {p.first_name} {p.last_name}
                </Link>
              </td>
                <td>{p.gender}</td>
                <td>{p.dob}</td>
                <td>{p.phone}</td>
                <td>{p.address}</td>
                <td>{p.passport_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <nav>
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>

          {[...Array(totalPages).keys()].map((num) => (
            <li key={num + 1} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(num + 1)}>{num + 1}</button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PatientList;
