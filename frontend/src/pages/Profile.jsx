import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getStudentById, updateStudentStatus } from "../services/StudentService";
import { updatePassword } from "../services/AuthService";

export default function StudentProfile({ studentId, setCurrentUser}) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [status, setStatus] = useState("active");
    const [statusLoading, setStatusLoading] = useState(false);
    const [statusError, setStatusError] = useState("");
    const [statusSuccess, setStatusSuccess] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        const fetchStudent = async () => {
            if (!studentId) {
                setError("Unable to load profile. Student ID is missing.");
                return;
            }

            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const data = await getStudentById(studentId);
                setStudent(data);
                setStatus(data.status || "active");
            } catch (fetchError) {
                console.error(fetchError);
                setError(fetchError.message || "Unable to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        setStatusLoading(true);
        setStatusError("");
        setStatusSuccess("");

        try {
            await updateStudentStatus(studentId, status);
            setStudent((prev) => ({ ...prev, status }));
            setStatusSuccess("Status updated successfully.");
            setTimeout(() => setStatusSuccess(""), 3000);
        } catch (updateError) {
            console.error(updateError);
            setStatusError(updateError.message || "Unable to update status. Please try again.");
            setTimeout(() => setStatusError(""), 3000);
        } finally {
            setStatusLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        setPasswordLoading(true);

        try {
            await updatePassword(studentId, currentPassword, newPassword);
            setPasswordSuccess("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(""), 3000);
        } catch (updateError) {
            console.error(updateError);
            setPasswordError(updateError.message || "Unable to update password. Please try again.");
            setTimeout(() => setPasswordError(""), 3000);
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Student Profile</title>
                <meta name="description" content="View and update student profile details." />
            </Helmet>

            <div className="card">
                <div className="card-header">
                    <h2>Student Profile</h2>
                </div>

                {loading ? (
                    <div className="alert alert-info">Loading profile...</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : student ? (
                    <>
                        <div className="profile-grid">
                            <div className="profile-item">
                                <strong>Name: </strong>
                                <span>{student.name}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Email: </strong>
                                <span>{student.email}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Phone: </strong>
                                <span>{student.phone || "N/A"}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Status: </strong>
                                <span>{student.status || "N/A"}</span>
                            </div>
                            <div className="profile-item">
                                <strong>Enrolled Date: </strong>
                                <span>{student.enrolledDate ? new Date(student.enrolledDate).toLocaleDateString() : "N/A"}</span>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Update Status</h3>
                            <form onSubmit={handleStatusSubmit}>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={statusLoading}>
                                    {statusLoading ? "loading..." : "Save Status"}
                                </button>
                            </form>
                        </div>

                        <div className="form-section">
                            <h3>Update Password</h3>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        minLength={6}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        minLength={6}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                                    {passwordLoading ? "loading..." : "Change Password"}
                                </button>
                            </form>
                        </div>
                    </>
                ) : null}
            </div>
            <div className="fixed-notification">
                {passwordError && (
                    <div className="alert alert-danger">
                        {passwordError}
                    </div>
                )}

                {passwordSuccess && (
                    <div className="alert alert-success">
                        {passwordSuccess}
                    </div>
                )}
            </div>
            <div className="fixed-notification">
                {statusError && (
                    <div className="alert alert-danger">
                        {statusError}
                    </div>
                )}

                {statusSuccess && (
                    <div className="alert alert-success">
                        {statusSuccess}
                    </div>
                )}
            </div>
        </>
    );
}
