import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, logout, deleteAccount } = useAuth();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    university: "",
    college: "",
    gpa: "",
    courses: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        studentId: user.studentId || "",
        university: user.university || "",
        college: user.college || "",
        gpa: user.gpa || "",
        courses: user.courses || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;

    setFormData((prev) => ({
      ...prev,
      courses: updatedCourses,
    }));
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, ""],
    }));
  };

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleSaveProfile = async () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Full name and email are required.",
        confirmButtonColor: "#1E2A3A",
      });
      return;
    }

    setIsSaving(true);

    try {
      await updateUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        studentId: formData.studentId.trim(),
        university: formData.university.trim(),
        college: formData.college.trim(),
        gpa: String(formData.gpa).trim(),
        courses: formData.courses
          .map((course) => course.trim())
          .filter(Boolean),
      });

      setIsEditing(false);

      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update your profile.",
        confirmButtonColor: "#1E2A3A",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        studentId: user.studentId || "",
        university: user.university || "",
        college: user.college || "",
        gpa: user.gpa || "",
        courses: user.courses || [],
      });
    }

    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Delete Account?",
      text: "Are you sure you want to delete your account? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#9A5A52",
      cancelButtonColor: "#6B7785",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAccount();

      await Swal.fire({
        title: "Account Deleted",
        text: "Your account has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#1E2A3A",
      });

      navigate("/login", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message || "Failed to delete your account.",
        confirmButtonColor: "#1E2A3A",
      });
    }
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return null;
  }

  const inputClasses = `w-full rounded-xl border border-[#E7E2DC] bg-[#FEFCFA] px-4 py-3 text-sm text-[#1E2A3A] outline-none transition ${
    isEditing
      ? "focus:border-[#536275] focus:ring-2 focus:ring-[#536275]/10"
      : "cursor-default"
  }`;

  return (
    <div className="min-h-screen bg-[#F8F6F3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-[#E7E2DC] bg-[#FEFCFA] p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCE5DF] text-lg font-semibold text-[#31463D]">
                {getInitials(user.fullName)}
              </div>

              <div>
                <h1 className="text-xl font-semibold text-[#1E2A3A] sm:text-2xl">
                  {user.fullName}
                </h1>

                <p className="mt-1 text-sm text-[#6B7785]">
                  Student ID: {user.studentId || "Not added"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl bg-[#1E2A3A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2C3B4D]"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="rounded-xl border border-[#D9D4CE] bg-white px-5 py-2.5 text-sm font-medium text-[#536275] transition hover:bg-[#F8F6F3] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="rounded-xl bg-[#1E2A3A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2C3B4D] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}

              <button
                onClick={handleLogout}
                className="rounded-xl border border-[#E3C9C5] bg-[#FFF8F7] px-5 py-2.5 text-sm font-medium text-[#9A5A52] transition hover:bg-[#FDEDEA]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto rounded-2xl border border-[#E7E2DC] bg-[#FEFCFA]">
          <div className="flex min-w-max">
            <button
              onClick={() => setActiveTab("personal")}
              className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
                activeTab === "personal"
                  ? "border-[#536275] text-[#1E2A3A]"
                  : "border-transparent text-[#7A8490] hover:text-[#1E2A3A]"
              }`}
            >
              Personal Information
            </button>

            <button
              onClick={() => setActiveTab("academic")}
              className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
                activeTab === "academic"
                  ? "border-[#536275] text-[#1E2A3A]"
                  : "border-transparent text-[#7A8490] hover:text-[#1E2A3A]"
              }`}
            >
              Academic Details
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
                activeTab === "account"
                  ? "border-[#536275] text-[#1E2A3A]"
                  : "border-transparent text-[#7A8490] hover:text-[#1E2A3A]"
              }`}
            >
              Account Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-[#E7E2DC] bg-[#FEFCFA] p-5 shadow-sm sm:p-7">
          {/* Personal Information */}
          {activeTab === "personal" && (
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E2A3A]">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-[#7A8490]">
                  Manage your basic student information.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    Student ID
                  </label>

                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    University
                  </label>

                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClasses}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Academic Details */}
          {activeTab === "academic" && (
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E2A3A]">
                  Academic Details
                </h2>

                <p className="mt-1 text-sm text-[#7A8490]">
                  Keep your academic information up to date.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    University
                  </label>

                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    College
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. Faculty of Computers & Information"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#536275]">
                    GPA
                  </label>

                  <input
                    type="text"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. 3.68"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Courses */}
              <div className="mt-7">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1E2A3A]">
                      Courses
                    </h3>

                    <p className="mt-1 text-xs text-[#7A8490]">
                      Add the courses you are currently taking.
                    </p>
                  </div>

                  {isEditing && (
                    <button
                      onClick={addCourse}
                      className="w-fit rounded-lg border border-[#D9D4CE] px-4 py-2 text-sm font-medium text-[#536275] transition hover:bg-[#F8F6F3]"
                    >
                      + Add Course
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {formData.courses.length > 0 ? (
                    formData.courses.map((course, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={course}
                          onChange={(e) =>
                            handleCourseChange(index, e.target.value)
                          }
                          disabled={!isEditing}
                          placeholder="Course name"
                          className={inputClasses}
                        />

                        {isEditing && (
                          <button
                            onClick={() => removeCourse(index)}
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-[#9A5A52] transition hover:bg-[#FFF1EF]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#D9D4CE] bg-[#FCFAF7] px-5 py-8 text-center">
                      <p className="text-sm text-[#7A8490]">
                        No courses added yet.
                      </p>

                      {isEditing && (
                        <button
                          onClick={addCourse}
                          className="mt-3 text-sm font-medium text-[#536275] underline underline-offset-4"
                        >
                          Add your first course
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Account Settings */}
          {activeTab === "account" && (
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E2A3A]">
                  Account Settings
                </h2>

                <p className="mt-1 text-sm text-[#7A8490]">
                  Manage your account and access settings.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8D4D0] bg-[#FFF9F8] p-5">
                <h3 className="text-sm font-semibold text-[#8F514A]">
                  Delete Account
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A6865]">
                  Deleting your account will remove your saved profile from this
                  application and sign you out.
                </p>

                <button
                  onClick={handleDeleteAccount}
                  className="mt-5 rounded-xl border border-[#D9AFA9] bg-white px-5 py-2.5 text-sm font-medium text-[#9A5A52] transition hover:bg-[#FDEDEA]"
                >
                  Delete Account
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
