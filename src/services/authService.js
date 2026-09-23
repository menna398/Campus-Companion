import { mockUsers } from "../data/mockUsers";

const USERS_KEY = "campus_companion_users";
const CURRENT_USER_KEY = "campus_companion_current_user";

export const getUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (storedUsers) {
    return JSON.parse(storedUsers);
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));

  return mockUsers;
};

export const registerUser = (userData) => {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
  );

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: Date.now(),
    fullName: userData.fullName,
    email: userData.email,
    studentId: userData.studentId,
    university: userData.university,
    password: userData.password,
  };

  const updatedUsers = [...users, newUser];

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return newUser;
};

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const loggedInUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    university: user.university,
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));

  return loggedInUser;
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
