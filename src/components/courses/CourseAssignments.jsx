import { useOutletContext } from "react-router-dom";

export default function CourseAssignments() {
  const { course } = useOutletContext();

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            Assignments
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Assignments for {course.code}
          </p>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            bg-[#7094b8]
            px-4
            py-2
            text-[10px]
            font-medium
            text-white
            hover:bg-[#6285a8]
          "
        >
          + Add Assignment
        </button>
      </div>

      <div className="space-y-3">
        {course.assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="
              flex
              flex-col
              gap-4
              rounded-xl
              border
              border-[#e7e3de]
              bg-white
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h3 className="font-serif text-sm font-bold text-[#273545]">
                {assignment.title}
              </h3>

              <p className="mt-1 text-[10px] text-[#89949d]">
                Due: {assignment.dueDate}
              </p>

              <p className="mt-2 text-[10px] text-[#596773]">
                {assignment.description}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded-md border border-[#ddd8d2] px-3 py-1.5 text-[9px] text-[#596773] hover:bg-[#f7f6f3]"
              >
                Edit
              </button>

              <button
                type="button"
                className="rounded-md border border-[#ead5d5] px-3 py-1.5 text-[9px] text-[#a06464] hover:bg-[#fff7f7]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
