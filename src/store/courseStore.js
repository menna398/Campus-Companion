import { create } from "zustand";
import { getCourses } from "../services/courseService";

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({
      loading: true,
      error: null,
    });

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
}));

export default useCourseStore;
