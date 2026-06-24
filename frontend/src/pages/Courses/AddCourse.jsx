import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCourse } from "../../services/CourseService";

export default function AddCourse() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [schedule, setSchedule] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await createCourse({ name, description, startDate: new Date(startDate), endDate: new Date(endDate), schedule });

      setSuccess("Course added successfully");
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
      setLoading(false)
    }
  }


  return (
    <div className="card">
      <div className="card-header">
        <h2>Add New Course</h2>
        <button onClick={() => navigate(-1)} className="btn btn-outline">Back</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name *</label>
          <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} required placeholder="e.g. Introduction to Programming" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="3" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Course description..."></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} required value="2025-01-15" />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} required value="2025-04-15" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="schedule">Schedule *</label>
          <input type="text" id="schedule" name="schedule" onChange={(e) => setSchedule(e.target.value)} value={schedule} required placeholder="e.g. Mon, Wed, Fri 9:00 AM - 11:00 AM" />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create Course</button>
          <button onClick={() => navigate(-1)} className="btn btn-outline">Cancel</button>
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