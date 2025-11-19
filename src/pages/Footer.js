import React from 'react'

function Footer() {
  return (
    <div>
      {/* ====== FOOTER START ====== */}
      <footer className="bg-dark text-light pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row gy-4">
            {/* Logo + About */}
            <div className="col-lg-4 col-md-6">
              <div className="mb-3">
                <img src="your-logo.png" alt="Logo" style={{ height: '50px' }} />
              </div>
              <p className="small">
                The Student Management System is a modern platform to manage students, attendance, grades, and reports efficiently in one place.
              </p>
              <p className="small mb-0">
                © 2025 Student Management System. All rights reserved.
              </p>
            </div>

            {/* Links Section */}
            <div className="col-lg-2 col-md-6">
              <h6 className="text-uppercase fw-bold mb-3 text-info">SYSTEM</h6>
              <ul className="list-unstyled small">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Dashboard</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Courses</a></li>
                <li><a href="#" className="text-light text-decoration-none">Help</a></li>
              </ul>
            </div>

            {/* Terms Section */}
            <div className="col-lg-2 col-md-6">
              <h6 className="text-uppercase fw-bold mb-3 text-info">TERMS</h6>
              <ul className="list-unstyled small">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
                <li><a href="#" className="text-light text-decoration-none">SaaS Services</a></li>
              </ul>
            </div>

            {/* App Buttons */}
            <div className="col-lg-4 col-md-6">
              <h6 className="text-uppercase fw-bold mb-3 text-info">Download App</h6>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a href="#" className="btn btn-primary d-flex align-items-center justify-content-center px-3 rounded-pill" style={{ background: 'linear-gradient(45deg, #6a11cb, #2575fc)', border: 'none' }}>
                  <i className="bi bi-google-play me-2" /> Get it on Google Play
                </a>
                <a href="" className="btn btn-info text-white d-flex align-items-center justify-content-center px-3 rounded-pill" style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)', border: 'none' }}>
                  <i className="bi bi-apple me-2" /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ====== FOOTER END ====== */}

    </div>
  );
}

export default Footer;
