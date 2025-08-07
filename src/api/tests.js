import API from './axios';

export const getTests = async (params = {}) => {
  const response = await API.get('/tests', { params });
  return response.data;
};

export const getTest = async (id) => {
  const response = await API.get(`/tests/${id}`);
  return response.data;
};

export const createTest = async (testData) => {
  const response = await API.post('/tests', testData);
  return response.data;
};

export const updateTest = async (id, testData) => {
  const response = await API.put(`/tests/${id}`, testData);
  return response.data;
};

export const deleteTest = async (id) => {
  const response = await API.delete(`/tests/${id}`);
  return response.data;
};