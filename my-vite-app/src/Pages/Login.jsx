import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import '../assets/Auth.css';
import { loginUser } from '../services/authApi'; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // ← THÊM loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ UPDATE handleSubmit để call API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        // Call API
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (response.success) {
          // Save to localStorage if remember me
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          
          // Success notification
          alert(`✅ ${response.message || 'Đăng nhập thành công!'}`);
          
          // Navigate to home
          navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        const message = error.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        setErrors({ submit: message });
        alert(`❌ ${message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <BackgroundAnimation />
      
      <div className="auth-container">
        <div className="auth-box">
          <Link to="/" className="back-home">
            ← Về trang chủ
          </Link>

          <div className="auth-header">
            <div className="auth-logo">🎵</div>
            <h1>Đăng Nhập</h1>
            <p>Chào mừng trở lại! Đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* ✅ THÊM error banner */}
            {errors.submit && (
              <div className="error-banner">
                {errors.submit}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={errors.email ? 'error' : ''}
                disabled={loading} // ← Disable khi đang loading
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.password ? 'error' : ''}
                disabled={loading} // ← Disable khi đang loading
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-extras">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            {/* ✅ UPDATE button với loading state */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner-btn">⏳</span>
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>

            <div className="divider">
              <span>hoặc đăng nhập với</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google-btn" disabled={loading}>
                 <img 
                  src="/Images/Google.png"   // đường dẫn từ public
                  alt="Google" 
                  style={{ width: '20px', marginRight: '8px' }} // tuỳ chỉnh size/margin
                  />
                  Google
              </button>
              <button type="button" className="social-btn facebook-btn" disabled={loading}>
                <img 
                  src="/Images/Facebook.png"   // đường dẫn từ public
                  alt="Facebook" 
                  style={{ width: '20px', marginRight: '8px' }} // tuỳ chỉnh size/margin
                />
                Facebook
              </button>
            </div>

            <div className="switch-auth">
              <p>
                Chưa có tài khoản?{' '}
                <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>🎵 SoundWave</h2>
            <h3>Khám phá âm nhạc không giới hạn</h3>
            <ul className="features-list">
              <li>✨ Hàng triệu bài hát chất lượng cao</li>
              <li>🎧 Playlist được tuyển chọn kỹ lưỡng</li>
              <li>🎤 Nghệ sĩ nổi tiếng toàn cầu</li>
              <li>📱 Nghe mọi lúc, mọi nơi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}