import ExamItem from "../../components/ui/ExamItem";
import { upcomingExams, pastExams } from "../../data/examsData";

export default function Exams() {
  const handleAddExam = () => {
    console.log("Add new exam");
  };

  const handleEdit = (exam) => {
    console.log("Edit exam:", exam);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
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

          {/* Add Exam Button */}
          <button
            type="button"
            onClick={handleAddExam}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] sm:w-auto"
          >
            <span className="text-base leading-none">+</span>
            Add Exam
          </button>
        </div>

        {/* Upcoming Exams */}
        <section>
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-wide text-[#718096] sm:text-[11px]">
            October 2026
          </h2>

          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <ExamItem
                key={exam.id}
                {...exam}
                onEdit={() => handleEdit(exam)}
              />
            ))}
          </div>
        </section>

        {/* Past Exams */}
        <section className="mt-7 sm:mt-8">
          <h2 className="mb-3 text-[10px] font-medium uppercase tracking-wide text-[#718096] sm:text-[11px]">
            Past Exams (This Semester)
          </h2>

          <div className="space-y-3">
            {pastExams.map((exam) => (
              <ExamItem
                key={exam.id}
                {...exam}
                onEdit={() => handleEdit(exam)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
