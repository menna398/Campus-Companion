import { Link, Outlet, useParams } from "react-router-dom";
import { courses } from "../../data/coursesData";
import CourseTabs from "../../components/courses/CourseTabs";

export default function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((course) => course.id === Number(id));

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

          <div className="flex items-center gap-3">
            <img
              src={course.professorImage}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-xs font-semibold text-[#273545]">
                {course.professor}
              </p>

              <p className="mt-1 text-[9px] text-[#89949d]">
                Office Hours: Tue/Thu 02:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <CourseTabs courseId={course.id} />

      {/* Current Tab */}

      <Outlet context={{ course }} />
    </div>
  );
}
