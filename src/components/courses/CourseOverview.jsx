import { useOutletContext } from "react-router-dom";

export default function CourseOverview() {
  const { course } = useOutletContext();

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1.1fr]">
      {/* LEFT */}

      <div className="space-y-6">
        {/* Description */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-[#273545]">
              Course Description
            </h2>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-[9px] text-[#596773] hover:bg-[#f4f3f0]"
              >
                Edit
              </button>

              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-[9px] text-[#a06464] hover:bg-[#fff5f5]"
              >
                Delete
              </button>
            </div>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-[#596773]">
            {course.description || "No description available for this course."}
          </p>
        </div>

        {/* Course Progress */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <span className="text-[8px] uppercase tracking-wide text-[#89949d]">
            Curriculum Metrics
          </span>

          <h2 className="mt-1 font-serif text-base font-bold text-[#273545]">
            Course Progress
          </h2>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] text-[#596773]">
                Syllabus Progress
              </span>

              <span className="text-[10px] font-semibold text-[#3d4a55]">
                {course.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#f1f0ed]">
              <div
                className="h-full rounded-full bg-[#91ae91]"
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="space-y-6">
        {/* Course Information */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <span className="text-[8px] uppercase tracking-wide text-[#89949d]">
            Course Information
          </span>

          <h2 className="mt-1 font-serif text-base font-bold text-[#273545]">
            Details
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#89949d]">Professor</span>

              <span className="text-[9px] font-semibold text-[#3d4a55]">
                {course.professor}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#89949d]">Location</span>

              <span className="text-[9px] font-semibold text-[#3d4a55]">
                {course.location}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#89949d]">Credits</span>

              <span className="text-[9px] font-semibold text-[#3d4a55]">
                {course.credits}
              </span>
            </div>

            <div>
              <span className="text-[9px] text-[#89949d]">Schedule</span>

              <p className="mt-1 text-[9px] font-semibold text-[#3d4a55]">
                {course.schedule}
              </p>
            </div>
          </div>
        </div>

        {/* Course Progress Summary */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <h2 className="font-serif text-base font-bold text-[#273545]">
            Progress Summary
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f1]">
              <span className="text-[10px] font-semibold text-[#6f8c6f]">
                {course.progress}%
              </span>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-[#3d4a55]">
                Current Progress
              </p>

              <p className="mt-1 text-[8px] text-[#89949d]">
                Course syllabus completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
