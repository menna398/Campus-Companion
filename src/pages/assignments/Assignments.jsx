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
    <div className="min-h-screen w-full bg-[#faf9f7] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-5 lg:mb-7 lg:flex-row lg:items-start lg:justify-between">
        {/* Title */}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#263548] sm:text-3xl">
            Assignments
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748b] sm:text-sm">
            Weekly task planner & curriculum requirements progress
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          {/* FILTERS */}
          <div className="grid w-full grid-cols-3 rounded-lg border border-[#e5e1dc] bg-white p-1 sm:flex sm:w-auto">
            {["upcoming", "completed", "all"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-md px-2 py-2 text-[10px] font-medium transition-all duration-200 sm:px-4 sm:text-xs ${
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
            className="w-full whitespace-nowrap rounded-md bg-[#263548] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#33465c] sm:w-auto"
          >
            + New Assignment
          </button>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="w-full overflow-hidden rounded-xl border border-[#e5e1dc] bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sm:p-4">
        {/* CARD HEADER */}
        <div className="mb-3 px-2 sm:px-3">
          <p className="text-[9px] font-medium uppercase tracking-wide text-[#8b9aaa] sm:text-[10px]">
            Academic Syllabus Alignment
          </p>

          <h2 className="font-serif text-base font-semibold text-[#263548] sm:text-lg">
            Weekly Planner List
          </h2>
        </div>

        {/* =========================================
          UPCOMING TASKS
      ========================================= */}

        {(filter === "upcoming" || filter === "all") && (
          <div>
            {filter === "all" && upcomingAssignments.length > 0 && (
              <div className="mb-2 px-2 pt-2 sm:px-3">
                <h3 className="text-[10px] font-semibold uppercase tracking-wide text-[#8b9aaa] sm:text-xs">
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
          <div className="mt-6 sm:mt-8">
            <div className="mb-2 flex items-center gap-3 px-2 sm:px-3">
              <h3 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-[#8b9aaa] sm:text-xs">
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
