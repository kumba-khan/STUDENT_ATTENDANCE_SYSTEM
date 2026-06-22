export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <span className="stat-value">24</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <span className="stat-value">18</span>
                        <span className="stat-label">Active Students</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                        <span className="stat-value">4</span>
                        <span className="stat-label">Total Courses</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-info">
                        <span className="stat-value">42</span>
                        <span className="stat-label">Marked Today</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header">
                        <h3>Quick Actions</h3>
                    </div>
                    <div className="quick-actions">
                        <a href="/attendance/mark" className="btn btn-primary">Mark Attendance</a>
                        <a href="/students/create" className="btn btn-secondary">Add Student</a>
                        <a href="/courses/list" className="btn btn-secondary">View Courses</a>
                        <a href="/reports/absences" className="btn btn-outline">View Absences</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Recent Activity</h3>
                    </div>
                    <ul className="activity-list">
                        <li className="activity-item">
                            <span className="activity-text">Amadou Jallow marked present for Web Development</span>
                            <span className="activity-time">2 hours ago</span>
                        </li>
                        <li className="activity-item">
                            <span className="activity-text">Fatou Ceesay marked absent for Database Management</span>
                            <span className="activity-time">3 hours ago</span>
                        </li>
                        <li className="activity-item">
                            <span className="activity-text">Lamin Touray marked late for Programming Basics</span>
                            <span className="activity-time">4 hours ago</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}