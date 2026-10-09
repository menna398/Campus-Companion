import { create } from "zustand";

import {
  getAssignments,
  getExams,
  getSchedule,
} from "../services/dashboardService";

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

// Courses and events already have their own stores (courseStore / eventStore).
// This store only holds what the dashboard needs on top of them.
const useDashboardStore = create((set) => ({
  assignments: [],
  exams: [],
  schedule: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });

    // allSettled: one failing resource should not blank the whole dashboard.
    const [assignments, exams, schedule] = await Promise.allSettled([
      getAssignments(),
      getExams(),
      getSchedule(),
    ]);

    const failed = [assignments, exams, schedule].find(
      (result) => result.status === "rejected",
    );

    set((state) => ({
      assignments:
        assignments.status === "fulfilled"
          ? assignments.value
          : state.assignments,
      exams: exams.status === "fulfilled" ? exams.value : state.exams,
      schedule:
        schedule.status === "fulfilled" ? schedule.value : state.schedule,
      loading: false,
      error: failed
        ? getErrorMessage(failed.reason, "Failed to load dashboard data.")
        : null,
    }));
  },
}));

export default useDashboardStore;
