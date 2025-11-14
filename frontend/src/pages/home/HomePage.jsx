import React from 'react'
import Hero from '../../component/Hero/Hero'
import About from '../../component/About/About'
import Services from '../../component/Services/Services'
import Appointment from '../../component/Appointment/Appointment'
import Pricing from '../../component/Pricing/Pricing'
import Team from '../../component/Team/Team'
import Search from '../../component/Search/Search'
import Testimonial from '../../component/Testimonial/Testimonial'
import Footer from '../../component/Footer/Footer'
import Blog from '../../component/Blog/Blog'

function HomePage() {
  return (
    <div>
        <Hero />
        <About />
        <Services />
        <Appointment />
        <Pricing />
        <Team />
        <Search />
        {/* <Testimonial /> */}
        <Blog />
    </div>
  )
}

export default HomePage
