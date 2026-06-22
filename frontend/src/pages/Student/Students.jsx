export default function StudentsList() {
    const students = [
        { name: 'Amadou Jallow', email: 'amadou.jallow@example.com', phone: '123-456-7890', status: 'Active', enrolledDate: '2023-01-15' },
        { name: 'Amina Diallo', email: 'amina.diallo@example.com', phone: '098-765-4321', status: 'Active', enrolledDate: '2023-02-20' },
        { name: 'Fatoumata Ceesay', email: 'fatoumata.ceesay@example.com', phone: '555-555-5555', status: 'Active', enrolledDate: '2023-03-10' }
    ];
    return (
        <div className="card">
            <div className="card-header">
                <h2>Students</h2>
                <a href="/students/create" className="btn btn-primary">Add Student</a>
            </div>

            <form className="form-inline mb-md">
                <div className="form-group">
                    {/* <input type="text" placeholder="Search by name or email..." value=""> */}
                </div>
                <div className="form-group">
                    <select>
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                    </select>
                </div>
                <button type="button" className="btn btn-secondary">Filter</button>
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
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.status}</td>
                                <td>
                                    {new Date(student.enrolledDate).toLocaleDateString()}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-secondary">
                                        View
                                    </button>

                                    <button className="btn btn-sm btn-outline">
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this student?")) {
                                                console.log("Delete", student._id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}