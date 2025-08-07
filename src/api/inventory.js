import API from './axios';

export const getInventoryItems = async (params = {}) => {
  const response = await API.get('/inventory', { params });
  return response.data;
};

export const getInventoryItem = async (id) => {
  const response = await API.get(`/inventory/${id}`);
  return response.data;
};

export const createInventoryItem = async (inventoryData) => {
  const response = await API.post('/inventory', inventoryData);
  return response.data;
};

export const updateInventoryItem = async (id, inventoryData) => {
  const response = await API.put(`/inventory/${id}`, inventoryData);
  return response.data;
};

export const deleteInventoryItem = async (id) => {
  const response = await API.delete(`/inventory/${id}`);
  return response.data;
};