import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Terms.css';

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-wrap">
        <div className="terms-top">
          <Link to="/" className="back-link">← Về trang chủ</Link>
        </div>

        <h1 className="terms-title">Điều khoản dịch vụ</h1>
        <p className="terms-meta">Cập nhật: 14/10/2025</p>

        <section className="terms-section">
          <h2>1. Giới thiệu</h2>
          <p>
            Chào mừng bạn đến với SoundWave. Vui lòng đọc kỹ các điều khoản sử dụng trước khi sử dụng dịch vụ.
            Khi sử dụng dịch vụ, bạn đồng ý tuân thủ các điều khoản sau.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Quyền và nghĩa vụ</h2>
          <ul>
            <li>Người dùng chịu trách nhiệm về nội dung tải lên (nếu có).</li>
            <li>Không sử dụng dịch vụ để vi phạm bản quyền, pháp luật hoặc quấy rối người khác.</li>
          </ul>
        </section>
        <section className="terms-section">
          <h2>3. Hạn chế trách nhiệm</h2>
          <p>
            SoundWave không chịu trách nhiệm cho các thiệt hại phát sinh do sử dụng dịch vụ trái với điều khoản hoặc do bên thứ ba gây ra.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Thay đổi điều khoản</h2>
          <p>
            Chúng tôi có quyền cập nhật điều khoản. Mọi thay đổi sẽ được thông báo tại trang này.
          </p>
        </section>

        <div className="terms-footer">
          <Link to="/privacy">Chính sách bảo mật</Link>
          <Link to="/">Quay lại</Link>
        </div>
      </div>
    </div>
  );
}