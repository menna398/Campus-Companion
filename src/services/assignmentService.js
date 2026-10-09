import axios from "axios";

const API_URL = "https://campus-companion-back.vercel.app/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/*
 * Get all assignments
 */

export async function getAssignments() {
  const response = await axios.get(`${API_URL}/assignments`, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/*
 * Get assignments for one course
 */

export async function getCourseAssignments(courseId) {
  const response = await axios.get(`${API_URL}/assignments`, {
    params: {
      courseId,
    },

    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/*
 * Create assignment
 */

export async function createAssignment(assignmentData) {
  const response = await axios.post(`${API_URL}/assignments`, assignmentData, {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

/*
 * Update assignment
 */

export async function updateAssignment(assignmentId, assignmentData) {
  const response = await axios.put(
    `${API_URL}/assignments/${assignmentId}`,
    assignmentData,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data;
}

/*
 * Delete assignment
 */

export async function deleteAssignment(assignmentId) {
  const response = await axios.delete(
    `${API_URL}/assignments/${assignmentId}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}
