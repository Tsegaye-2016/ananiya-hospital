import React, { useContext } from 'react'
import { Link ,NavLink} from 'react-router-dom'
import ananiya from '../../assets/img/ananiya.jpg';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
function Navbar() {
   const { isLoggedIn } = useContext(AuthContext);

  // Hide navbar when logged in
  if (isLoggedIn) return null;
  return (
     <div className="container-fluid sticky-top bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
          {/* Brand */}
          <Link to="/ananiya-webs" className="navbar-brand">
              <img src={ananiya} alt="Logo" />
            <h1 className="m-0 text-uppercase text-primary">
              {/* <i className="fa fa-clinic-medical me-2"></i> */}
              {/* Ananiya */}
            </h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <NavLink to="/ananiya-webs" className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to="/ananiya-webs/about" className="nav-item nav-link">
                About
              </NavLink>
              <NavLink to="/ananiya-webs/services" className="nav-item nav-link">
                Service
              </NavLink>
              <NavLink to="/ananiya-webs/prices" className="nav-item nav-link">
                Pricing
              </NavLink>

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Pages
                </a>
                <div className="dropdown-menu m-0">
                  <NavLink to="/ananiya-webs/patient-info" className="dropdown-item">
                    View Information
                  </NavLink>
                  <NavLink to="/ananiya-webs/blog" className="dropdown-item">
                    Blog Grid
                  </NavLink>
                  <NavLink to="/ananiya-webs/detail" className="dropdown-item">
                    Blog Detail
                  </NavLink>
                  <NavLink to="/ananiya-webs/team" className="dropdown-item">
                    The Team
                  </NavLink>
                  <NavLink to="/ananiya-webs/testimonial" className="dropdown-item">
                    Testimonial
                  </NavLink>
                  <NavLink to="/ananiya-webs/appointment" className="dropdown-item">
                    Appointment
                  </NavLink>
                  <NavLink to="/ananiya-webs/search" className="dropdown-item">
                    Search
                  </NavLink>
                </div>
              </div>

              <NavLink to="/ananiya-webs/contact" className="nav-item nav-link">
                Contact
              </NavLink>
                {/* Mobile Buttons */}
            <div className="d-lg-none mt-3">
              <NavLink to="/ananiya-webs/signup" className="btn btn-primary w-100 mb-2">
                Sign Up
              </NavLink>
              <NavLink to="/ananiya-webs/signin" className="btn btn-outline-primary w-100">
                Sign In
              </NavLink>
            </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
