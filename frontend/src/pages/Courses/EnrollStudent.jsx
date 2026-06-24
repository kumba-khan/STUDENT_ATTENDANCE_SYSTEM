import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { enrollStudent, getCourseById, removeStudent } from "../../services/CourseService";
import { getStudents } from "../../services/StudentService";

export default function EnrollStudents() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [students, setStudents] = useState([])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loadingUnenroll, setLoadingUnenroll] = useState(false);
    const [errorUnenroll, setErrorUnenroll] = useState("");
    const [successUnenroll, setSuccessUnenroll] = useState("");

    const [unenrolledStudents, setUnenrolledStudents] = useState([]);

    const [studentId, setId] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData = await getCourseById(id);
                setCourse(courseData);
                setStudents(courseData?.students)


                const studentsData = await getStudents();

                const enrolledIds = courseData.students.map(
                    (student) => student._id
                );

                const unenrolled = studentsData.filter(
                    (student) => !enrolledIds.includes(student._id)
                );

                setUnenrolledStudents(unenrolled);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await enrollStudent(course._id, studentId);

            const enrolledStudent = unenrolledStudents.find(
                (student) => student._id === studentId
            );

            if (enrolledStudent) {
                setStudents((prev) => [
                    ...prev,
                    enrolledStudent
                ]);

                setUnenrolledStudents((prev) => prev.filter(
                    (student) => student._id !== studentId
                ));

                setCourse((prev) => ({
                    ...prev,
                    students: [...(prev.students || []), enrolledStudent]
                }));
                setId('');
            }

            setSuccess("Student enrolled successfully");
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

    const handleUnenroll = async (studentToUnenroll) => {
        setLoadingUnenroll(true);

        try {
            await removeStudent(course._id, studentToUnenroll);

            const unenrolledStudent = students.find(
                (student) => student._id === studentToUnenroll
            );

            if (unenrolledStudent) {
                setStudents((prev) => prev.filter(
                    (student) => student._id !== studentToUnenroll
                ));

                setUnenrolledStudents((prev) => [
                    ...prev,
                    unenrolledStudent
                ]);

                setCourse((prev) => ({
                    ...prev,
                    students: prev.students?.filter(
                        (student) => student._id !== studentToUnenroll
                    )
                }));
            }

            setSuccessUnenroll("Student Unenrolled successfully");
            setTimeout(() => {
                setSuccessUnenroll("");
            }, 3000);
        } catch (error) {
            console.error(error);

            setErrorUnenroll("Something went wrong");
            setTimeout(() => {
                setErrorUnenroll("");
            }, 3000);
        } finally {
            setLoadingUnenroll(false)
        }
    }


    return (
        <div className="card">
            <div className="card-header">
                <h2>{course?.name}</h2>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>

            <div className="alert alert-info mb-md">
                <strong>{course?.students?.length} Students</strong> currently enrolled in this course.
            </div>

            <h3 className="mb-md">Enroll New Student</h3>
            {unenrolledStudents.length !== 0 &&
                <form onSubmit={handleSubmit} className="mb-lg">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="student">Select Student *</label>
                            <select id="student" name="student" onChange={(e) => setId(e.target.value)} required defaultValue={""}>
                                <option value="">Choose a student</option>
                                {unenrolledStudents?.map((student) => (
                                    <option key={student._id} value={student._id}>{student.name} ({student.email})</option>
                                ))}
                            </select>
                        </div>
                        <div
                            className="form-group"
                            style={{ alignSelf: "self-end", display: "flex", alignItems: "flex-end" }}
                        >
                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading ? "loading..." : "Enroll Student"}
                            </button>
                        </div>
                    </div>
                </form>
            }

            {unenrolledStudents.length === 0 &&
                <div className="alert alert-info mb-md">
                    No Students to enroll (all available students enrolled)
                </div>
            }

            <h3 className="mb-md">Currently Enrolled Students</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Enrolled Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student, key) => (
                            <tr key={key}>
                                <td><Link to={`/students/${student._id}`}>{student.name}</Link></td>
                                <td>{student.email}</td>
                                <td>
                                    {student.enrolledDate || 'N/A'}
                                </td>
                                <td>
                                    <form style={{ display: "inline" }}
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            handleUnenroll(student._id)
                                        }}
                                    >
                                        <button type="submit" className="btn btn-sm btn-danger">
                                            {loadingUnenroll ? "loading..." : "unenroll"}
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="fixed-notification">
                {errorUnenroll && (
                    <div className="alert alert-danger">
                        {errorUnenroll}
                    </div>
                )}

                {successUnenroll && (
                    <div className="alert alert-success">
                        {successUnenroll}
                    </div>
                )}
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