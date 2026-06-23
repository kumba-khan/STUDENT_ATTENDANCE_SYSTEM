import { Link, useNavigate } from "react-router-dom";

export default function EnrollStudents() {
    const navigate = useNavigate();

    const students = [
        { _id: 1, name: 'Amadou Jallow', email: 'amadou.jallow@example.com' },
        { _id: 2, name: 'Amina Diallo', email: 'amina.diallo@example.com' },
        { _id: 3, name: 'Fatoumata Ceesay', email: 'fatoumata.ceesay@example.com' }
    ];

    const course = {
        _id: 1,
        name: 'Introduction to Computer Science',
        description: 'An introductory course on computer science concepts and programming.',
        schedule: 'Mon & Wed 10:00 AM - 11:30 AM',
        startDate: '2023-01-15',
        endDate: '2023-05-15',
        enrolledStudents: [
            { _id: 1, name: 'Amadou Jallow', email: 'amadou.jallow@example.com', enrolledDate: '2023-01-15' },
            { _id: 2, name: 'Amina Diallo', email: 'amina.diallo@example.com', enrolledDate: '2023-01-15' },
            { _id: 3, name: 'Fatoumata Ceesay', email: 'fatoumata.ceesay@example.com', enrolledDate: '2023-01-15' }
        ]
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>{course.name}</h2>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>

            <div className="alert alert-info mb-md">
                <strong>{course.enrolledStudents.length} Students</strong> currently enrolled in this course.
            </div>

            <h3 className="mb-md">Enroll New Student</h3>
            <form method="POST" action="/courses/{{course._id}}/enroll" className="mb-lg">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="student">Select Student *</label>
                        <select id="student" name="student" required>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>{student.name} ({student.email})</option>
                            ))}
                        </select>
                    </div>
                    <div 
                        className="form-group"
                        style={{ alignSelf: "self-end", display: "flex", alignItems: "flex-end" }}
                    >
                        <button type="submit" className="btn btn-primary">
                            Enroll Student
                        </button>
                    </div>
                </div>
            </form>

            <h3 className="mb-md">Currently Enrolled Students</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Enrolled Date</th>
                            <th>Attendance Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course.enrolledStudents.map((student, key) => (
                            <tr key={key}>
                                <td><Link to={`/students/${student._id}`}>{student.name}</Link></td>
                                <td>{student.email}</td>
                                <td>
                                    {student.enrolledDate || 'N/A'}
                                </td>
                                <td><span className="badge badge-success">82%</span></td>
                                <td>
                                    <form action="/courses/{{../course._id}}/students/{{this._id}}?_method=DELETE"
                                        method="POST"
                                        style={{ display: "inline" }}
                                        onSubmit="return confirm('Are you sure you want to remove this student?');"
                                    >
                                        <button type="submit" className="btn btn-sm btn-danger">Remove</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}