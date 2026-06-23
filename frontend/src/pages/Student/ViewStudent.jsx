import { Link, useNavigate } from "react-router-dom";

export default function ViewStudent() {
  const navigate = useNavigate();

  const student = {
    _id: 1,
    name: 'Amadou Jallow',
    email: 'amadou.jallow@university.edu',
    status: 'active',
    phone: '123-456-7890'
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2>{student.name}</h2>
        <div className="flex gap-sm">
          <Link to={`/reports/student/${student._id}`} className="btn btn-secondary">View Report</Link>
          <Link to={`/students/${student._id}/edit`} className="btn btn-outline">Edit</Link>
          <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
        </div>
      </div>

      <div className="student-details mb-lg">
        <div className="detail-row">
          <span className="detail-label">Email: </span>
          <span>{student.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Phone: </span>
          <span>{student.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status: </span>
          <span className="badge badge-success">{student.status}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Enrolled: </span>
          <span>{new Date(student.enrolledDate).toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Attendance Rate: </span>
          <span>87% (23 records)</span>
        </div>
      </div>
    </div>
  )
}