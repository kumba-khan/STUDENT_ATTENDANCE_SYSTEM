import { Link } from "react-router-dom";

export default function AllCourses() {
  const courses = [
    { _id: 1, name: "Introduction to Programming", schedule: "Mon, Wed, Fri 9:00 AM - 11:00 AM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] },
    { _id: 2, name: "Data Structures", schedule: "Tue, Thu 2:00 PM - 4:00 PM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] },
    { _id: 3, name: "Web Development", schedule: "Mon, Wed 1:00 PM - 3:00 PM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] },
    { _id: 4, name: "Database Systems", schedule: "Tue, Thu 10:00 AM - 12:00 PM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] },
    { _id: 5, name: "Operating Systems", schedule: "Mon, Wed 3:00 PM - 5:00 PM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] },
    { _id: 6, name: "Software Engineering", schedule: "Tue, Thu 1:00 PM - 3:00 PM", startDate: "2025-01-15", endDate: "2025-04-15", students: [] }
  ];
  return (
    <div className="card">
      <div className="card-header">
        <h2>Courses</h2>
        <a href="/courses/create" className="btn btn-primary">Add Course</a>
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
            {courses.map((course) => (
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

                  <Link
                    to={`/attendance/mark/${course._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Mark Attendance
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