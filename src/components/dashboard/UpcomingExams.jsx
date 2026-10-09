import { useNavigate } from "react-router-dom";
import { Clock3, MapPin } from "lucide-react";

const accentStyles = {
  blue: "bg-[#e8f0f6] text-[#6688a7]",
  sage: "bg-[#e7eee5] text-[#728c72]",
  peach: "bg-[#f8e8dc] text-[#c47c55]",
};

export default function UpcomingExams({ exams = [], loading = false }) {
  const navigate = useNavigate();

  return (
    <section className="relative rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <div className="absolute right-4 top-0 h-[22px] w-2.5 rounded-b-sm bg-[#e5b58f]" />

      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Academic Planner
      </p>

      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
            Upcoming Exams
          </h2>

          <p className="mt-1 text-[9px] text-[#9aa3a8]">
            Stay prepared for your next assessments
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/exams")}
          className="text-[9px] font-semibold text-[#c47c55] transition-colors hover:text-[#a9603d]"
        >
          View all
        </button>
      </div>

      <div className="mt-4 space-y-2.5">
        {loading && exams.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">No upcoming exams.</p>
        ) : (
          exams.map((exam) => (
            <div
              key={exam.id}
              className="group flex items-center gap-3 rounded-lg border border-[#f0ece7] bg-[#fffdfa] p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e8ddd3] hover:shadow-[0_4px_12px_rgba(40,35,30,0.05)]"
            >
              {/* Date */}
              <div
                className={`flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${accentStyles[exam.accent]}`}
              >
                <span className="text-[8px] font-semibold uppercase">
                  {exam.month}
                </span>

                <span className="font-serif text-lg font-semibold leading-none">
                  {exam.date}
                </span>
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-[10px] font-semibold text-[#465159]">
                    {exam.course}
                  </span>

                  {exam.code && (
                    <span className="rounded bg-[#f2eee9] px-1.5 py-0.5 text-[7px] font-medium text-[#8d969b]">
                      {exam.code}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[8px] text-[#8f999f]">
                  {exam.time && (
                    <span className="flex items-center gap-1">
                      <Clock3 size={10} />
                      {exam.time}
                    </span>
                  )}

                  {exam.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {exam.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Countdown */}
              <div className="hidden shrink-0 text-right sm:block">
                {exam.countdown.prefix && (
                  <span className="text-[8px] text-[#9aa3a8]">
                    {exam.countdown.prefix}
                  </span>
                )}

                <p className="text-[10px] font-semibold text-[#c47c55]">
                  {exam.countdown.value}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
