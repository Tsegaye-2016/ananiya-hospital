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
          <Route path='/ananiya-webs/signup' element={<Signup />}/>
          <Route path='/ananiya-webs/signin' element={<Signin />}/>
          <Route path="/ananiya-webs" element={<HomePage />} />
          <Route path="/ananiya-webs/services" element={<ServicePage />}/>
          <Route path="/ananiya-webs/prices" element={<PricePage />}/>
          <Route path="/ananiya-webs/about" element={<AboutPage />}/>
          <Route path='/ananiya-webs/team' element={<TeamPage />} />
          <Route path='/ananiya-webs/search' element={<SearchPage />} />
          <Route path='/ananiya-webs/testimonial' element={<TestimonalPage />} />
          <Route path='/ananiya-webs/appointment' element={<AppointmentPage />} />
          <Route path='/ananiya-webs/contact' element={<ContactPage />} />
          <Route path='/ananiya-webs/patient-info' element={<PatientInfo />} />
          <Route path='/ananiya-webs/patients' element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
              }/>
          <Route path='/ananiya-webs/patient' element={
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
