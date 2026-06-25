import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { deleteCourse, enrollStudent, getCourses, removeStudent } from "../../services/CourseService";

export default function AllCourses({ role, studentId }) {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionCourseId, setActionCourseId] = useState(null);
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

  const handleEnroll = async (courseId) => {
    setError("");
    setSuccess("");
    setActionLoading(true);
    setActionCourseId(courseId);

    try {
      await enrollStudent(courseId, studentId);

      setCourses((prev) => prev.map((course) => {
        if (course._id !== courseId) return course;

        return {
          ...course,
          students: [...(course.students || []), studentId],
        };
      }));

      setSuccess("You have enrolled in this course.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to enroll. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setActionLoading(false);
      setActionCourseId(null);
    }
  }

  const handleUnenroll = async (courseId) => {
    setError("");
    setSuccess("");
    setActionLoading(true);
    setActionCourseId(courseId);

    try {
      await removeStudent(courseId, studentId);

      setCourses((prev) => prev.map((course) => {
        if (course._id !== courseId) return course;

        return {
          ...course,
          students: (course.students || []).filter(
            (student) => student.toString() !== studentId
          ),
        };
      }));

      setSuccess("You have unenrolled from this course.");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to unenroll. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setActionLoading(false);
      setActionCourseId(null);
    }
  }

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
    <>
      <Helmet>
        <title>All Courses</title>
        <meta name="description" content="Browse and manage all courses in the attendance system." />
      </Helmet>
      <div className="card">

        <div className="card-header">
          <h2>Courses</h2>
          {role === "admin" &&
            <Link to="/courses/create" className="btn btn-primary">Add Course</Link>
          }
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
                    {role === "student" && (
                      course.students?.map((student) => student.toString()).includes(studentId) ? (
                        <button
                          className="btn btn-sm btn-danger"
                          disabled={actionLoading && actionCourseId === course._id}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to unenroll from this course?"
                              )
                            ) {
                              handleUnenroll(course._id);
                            }
                          }}
                        >
                          {actionLoading && actionCourseId === course._id ? "loading..." : "Unenroll"}
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-success"
                          disabled={actionLoading && actionCourseId === course._id}
                          onClick={() => handleEnroll(course._id)}
                        >
                          {actionLoading && actionCourseId === course._id ? "loading..." : "Enroll"}
                        </button>
                      )
                    )}

                    {role === "admin" &&
                      <>
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
                          {loading ? "loading..." : "Delete"}
                        </button>
                      </>
                    }
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
    </>
  )
}