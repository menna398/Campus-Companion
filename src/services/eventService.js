import axios from "axios";

const API_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Get all events
export async function getEvents() {
  const response = await axios.get(`${API_URL}/events`, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

// Add event
export async function createEvent(eventData) {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

// Delete event
export async function deleteEvent(eventId) {
  const response = await axios.delete(`${API_URL}/events/${eventId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}
