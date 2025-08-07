import API from './axios';

export const getSamples = async (params = {}) => {
  const response = await API.get('/samples', { params });
  return response.data;
};

export const getSample = async (id) => {
  const response = await API.get(`/samples/${id}`);
  return response.data;
};

export const createSample = async (sampleData) => {
  const response = await API.post('/samples', sampleData);
  return response.data;
};

export const updateSample = async (id, sampleData) => {
  const response = await API.put(`/samples/${id}`, sampleData);
  return response.data;
};

export const deleteSample = async (id) => {
  const response = await API.delete(`/samples/${id}`);
  return response.data;
};