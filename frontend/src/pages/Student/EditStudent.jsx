import { Link, useNavigate } from "react-router-dom";

export default function EditStudent() {
  const navigate = useNavigate();

    const student = {
        _id: 1,
        name: 'Amadou Jallow',
        email: 'amadou.jallow@university.edu',
        status: 'active',
        phone: '123-456-7890'
    };
    return (
        <div className="card">
          <div className="card-header">
            <h2>Edit Student: {student.name}</h2>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
              Back
            </button>
          </div>

          <form action="/students/{{student._id}}?_method=PUT" method="POST">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required value={student.name}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required value={student.email}/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={student.phone}/>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select id="status" name="status" required>
                  <option value="active" selected={student.status === 'active'}>Active</option>
                  <option value="inactive" selected={student.status === 'inactive'}>Inactive</option>
                  <option value="graduated" selected={student.status === 'graduated'}>Graduated</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Update Student</button>
              <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
    )
}