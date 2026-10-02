import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import CourseTabs from "../../components/courses/CourseTabs";
import CourseEditModal from "../../components/courses/CourseEditModal";
import useCourseStore from "../../store/courseStore";

export default function CourseDetails() {
  const { id } = useParams();

  const { courses, loading } = useCourseStore();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const course = courses.find((course) => course.id === id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#273545]">
            Loading Course...
          </h2>

          <p className="mt-2 text-xs text-[#89949d]">
            Please wait while the course is being loaded.
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#273545]">
            Course Not Found
          </h2>

          <Link
            to="/courses"
            className="mt-3 inline-block text-xs text-[#7094b8]"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-14">
      {/* Header */}

      <div className="rounded-xl border border-[#e7e3de] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <span
              className="inline-block rounded-md px-2 py-1 text-[9px] font-semibold text-white"
              style={{
                backgroundColor: course.color,
              }}
            >
              {course.code}
            </span>

            <h1 className="mt-2 font-serif text-2xl font-bold text-[#273545] sm:text-3xl">
              {course.title}
            </h1>

            <p className="mt-2 text-[10px] text-[#687681]">
              {course.location} • Fall Semester 2026
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2f0] text-xs font-semibold text-[#687681]">
                {course.professor
                  ?.split(" ")
                  .slice(0, 2)
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#273545]">
                  {course.professor}
                </p>

                <p className="mt-1 text-[9px] text-[#89949d]">
                  Office Hours: Tue/Thu 02:00 PM
                </p>
              </div>
            </div>

            {/* Edit Course */}

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-4 py-2 text-[10px] font-semibold text-[#596773] transition hover:bg-[#f1efeb]"
            >
              Edit Course
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <CourseTabs courseId={course.id} />

      {/* Current Tab */}

      <Outlet
        context={{
          course,
          openEditModal: () => setIsEditOpen(true),
        }}
      />

      {/* Edit Course Modal */}

      <CourseEditModal
        course={course}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
