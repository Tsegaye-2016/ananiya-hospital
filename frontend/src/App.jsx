import { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Topbar from './component/Topbar/Topbar'
import Navbar from './component/Navbar/Navbar'
import Hero from './component/Hero/Hero'
import About from './component/About/About'
import Services from './component/Services/Services'
import Appointment from './component/Appointment/Appointment'
import Pricing from './component/Pricing/Pricing'
import Team from './component/Team/Team'
import Search from './component/Search/Search'
import Testimonial from './component/Testimonial/Testimonial'
import Blog from './component/Blog/Blog'
import Footer from './component/Footer/Footer'
import ServicePage from './pages/service/ServicePage'
import PricePage from './pages/price/PricePage'
import AboutPage from './pages/about/AboutPage'
import HomePage from './pages/home/HomePage'
import TeamPage from './pages/team/TeamPage'
import SearchPage from './pages/search/SearchPage'
import TestimonalPage from './pages/testimonal/TestimonalPage'
import AppointmentPage from './pages/appointment/AppointmentPage'
import ContactPage from './pages/contact/ContactPage'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import AddPatient from './component/Patient/AddPatient/AddPatient'
import PatientList from './component/Patient/PatientList/PatientList'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './context/ProtectedRoute'
import AddMedicalCertificate from './component/MedicalCertificate/AddMedicalCertificate'
import MedicalCertificatePage from './pages/MedicalCertificate/MedicalCertificatePage'
import PatientInfo from './component/Patient/PatientInfo/PatientInfo'
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {!isLoggedIn && <Topbar />}
      {!isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />}/>
          <Route path="/prices" element={<PricePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path='/team' element={<TeamPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/testimonial' element={<TestimonalPage />} />
          <Route path='/appointment' element={<AppointmentPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/patient-info' element={<PatientInfo />} />
          <Route path='/patients' element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
              }/>
          <Route path='/patient' element={
              <ProtectedRoute>
                  <AddPatient />
              </ProtectedRoute>}/>
            <Route path="/medicalcertificate/:patientId" element={
                <ProtectedRoute>
                    <MedicalCertificatePage />
                </ProtectedRoute>} />
        </Routes>

      {/* {!isLoggedIn &&} */}
       <Footer />
    </>
  )
}

export default App
