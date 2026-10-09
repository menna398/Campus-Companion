import axios from "axios";

const API_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function getResource(resource) {
  const response = await axios.get(`${API_URL}/${resource}`, {
    headers: getAuthHeaders(),
  });

  const data = response.data?.data;

  return Array.isArray(data) ? data : [];
}

// GET /api/assignments
export function getAssignments() {
  return getResource("assignments");
}

// GET /api/exams
export function getExams() {
  return getResource("exams");
}

// GET /api/schedule
export function getSchedule() {
  return getResource("schedule");
}
