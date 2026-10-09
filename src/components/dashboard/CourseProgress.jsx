export default function CourseProgress({ courses = [] }) {
  return (
    <section className="rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Overview
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Course Progress
      </h2>

      <div className="mt-5 space-y-4">
        {courses.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">No courses added yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id}>
              <div className="mb-1.5 flex justify-between gap-3">
                <span className="truncate text-[10px] font-semibold text-[#465159]">
                  {course.name}
                </span>

                <span className="shrink-0 text-[9px] text-[#7e898f]">
                  {course.progress}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[#f1f0ec]">
                <div
                  className="h-full rounded-full bg-[#91a98f]"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
