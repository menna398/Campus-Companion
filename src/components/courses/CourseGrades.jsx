import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import GradeModal from "../../components/courses/GradeModal";
import GradeSummary from "../../components/courses/GradeSummary";
import useCourseStore from "../../store/courseStore";

export default function CourseGrades() {
  const { course } = useOutletContext();

  const { updateCourse, updating } = useCourseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = course.grades || [];

  const handleAddGrade = () => {
    setSelectedGrade(null);
    setIsModalOpen(true);
  };

  const handleEditGrade = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (updating) {
      return;
    }

    setIsModalOpen(false);
    setSelectedGrade(null);
  };

  const handleSaveGrade = async (gradeData) => {
    let updatedGrades;

    if (selectedGrade) {
      updatedGrades = grades.map((grade) =>
        grade.id === selectedGrade.id ? gradeData : grade,
      );
    } else {
      const newId =
        grades.length > 0
          ? Math.max(...grades.map((grade) => Number(grade.id))) + 1
          : 1;

      updatedGrades = [
        ...grades,
        {
          ...gradeData,
          id: newId,
        },
      ];
    }

    try {
      await updateCourse(course.id, {
        grades: updatedGrades,
      });

      setIsModalOpen(false);
      setSelectedGrade(null);

      await Swal.fire({
        icon: "success",
        title: selectedGrade ? "Grade Updated" : "Grade Added",
        text: selectedGrade
          ? "The grade has been updated successfully."
          : "The grade has been added successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save the grade.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  const handleDeleteGrade = async (grade) => {
    const result = await Swal.fire({
      title: "Delete Grade?",
      text: `Are you sure you want to delete "${grade.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a06464",
      cancelButtonColor: "#89949d",
    });

    if (!result.isConfirmed) {
      return;
    }

    const updatedGrades = grades.filter((item) => item.id !== grade.id);

    try {
      await updateCourse(course.id, {
        grades: updatedGrades,
      });

      await Swal.fire({
        icon: "success",
        title: "Grade Deleted",
        text: "The grade has been deleted successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete the grade.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  return (
    <div className="mt-6">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            Grades
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Academic performance for {course.code}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddGrade}
          className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white hover:opacity-90"
        >
          + Add Grade
        </button>
      </div>

      {/* Grades Table */}

      {grades.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-[#e7e3de] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="border-b border-[#eeeae5] bg-[#fcfbf9]">
                <tr>
                  <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                    Assessment
                  </th>

                  <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                    Score
                  </th>

                  <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                    Weight
                  </th>

                  <th className="px-5 py-4 text-right text-[9px] font-semibold text-[#687681]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {grades.map((grade) => (
                  <tr
                    key={grade.id}
                    className="border-b border-[#f0ede9] last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="text-[10px] font-semibold text-[#3d4a55]">
                        {grade.name}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[10px] text-[#596773]">
                        {grade.score}/{grade.total}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[10px] text-[#596773]">
                        {grade.weight}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditGrade(grade)}
                          className="rounded-md px-3 py-1.5 text-[9px] text-[#596773] hover:bg-[#f5f4f1]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteGrade(grade)}
                          disabled={updating}
                          className="rounded-md px-3 py-1.5 text-[9px] text-[#a06464] hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#e7e3de] bg-white py-14 text-center">
          <p className="font-serif text-base font-bold text-[#273545]">
            No grades yet
          </p>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Grades for this course will appear here.
          </p>

          <button
            type="button"
            onClick={handleAddGrade}
            className="mt-4 rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white"
          >
            + Add Grade
          </button>
        </div>
      )}

      {/* Grade Summary */}

      <GradeSummary grades={grades} />

      {/* Add / Edit Modal */}

      <GradeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGrade}
        grade={selectedGrade}
        saving={updating}
      />
    </div>
  );
}
