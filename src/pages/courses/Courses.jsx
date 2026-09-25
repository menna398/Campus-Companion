import { useState } from "react";
import CoursesCards from "../../components/courses/CoursesCards";
import { courses } from "../../data/coursesData";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      course.title.toLowerCase().includes(search) ||
      course.code.toLowerCase().includes(search) ||
      course.professor.toLowerCase().includes(search) ||
      course.location.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen w-full bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-9">
      {/* ================= HEADER ================= */}

      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#273545]">
            My Courses
          </h1>

          <p className="mt-1 text-xs text-[#687681]">
            Managing your active academic curriculum & archives
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[280px]">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b969f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="
              w-full
              rounded-lg
              border
              border-[#e3dfda]
              bg-white
              py-2.5
              pl-10
              pr-4
              text-xs
              text-[#273545]
              outline-none
              transition
              placeholder:text-[#a0a8ae]
              focus:border-[#7094b8]
              focus:ring-2
              focus:ring-[#7094b8]/10
            "
          />
        </div>
      </div>

      {/* ================= COURSES ================= */}

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CoursesCards key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-16 text-center">
          <p className="font-serif text-lg text-[#273545]">No courses found</p>

          <p className="mt-1 text-xs text-[#89949d]">
            Try searching with another course name or code.
          </p>
        </div>
      )}

      {/* ================= ADD COURSE ================= */}

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          className="
            rounded-lg
            border
            border-[#d8d3cd]
            bg-white
            px-5
            py-2.5
            text-xs
            font-medium
            text-[#596773]
            shadow-sm
            transition-all
            hover:border-[#7094b8]
            hover:bg-[#fdfcf9]
            hover:text-[#526f8e]
          "
        >
          + Add New Course
        </button>
      </div>
    </div>
  );
}
