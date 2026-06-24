import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../services/StudentService";

export default function ViewStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>{student.name || "Student Details"}</h2>
        <div className="flex gap-sm">
          <Link to={`/students/${student._id}/edit`} className="btn btn-outline">Edit</Link>
          <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
        </div>
      </div>

      <div className="student-details mb-lg">
        <div className="detail-row">
          <span className="detail-label">Email: </span>
          <span>{student.email || "N/A"}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Phone: </span>
          <span>{student.phone || "N/A"}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status: </span>
          <span className={`badge ${student.status === "active" ? "badge-success" : student.status === "inactive" ? "badge-warning" : "badge-secondary"}`}>
            {student.status || "N/A"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Enrolled: </span>
          <span>{student.enrolledDate ? new Date(student.enrolledDate).toLocaleDateString() : "N/A"}</span>
        </div>
      </div>
    </div>
  );
}