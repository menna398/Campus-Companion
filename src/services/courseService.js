import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function getCourses() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/courses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function updateCourse(courseId, courseData) {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/courses/${courseId}`,
    courseData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data;
}
