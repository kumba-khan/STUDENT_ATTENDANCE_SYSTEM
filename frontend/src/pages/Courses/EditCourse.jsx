import { Link, useNavigate } from "react-router-dom";

export default function EditCourse() {
    const navigate = useNavigate();

    const course = {
        _id: "alshd947tiwer",
        name: 'Introduction to Computer Science',
        description: 'An introductory course on computer science concepts and programming.',
        startDate: '2023-09-01',
        endDate: '2023-12-15',
        schedule: 'Mon/Wed/Fri 10:00 AM - 11:30 AM'
    };
    return (
        <div className="card">
          <div className="card-header">
            <h2>Edit Course: {course.name}</h2>
            <button onClick={() => navigate(-1)} className="btn btn-outline">
              Back
            </button>
          </div>

          <form action="/courses/{{course._id}}?_method=PUT" method="POST">
            <div className="form-group">
              <label htmlFor="name">Course Name *</label>
              <input type="text" id="name" name="name" required value={course.name}/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="3">{course.description}</textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input type="date" id="startDate" name="startDate" required value={course.startDate}/>
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <input type="date" id="endDate" name="endDate" required value={course.endDate}/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Schedule *</label>
              <input type="text" id="schedule" name="schedule" required value={course.schedule}/>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Update Course</button>
              <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
    )
}