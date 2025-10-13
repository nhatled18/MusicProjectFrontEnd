import api from './api';

// Register
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  // Lưu token và user info
  if (response.data.success && response.data.data?.token) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  // Lưu token và user info
  if (response.data.success && response.data.data?.token) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data;
};

// Logout
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Get current user
export const fetchUserProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, passwords) => {
  const response = await api.put(`/auth/reset-password/${token}`, passwords);
  return response.data;
};

// Update password
export const updatePassword = async (passwords) => {
  const response = await api.put('/auth/update-password', passwords);
  return response.data;
};

// Verify email
export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}`);
  return response.data;
};