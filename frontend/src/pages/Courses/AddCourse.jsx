export default function AddCourse() {
    return (
        <div className="card">
          <div className="card-header">
            <h2>Add New Course</h2>
            <a href="/courses" className="btn btn-outline">Back to Courses</a>
          </div>

          <form action="/courses" method="POST">
            <div className="form-group">
              <label for="name">Course Name *</label>
              <input type="text" id="name" name="name" required placeholder="e.g. Introduction to Programming"/>
            </div>
            <div className="form-group">
              <label for="description">Description</label>
              <textarea id="description" name="description" rows="3" placeholder="Course description..."></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label for="startDate">Start Date *</label>
                <input type="date" id="startDate" name="startDate" required value="2025-01-15"/>
              </div>
              <div className="form-group">
                <label for="endDate">End Date *</label>
                <input type="date" id="endDate" name="endDate" required value="2025-04-15"/>
              </div>
            </div>

            <div className="form-group">
              <label for="schedule">Schedule *</label>
              <input type="text" id="schedule" name="schedule" required placeholder="e.g. Mon, Wed, Fri 9:00 AM - 11:00 AM"/>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Create Course</button>
              <a href="/courses" className="btn btn-outline">Cancel</a>
            </div>
          </form>
        </div>
    )
}