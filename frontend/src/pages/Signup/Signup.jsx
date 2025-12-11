import React,{useState} from 'react'
import { signup } from '../../Services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
    const [form, setForm] = useState({name:"", email:"", password:""});
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
       try {
            const res = await signup(form);

            // Backend error (e.g., user already exists)
            if (!res.user && res.message) {
            setMsg(res.message);
            setMsgType("error");
            return;
            }

             // Success
            setMsg("Signup successful! Redirecting to login...");
            setMsgType("success");

            // Clear the input fields ✔️
            setForm({ name: "", email: "", password: "" });
            // Navigate to Signin page after 1 second
            setTimeout(() => {
            navigate("/ananiya-webs/signin");
            }, 1000);
        } catch (err) {
            setMsg("Something went wrong!");
        }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Signup</button>

          <div className="mt-3 text-center">
            <small>
              Already have an account? <Link className="btn btn-outline-primary px-3" to="/ananiya-webs/signin">Signin</Link>
            </small>
          </div>
        </form>

        {/* Display message */}
        {msg && (
          <div
            className={`alert mt-3 text-center ${
              msgType === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup
