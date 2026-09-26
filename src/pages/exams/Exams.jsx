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
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-[#26364A]">
              Exams & Midterms
            </h1>

            <p className="mt-1 text-xs text-[#697586]">
              Track midterms, final examinations, and quizzes across your
              semester
            </p>
          </div>

          {/* Add Exam Button */}
          <button
            type="button"
            onClick={handleAddExam}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B]"
          >
            <span className="text-base leading-none">+</span>
            Add Exam
          </button>
        </div>

        {/* Upcoming Exams */}
        <section>
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#718096]">
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
        <section className="mt-8">
          <h2 className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[#718096]">
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
