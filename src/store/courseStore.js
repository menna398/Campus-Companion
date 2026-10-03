import { create } from "zustand";
import { getCourses, updateCourse } from "../services/courseService";

const useCourseStore = create((set) => ({
  courses: [],
  loading: true,
  error: null,
  updating: false,

  fetchCourses: async () => {
    set({ loading: true, error: null });

    try {
      const courses = await getCourses();

      set({
        courses,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        courses: [],
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load courses.",
      });
    }
  },

  updateCourse: async (courseId, courseData) => {
    set({ updating: true, error: null });

    try {
      const updatedCourse = await updateCourse(courseId, courseData);

      set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId ? updatedCourse : course,
        ),
        updating: false,
        error: null,
      }));

      return updatedCourse;
    } catch (error) {
      set({
        updating: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update course.",
      });

      throw error;
    }
  },
}));

export default useCourseStore;
