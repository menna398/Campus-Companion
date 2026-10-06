import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import CoursesCards from "../../components/courses/CoursesCards";
import CourseModal from "../../components/courses/CourseModal";
import useCourseStore from "../../store/courseStore";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const {
    courses,
    loading,
    error,
    saving,
    fetchCourses,
    addCourse,
    removeCourse,
  } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      course.title?.toLowerCase().includes(search) ||
      course.code?.toLowerCase().includes(search) ||
      course.professor?.toLowerCase().includes(search) ||
      course.location?.toLowerCase().includes(search)
    );
  });

  // =========================
  // ADD COURSE
  // =========================

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // =========================
  // SAVE COURSE
  // =========================

  const handleSaveCourse = async (courseData) => {
    try {
      await addCourse(courseData);

      setIsModalOpen(false);
      setSelectedCourse(null);

      await Swal.fire({
        icon: "success",
        title: "Course Added",
        text: "The course has been added successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to add the course.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  // =========================
  // DELETE COURSE
  // =========================

  const handleDeleteCourse = async (course) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: `Are you sure you want to delete "${course.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a06464",
      cancelButtonColor: "#89949d",
    });

    if (!result.isConfirmed) return;

    try {
      await removeCourse(course.id);

      await Swal.fire({
        icon: "success",
        title: "Course Deleted",
        text: "The course has been deleted successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete the course.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-9">
      {/* ================= HEADER ================= */}

      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#273545]">
            My Courses
          </h1>

          <p className="mt-1 text-xs text-[#687681]">
            Managing your active academic curriculum & archives
          </p>
        </div>

        {/* Search */}

        <div className="relative w-full sm:w-[280px]">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b969f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="
              w-full
              rounded-lg
              border
              border-[#e3dfda]
              bg-white
              py-2.5
              pl-10
              pr-4
              text-xs
              text-[#273545]
              outline-none
              transition
              placeholder:text-[#a0a8ae]
              focus:border-[#7094b8]
              focus:ring-2
              focus:ring-[#7094b8]/10
            "
          />
        </div>
      </div>

      {/* ================= COURSES ================= */}

      {loading ? (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-16 text-center">
          <p className="font-serif text-lg text-[#273545]">
            Loading courses...
          </p>

          <p className="mt-1 text-xs text-[#89949d]">
            Please wait while your courses are being loaded.
          </p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-16 text-center">
          <p className="font-serif text-lg text-[#273545]">
            Unable to load courses
          </p>

          <p className="mt-1 text-xs text-[#89949d]">{error}</p>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="relative">
              <CoursesCards course={course} />

              {/* Delete */}

              <button
                type="button"
                onClick={() => handleDeleteCourse(course)}
                disabled={saving}
                className="
                  absolute
                  right-3
                  top-3
                  z-10
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#a06464]
                  shadow-sm
                  transition
                  hover:bg-[#fff5f5]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                title="Delete course"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-16 text-center">
          <p className="font-serif text-lg text-[#273545]">No courses found</p>

          <p className="mt-1 text-xs text-[#89949d]">
            Try searching with another course name or code.
          </p>
        </div>
      )}

      {/* ================= ADD COURSE ================= */}

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={handleAddCourse}
          className="
            rounded-lg
            border
            border-[#d8d3cd]
            bg-white
            px-5
            py-2.5
            text-xs
            font-medium
            text-[#596773]
            shadow-sm
            transition-all
            hover:border-[#7094b8]
            hover:bg-[#fdfcf9]
            hover:text-[#526f8e]
          "
        >
          + Add New Course
        </button>
      </div>

      {/* ================= COURSE MODAL ================= */}

      <CourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
        course={selectedCourse}
        saving={saving}
      />
    </div>
  );
}
