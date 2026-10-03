import { create } from "zustand";

import {
  getAssignments,
  getCourseAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../services/assignmentService";

const useAssignmentStore = create((set) => ({
  assignments: [],
  courseAssignments: [],
  loading: false,
  loadingCourseAssignments: false,
  saving: false,
  error: null,

  /*
   * =========================================
   * GET ALL ASSIGNMENTS
   * =========================================
   */

  fetchAssignments: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const assignments = await getAssignments();

      set({
        assignments,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        assignments: [],
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load assignments.",
      });
    }
  },

  /*
   * =========================================
   * GET COURSE ASSIGNMENTS
   * =========================================
   */

  fetchCourseAssignments: async (courseId) => {
    set({
      loadingCourseAssignments: true,
      error: null,
    });

    try {
      const assignments = await getCourseAssignments(courseId);

      set({
        courseAssignments: assignments,
        loadingCourseAssignments: false,
        error: null,
      });
    } catch (error) {
      set({
        courseAssignments: [],
        loadingCourseAssignments: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load course assignments.",
      });
    }
  },

  /*
   * =========================================
   * CREATE
   * =========================================
   */

  addAssignment: async (assignmentData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const newAssignment = await createAssignment(assignmentData);

      set((state) => ({
        assignments: [...state.assignments, newAssignment],

        courseAssignments: state.courseAssignments.some(
          (assignment) => assignment.courseId === newAssignment.courseId,
        )
          ? [...state.courseAssignments, newAssignment]
          : state.courseAssignments,

        saving: false,
        error: null,
      }));

      return newAssignment;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add assignment.",
      });

      throw error;
    }
  },

  /*
   * =========================================
   * UPDATE
   * =========================================
   */

  editAssignment: async (assignmentId, assignmentData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const updatedAssignment = await updateAssignment(
        assignmentId,
        assignmentData,
      );

      set((state) => ({
        assignments: state.assignments.map((assignment) =>
          assignment.id === assignmentId ? updatedAssignment : assignment,
        ),

        courseAssignments: state.courseAssignments.map((assignment) =>
          assignment.id === assignmentId ? updatedAssignment : assignment,
        ),

        saving: false,
        error: null,
      }));

      return updatedAssignment;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update assignment.",
      });

      throw error;
    }
  },

  /*
   * =========================================
   * DELETE
   * =========================================
   */

  removeAssignment: async (assignmentId) => {
    set({
      saving: true,
      error: null,
    });

    try {
      await deleteAssignment(assignmentId);

      set((state) => ({
        assignments: state.assignments.filter(
          (assignment) => assignment.id !== assignmentId,
        ),

        courseAssignments: state.courseAssignments.filter(
          (assignment) => assignment.id !== assignmentId,
        ),

        saving: false,
        error: null,
      }));
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete assignment.",
      });

      throw error;
    }
  },
}));

export default useAssignmentStore;
