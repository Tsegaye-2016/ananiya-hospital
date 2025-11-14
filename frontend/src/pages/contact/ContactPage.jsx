import React from 'react'

function ContactPage() {
  return (
    <div>
    <div className="container-fluid pt-5">
        <div className="container">
            <div className="text-center mx-auto mb-5" style={{maxWidth: "500px"}}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Any Questions?</h5>
                <h1 className="display-4">Please Feel Free To Contact Us</h1>
            </div>
            <div className="row g-5 mb-5">
                <div className="col-lg-4">
                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{height: "200px"}}>
                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{width: "100px", height: "70px", transform: "rotate(-15deg)"}}>
                            <i className="fa fa-2x fa-location-arrow text-white" style={{transform: "rotate(15deg)"}}></i>
                        </div>
                        <h6 className="mb-0">123 Street, New York, USA</h6>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{height: "200px"}}>
                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{width: "100px", height: "70px", transform: "rotate(-15deg)"}}>
                            <i className="fa fa-2x fa-phone text-white" style={{ transform: "rotate(15deg)"}}></i>
                        </div>
                        <h6 className="mb-0">+012 345 6789</h6>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{height: "200px"}}>
                        <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{width: "100px", height: "70px", transform: "rotate(-15deg)"}}>
                            <i className="fa fa-2x fa-envelope-open text-white" style={{ transform: "rotate(15deg)"}}></i>
                        </div>
                        <h6 className="mb-0">info@example.com</h6>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12" style={{height: "500px"}}>
                    <div className="position-relative h-100">
                        <iframe className="position-relative w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4957652689236!2d37.702929375621785!3d7.068372092934244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b195896289a025%3A0x3f6b0a07c1a4c1b6!2sAnaniya%20hospital!5e0!3m2!1sen!2set!4v1762869520851!5m2!1sen!2set"
                            frameborder="0" style={{border: 0}} allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center position-relative" style={{marginTop: "-200px", zIndex: 1}}>
                <div className="col-lg-8">
                    <div className="bg-white rounded p-5 m-5 mb-0">
                        <form>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{height:"55px"}} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{height:"55px"}} />
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control bg-light border-0" placeholder="Subject" style={{height:"55px"}} />
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control bg-light border-0" rows="5" placeholder="Message"></textarea>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ContactPage
