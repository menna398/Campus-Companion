import { create } from "zustand";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

const useCourseStore = create((set) => ({
  courses: [],
  loading: true,
  error: null,
  updating: false,
  saving: false,

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

  addCourse: async (courseData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const newCourse = await createCourse(courseData);

      set((state) => ({
        courses: [...state.courses, newCourse],
        saving: false,
        error: null,
      }));

      return newCourse;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add course.",
      });

      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    set({
      updating: true,
      error: null,
    });

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

  removeCourse: async (courseId) => {
    set({
      saving: true,
      error: null,
    });

    try {
      await deleteCourse(courseId);

      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
        saving: false,
        error: null,
      }));
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete course.",
      });

      throw error;
    }
  },
}));

export default useCourseStore;
