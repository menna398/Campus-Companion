import axios from "axios";

const API_URL = "http://localhost:5000/api";

// "token" is the key every other service (events, notes, ...) already reads.
const TOKEN_KEY = "token";
const USER_KEY = "campus_companion_current_user";

// Old mock-auth key, removed so no fake users stay in the browser.
const LEGACY_USERS_KEY = "campus_companion_users";

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  };
}

function saveSession({ user, token }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LEGACY_USERS_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// The user is only considered logged in if BOTH the token and the user exist.
export function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  if (!token || !storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    clearSession();
    return null;
  }
}

// POST /api/auth/register
export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      fullName: userData.fullName,
      email: userData.email,
      studentId: userData.studentId,
      university: userData.university,
      password: userData.password,
    });

    const { user, token } = response.data || {};

    if (!user || !token) {
      throw new Error("Invalid response from the server.");
    }

    saveSession({ user, token });

    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Registration failed."));
  }
}

// POST /api/auth/login
export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { user, token } = response.data || {};

    if (!user || !token) {
      throw new Error("Invalid response from the server.");
    }

    saveSession({ user, token });

    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Invalid email or password."));
  }
}

export function logoutUser() {
  clearSession();
}

// PATCH /api/profile
export async function updateCurrentUser(updatedData) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("No logged-in user found.");
  }

  try {
    const response = await axios.patch(`${API_URL}/profile`, updatedData, {
      headers: getAuthHeaders(),
    });

    const serverUser =
      response.data?.user || response.data?.data || response.data || {};

    const updatedUser = {
      ...currentUser,
      ...updatedData,
      ...serverUser,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to update profile."));
  }
}

// DELETE /api/profile
export async function deleteCurrentUser() {
  try {
    await axios.delete(`${API_URL}/profile`, {
      headers: getAuthHeaders(),
    });

    clearSession();
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to delete account."));
  }
}
