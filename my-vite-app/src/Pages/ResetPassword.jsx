import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import '../assets/Auth.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Token from email link

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải có chữ hoa, chữ thường và số';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        console.log('Password reset:', formData, 'Token:', token);
        navigate('/login', { state: { message: 'Đặt lại mật khẩu thành công!' } });
      }, 2000);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { strength: 1, text: 'Yếu', color: '#e74c3c' },
      { strength: 2, text: 'Trung bình', color: '#f39c12' },
      { strength: 3, text: 'Khá', color: '#3498db' },
      { strength: 4, text: 'Mạnh', color: '#2ecc71' },
      { strength: 5, text: 'Rất mạnh', color: '#27ae60' }
    ];

    return levels[strength - 1] || levels[0];
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="auth-page">
      <BackgroundAnimation />
      
      <div className="auth-container forgot-container">
        <div className="auth-box">
          <Link to="/login" className="back-home">
            ← Quay lại đăng nhập
          </Link>

          <div className="auth-header">
            <div className="auth-logo">🔐</div>
            <h1>Đặt Lại Mật Khẩu</h1>
            <p>Tạo mật khẩu mới cho tài khoản của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="password">Mật khẩu mới</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        background: passwordStrength.color
                      }}
                    />
                  </div>
                  <span style={{ color: passwordStrength.color }}>
                    {passwordStrength.text}
                  </span>
                </div>
              )}
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
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="password-requirements">
              <p>Mật khẩu phải có:</p>
              <ul>
                <li className={formData.password.length >= 6 ? 'valid' : ''}>
                  ✓ Ít nhất 6 ký tự
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                  ✓ Chữ hoa
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                  ✓ Chữ thường
                </li>
                <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                  ✓ Số
                </li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner-btn">⏳</span>
                  Đang xử lý...
                </>
              ) : (
                'Đặt lại mật khẩu'
              )}
            </button>
          </form>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>🔒 Bảo mật cao</h2>
            <h3>Tạo mật khẩu mạnh</h3>
            <ul className="features-list">
              <li>✅ Ít nhất 6 ký tự</li>
              <li>🔤 Chữ hoa và chữ thường</li>
              <li>🔢 Có số và ký tự đặc biệt</li>
              <li>🚫 Không dùng thông tin cá nhân</li>
              <li>🔐 Độc nhất cho mỗi tài khoản</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}