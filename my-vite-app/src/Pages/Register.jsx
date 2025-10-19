import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import '../assets/Auth.css';
import { registerUser } from '../services/authApi'; // ✅ Bỏ comment

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Thêm loading state

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

    if (!formData.name) {
      newErrors.name = 'Tên không được để trống';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { // ✅ Thêm async
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true); // ✅ Bật loading
      
      try {
        // ✅ Gọi API register
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        console.log('✅ Register success:', response);

        if (response.success) {
          // ✅ Hiển thị thông báo thành công
          alert('🎉 Đăng ký thành công!');
          
          // ✅ Chuyển đến trang chủ hoặc dashboard
          navigate('/'); // hoặc navigate('/dashboard')
        }
      } catch (error) {
        console.error('❌ Register error:', error);
        
        // ✅ Hiển thị lỗi từ server
        if (error.response?.data?.message) {
          setErrors({ 
            api: error.response.data.message 
          });
        } else {
          setErrors({ 
            api: 'Đăng ký thất bại. Vui lòng thử lại!' 
          });
        }
      } finally {
        setLoading(false); // ✅ Tắt loading
      }
    }
  };

  return (
    <div className="auth-page">
      <BackgroundAnimation />
      
      <div className="auth-container">
        <div className="auth-box register-box">
          <Link to="/" className="back-home">
            ← Về trang chủ
          </Link>

          <div className="auth-header">
            <div className="auth-logo">🎉</div>
            <h1>Đăng Ký</h1>
            <p>Tạo tài khoản để bắt đầu nghe nhạc</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* ✅ Hiển thị lỗi API nếu có */}
            {errors.api && (
              <div className="alert alert-error">
                ❌ {errors.api}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Tên của bạn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                className={errors.name ? 'error' : ''}
                disabled={loading} // ✅ Disable khi loading
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

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
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
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
                  disabled={loading}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? 'error' : ''}
                  disabled={loading}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="terms-check">
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={loading}
                />
                <span>
                  Tôi đồng ý với{' '}
                  <Link to="/terms" target="_blank">Điều khoản dịch vụ</Link>
                  {' '}và{' '}
                  <Link to="/privacy" target="_blank">Chính sách bảo mật</Link>
                </span>
              </label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            {/* ✅ Button với loading state */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? '⏳ Đang đăng ký...' : 'Đăng ký'}
            </button>

            <div className="divider">
              <span>hoặc đăng ký với</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google-btn" disabled={loading}>
                <img 
                    src="/Images/Google.png"   
                    alt="Google" 
                    style={{ width: '20px', marginRight: '8px' }} 
                  />
                  Google
              </button>
              <button type="button" className="social-btn facebook-btn" disabled={loading}>
                <img 
                  src="/Images/Facebook.png"   
                  alt="Facebook" 
                  style={{ width: '20px', marginRight: '8px' }}
                />
                Facebook
              </button>
            </div>

            <div className="switch-auth">
              <p>
                Đã có tài khoản?{' '}
                <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>🎵 Tham gia SoundWave</h2>
            <h3>Trải nghiệm âm nhạc tuyệt vời</h3>
            <ul className="features-list">
              <li>🎁 Miễn phí tạo tài khoản</li>
              <li>💎 Truy cập hàng triệu bài hát</li>
              <li>📝 Tạo playlist riêng của bạn</li>
              <li>👥 Theo dõi nghệ sĩ yêu thích</li>
              <li>🔥 Khám phá nhạc mới mỗi ngày</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}