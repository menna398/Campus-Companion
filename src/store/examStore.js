import { create } from "zustand";

import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../services/examService";

const examStore = create((set) => ({
  exams: [],
  loading: true,
  error: null,
  updating: false,
  saving: false,

  fetchExams: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const exams = await getExams();

      set({
        exams,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        exams: [],
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load exams.",
      });
    }
  },

  addExam: async (examData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const newExam = await createExam(examData);

      set((state) => ({
        exams: [...state.exams, newExam],
        saving: false,
        error: null,
      }));

      return newExam;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add exam.",
      });

      throw error;
    }
  },

  updateExam: async (examId, examData) => {
    set({
      updating: true,
      error: null,
    });

    try {
      const updatedExam = await updateExam(examId, examData);

      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === examId ? updatedExam : exam,
        ),
        updating: false,
        error: null,
      }));

      return updatedExam;
    } catch (error) {
      set({
        updating: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update exam.",
      });

      throw error;
    }
  },

  removeExam: async (examId) => {
    set({
      saving: true,
      error: null,
    });

    try {
      await deleteExam(examId);

      set((state) => ({
        exams: state.exams.filter((exam) => exam.id !== examId),
        saving: false,
        error: null,
      }));
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete exam.",
      });

      throw error;
    }
  },
}));

export default examStore;
