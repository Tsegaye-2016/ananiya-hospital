import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Topbar />
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />}/>
          <Route path="/prices" element={<PricePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path='/team' element={<TeamPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/testimonial' element={<TestimonalPage />} />
          <Route path='/appointment' element={<AppointmentPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>

      <Footer /> 
    </>
  )
}

export default App
