import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../services/StudentService";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [enrolledDate, setEnrolledDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
        setName(data?.name || "");
        setEmail(data?.email || "");
        setPhone(data?.phone || "");
        setStatus(data?.status || "");
        setEnrolledDate(data?.enrolledDate ? data.enrolledDate.split("T")[0] : "");
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateStudent(id, { name, email, phone, status, enrolledDate: new Date(enrolledDate) });

      setSuccess("Student updated successfully");
      setTimeout(() => {
        setSuccess("");
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Edit Student: {student.name || "Loading..."}</h2>
        <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Choose a status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="enrolledDate">Enrolled Date</label>
          <input
            type="date"
            id="enrolledDate"
            name="enrolledDate"
            value={enrolledDate}
            onChange={(e) => setEnrolledDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "loading..." : "Update Student"}
          </button>
          <button type="button" disabled={loading} onClick={() => navigate(-1)} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </form>

      <div className="fixed-notification">
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}