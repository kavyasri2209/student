import React from "react";
import {
  FiMenu, FiLogIn, FiArrowRight, FiShield, FiZap, FiCheckCircle,
  FiUsers, FiBookOpen, FiBarChart2, FiCalendar, FiBell
} from "react-icons/fi";
import "./LandingPage.css";
import s1 from "../Images/s1.jpg";
import s2 from "../Images/s2.jpg";
import s3 from "../Images/s3.jpg";
import s4 from "../Images/s4.jpg";

const LandingPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lp">

      {/* NAVBAR */}
      <header className="lp-nav">
        <div className="lp-logo">EduTrack</div>

        <nav className={`lp-links ${open ? "open" : ""}`}>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#roles">Roles</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="lp-actions">
          <button className="lp-btn ghost">
            <FiLogIn /> Login
          </button>

          <button className="lp-btn primary">
            Start Free <FiArrowRight />
          </button>

          <button className="lp-burger" onClick={() => setOpen(!open)}>
            <FiMenu />
          </button>
        </div>
      </header>

      {/* CAROUSEL */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2500"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={s1} className="d-block w-100 hero-img" alt="slide1" />
            <div className="carousel-caption">
              <h2>Manage Students Effortlessly</h2>
              <p>Track, update, and organize academic data in one place.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={s2} className="d-block w-100 hero-img" alt="slide2" />
            <div className="carousel-caption">
              <h2>Smart Attendance Tracking</h2>
              <p>Mark daily attendance & generate monthly reports.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={s3} className="d-block w-100 hero-img" alt="slide3" />
            <div className="carousel-caption">
              <h2>Performance Insights</h2>
              <p>Analyze grades and track student progress instantly.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={s4} className="d-block w-100 hero-img" alt="slide4" />
            <div className="carousel-caption">
              <h2>Generate Reports Easily</h2>
              <p>Create & share academic reports within seconds.</p>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* 4 Blocks Under Carousel */}
      <div className="carousel-bottom-box">

        <div className="info-block b1">
          <h3>Download Area</h3>
          <p>Access timetables, academic calendars, and study materials.</p>
          <a href="#">Read More →</a>
        </div>

        <div className="info-block b2">
          <h3>Opening Hours</h3>
          <p>Mon–Fri: 9:00 AM – 5:00 PM<br />Sat: 10:00 AM – 2:00 PM</p>
        </div>

        <div className="info-block b3">
          <h3>Find Your Course</h3>
          <p>Search by level, category, and duration.</p>
          <a href="#">Search →</a>
        </div>

        <div className="info-block b4">
          <h3>Admissions</h3>
          <p>Admissions for the new academic year are open now.</p>
          <a href="#">Apply Now →</a>
        </div>

      </div>

      {/* CIRCLE SECTION */}
      <section className="circle-section">

  <div className="circle-left">

    {/* MEDIUM CIRCLE (same position) */}
    <div className="circle medium-circle">
      <img src={s2} alt="medium" />
    </div>

    {/* TOP-RIGHT FLOATING TEXT */}
    <div className="float-text ft1">
      <h4>Smart Learning</h4>
      <p>Interactive online classes.</p>
    </div>

    {/* FLOATING TEXT ON BIG CIRCLE (shift slightly left) */}
    <div className="float-text ft2">
      <h4>20,000+ Students</h4>
      <p>Trusted by institutes.</p>
    </div>

    {/* NEW FLOATING TEXT LEFT-BOTTOM OF BIG CIRCLE */}
    <div className="float-text ft3">
      <h4>Secure System</h4>
      <p>Data protected & encrypted.</p>
    </div>

    {/* BIG CIRCLE (same position) */}
    <div className="circle big-circle">
      <img src={s1} alt="big" />
    </div>

  </div>

  <div className="circle-right">
    <h1>Wplms. Social. University</h1>
    <p>Join over 20,000 universities and startups.</p>
    <button className="discover-btn">Discover More</button>
  </div>

</section>



      {/* FEATURES SECTION */}
      <section className="lp-section" id="features">
        <h2>Everything Your School Needs</h2>
        <p className="lp-sub">All essential modules for modern student management</p>

        <div className="lp-grid">
          <div className="lp-card"><FiUsers className="ico" /><h3>Student Management</h3><p>Add, edit, and organize student data easily.</p></div>
          <div className="lp-card"><FiBarChart2 className="ico" /><h3>Attendance</h3><p>Daily marking + automatic monthly reports.</p></div>
          <div className="lp-card"><FiBookOpen className="ico" /><h3>Grades</h3><p>Subject-wise marks + performance tracking.</p></div>
          <div className="lp-card"><FiBell className="ico" /><h3>Notices</h3><p>Daily updates, exam alerts & announcements.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section alt" id="how">
        <h2>How It Works</h2>

        <div className="lp-steps" style={{ marginTop: "30px" }}>
          <div className="lp-step"><img src="https://www.shutterstock.com/image-photo/sign-online-registration-form-register-600nw-2486327787.jpg" alt="" />Create Account</div>
          <div className="lp-step"><img src="https://img.freepik.com/free-photo/young-woman-attend-courses-girl-student-studying-holding-notebooks-showing-thumb-up-approval-recommending-company-standing-blue-background_1258-70145.jpg" alt="" />Add Students</div>
          <div className="lp-step"><img src="https://akriviahcm.com/blog/wp-content/uploads/2024/03/Features-of-time-and-attendance-system.jpg" alt="" />Track Attendance & Grades</div>
          <div className="lp-step"><img src="https://media.istockphoto.com/id/1456192121/photo/close-up-photo-of-woman-hands-writing-report-on-a-paper-in-the-cafe.jpg" alt="" />Share Reports</div>
        </div>
      </section>

      {/* ROLES */}
      <section className="lp-section" id="roles">
        <h2>Designed for Everyone</h2>

        <div className="lp-grid roles" style={{ marginTop: "30px" }}>
          <div className="lp-card role"><img src="https://www.shutterstock.com/image-photo/business-team-meeting-600nw-46954597.jpg" alt="img" /><h3>Administrators</h3><ul><li>Manage school data</li><li>Export reports</li><li>Approve changes</li></ul></div>
          <div className="lp-card role"><img src="https://media.istockphoto.com/id/1481370752/photo/two-colleagues-working-on-laptop-in-office-female-hispanic-help-desk-coordinator-collaborates.jpg" alt="img" /><h3>Coordinators</h3><ul><li>Manage sections</li><li>Plan academic calendar</li><li>Monitor performance</li></ul></div>
          <div className="lp-card role"><img src="https://media.istockphoto.com/id/1430133631/photo/young-teacher-helping-teenager-students-at-college-learning-technology-and-science-in.jpg" alt="img" /><h3>Teachers</h3><ul><li>Mark attendance</li><li>Enter grades</li><li>Track class progress</li></ul></div>
          <div className="lp-card role"><img src="https://st4.depositphotos.com/12985790/21900/i/450/depositphotos_219003960-stock-photo-portrait-focused-woman-headphones-taking.jpg" alt="img" /><h3>Students</h3><ul><li>Attendance %</li><li>Grades overview</li><li>Notices & events</li></ul></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section alt" id="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="lp-faq">
          <details><summary>Is EduTrack free?</summary><p>Yes, the basic version is completely free.</p></details>
          <details><summary>Is data secure?</summary><p>All data stays in your browser unless exported.</p></details>
          <details><summary>Does it work offline?</summary><p>Yes! EduTrack works without internet.</p></details>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} EduTrack — Smart Management for Smart Schools</p>
      </footer>

    </div>
  );
};

export default LandingPage;
