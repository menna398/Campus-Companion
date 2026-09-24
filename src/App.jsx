import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Terms from "./pages/auth/Terms";

import Dashboard from "./pages/dashboard/Dashboard";
import Courses from "../src/pages/courses/Courses.jsx";
import Assignments from "../src/pages/assignments/Assignments.jsx";
import Exams from "./pages/exams/Exams";
import Schedule from "./pages/schedule/Schedule";
import Notes from "./pages/notes/Notes";
import Events from "./pages/events/Events";
import Profile from "./pages/profile/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#FEFCFA",
              color: "#1E2A3A",
              border: "1px solid #E7E2DC",
            },
          }}
        />

        <Routes>
          {/* ================================================== */}
          {/* PUBLIC ROUTES */}
          {/* ================================================== */}

          <Route path="/" element={<LandingPage />} />

          {/* ================================================== */}
          {/* AUTH ROUTES */}
          {/* Logged-in users cannot access these pages */}
          {/* ================================================== */}

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          <Route
            path="/terms"
            element={
              <PublicRoute>
                <Terms />
              </PublicRoute>
            }
          />

          {/* ================================================== */}
          {/* PROTECTED APPLICATION ROUTES */}
          {/* ================================================== */}

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />

            {/* Assignments */}
            <Route path="/assignments" element={<Assignments />} />

            {/* Exams */}
            <Route path="/exams" element={<Exams />} />

            {/* Schedule */}
            <Route path="/schedule" element={<Schedule />} />

            {/* Notes */}
            <Route path="/notes" element={<Notes />} />

            {/* Events */}
            <Route path="/events" element={<Events />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
