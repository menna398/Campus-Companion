export default function AssignmentItem({
  assignment,
  onPriorityChange,
  onStatusChange,
  onComplete,
}) {
  const isDone = assignment.status === "DONE";

  const isOverdue = assignment.dueDate.toLowerCase().includes("due oct");

  return (
    <div
      className={`group flex items-center gap-4 border-b border-[#eeeae5] px-3 py-4 last:border-b-0 transition-all duration-200 hover:bg-[#faf9f7] ${
        isDone ? "bg-[#fafafa]" : ""
      }`}
    >
      {/* =========================================
          COMPLETE CIRCLE
      ========================================= */}

      <button
        type="button"
        onClick={() => onComplete(assignment.id)}
        title={isDone ? "Mark as not completed" : "Mark as completed"}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-110 ${
          isDone
            ? "border-[#91aa91] bg-[#91aa91]"
            : assignment.status === "WORKING"
              ? "border-[#7094b8] hover:bg-[#e7eef7]"
              : "border-[#94a3b8] hover:border-[#7094b8]"
        }`}
      >
        {isDone && <span className="text-[9px] font-bold text-white">✓</span>}
      </button>

      {/* =========================================
          ASSIGNMENT CONTENT
      ========================================= */}

      <div className="min-w-0 flex-1">
        <h3
          className={`text-sm font-medium transition-all ${
            isDone
              ? "text-[#8b9aaa] line-through decoration-[#8b9aaa] decoration-1"
              : "text-[#263548]"
          }`}
        >
          {assignment.title}
        </h3>

        <div
          className={`mt-1 flex items-center gap-2 text-[10px] ${
            isDone ? "line-through" : ""
          }`}
        >
          <span className={isDone ? "text-[#a5b0ba]" : "text-[#7094b8]"}>
            {assignment.courseCode}
          </span>

          <span className="text-[#a0aab5]">
            {isOverdue && !isDone && "OVERDUE "}
            {assignment.dueDate}
          </span>
        </div>
      </div>

      {/* =========================================
          PRIORITY
      ========================================= */}

      {assignment.priority && (
        <button
          type="button"
          onClick={() => onPriorityChange(assignment.id)}
          title="Click to change priority"
          className={`min-w-[58px] rounded-md px-2.5 py-1.5 text-[9px] font-semibold transition-all duration-200 hover:scale-105 ${
            assignment.priority === "HIGH"
              ? "bg-[#fde8e8] text-[#dc6b6b] hover:bg-[#fbdada]"
              : assignment.priority === "MEDIUM"
                ? "bg-[#fff3cf] text-[#b78a22] hover:bg-[#ffedb5]"
                : "bg-[#e2f1fa] text-[#5d9ac2] hover:bg-[#d4eaf6]"
          }`}
        >
          {assignment.priority}
        </button>
      )}

      {/* =========================================
          STATUS
      ========================================= */}

      <button
        type="button"
        onClick={() => onStatusChange(assignment.id)}
        title="Click to change status"
        className={`min-w-[92px] rounded-md px-3 py-1.5 text-[9px] font-semibold transition-all duration-200 hover:scale-105 ${
          assignment.status === "DONE"
            ? "bg-[#e7f1e7] text-[#719471] hover:bg-[#dcebdd]"
            : assignment.status === "WORKING"
              ? "bg-[#e7eef7] text-[#6485aa] hover:bg-[#dce7f3]"
              : "bg-[#f1f2f3] text-[#7c8793] hover:bg-[#e8eaec]"
        }`}
      >
        {assignment.status}
      </button>

      {/* =========================================
          EDIT
      ========================================= */}

      <button
        type="button"
        title="Edit assignment"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#94a3b8] transition-all duration-200 hover:bg-[#f1f3f5] hover:text-[#263548]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.1 2.1 0 0 1 2.97 2.97L8.25 18.039l-4.5 1.125 1.125-4.5L16.862 3.487Z"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.5 5.5 18.5 8.5"
          />
        </svg>
      </button>

      {/* =========================================
          DELETE
      ========================================= */}

      <button
        type="button"
        title="Delete assignment"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#b5a0a0] transition-all duration-200 hover:bg-[#fdeeee] hover:text-[#d66b6b]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 6l-1 14H6L5 6"
          />

          <path strokeLinecap="round" strokeLinejoin="round" d="M10 10v6" />

          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10v6" />
        </svg>
      </button>
    </div>
  );
}
