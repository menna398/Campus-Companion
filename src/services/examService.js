import axios from "axios";

const API_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getExams() {
  const response = await axios.get(`${API_URL}/exams`, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function createExam(examData) {
  const response = await axios.post(`${API_URL}/exams`, examData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function updateExam(examId, examData) {
  const response = await axios.put(`${API_URL}/exams/${examId}`, examData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function deleteExam(examId) {
  const response = await axios.delete(`${API_URL}/exams/${examId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}
