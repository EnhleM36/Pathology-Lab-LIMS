import API from './axios';

export const getLogs = async (params = {}) => {
  const response = await API.get('/logs', { params });
  return response.data;
};

export const getLog = async (id) => {
  const response = await API.get(`/logs/${id}`);
  return response.data;
};