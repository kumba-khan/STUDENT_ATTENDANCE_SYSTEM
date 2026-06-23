import { Link } from "react-router-dom";

export default function RecentAbsences() {
    return (
        <div className="card">
          <div className="card-header">
            <h2>Recent Absences</h2>
            <Link to="/" className="btn btn-outline">Back to Dashboard</Link>
          </div>

          <div className="alert alert-info mb-lg">
            Showing absences from the last 7 days. Total: <strong>8</strong>
          </div>

          <div className="mb-lg">
            <h4 className="mb-sm">Jan 14, 2025</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link to="/students/1">Modou Camara</Link></td>
                    <td><Link to="/courses/1">Introduction to Programming</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                  <tr>
                    <td><Link to="/students/2">Isatou Njie</Link></td>
                    <td><Link to="/courses/2">Web Development Fundamentals</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-lg">
            <h4 className="mb-sm">Jan 13, 2025</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link to="/students/3">Fatou Ceesay</Link></td>
                    <td><Link to="/courses/3">Database Management</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-lg">
            <h4 className="mb-sm">Jan 10, 2025</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link to="/students/4">Amadou Jallow</Link></td>
                    <td><Link to="/courses/4">Introduction to Programming</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                  <tr>
                    <td><Link to="/students/5">Lamin Touray</Link></td>
                    <td><Link to="/courses/5">Digital Literacy</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                  <tr>
                    <td><Link to="/students/6">Mariama Bah</Link></td>
                    <td><Link to="/courses/6">Database Management</Link></td>
                    <td><a href="#" className="btn btn-sm btn-outline">View Report</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
}