import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, phone);
      }
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="auth-modal__header">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => { setTab('login'); setError(''); }}
            >
              உள்நுழைக
            </button>
            <button
              className={`auth-tab ${tab === 'register' ? 'auth-tab--active' : ''}`}
              onClick={() => { setTab('register'); setError(''); }}
            >
              பதிவு செய்க
            </button>
          </div>
          <button className="auth-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === 'register' && (
            <>
              <div className="auth-field">
                <label className="auth-label">பெயர்</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="உங்கள் பெயர்"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">தொலைபேசி எண்</label>
                <input
                  className="auth-input"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="auth-field">
            <label className="auth-label">மின்னஞ்சல்</label>
            <input
              className="auth-input"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">கடவுச்சொல்</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'காத்திருக்கவும்...' : tab === 'login' ? 'உள்நுழைக' : 'பதிவு செய்க'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;
