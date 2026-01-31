import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, register } from '../utils/api';
import { LogIn, User, ShieldCheck, Mail, Lock } from 'lucide-react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [isLogin, setIsLogin] = useState(true);
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
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await register(name, email, password, role);
            }
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
                        <h1 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p className="login-subtitle">
                            {isLogin ? 'Login to your SportsCart account' : 'Sign up to get started'}
                        </p>
                    </div>

                    {error && (
                        <div className="error-message animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <div className="input-with-icon">
                                    <User className="field-icon" size={18} />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

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
                            {isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                        </button>
                    </form>

                    <div className="auth-toggle">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>

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
