import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/Student/Students';
import AddStudent from './pages/Student/AddStudent';
import AllCourses from './pages/Courses/Courses';
import AddCourse from './pages/Courses/AddCourse';
import EditStudent from './pages/Student/EditStudent';
import ViewStudent from './pages/Student/ViewStudent';
import EditCourse from './pages/Courses/EditCourse';
import ViewCourse from './pages/Courses/ViewCourse';
import EnrollStudents from './pages/Courses/EnrollStudent';
import MarkAttendance from './pages/Attendance/MarkAttendance';
import RecentAbsences from './pages/Report/AbsencesReport';
import Attendance from './pages/Attendance/Attendance';
import AttendanceHistory from './pages/Attendance/AttendanceHistory';
import Login from './pages/Auth/Login';
import StudentReport from './pages/Report/StudentReport';
import CourseReport from './pages/Report/CourseReport';
import { logout } from './services/AuthService';
import ProtectedRoute from './components/ProtectedRoute';

function getPageTitle(pathname) {
  const titleMap = [
    { pattern: /^\/$/, title: 'Dashboard' },
    { pattern: /^\/students$/, title: 'All Students' },
    { pattern: /^\/students\/create$/, title: 'Add Student' },
    { pattern: /^\/courses$/, title: 'All Courses' },
    { pattern: /^\/reports\/attendance$/, title: 'Attendance' },
    { pattern: /^\/attendance-mark\/[^/]+$/, title: 'Mark Attendance' },
    { pattern: /^\/attendance-history\/[^/]+$/, title: 'Attendance History' },
    { pattern: /^\/recent-absences$/, title: 'Recent Absences' },
    { pattern: /^\/courses\/create$/, title: 'Add Course' },
    { pattern: /^\/students\/[^/]+$/, title: 'View Student' },
    { pattern: /^\/students\/[^/]+\/edit$/, title: 'Edit Student' },
    { pattern: /^\/courses\/[^/]+$/, title: 'View Course' },
    { pattern: /^\/courses\/[^/]+\/edit$/, title: 'Edit Course' },
    { pattern: /^\/courses\/[^/]+\/enroll$/, title: 'Enroll Students' },
    { pattern: /^\/reports\/course\/[^/]+$/, title: 'Course Attendance Report' },
    { pattern: /^\/reports\/student\/[^/]+$/, title: 'Student Attendance Report' },
  ];

  return titleMap.find((route) => route.pattern.test(pathname))?.title ?? 'Not Found Page';
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages that should not use the dashboard layout
  const authPages = ["/auth/login"];

  if (authPages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <h2 className="page-title">{getPageTitle(location.pathname)}</h2>
            </div>
            <div className="header-right">
              <span className="user-name">kumba@university.edu</span>
              <button onClick={()=>{handleLogout()}} className="btn btn-outline btn-sm">Logout</button>
            </div>
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><StudentsList /></ProtectedRoute>} />
              <Route path="/students/create" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
              <Route path="/attendance-mark/:id" element={<ProtectedRoute><MarkAttendance /></ProtectedRoute>} />
              <Route path="/recent-absences" element={<ProtectedRoute><RecentAbsences /></ProtectedRoute>} />
              <Route path="/courses/create" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
              <Route path="/students/:id" element={<ProtectedRoute><ViewStudent /></ProtectedRoute>} />
              <Route path="/students/:id/edit" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ProtectedRoute><ViewCourse /></ProtectedRoute>} />
              <Route path="/courses/:id/edit" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
              <Route path="/courses/:id/enroll" element={<ProtectedRoute><EnrollStudents /></ProtectedRoute>} />
              <Route path="/reports/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
              <Route path="/attendance-history/:id" element={<ProtectedRoute><AttendanceHistory /></ProtectedRoute>} />
              <Route path="/reports/student/:id" element={<ProtectedRoute><StudentReport /></ProtectedRoute>} />
              <Route path="/reports/course/:id" element={<ProtectedRoute><CourseReport /></ProtectedRoute>} />
              <Route path="*" element={<ProtectedRoute><h1>404 - Page Not Found</h1></ProtectedRoute>} />
            </Routes>
          </div>

        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
