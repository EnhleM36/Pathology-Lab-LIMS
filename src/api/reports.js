import API from './axios';

export const getReports = async (params = {}) => {
  const response = await API.get('/reports', { params });
  return response.data;
};

export const getReport = async (id) => {
  const response = await API.get(`/reports/${id}`);
  return response.data;
};

export const createReport = async (reportData) => {
  const response = await API.post('/reports', reportData);
  return response.data;
};

export const updateReport = async (id, reportData) => {
  const response = await API.put(`/reports/${id}`, reportData);
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await API.delete(`/reports/${id}`);
  return response.data;
};

export const uploadReportFile = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await API.put(`/reports/${id}/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};