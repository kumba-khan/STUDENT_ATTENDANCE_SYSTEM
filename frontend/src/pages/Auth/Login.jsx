export default function Login() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Attendance System</h1>
                    <p>Admin Login</p>
                </div>

                <form action="/auth/login" method="POST" className="auth-form">
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="admin@example.com" />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    )
}