import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCourse, getCourses } from "../../services/CourseService";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourses()
  }, [])

  const handleDelete = async (courseId) => {
    setLoading(true);

    try {
      await deleteCourse(courseId);

      const deleted = courses.find(
        (course) => course._id === courseId
      );

      if (deleted) {
        setCourses((prev) => prev.filter(
          (course) => course._id !== courseId
        ));
      }

      setSuccess("course deleted successfully");
      setTimeout(() => {
        setSuccess("");
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
        <h2>Courses</h2>
        <Link to="/courses/create" className="btn btn-primary">Add Course</Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Schedule</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.schedule}</td>
                <td>
                  {new Date(course.startDate).toLocaleDateString()}
                </td>
                <td>
                  {new Date(course.endDate).toLocaleDateString()}
                </td>
                <td>{course.students.length}</td>

                <td>
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    View
                  </Link>

                  <Link
                    to={`/courses/${course._id}/edit`}
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/courses/${course._id}/enroll`}
                    className="btn btn-sm btn-outline"
                  >
                    Enroll Students
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this course?"
                        )
                      ) {
                        handleDelete(course._id);
                      }
                    }}
                  >
                    {loading? "loading...": "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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