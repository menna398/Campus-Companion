import { useAuth } from "../../context/AuthContext";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TodaySchedule from "../../components/dashboard/TodaySchedule";
import CourseProgress from "../../components/dashboard/CourseProgress";
import UpcomingAssignments from "../../components/dashboard/UpcomingAssignments";
import UpcomingExams from "../../components/dashboard/UpcomingExams";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import AcademicSnapshot from "../../components/dashboard/AcademicSnapshot";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Dashboard Header */}
        <DashboardHeader userName={user?.fullName} />

        {/* Dashboard Content */}
        <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-5 lg:col-span-2">
            {/* Today's Schedule */}
            <TodaySchedule />

            {/* Upcoming Assignments */}
            <UpcomingAssignments />

            {/* Upcoming Exams */}
            <UpcomingExams />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Course Progress */}
            <CourseProgress />

            {/* Upcoming Events */}
            <UpcomingEvents />
          </div>
        </div>

        {/* Academic Snapshot */}
        <div className="mt-5">
          <AcademicSnapshot />
        </div>
      </main>
    </div>
  );
}
