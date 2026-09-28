import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const loggedInUser = loginUser(email, password);

    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = (userData) => {
    const newUser = registerUser(userData);

    const loggedInUser = loginUser(newUser.email, userData.password);

    setUser(loggedInUser);

    return loggedInUser;
  };

  const updateUser = (updatedData) => {
    const updatedUser = updateCurrentUser(updatedData);

    setUser(updatedUser);

    return updatedUser;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
