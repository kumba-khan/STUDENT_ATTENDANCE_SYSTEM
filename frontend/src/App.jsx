import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/Student/Students';
import AddStudent from './pages/Student/AddStudent';
import AllCourses from './pages/Courses/Courses';

function App() {
  const location = useLocation();

  return (
    <>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <h2 className="page-title">
                {location.pathname === '/' && 'Dashboard'}
                {location.pathname === '/students' && 'All Students'}
                {location.pathname === '/students/create' && 'Add Student'}
                {location.pathname === '/courses' && 'All Courses'}
                {location.pathname === '/attendance-mark' && 'Mark Attendance'}
                {location.pathname === '/reports-absences' && 'Absences Report'}
              </h2>
            </div>
            <div className="header-right">
              <span className="user-name">kumba@university.edu</span>
              <a href="/auth/logout" className="btn btn-outline btn-sm">Logout</a>
            </div>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/students/create" element={<AddStudent />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/attendance-mark" element={<h1>Mark Attendance</h1>} />
            <Route path="/reports-absences" element={<h1>Absences Report</h1>} />
          </Routes>
          <p className="text-center mt-md"><a href="index.html">← Back to Demo Index</a></p>
        </div>

        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
