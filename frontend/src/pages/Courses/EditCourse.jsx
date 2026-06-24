import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/CourseService";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [schedule, setSchedule] = useState("")

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        setName(data?.name);
        setDescription(data?.description);
        setEndDate(data?.endDate);
        setStartDate(data?.startDate);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourse();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateCourse(id, { name, description, startDate: new Date(startDate), endDate: new Date(endDate), schedule });
      setSuccess("Course updated successfully");
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
        <h2>Edit Course: {course.name}</h2>
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name *</label>
          <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} defaultValue={course.name} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="3" onChange={(e) => setDescription(e.target.value)} defaultValue={course.description}>
          </textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} required defaultValue={course.startDate?.split("T")[0]} />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} required defaultValue={course.endDate?.split("T")[0]} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="schedule">Schedule *</label>
          <input type="text" id="schedule" name="schedule" onChange={(e) => setSchedule(e.target.value)} required defaultValue={course.schedule} />
        </div>


        <div className="form-group">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "loading" : "Update Course"}
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
  )
}