import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { deleteStudent, getStudents } from "../../services/StudentService";

export default function StudentsList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchStudents = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getStudents();
            setStudents(data);
        } catch (fetchError) {
            console.error(fetchError);
            setError("Unable to load students. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleReset = () => {
        setSearchTerm('');
        setStatusFilter('all');
        fetchStudents();
    };

    const handleDelete = async (studentId) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await deleteStudent(studentId);
            setStudents((prev) => prev.filter((student) => student._id !== studentId));
            setSuccess("Student deleted successfully");
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (deleteError) {
            console.error(deleteError);
            setError("Something went wrong");
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 student.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [students, searchTerm, statusFilter]);
    return (
        <div className="card">
            <div className="card-header">
                <h2>Students</h2>
                <Link to="/students/create" className="btn btn-primary">Add Student</Link>
            </div>

            <form className="form-inline mb-md" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                    </select>
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </form>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6">Loading students...</td>
                            </tr>
                        ) : filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    {students.length === 0 ? "No students available." : "No students match your search/filter."}
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.status}</td>
                                    <td>{new Date(student.enrolledDate).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/students/${student._id}`}>
                                            <button className="btn btn-sm btn-secondary">
                                                View
                                            </button>
                                        </Link>
                                        <Link to={`/students/${student._id}/edit`}>
                                            <button className="btn btn-sm btn-outline" disabled={loading}>
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            disabled={loading}
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this student?")) {
                                                    handleDelete(student._id);
                                                }
                                            }}
                                        >
                                            {loading ? "loading..." : "Delete"}
                                        </button>
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
    )
}