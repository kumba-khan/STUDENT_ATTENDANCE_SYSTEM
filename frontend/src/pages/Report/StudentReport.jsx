import './Report.css'

export default function StudentReport() {
    return (
        <div className="card">
          <div className="card-header">
            <h2>Modou Jallow - Attendance Report</h2>
            <a href="students-show.html" className="btn btn-outline">Back to Student</a>
          </div>

          <div className="report-stats">
            <div className="report-stat">
              <div className="stat-number r-success">92%</div>
              <div className="stat-label">Overall Attendance</div>
            </div>
            <div className="report-stat">
              <div
              className="stat-number r-success">23</div>
              <div className="stat-label">Days Present</div>
            </div>
            <div className="report-stat">
              <div className="stat-number r-danger">2</div>
              <div className="stat-label">Days Absent</div>
            </div>
            <div className="report-stat">
              <div className="stat-number r-warning">1</div>
              <div className="stat-label">Days Late</div>
            </div>
          </div>

          <h3 className="mb-md">Attendance by Course</h3>
          <div className="table-container mb-lg">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Total Classes</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Introduction to Programming</td>
                  <td>12</td>
                  <td>11</td>
                  <td>1</td>
                  <td>0</td>
                  <td><span className="badge badge-success">92%</span></td>
                </tr>
                <tr>
                  <td>Web Development Fundamentals</td>
                  <td>8</td>
                  <td>8</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span className="badge badge-success">100%</span></td>
                </tr>
                <tr>
                  <td>Database Management</td>
                  <td>6</td>
                  <td>4</td>
                  <td>1</td>
                  <td>1</td>
                  <td><span className="badge badge-warning">67%</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-md">Recent Attendance Records</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jan 14, 2025</td>
                  <td>Introduction to Programming</td>
                  <td><span className="badge badge-success">Present</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Jan 14, 2025</td>
                  <td>Database Management</td>
                  <td><span className="badge badge-warning">Late</span></td>
                  <td>Arrived 15 mins late</td>
                </tr>
                <tr>
                  <td>Jan 13, 2025</td>
                  <td>Web Development Fundamentals</td>
                  <td><span className="badge badge-success">Present</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Jan 10, 2025</td>
                  <td>Introduction to Programming</td>
                  <td><span className="badge badge-success">Present</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Jan 8, 2025</td>
                  <td>Database Management</td>
                  <td><span className="badge badge-danger">Absent</span></td>
                  <td>Sick leave</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    )
}