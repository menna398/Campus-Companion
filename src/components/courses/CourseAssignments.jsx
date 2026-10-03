import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

import AssignmentModal from "../../components/assignments/AssignmentModal";
import AssignmentItem from "../../components/assignments/AssignmentItem";

import useAssignmentStore from "../../store/assignmentStore";
import useCourseStore from "../../store/courseStore";

export default function CourseAssignments() {
  const { course } = useOutletContext();

  const {
    courseAssignments,
    loadingCourseAssignments,
    saving,
    fetchCourseAssignments,
    addAssignment,
    editAssignment,
    removeAssignment,
  } = useAssignmentStore();

  const { courses } = useCourseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    if (course?.id) {
      fetchCourseAssignments(course.id);
    }
  }, [course?.id, fetchCourseAssignments]);

  const assignments = courseAssignments;

  // =========================
  // ADD
  // =========================

  const handleAdd = () => {
    setSelectedAssignment(null);
    setIsModalOpen(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleClose = () => {
    if (saving) return;

    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  // =========================
  // SAVE
  // =========================

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
          "Failed to save the assignment.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  // =========================
  // DELETE
  // =========================

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
          "Failed to delete the assignment.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  // =========================
  // PRIORITY
  // =========================
  // نفس فكرة الـ AssignmentItem القديمة
  // HIGH -> MEDIUM -> LOW -> HIGH

  const handlePriorityChange = async (assignment) => {
    const priorities = ["LOW", "MEDIUM", "HIGH"];

    const currentIndex = priorities.indexOf(assignment.priority);

    const nextPriority = priorities[(currentIndex + 1) % priorities.length];

    try {
      await editAssignment(assignment.id, {
        ...assignment,
        priority: nextPriority,
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

  // =========================
  // STATUS
  // =========================
  // NOT STARTED -> WORKING -> DONE -> NOT STARTED

  const handleStatusChange = async (assignment) => {
    const statuses = ["NOT STARTED", "WORKING", "DONE"];

    const currentIndex = statuses.indexOf(assignment.status);

    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      await editAssignment(assignment.id, {
        ...assignment,
        status: nextStatus,
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

  // =========================
  // COMPLETE
  // =========================
  // Complete button simply toggles DONE / NOT STARTED

  const handleComplete = async (assignment) => {
    const nextStatus = assignment.status === "DONE" ? "NOT STARTED" : "DONE";

    try {
      await editAssignment(assignment.id, {
        ...assignment,
        status: nextStatus,
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

  return (
    <div className="mt-6">
      {/* =========================
          HEADER
      ========================= */}

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
          onClick={handleAdd}
          className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] font-medium text-white transition-colors hover:bg-[#6285a8]"
        >
          + Add Assignment
        </button>
      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loadingCourseAssignments ? (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-14 text-center">
          <p className="font-serif text-base font-bold text-[#273545]">
            Loading assignments...
          </p>
        </div>
      ) : assignments.length > 0 ? (
        /* =========================
           ASSIGNMENT ITEMS
        ========================= */

        <div className="rounded-xl border border-[#e7e3de] bg-white px-3 py-1 sm:px-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="origin-center">
              <AssignmentItem
                assignment={assignment}
                onPriorityChange={handlePriorityChange}
                onStatusChange={handleStatusChange}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        /* =========================
           EMPTY
        ========================= */

        <div className="rounded-xl border border-[#e7e3de] bg-white py-14 text-center">
          <p className="font-serif text-base font-bold text-[#273545]">
            No assignments yet
          </p>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Assignments for this course will appear here.
          </p>
        </div>
      )}

      {/* =========================
          MODAL
      ========================= */}

      <AssignmentModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        assignment={selectedAssignment}
        courses={courses}
        defaultCourseId={course.id}
        defaultCourseCode={course.code}
        saving={saving}
      />
    </div>
  );
}
