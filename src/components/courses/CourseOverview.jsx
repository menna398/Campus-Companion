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
            {course.description}
          </p>
        </div>

        {/* Objectives */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <span className="text-[8px] uppercase tracking-wide text-[#89949d]">
            Curriculum Metrics
          </span>

          <h2 className="mt-1 font-serif text-base font-bold text-[#273545]">
            Learning Objectives
          </h2>

          <div className="mt-4 space-y-3">
            {course.objectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className={
                    objective.completed ? "text-[#91aa91]" : "text-[#9aa5ad]"
                  }
                >
                  {objective.completed ? "✓" : "□"}
                </span>

                <span className="text-[10px] text-[#4f5d68]">
                  {objective.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="space-y-6">
        {/* Grades */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <span className="text-[8px] uppercase tracking-wide text-[#89949d]">
            Evaluation
          </span>

          <h2 className="mt-1 font-serif text-base font-bold text-[#273545]">
            Grade Weight Breakdown
          </h2>

          <div className="mt-5 space-y-3">
            {course.gradeBreakdown.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-[9px] text-[#596773]">{item.name}</span>
                </div>

                <span className="text-[9px] font-semibold text-[#3d4a55]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}

        <div className="rounded-xl border border-[#e7e3de] bg-white p-5">
          <h2 className="font-serif text-base font-bold text-[#273545]">
            Course Milestones
          </h2>

          <div className="mt-4 flex gap-3">
            <span className="h-fit rounded bg-[#f5f5f2] px-2 py-1 text-[8px] text-[#687681]">
              {course.milestone.date}
            </span>

            <div>
              <p className="text-[10px] font-semibold text-[#3d4a55]">
                {course.milestone.title}
              </p>

              <p className="mt-1 text-[8px] text-[#89949d]">
                {course.milestone.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
