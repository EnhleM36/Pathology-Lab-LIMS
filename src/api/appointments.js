import API from './axios';

export const getAppointments = async (params = {}) => {
  const response = await API.get('/appointments', { params });
  return response.data;
};

export const getAppointment = async (id) => {
  const response = await API.get(`/appointments/${id}`);
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await API.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await API.delete(`/appointments/${id}`);
  return response.data;
};