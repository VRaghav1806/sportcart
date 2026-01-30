import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../utils/api';
import { LogIn, User, ShieldCheck, Mail, Lock } from 'lucide-react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const data = await login(email, password);
            loginUser(data.user);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsSubmitting(false);
        }
    };

    const quickLogin = (role) => {
        if (role === 'admin') {
            setEmail('admin@sports.com');
            setPassword('admin123');
        } else {
            setEmail('user@example.com');
            setPassword('user123');
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-card glass-card animate-fade-in">
                    <div className="login-header">
                        <div className="login-icon">
                            <LogIn size={32} />
                        </div>
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Login to your SportsCart account</p>
                    </div>

                    {error && (
                        <div className="error-message animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-icon">
                                <Mail className="field-icon" size={18} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <Lock className="field-icon" size={18} />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary btn-full ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="quick-login-divider">
                        <span>Or quick login as</span>
                    </div>

                    <div className="quick-login-actions">
                        <button
                            className="btn btn-outline btn-full flex-center"
                            onClick={() => quickLogin('user')}
                        >
                            <User size={18} />
                            User
                        </button>
                        <button
                            className="btn btn-outline btn-full flex-center"
                            onClick={() => quickLogin('admin')}
                        >
                            <ShieldCheck size={18} />
                            Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
