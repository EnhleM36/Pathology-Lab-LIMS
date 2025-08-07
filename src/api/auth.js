import API from './axios';

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const updateDetails = async (userData) => {
  const response = await API.put('/auth/updatedetails', userData);
  return response.data;
};

export const updatePassword = async (currentPassword, newPassword) => {
  const response = await API.put('/auth/updatepassword', {
    currentPassword,
    newPassword,
  });
  return response.data;
};