import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../services/StudentService";

export default function AddStudent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [enrolledDate, setEnrolledDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudent({ name, email, phone, status, enrolledDate: new Date(enrolledDate) });

      setSuccess("Student added successfully");
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
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Add New Student</h2>
        <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter student name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              required
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
            onChange={(e) => setEnrolledDate(e.target.value)}
            value={enrolledDate}
            placeholder="Enrolled Date"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "loading..." : "Create Student"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
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
  )
}