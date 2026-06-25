import { Link } from "react-router-dom";


export default function Sidebar({ username, role }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Courses</h1>
        <span className="logo-subtitle">Management System</span>
        <p>{username}</p>
        <p>{role}</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
        {role === "student" && 
          <Link to="/students/profile" className="nav-item">
            <span className="nav-icon">🪪</span>
            Profile
          </Link>
        }
        

        {role === "admin" &&
          <>
            <div className="nav-section">Students</div>
            <Link to="/students" className="nav-item">
              <span className="nav-icon">👥</span>
              All Students
            </Link>
            <Link to="/students/create" className="nav-item">
              <span className="nav-icon">➕</span>
              Add Student
            </Link>
          </>
        }

        <div className="nav-section">Courses</div>
        <Link to="/courses" className="nav-item">
          <span className="nav-icon">📚</span>
          All Courses
        </Link>
        {role === "admin" &&
          <Link to="/courses/create" className="nav-item">
            <span className="nav-icon">➕</span>
            Add Course
          </Link>
        }
        {role === "student" &&
          <Link to="/courses/enrolled" className="nav-item">
            <span className="nav-icon">✅</span>
            Enrolled Courses
          </Link>
        }
      </nav>
    </aside>
  )
}