import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getEnrolledCourses } from "../../services/StudentService";

export default function EnrolledCourses({ studentId }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            if (!studentId) {
                setError("Unable to load enrolled courses. Student not found.");
                return;
            }

            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const data = await getEnrolledCourses(studentId);
                setCourses(data);
                setSuccess("Enrolled courses loaded successfully.");
                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            } catch (fetchError) {
                console.error(fetchError);
                setError(fetchError.message || "Unable to load enrolled courses. Please try again.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [studentId]);

    return (
        <>
            <Helmet>
                <title>Enrolled Courses</title>
                <meta name="description" content="View all courses the student is enrolled in." />
            </Helmet>
            <div className="card">
                <div className="card-header">
                    <h2>Enrolled Courses</h2>
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
                            {loading ? (
                                <tr>
                                    <td colSpan="6">Loading courses...</td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No enrolled courses found.</td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course._id}>
                                        <td>{course.name}</td>
                                        <td>{course.schedule}</td>
                                        <td>{new Date(course.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(course.endDate).toLocaleDateString()}</td>
                                        <td>{course.students?.length ?? 0}</td>
                                        <td>
                                            <Link to={`/courses/${course._id}`} className="btn btn-sm btn-secondary">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
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
    );
}
