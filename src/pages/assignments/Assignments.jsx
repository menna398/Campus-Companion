import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AssignmentItem from "../../components/assignments/AssignmentItem";
import AssignmentModal from "../../components/assignments/AssignmentModal";

import useAssignmentStore from "../../store/assignmentStore";
import useCourseStore from "../../store/courseStore";

import {
  getAssignmentDeadlineState,
  sortAssignmentsByDueDate,
} from "../../utils/assignmentDate";

export default function Assignments() {
  const [filter, setFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const {
    assignments,
    loading,
    saving,
    fetchAssignments,
    addAssignment,
    editAssignment,
    removeAssignment,
  } = useAssignmentStore();

  const { courses } = useCourseStore();

  /*
   * =========================================
   * LOAD ASSIGNMENTS
   * =========================================
   */

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  /*
   * =========================================
   * PRIORITY
   * =========================================
   */

  const handlePriorityChange = async (assignment) => {
    const priorityOrder = ["LOW", "MEDIUM", "HIGH"];

    const currentIndex = priorityOrder.indexOf(assignment.priority);

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % priorityOrder.length;

    try {
      await editAssignment(assignment.id, {
        priority: priorityOrder[nextIndex],
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update priority.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  /*
   * =========================================
   * STATUS
   * =========================================
   */

  const handleStatusChange = async (assignment) => {
    const statusOrder = ["NOT STARTED", "WORKING", "DONE"];

    const currentIndex = statusOrder.indexOf(assignment.status);

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % statusOrder.length;

    try {
      await editAssignment(assignment.id, {
        status: statusOrder[nextIndex],
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update status.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  /*
   * =========================================
   * COMPLETE
   * =========================================
   */

  const handleComplete = async (assignment) => {
    const newStatus = assignment.status === "DONE" ? "NOT STARTED" : "DONE";

    try {
      await editAssignment(assignment.id, {
        status: newStatus,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to update assignment.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  /*
   * =========================================
   * ADD
   * =========================================
   */

  const handleAdd = () => {
    setSelectedAssignment(null);
    setIsModalOpen(true);
  };

  /*
   * =========================================
   * EDIT
   * =========================================
   */

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  /*
   * =========================================
   * DELETE
   * =========================================
   */

  const handleDelete = async (assignment) => {
    const result = await Swal.fire({
      title: "Delete Assignment?",
      text: `Are you sure you want to delete "${assignment.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a06464",
      cancelButtonColor: "#89949d",
    });

    if (!result.isConfirmed) return;

    try {
      await removeAssignment(assignment.id);

      await Swal.fire({
        icon: "success",
        title: "Assignment Deleted",
        text: "The assignment has been deleted successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete assignment.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  /*
   * =========================================
   * SAVE
   * =========================================
   */

  const handleSave = async (assignmentData) => {
    try {
      if (selectedAssignment) {
        await editAssignment(selectedAssignment.id, assignmentData);
      } else {
        await addAssignment(assignmentData);
      }

      setIsModalOpen(false);
      setSelectedAssignment(null);

      await Swal.fire({
        icon: "success",
        title: selectedAssignment ? "Assignment Updated" : "Assignment Added",
        text: selectedAssignment
          ? "The assignment has been updated successfully."
          : "The assignment has been added successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save assignment.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  /*
   * =========================================
   * CLOSE MODAL
   * =========================================
   */

  const handleClose = () => {
    if (saving) return;

    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  /*
   * =========================================
   * UPCOMING
   * =========================================
   */

  const upcomingAssignments = sortAssignmentsByDueDate(
    assignments.filter((assignment) => {
      if (assignment.status === "DONE") {
        return false;
      }

      const { isMissed } = getAssignmentDeadlineState(assignment);

      return !isMissed;
    }),
  );

  /*
   * =========================================
   * MISSED
   * =========================================
   */

  const missedAssignments = sortAssignmentsByDueDate(
    assignments.filter((assignment) => {
      if (assignment.status === "DONE") {
        return false;
      }

      const { isMissed } = getAssignmentDeadlineState(assignment);

      return isMissed;
    }),
  );

  /*
   * =========================================
   * COMPLETED
   * =========================================
   */

  const completedAssignments = sortAssignmentsByDueDate(
    assignments.filter((assignment) => assignment.status === "DONE"),
  );

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <div className="min-h-screen w-full bg-[#faf9f7] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-5 lg:mb-7 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#263548] sm:text-3xl">
            Assignments
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748b] sm:text-sm">
            Weekly task planner & curriculum requirements progress
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
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

          <button
            type="button"
            onClick={handleAdd}
            className="w-full whitespace-nowrap rounded-md bg-[#263548] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#33465c] sm:w-auto"
          >
            + New Assignment
          </button>
        </div>
      </div>

      {/* MAIN CARD */}

      <div className="w-full overflow-hidden rounded-xl border border-[#e5e1dc] bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sm:p-4">
        <div className="mb-3 px-2 sm:px-3">
          <p className="text-[9px] font-medium uppercase tracking-wide text-[#8b9aaa] sm:text-[10px]">
            Academic Syllabus Alignment
          </p>

          <h2 className="font-serif text-base font-semibold text-[#263548] sm:text-lg">
            Weekly Planner List
          </h2>
        </div>

        {loading ? (
          <div className="px-4 py-12 text-center text-sm text-[#94a3b8]">
            Loading assignments...
          </div>
        ) : (
          <>
            {/* UPCOMING */}

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
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-[#94a3b8]">
                    No upcoming assignments.
                  </div>
                )}
              </div>
            )}

            {/* MISSED */}

            {(filter === "upcoming" || filter === "all") &&
              missedAssignments.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <div className="mb-2 flex items-center gap-3 px-2 sm:px-3">
                    <h3 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-[#c96f6f] sm:text-xs">
                      Missed
                    </h3>

                    <div className="h-px flex-1 bg-[#f1d5d5]" />
                  </div>

                  {missedAssignments.map((assignment) => (
                    <AssignmentItem
                      key={assignment.id}
                      assignment={assignment}
                      onPriorityChange={handlePriorityChange}
                      onStatusChange={handleStatusChange}
                      onComplete={handleComplete}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}

            {/* COMPLETED */}

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
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-[#94a3b8]">
                    No completed tasks yet.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ASSIGNMENT MODAL */}

      <AssignmentModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        assignment={selectedAssignment}
        courses={courses}
        saving={saving}
      />
    </div>
  );
}
