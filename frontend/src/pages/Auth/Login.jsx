import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(
                email,
                password
            );

            if (result.accessToken) {
                localStorage.setItem(
                    "token",
                    result.accessToken
                );

                navigate("/");
            } else {
                setError(result.message || "Login failed");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Attendance System</h1>
                    <p>Admin Login</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required placeholder="admin@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password" required placeholder="Enter password" />
                    </div>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-block">
                        {loading ? 'Loading' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}