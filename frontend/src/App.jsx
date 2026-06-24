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
import Login from './pages/Auth/Login';
import { logout } from './services/AuthService';
import ProtectedRoute from './components/ProtectedRoute';

import { user } from "./services/AuthService";

function getPageTitle(pathname) {
  const titleMap = [
    { pattern: /^\/$/, title: 'Dashboard' },
    { pattern: /^\/students$/, title: 'All Students' },
    { pattern: /^\/students\/create$/, title: 'Add Student' },
    { pattern: /^\/courses$/, title: 'All Courses' },
    { pattern: /^\/courses\/create$/, title: 'Add Course' },
    { pattern: /^\/students\/[^/]+$/, title: 'View Student' },
    { pattern: /^\/students\/[^/]+\/edit$/, title: 'Edit Student' },
    { pattern: /^\/courses\/[^/]+$/, title: 'View Course' },
    { pattern: /^\/courses\/[^/]+\/edit$/, title: 'Edit Course' },
    { pattern: /^\/courses\/[^/]+\/enroll$/, title: 'Enroll Students' },
  ];

  return titleMap.find((route) => route.pattern.test(pathname))?.title ?? 'Not Found Page';
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = user();

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

  // console.log(currentUser)

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
              <span className="user-name">{currentUser?.email}</span>
              <button onClick={()=>{handleLogout()}} className="btn btn-outline btn-sm">Logout</button>
            </div>
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><StudentsList /></ProtectedRoute>} />
              <Route path="/students/create" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
              <Route path="/courses/create" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
              <Route path="/students/:id" element={<ProtectedRoute><ViewStudent /></ProtectedRoute>} />
              <Route path="/students/:id/edit" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
              <Route path="/courses/:id" element={<ProtectedRoute><ViewCourse /></ProtectedRoute>} />
              <Route path="/courses/:id/edit" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
              <Route path="/courses/:id/enroll" element={<ProtectedRoute><EnrollStudents /></ProtectedRoute>} />
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
