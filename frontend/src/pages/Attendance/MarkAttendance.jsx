import { Link, useNavigate } from "react-router-dom";

export default function MarkAttendance() {
    const navigate = useNavigate();
    const course = {
        _id: "alshd947tiwer",
        name: 'Introduction to Computer Science'
    };
    return (
        <div className="card">
            <div className="card-header">
                <h2>Mark Attendance</h2>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>



            <h3 className="mb-md">{course.name}</h3>
            <form action="/attendance/mark/{{course._id}}" method="POST">
                <div className="form-group mb-lg">
                    <label htmlFor="date">Date *</label>
                    <input type="date" id="date" name="date" required value="{{today}}" style={{ maxWidth: '200px' }}/>
                </div>
                {/* action Buttons */}
                <div className="mb-md flex gap-sm">
                    <button type="button" className="btn btn-sm btn-secondary" onClick="markAll('present')">Mark All Present</button>
                    <button type="button" className="btn btn-sm btn-outline" onClick="markAll('absent')">Mark All Absent</button>
                </div>
                {/* STUDENTS LIST */}
                <div className="attendance-grid mb-lg">
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/1">Amadou Jallow</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_1" className="status-select">
                                <option value="present" selected>Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/2">Fatou Ceesay</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_2" className="status-select">
                                <option value="present" selected>Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/3">Lamin Touray</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_3" className="status-select">
                                <option value="present">Present</option>
                                <option value="late" selected>Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/4">Mariama Bah</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_4" className="status-select">
                                <option value="present" selected>Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/5">Modou Camara</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_5" className="status-select">
                                <option value="present">Present</option>
                                <option value="late">Late</option>
                                <option value="absent" selected>Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                    <div className="attendance-row">
                        <div className="attendance-student"><Link to="/students/6">Ebrima Jobe</Link></div>
                        <div className="attendance-select">
                            <select name="attendance_6" className="status-select">
                                <option value="present" selected>Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                                <option value="excused">Excused</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={() => alert('Attendance saved! (Demo)')}>
                        Save Attendance
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}