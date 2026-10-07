import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import ExamItem from "../../components/exams/ExamItem";
import ExamModal from "../../components/exams/ExamModal";

import useExamStore from "../../store/examStore";
import useCourseStore from "../../store/courseStore";

/*
 * Get the exact exam date/time.
 *
 * If startTime exists:
 * examDate + startTime
 *
 * If startTime does not exist:
 * the exam is considered to end at 11:59 PM.
 */
function getExamDateTime(examDate, startTime) {
  if (!examDate) return null;

  const [year, month, day] = examDate.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  let hours = 23;
  let minutes = 59;

  if (startTime) {
    const timeMatch = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (timeMatch) {
      let parsedHours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);

      const period = timeMatch[3].toUpperCase();

      if (period === "PM" && parsedHours !== 12) {
        parsedHours += 12;
      }

      if (period === "AM" && parsedHours === 12) {
        parsedHours = 0;
      }

      hours = parsedHours;
    }
  }

  const examDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return Number.isNaN(examDateTime.getTime()) ? null : examDateTime;
}

/*
 * Check if the exam is already completed
 * based on its actual date/time.
 */
function isExamCompleted(exam) {
  const examDateTime = getExamDateTime(exam.examDate, exam.startTime);

  if (!examDateTime) {
    return false;
  }

  return examDateTime.getTime() <= Date.now();
}

export default function Exams() {
  const {
    exams,
    loading,
    saving,
    updating,
    error,
    fetchExams,
    addExam,
    updateExam,
    removeExam,
  } = useExamStore();

  const { courses, fetchCourses } = useCourseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedExam, setSelectedExam] = useState(null);

  /*
   * =========================
   * LOAD EXAMS + COURSES
   * =========================
   */

  useEffect(() => {
    fetchExams();
    fetchCourses();
  }, [fetchExams, fetchCourses]);

  /*
   * =========================
   * ADD
   * =========================
   */

  function handleAddExam() {
    setSelectedExam(null);
    setIsModalOpen(true);
  }

  /*
   * =========================
   * EDIT
   * =========================
   */

  function handleEdit(exam) {
    setSelectedExam(exam);
    setIsModalOpen(true);
  }

  /*
   * =========================
   * CLOSE MODAL
   * =========================
   */

  function handleCloseModal() {
    if (saving || updating) {
      return;
    }

    setIsModalOpen(false);
    setSelectedExam(null);
  }

  /*
   * =========================
   * SAVE / UPDATE
   * =========================
   */

  async function handleSubmit(formData) {
    try {
      if (selectedExam) {
        await updateExam(selectedExam.id, formData);

        await Swal.fire({
          icon: "success",
          title: "Exam updated",
          text: "The exam has been updated successfully.",
          confirmButtonColor: "#26364A",
        });
      } else {
        await addExam(formData);

        await Swal.fire({
          icon: "success",
          title: "Exam added",
          text: "The exam has been added successfully.",
          confirmButtonColor: "#26364A",
        });
      }

      setIsModalOpen(false);
      setSelectedExam(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save exam.",
        confirmButtonColor: "#26364A",
      });
    }
  }

  /*
   * =========================
   * DELETE
   * =========================
   */

  async function handleDelete(exam) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete exam?",
      text: `Are you sure you want to delete ${exam.type} for ${exam.courseCode}?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B96A61",
      cancelButtonColor: "#697586",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await removeExam(exam.id);

      await Swal.fire({
        icon: "success",
        title: "Exam deleted",
        text: "The exam has been deleted successfully.",
        confirmButtonColor: "#26364A",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete exam",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
        confirmButtonColor: "#26364A",
      });
    }
  }

  /*
   * =========================
   * UPCOMING EXAMS
   * =========================
   *
   * Anything whose exam date/time
   * has NOT passed yet.
   */

  const upcomingExams = exams
    .filter((exam) => !isExamCompleted(exam))
    .sort((a, b) => {
      const dateA = getExamDateTime(a.examDate, a.startTime);

      const dateB = getExamDateTime(b.examDate, b.startTime);

      return (dateA?.getTime() || 0) - (dateB?.getTime() || 0);
    });

  /*
   * =========================
   * COMPLETED EXAMS
   * =========================
   *
   * Anything whose exam date/time
   * has already passed.
   */

  const completedExams = exams
    .filter((exam) => isExamCompleted(exam))
    .sort((a, b) => {
      const dateA = getExamDateTime(a.examDate, a.startTime);

      const dateB = getExamDateTime(b.examDate, b.startTime);

      return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
    });

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#26364A] sm:text-3xl">
              Exams & Midterms
            </h1>

            <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-[#697586] sm:text-xs">
              Track midterms, final examinations, and quizzes across your
              semester
            </p>
          </div>

          {/* Add Exam */}

          <button
            type="button"
            onClick={handleAddExam}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] sm:w-auto"
          >
            <span className="text-base leading-none">+</span>
            Add Exam
          </button>
        </div>

        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <div className="mb-5 rounded-lg border border-[#F0D7D2] bg-[#FFF8F6] px-4 py-3 text-xs text-[#B96A61]">
            {error}
          </div>
        )}

        {/* =========================
            LOADING
        ========================== */}

        {loading ? (
          <div className="rounded-xl border border-[#E8E3DD] bg-white px-4 py-10 text-center text-xs text-[#697586]">
            Loading exams...
          </div>
        ) : exams.length === 0 ? (
          /* =========================
              EMPTY STATE
          ========================== */

          <div className="rounded-xl border border-[#E8E3DD] bg-white px-4 py-10 text-center">
            <p className="text-sm font-medium text-[#26364A]">No exams yet</p>

            <p className="mt-1 text-xs text-[#697586]">
              Add your first exam to start tracking your semester.
            </p>

            <button
              type="button"
              onClick={handleAddExam}
              className="mt-4 rounded-lg bg-[#26364A] px-4 py-2 text-xs font-medium text-white hover:bg-[#1E2B3B]"
            >
              Add Exam
            </button>
          </div>
        ) : (
          <>
            {/* =========================
                UPCOMING EXAMS
            ========================== */}

            {upcomingExams.length > 0 && (
              <section>
                <h2 className="mb-3 text-[10px] font-medium uppercase tracking-wide text-[#718096] sm:text-[11px]">
                  Upcoming Exams
                </h2>

                <div className="space-y-3">
                  {upcomingExams.map((exam) => (
                    <ExamItem
                      key={exam.id}
                      {...exam}
                      onEdit={() => handleEdit(exam)}
                      onDelete={() => handleDelete(exam)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* =========================
                COMPLETED EXAMS
            ========================== */}

            {completedExams.length > 0 && (
              <section className="mt-7 sm:mt-8">
                {/* Section title + thin line */}
                <div className="mb-3 flex items-center gap-3 px-2 sm:px-3">
                  <h2 className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-[#8B9AAA] sm:text-xs">
                    Completed Exams
                  </h2>

                  <div className="h-px flex-1 bg-[#EEEAE5]" />
                </div>

                {/* Completed exam cards */}
                <div className="space-y-3">
                  {completedExams.map((exam) => (
                    <ExamItem
                      key={exam.id}
                      {...exam}
                      onEdit={() => handleEdit(exam)}
                      onDelete={() => handleDelete(exam)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* =========================
                NO UPCOMING
            ========================== */}

            {upcomingExams.length === 0 && completedExams.length > 0 && (
              <div className="mb-6 rounded-lg bg-[#F8F6F3] px-4 py-3 text-center text-xs text-[#8B9AAA]">
                No upcoming exams.
              </div>
            )}
          </>
        )}
      </main>

      {/* =========================
          ADD / EDIT MODAL
      ========================== */}

      <ExamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        exam={selectedExam}
        courses={courses}
        saving={saving || updating}
      />
    </div>
  );
}
