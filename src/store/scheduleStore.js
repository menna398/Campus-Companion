import { create } from "zustand";

import {
  getSchedule,
  updateCourseSchedule,
  removeCourseSchedule,
} from "../services/scheduleService";

import useCourseStore from "./courseStore";

const scheduleStore = create((set) => ({
  schedule: [],
  loading: true,
  error: null,
  saving: false,
  updating: false,

  /*
   * =========================================
   * FETCH SCHEDULE
   * =========================================
   */

  fetchSchedule: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const schedule = await getSchedule();

      set({
        schedule,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        schedule: [],
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load schedule.",
      });
    }
  },

  /*
   * =========================================
   * ADD COURSE TO SCHEDULE
   * =========================================
   */

  addCourseToSchedule: async (courseId, scheduleData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const updatedCourse = await updateCourseSchedule(courseId, scheduleData);

      /*
       * Update Schedule Store
       */

      set((state) => ({
        schedule: [
          ...state.schedule.filter(
            (course) => String(course.id) !== String(courseId),
          ),
          updatedCourse,
        ],
        saving: false,
        error: null,
      }));

      /*
       * Update Course Store
       */

      useCourseStore.setState((state) => ({
        courses: state.courses.map((course) =>
          String(course.id) === String(courseId) ? updatedCourse : course,
        ),
      }));

      return updatedCourse;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add course to schedule.",
      });

      throw error;
    }
  },

  /*
   * =========================================
   * UPDATE SCHEDULE
   * =========================================
   */

  updateSchedule: async (courseId, scheduleData) => {
    set({
      updating: true,
      error: null,
    });

    try {
      const updatedCourse = await updateCourseSchedule(courseId, scheduleData);

      set((state) => ({
        schedule: state.schedule.map((course) =>
          String(course.id) === String(courseId) ? updatedCourse : course,
        ),
        updating: false,
        error: null,
      }));

      /*
       * Update Course Store
       */

      useCourseStore.setState((state) => ({
        courses: state.courses.map((course) =>
          String(course.id) === String(courseId) ? updatedCourse : course,
        ),
      }));

      return updatedCourse;
    } catch (error) {
      set({
        updating: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update schedule.",
      });

      throw error;
    }
  },

  /*
   * =========================================
   * REMOVE COURSE FROM SCHEDULE
   * =========================================
   */

  removeCourseFromSchedule: async (courseId) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const updatedCourse = await removeCourseSchedule(courseId);

      /*
       * Remove from Schedule Store
       */

      set((state) => ({
        schedule: state.schedule.filter(
          (course) => String(course.id) !== String(courseId),
        ),
        saving: false,
        error: null,
      }));

      /*
       * Update Course Store
       */

      useCourseStore.setState((state) => ({
        courses: state.courses.map((course) =>
          String(course.id) === String(courseId) ? updatedCourse : course,
        ),
      }));

      return updatedCourse;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to remove the course from the schedule.",
      });

      throw error;
    }
  },
}));

export default scheduleStore;
