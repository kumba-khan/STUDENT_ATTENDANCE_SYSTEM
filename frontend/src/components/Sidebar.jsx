import { Link } from "react-router-dom";


export default function Sidebar() {
    return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Attendance</h1>
        <span className="logo-subtitle">Tracking System</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>

        <div className="nav-section">Students</div>
        <Link to="/students" className="nav-item">
          <span className="nav-icon">👥</span>
          All Students
        </Link>
        <Link to="/students/create" className="nav-item">
          <span className="nav-icon">➕</span>
          Add Student
        </Link>

        <div className="nav-section">Courses</div>
        <Link to="/courses" className="nav-item">
          <span className="nav-icon">📚</span>
          All Courses
        </Link>
        <Link to="/courses/create" className="nav-item">
          <span className="nav-icon">➕</span>
          Add Course
        </Link>
      </nav>
    </aside>
    )
}