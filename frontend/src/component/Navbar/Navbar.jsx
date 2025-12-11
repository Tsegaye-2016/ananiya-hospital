import React from "react";
import { Link, NavLink } from "react-router-dom";
import ananiya from "../../assets/img/ananiya.jpg";
import "./Navbar.css";

function Navbar() {
  // Function to close the navbar on mobile after clicking a link
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarCollapse");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <div className="container-fluid sticky-top bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
          
          {/* Brand */}
          <Link to="/ananiya-webs" className="navbar-brand">
            <img src={ananiya} alt="Logo" />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">

              <NavLink to="/ananiya-webs" className="nav-item nav-link" onClick={closeNavbar}>
                Home
              </NavLink>

              <NavLink to="/ananiya-webs/about" className="nav-item nav-link" onClick={closeNavbar}>
                About
              </NavLink>

              <NavLink to="/ananiya-webs/services" className="nav-item nav-link" onClick={closeNavbar}>
                Service
              </NavLink>

              <NavLink to="/ananiya-webs/prices" className="nav-item nav-link" onClick={closeNavbar}>
                Pricing
              </NavLink>

              {/* Dropdown */}
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Pages
                </a>
                <div className="dropdown-menu m-0">

                  <NavLink to="/ananiya-webs/patient-info" className="dropdown-item" onClick={closeNavbar}>
                    View Information
                  </NavLink>

                  <NavLink to="/ananiya-webs/blog" className="dropdown-item" onClick={closeNavbar}>
                    Blog Grid
                  </NavLink>

                  <NavLink to="/ananiya-webs/detail" className="dropdown-item" onClick={closeNavbar}>
                    Blog Detail
                  </NavLink>

                  <NavLink to="/ananiya-webs/team" className="dropdown-item" onClick={closeNavbar}>
                    The Team
                  </NavLink>

                  <NavLink to="/ananiya-webs/testimonial" className="dropdown-item" onClick={closeNavbar}>
                    Testimonial
                  </NavLink>

                  <NavLink to="/ananiya-webs/appointment" className="dropdown-item" onClick={closeNavbar}>
                    Appointment
                  </NavLink>

                  <NavLink to="/ananiya-webs/search" className="dropdown-item" onClick={closeNavbar}>
                    Search
                  </NavLink>

                </div>
              </div>

              <NavLink to="/ananiya-webs/contact" className="nav-item nav-link" onClick={closeNavbar}>
                Contact
              </NavLink>

              {/* Mobile Buttons */}
              <div className="d-lg-none mt-3">
                <NavLink to="/ananiya-webs/signup" className="btn btn-primary w-100 mb-2" onClick={closeNavbar}>
                  Sign Up
                </NavLink>

                <NavLink to="/ananiya-webs/signin" className="btn btn-outline-primary w-100" onClick={closeNavbar}>
                  Sign In
                </NavLink>
              </div>

            </div>
          </div>

        </nav>
      </div>
    </div>
  );
}

export default Navbar;
