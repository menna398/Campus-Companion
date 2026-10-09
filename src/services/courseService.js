import axios from "axios";

const API_URL = "https://campus-companion-back.vercel.app/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getCourses() {
  const response = await axios.get(`${API_URL}/courses`, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function createCourse(courseData) {
  const response = await axios.post(`${API_URL}/courses`, courseData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function updateCourse(courseId, courseData) {
  const response = await axios.put(
    `${API_URL}/courses/${courseId}`,
    courseData,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data;
}

export async function deleteCourse(courseId) {
  const response = await axios.delete(`${API_URL}/courses/${courseId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}
