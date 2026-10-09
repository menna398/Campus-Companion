import { useEffect, useMemo } from "react";

import { useAuth } from "../../context/AuthContext";

import useCourseStore from "../../store/courseStore";
import useEventStore from "../../store/eventStore";
import useDashboardStore from "../../store/dashboardStore";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TodaySchedule from "../../components/dashboard/TodaySchedule";
import CourseProgress from "../../components/dashboard/CourseProgress";
import UpcomingAssignments from "../../components/dashboard/UpcomingAssignments";
import UpcomingExams from "../../components/dashboard/UpcomingExams";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import AcademicSnapshot from "../../components/dashboard/AcademicSnapshot";

import {
  buildCourseProgress,
  buildSnapshotStats,
  buildTodaySchedule,
  buildUpcomingAssignments,
  buildUpcomingEvents,
  buildUpcomingExams,
  formatLongDate,
  getFirstName,
  getGreeting,
  getSemesterInfo,
} from "../../utils/dashboardHelpers";

export default function Dashboard() {
  const { user } = useAuth();

  // Existing stores (no duplicated fetching logic).
  const { courses, fetchCourses } = useCourseStore();
  const { events, fetchEvents } = useEventStore();

  // Assignments / exams / schedule for the dashboard.
  const { assignments, exams, schedule, loading, error, fetchDashboardData } =
    useDashboardStore();

  useEffect(() => {
    fetchCourses();
    fetchEvents();
    fetchDashboardData();
  }, [fetchCourses, fetchEvents, fetchDashboardData]);

  const semester = useMemo(() => getSemesterInfo(), []);

  const todaySchedule = useMemo(() => buildTodaySchedule(schedule), [schedule]);

  const courseProgress = useMemo(
    () => buildCourseProgress(courses, assignments),
    [courses, assignments],
  );

  const upcomingAssignments = useMemo(
    () => buildUpcomingAssignments(assignments),
    [assignments],
  );

  const upcomingExams = useMemo(
    () => buildUpcomingExams(exams, courses),
    [exams, courses],
  );

  const upcomingEvents = useMemo(() => buildUpcomingEvents(events), [events]);

  const snapshotStats = useMemo(
    () => buildSnapshotStats({ user, assignments, semester }),
    [user, assignments, semester],
  );

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Dashboard Header */}
        <DashboardHeader
          userName={getFirstName(user?.fullName)}
          greeting={getGreeting()}
          dateLabel={formatLongDate()}
          academicYear={semester.academicYear}
          semesterName={semester.name}
        />

        {/* Error */}
        {error && (
          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-red-100 bg-white px-4 py-3 sm:flex-row sm:items-center">
            <p className="text-xs text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchDashboardData}
              className="rounded-lg bg-[#26364A] px-3 py-1.5 text-[11px] text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-5 lg:col-span-2">
            <TodaySchedule items={todaySchedule} loading={loading} />

            <UpcomingAssignments
              assignments={upcomingAssignments}
              loading={loading}
            />

            <UpcomingExams exams={upcomingExams} loading={loading} />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <CourseProgress courses={courseProgress} />

            <UpcomingEvents events={upcomingEvents} />
          </div>
        </div>

        {/* Academic Snapshot */}
        <div className="mt-5">
          <AcademicSnapshot stats={snapshotStats} />
        </div>
      </main>
    </div>
  );
}
