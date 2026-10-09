import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  deleteCurrentUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Restored from localStorage (token + user) on refresh.
  const [user, setUser] = useState(() => getCurrentUser());

  const login = useCallback(async (email, password) => {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (userData) => {
    const newUser = await registerUser(userData);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updatedData) => {
    const updatedUser = await updateCurrentUser(updatedData);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const deleteAccount = useCallback(async () => {
    await deleteCurrentUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      updateUser,
      deleteAccount,
    }),
    [user, login, register, logout, updateUser, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}

export default AuthContext;
