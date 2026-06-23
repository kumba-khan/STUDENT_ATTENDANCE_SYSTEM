import { Link } from "react-router-dom";

export default function Attendance() {
    return (
        <div className="card">
          <div className="card-header">
            <h2>Select Course to Mark Attendance</h2>
          </div>

          <p className="mb-md">Choose a course to mark attendance or view history:</p>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Schedule</th>
                  <th>Enrolled Students</th>
                  <th>Today's Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Introduction to Programming</strong></td>
                  <td>Mon, Wed, Fri 9:00 AM</td>
                  <td>8 students</td>
                  <td><span className="badge badge-success">Marked</span></td>
                  <td className="table-actions">
                    <Link to="/attendance-mark/1" className="btn btn-sm btn-primary">Mark</Link>
                    <Link to="/attendance-history/1" className="btn btn-sm btn-outline">History</Link>
                  </td>
                </tr>
                <tr>
                  <td><strong>Web Development Fundamentals</strong></td>
                  <td>Tue, Thu 2:00 PM</td>
                  <td>6 students</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td className="table-actions">
                    <Link to="/attendance-mark/2" className="btn btn-sm btn-primary">Mark</Link>
                    <Link to="/attendance-history/2" className="btn btn-sm btn-outline">History</Link>
                  </td>
                </tr>
                <tr>
                  <td><strong>Database Management</strong></td>
                  <td>Mon, Wed 1:00 PM</td>
                  <td>5 students</td>
                  <td><span className="badge badge-success">Marked</span></td>
                  <td className="table-actions">
                    <Link to="/attendance-mark/3" className="btn btn-sm btn-primary">Mark</Link>
                    <Link to="/attendance-history/3" className="btn btn-sm btn-outline">History</Link>
                  </td>
                </tr>
                <tr>
                  <td><strong>Digital Literacy</strong></td>
                  <td>Fri 9:00 AM</td>
                  <td>12 students</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td className="table-actions">
                    <Link to="/attendance-mark/4" className="btn btn-sm btn-primary">Mark</Link>
                    <Link to="/attendance-history/4" className="btn btn-sm btn-outline">History</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    )
}