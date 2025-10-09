import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import '../assets/Auth.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email không được để trống');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Password reset email sent to:', email);
    }, 2000);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-page">
        <BackgroundAnimation />
        
        <div className="auth-container forgot-container">
          <div className="auth-box success-box">
            <div className="success-content">
              <div className="success-icon">📧</div>
              <h1>Kiểm tra Email của bạn</h1>
              <p className="success-message">
                Chúng tôi đã gửi link đặt lại mật khẩu đến
              </p>
              <p className="email-sent">{email}</p>
              <p className="success-note">
                Nếu bạn không nhận được email trong vài phút, vui lòng kiểm tra
                thư mục spam hoặc thử lại.
              </p>
              
              <div className="success-actions">
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="resend-btn"
                >
                  🔄 Gửi lại email
                </button>
                <Link to="/login" className="back-login-btn">
                  ← Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </div>

          <div className="auth-side">
            <div className="auth-side-content">
              <h2>🔐 Bảo mật tài khoản</h2>
              <h3>Hướng dẫn đặt lại mật khẩu</h3>
              <ul className="features-list">
                <li>📧 Kiểm tra email của bạn</li>
                <li>🔗 Click vào link trong email</li>
                <li>🔑 Tạo mật khẩu mới</li>
                <li>✅ Đăng nhập với mật khẩu mới</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <BackgroundAnimation />
      
      <div className="auth-container forgot-container">
        <div className="auth-box">
          <Link to="/login" className="back-home">
            ← Quay lại đăng nhập
          </Link>

          <div className="auth-header">
            <div className="auth-logo">🔑</div>
            <h1>Quên Mật Khẩu?</h1>
            <p>Đừng lo! Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={error ? 'error' : ''}
                disabled={isLoading}
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner-btn">⏳</span>
                  Đang gửi...
                </>
              ) : (
                'Gửi link đặt lại mật khẩu'
              )}
            </button>

            <div className="form-footer">
              <p>
                Nhớ mật khẩu rồi?{' '}
                <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>🔐 Bảo mật tài khoản</h2>
            <h3>Đặt lại mật khẩu dễ dàng</h3>
            <ul className="features-list">
              <li>⚡ Nhanh chóng và an toàn</li>
              <li>📧 Gửi link qua email</li>
              <li>🔒 Mã hóa 256-bit</li>
              <li>✅ Xác thực 2 lớp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}