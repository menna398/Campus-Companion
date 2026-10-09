import axios from "axios";

const API_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* Get all notes */

export async function getNotes() {
  const response = await axios.get(`${API_URL}/notes`, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/* Create note */

export async function createNote(noteData) {
  const response = await axios.post(`${API_URL}/notes`, noteData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/* Update note */

export async function updateNote(noteId, noteData) {
  const response = await axios.put(`${API_URL}/notes/${noteId}`, noteData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/* Delete note */

export async function deleteNote(noteId) {
  const response = await axios.delete(`${API_URL}/notes/${noteId}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}
