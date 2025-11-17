import React, { useState, useContext} from 'react'
import { signin } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
function Signin() {
    const [form, setForm] = useState({email:"", password:""});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) =>{
         e.preventDefault();
        try {
            const res = await signin(form);
            if(res.token){
                localStorage.setItem("token", res.token);
                setMsg("Signin successful!");

                // Clear the input fields ✔️
                setForm({ email: "", password: "" });
                // Navigate to Signin page after 1 second
                // setTimeout(() => {
                setIsLoggedIn(true);
                navigate("/patients");
                // }, 1000);

            }else{
                setMsg(res.message);
            }
        } catch (error) {
            setMsg("Something went wrong!");
        }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
          <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br/><br/>
        </div>
        <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br/><br/>
        </div>
        <button className="btn btn-primary me-2 px-3" type="submit">Signin</button>
      </form>

      {msg && <p style={{ marginTop: 10, color: "red" }}>{msg}</p>}
    </div>
    </div>
  )
}

export default Signin
