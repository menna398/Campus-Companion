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
