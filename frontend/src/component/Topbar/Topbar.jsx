import React,{useContext} from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/style.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
function Topbar() {

     const { isLoggedIn } = useContext(AuthContext);
  
    // Hide navbar when logged in
    if (isLoggedIn) return null;
  return (
     <div className="container-fluid py-2 border-bottom d-none d-lg-block">
      <div className="container">
        <div className="row">
          {/* Left side */}
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <a
                className="text-decoration-none text-body pe-3"
                href="tel:+0123456789"
              >
                <i className="bi bi-telephone me-2"></i>
                +012 345 6789
              </a>
              <span className="text-body">|</span>
              <a
                className="text-decoration-none text-body px-3"
                href="mailto:info@example.com"
              >
                <i className="bi bi-envelope me-2"></i>
                info@example.com
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="col-md-6 text-center text-lg-end">
            <div className="d-inline-flex align-items-center">
              <a className="text-body px-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-body px-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-body px-2" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-body px-2" href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-body ps-2" href="#">
                <i className="fab fa-youtube"></i>
              </a>
              {/* Desktop Buttons */}
              <div className="d-none d-lg-flex align-items-center ms-3">
                <Link to="/signup" className="btn btn-primary me-2 px-3">
                  Sign Up
                </Link>
                <Link to="/signin" className="btn btn-outline-primary px-3">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
