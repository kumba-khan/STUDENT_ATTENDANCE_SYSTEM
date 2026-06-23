import { Link, useNavigate } from "react-router-dom";

export default function ViewCourse() {
    const navigate = useNavigate();

    const course = {
        _id: 1,
        name: 'Introduction to Computer Science',
        description: 'An introductory course on computer science concepts and programming.',
        startDate: '2023-09-01',
        endDate: '2023-12-15',
        schedule: 'Mon/Wed/Fri 10:00 AM - 11:30 AM',
        students: [
            {
                _id: 1,
                name: 'Amadou Jallow',
                email: 'amadou.jallow@university.edu'
            },
            {
                _id: 2,
                name: 'Amina Diallo',
                email: 'amina.diallo@university.edu'
            }
        ]
    };
    return (
        <div className="card">
          <div className="card-header">
            <h2>{course.name}</h2>
            <div className="flex gap-sm">
              <Link to={`/attendance-mark/${course._id}`} className="btn btn-primary">Mark Attendance</Link>
              <Link to={`/courses/${course._id}/enroll`} className="btn btn-secondary">Manage Enrollments</Link>
              <Link to={`/reports/course/${course._id}`} className="btn btn-outline">View Report</Link>
              <Link to={`/courses/${course._id}/edit`} className="btn btn-outline">Edit</Link>
              <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
            </div>
          </div>

          <div className="course-details mb-lg">
            <p className="mb-md">{course.description}</p>
            <div className="detail-row">
              <span className="detail-label">Schedule: </span>
              <span>{course.schedule}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Start Date: </span>
              <span>{new Date(course.startDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">End Date: </span>
              <span>{new Date(course.endDate).toLocaleDateString()}</span>
            </div>
          </div>

          <h3 className="mb-md">Enrolled Students ({course.students.length})</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((student) => (
                  <tr key={student._id}>
                    <td><Link to={`/students/${student._id}`}>{student.name}</Link></td>
                    <td>{student.email}</td>
                    <td><span className="badge badge-success">active</span></td>
                    <td><Link to={`/students/${student._id}/report`} className="btn btn-sm btn-outline">Report</Link></td>
                  </tr>
                ))}
                {course.students.length === 0 && (
                  <tr>
                    <td colspan="4">No students enrolled in this course.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    )
}