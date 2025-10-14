import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-wrap">
        <div className="privacy-top">
          <Link to="/" className="back-link">← Về trang chủ</Link>
        </div>

        <h1 className="privacy-title">Chính sách bảo mật</h1>
        <p className="privacy-meta">Cập nhật: 14/10/2025</p>

        <section className="privacy-section">
          <h2>1. Thông tin thu thập</h2>
          <p>
            Chúng tôi thu thập thông tin bạn cung cấp khi đăng ký (email, tên) và dữ liệu sử dụng để cải thiện dịch vụ.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Mục đích sử dụng</h2>
          <p>
            Thông tin được dùng để cung cấp dịch vụ, bảo mật tài khoản và gửi thông báo liên quan.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Bảo mật dữ liệu</h2>
          <p>
            Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ dữ liệu; tuy nhiên không có hệ thống nào an toàn tuyệt đối.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Quyền của người dùng</h2>
          <p>
            Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa dữ liệu cá nhân theo chính sách và pháp luật áp dụng.
          </p>
        </section>

        <div className="privacy-footer">
          <Link to="/terms">Điều khoản dịch vụ</Link>
          <Link to="/">Quay lại</Link>
        </div>
      </div>
    </div>
  );
}