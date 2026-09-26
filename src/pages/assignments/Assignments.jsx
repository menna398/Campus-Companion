import { useState } from "react";
import AssignmentItem from "../../components/ui/AssignmentItem";
import { assignments as initialAssignments } from "../../data/assignmentsData";

export default function Assignments() {
  const [filter, setFilter] = useState("all");

  const [assignments, setAssignments] = useState(initialAssignments);

  // =========================
  // CHANGE PRIORITY
  // =========================
  const handlePriorityChange = (id) => {
    const priorityOrder = ["LOW", "MEDIUM", "HIGH"];

    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id) return assignment;

        const currentIndex = priorityOrder.indexOf(assignment.priority);

        const nextIndex = (currentIndex + 1) % priorityOrder.length;

        return {
          ...assignment,
          priority: priorityOrder[nextIndex],
        };
      }),
    );
  };

  // =========================
  // CHANGE STATUS BUTTON
  // =========================
  const handleStatusChange = (id) => {
    const statusOrder = ["NOT STARTED", "WORKING", "DONE"];

    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id) return assignment;

        const currentIndex = statusOrder.indexOf(assignment.status);

        const nextIndex = (currentIndex + 1) % statusOrder.length;

        return {
          ...assignment,
          status: statusOrder[nextIndex],
        };
      }),
    );
  };

  // =========================
  // CHECK CIRCLE
  // =========================
  const handleComplete = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id) return assignment;

        return {
          ...assignment,
          status: assignment.status === "DONE" ? "NOT STARTED" : "DONE",
        };
      }),
    );
  };

  // =========================
  // FILTER
  // =========================
  const upcomingAssignments = assignments.filter(
    (assignment) => assignment.status !== "DONE",
  );

  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "DONE",
  );

  return (
    <div className="min-h-screen bg-[#faf9f7] px-8 py-8">
      {/* ================= HEADER ================= */}
      <div className="mb-7 flex items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#263548]">
            Assignments
          </h1>

          <p className="mt-1 text-sm text-[#64748b]">
            Weekly task planner & curriculum requirements progress
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* FILTERS */}
          <div className="flex rounded-lg border border-[#e5e1dc] bg-white p-1">
            {["upcoming", "completed", "all"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-md px-5 py-2 text-xs font-medium transition-all duration-200 ${
                  filter === item
                    ? "bg-[#7094b8] text-white shadow-sm"
                    : "text-[#475569] hover:bg-[#f5f3f0]"
                }`}
              >
                {item === "upcoming"
                  ? "Upcoming"
                  : item === "completed"
                    ? "Completed"
                    : "All Tasks"}
              </button>
            ))}
          </div>

          {/* NEW ASSIGNMENT */}
          <button
            type="button"
            className="rounded-md bg-[#263548] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#33465c]"
          >
            + New Assignment
          </button>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="rounded-xl border border-[#e5e1dc] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        {/* CARD HEADER */}
        <div className="mb-3 px-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#8b9aaa]">
            Academic Syllabus Alignment
          </p>

          <h2 className="font-serif text-lg font-semibold text-[#263548]">
            Weekly Planner List
          </h2>
        </div>

        {/* =========================================
            UPCOMING TASKS
        ========================================= */}

        {(filter === "upcoming" || filter === "all") && (
          <div>
            {filter === "all" && upcomingAssignments.length > 0 && (
              <div className="mb-2 px-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8b9aaa]">
                  Upcoming Tasks
                </h3>
              </div>
            )}

            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((assignment) => (
                <AssignmentItem
                  key={assignment.id}
                  assignment={assignment}
                  onPriorityChange={handlePriorityChange}
                  onStatusChange={handleStatusChange}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-[#94a3b8]">
                No upcoming assignments.
              </div>
            )}
          </div>
        )}

        {/* =========================================
            COMPLETED TASKS
        ========================================= */}

        {(filter === "completed" || filter === "all") && (
          <div className="mt-8">
            <div className="mb-2 flex items-center gap-3 px-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8b9aaa]">
                Completed Tasks
              </h3>

              <div className="h-px flex-1 bg-[#eeeae5]" />
            </div>

            {completedAssignments.length > 0 ? (
              completedAssignments.map((assignment) => (
                <AssignmentItem
                  key={assignment.id}
                  assignment={assignment}
                  onPriorityChange={handlePriorityChange}
                  onStatusChange={handleStatusChange}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-[#94a3b8]">
                No completed tasks yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
