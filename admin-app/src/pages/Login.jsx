import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand__icon">
            <Leaf size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="login-brand__name">JP Farm</h1>
            <p className="login-brand__sub">Admin Portal</p>
          </div>
        </div>

        <p className="login-headline">Welcome back 👋</p>
        <p className="login-sub">Sign in to manage your farm store.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email</label>
            <div className="login-input-wrap">
              <Mail size={16} className="login-input-icon" />
              <input
                type="email"
                className="login-input"
                placeholder="admin@jpfarm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <Lock size={16} className="login-input-icon" />
              <input
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
