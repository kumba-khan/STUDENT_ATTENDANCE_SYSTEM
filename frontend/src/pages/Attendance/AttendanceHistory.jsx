import { Link, useNavigate } from "react-router-dom";

export default function AttendanceHistory() {
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-header">
                <h2>Introduction to Programming - Attendance History</h2>
                <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
            </div>

            <div className="form-row mb-md">
                <div className="form-group">
                    <label htmlFor="startDate">From Date</label>
                    <input type="date" id="startDate" name="startDate" value="2025-01-01" />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">To Date</label>
                    <input type="date" id="endDate" name="endDate" value="2025-01-14" />
                </div>
                <div
                    className="form-group"
                    style={{ display: "flex", alignItems: "flex-end" }}
                >
                    <button type="button" className="btn btn-primary">Filter</button>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Late</th>
                            <th>Excused</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Jan 14, 2025</strong></td>
                            <td><span className="badge badge-success">6</span></td>
                            <td><span className="badge badge-danger">1</span></td>
                            <td><span className="badge badge-warning">1</span></td>
                            <td><span className="badge badge-info">0</span></td>
                            <td><a href="attendance-mark.html" className="btn btn-sm btn-outline">Edit</a></td>
                        </tr>
                        <tr>
                            <td><strong>Jan 13, 2025</strong></td>
                            <td><span className="badge badge-success">7</span></td>
                            <td><span className="badge badge-danger">0</span></td>
                            <td><span className="badge badge-warning">1</span></td>
                            <td><span className="badge badge-info">0</span></td>
                            <td><a href="attendance-mark.html" className="btn btn-sm btn-outline">Edit</a></td>
                        </tr>
                        <tr>
                            <td><strong>Jan 10, 2025</strong></td>
                            <td><span className="badge badge-success">8</span></td>
                            <td><span className="badge badge-danger">0</span></td>
                            <td><span className="badge badge-warning">0</span></td>
                            <td><span className="badge badge-info">0</span></td>
                            <td><Link to="/attendance-mark/1" className="btn btn-sm btn-outline">Edit</Link></td>
                        </tr>
                        <tr>
                            <td><strong>Jan 8, 2025</strong></td>
                            <td><span className="badge badge-success">6</span></td>
                            <td><span className="badge badge-danger">1</span></td>
                            <td><span className="badge badge-warning">0</span></td>
                            <td><span className="badge badge-info">1</span></td>
                            <td><Link to="/attendance-mark/1" className="btn btn-sm btn-outline">Edit</Link></td>
                        </tr>
                        <tr>
                            <td><strong>Jan 6, 2025</strong></td>
                            <td><span className="badge badge-success">7</span></td>
                            <td><span className="badge badge-danger">1</span></td>
                            <td><span className="badge badge-warning">0</span></td>
                            <td><span className="badge badge-info">0</span></td>
                            <td><Link to="/attendance-mark/1" className="btn btn-sm btn-outline">Edit</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}