import React from "react";
import {
  FiMenu, FiLogIn, FiArrowRight, FiShield, FiZap, FiCheckCircle,
  FiUsers, FiBookOpen, FiBarChart2, FiCalendar, FiBell
} from "react-icons/fi";
import "./LandingPage.css";

const LandingPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lp">

      {/* ✅ NAVBAR */}
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

      {/* ✅ HERO (NO IMAGE VERSION) */}
      <section className="lp-hero">
        <div className="lp-hero-text">
          <h1>
            Manage Your School <span>Smarter</span>
          </h1>

          <p>
            EduTrack helps schools manage students, attendance, grades, notices, and the academic
            calendar — all in one fast, simple, and modern platform.
          </p>

          <div className="lp-cta">
            <button className="lp-btn primary">
              Try EduTrack Free <FiArrowRight />
            </button>
            <button className="lp-btn ghost">Schedule Demo</button>
          </div>

          <ul className="lp-badges">
            <li><FiShield /> Secure</li>
            <li><FiZap /> Fast</li>
            <li><FiCheckCircle /> Easy</li>
          </ul>
        </div>

        {/* ✅ Circle gradient + floating cards instead of image */}
        <div className="lp-hero-art">
          <div className="lp-glow"></div>

          <div className="lp-float-card f1">
            <FiBarChart2 /> Attendance 96%
          </div>

          <div className="lp-float-card f2">
            <FiCalendar /> Exam on 28 Nov
          </div>

          <div className="lp-float-card f3">
            <FiBell /> 3 New Notices
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="lp-section" id="features">
        <h2>Everything Your School Needs</h2>
        <p className="lp-sub">All essential modules for modern student management</p>

        <div className="lp-grid">
          <div className="lp-card">
            <FiUsers className="ico" />
            <h3>Student Management</h3>
            <p>Add, edit, and organize student data easily.</p>
          </div>

          <div className="lp-card">
            <FiBarChart2 className="ico" />
            <h3>Attendance</h3>
            <p>Daily marking + automatic monthly reports.</p>
          </div>

          <div className="lp-card">
            <FiBookOpen className="ico" />
            <h3>Grades</h3>
            <p>Subject-wise marks + performance tracking.</p>
          </div>

          <div className="lp-card">
            <FiBell className="ico" />
            <h3>Notices</h3>
            <p>Daily updates, exam alerts & announcements.</p>
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS */}
      <section className="lp-section alt" id="how">
        <h2 >How It Works</h2>

        <div className="lp-steps " style={{marginTop:'30px'}}>
          <div className="lp-step"><img src="https://www.shutterstock.com/image-photo/sign-online-registration-form-register-600nw-2486327787.jpg" alt="Create Account" ></img>Create Account</div>
          <div className="lp-step"><img src="https://img.freepik.com/free-photo/young-woman-attend-courses-girl-student-studying-holding-notebooks-showing-thumb-up-approval-recommending-company-standing-blue-background_1258-70145.jpg?semt=ais_hybrid&w=740&q=80" alt="Add Students" ></img> Add Students</div>
          <div className="lp-step"><img src="https://akriviahcm.com/blog/wp-content/uploads/2024/03/Features-of-time-and-attendance-system.jpg" alt="Track Attendance & Grades" ></img> Track Attendance & Grades</div>
          <div className="lp-step"><img src="https://media.istockphoto.com/id/1456192121/photo/close-up-photo-of-woman-hands-writing-report-on-a-paper-in-the-cafe.jpg?s=612x612&w=0&k=20&c=PympWRSIEXmYzVgC1IStxPty1L5stVplu1HvaqrEuIs=" alt="Share Reports" ></img> Share Reports</div>
        </div>
      </section>

      {/* ✅ ROLES SECTION */}
      <section className="lp-section" id="roles">
        <h2>Designed for Everyone</h2>

        <div className="lp-grid roles" style={{marginTop:'30px'}}>
          <div className="lp-card role">
            <img  src="https://www.shutterstock.com/image-photo/business-team-meeting-600nw-46954597.jpg" alt="img"></img>
            <h3>Administrators</h3>
            <ul>
              <li>Manage school data</li>
              <li>Export reports</li>
              <li>Approve changes</li>
            </ul>
          </div>

          <div className="lp-card role">
            <img  src="https://media.istockphoto.com/id/1481370752/photo/two-colleagues-working-on-laptop-in-office-female-hispanic-help-desk-coordinator-collaborates.jpg?s=612x612&w=0&k=20&c=Ri3QjPVe8isWW48uwHOnk6pp7x66LIBYNSjJwjpUEwk=" alt="img"></img>
            <h3>Coordinators</h3>
            <ul>
              <li>Manage sections</li>
              <li>Plan academic calendar</li>
              <li>Monitor performance</li>
            </ul>
          </div>

          <div className="lp-card role">
            <img  src="https://media.istockphoto.com/id/1430133631/photo/young-teacher-helping-teenager-students-at-college-learning-technology-and-science-in.jpg?s=612x612&w=0&k=20&c=6l6irCGKHe9ggxMeD5QbS4fvIdsTLsmg8HZbpMsYFVE=" alt="img"></img>
            <h3>Teachers</h3>
            <ul>
              <li>Mark attendance</li>
              <li>Enter grades</li>
              <li>Track class progress</li>
            </ul>
          </div>

          <div className="lp-card role">
            <img  src="https://st4.depositphotos.com/12985790/21900/i/450/depositphotos_219003960-stock-photo-portrait-focused-woman-headphones-taking.jpg" alt="img"></img>
            <h3>Students</h3>
            <ul>
              <li>Attendance %</li>
              <li>Grades overview</li>
              <li>Notices & events</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ✅ FAQ */}
      <section className="lp-section alt" id="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="lp-faq">
          <details>
            <summary>Is EduTrack free?</summary>
            <p>Yes, the basic version is completely free.</p>
          </details>

          <details>
            <summary>Is data secure?</summary>
            <p>All data stays in your browser unless exported.</p>
          </details>

          <details>
            <summary>Does it work offline?</summary>
            <p>Yes! EduTrack works without internet.</p>
          </details>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} EduTrack — Smart Management for Smart Schools</p>
      </footer>
    </div>
  );
};

export default LandingPage;
