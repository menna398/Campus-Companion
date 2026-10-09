import { Circle, CheckCircle2 } from "lucide-react";

const priorityStyles = {
  HIGH: "bg-[#fbe5e2] text-[#c87870]",
  MEDIUM: "bg-[#fbf0d7] text-[#b48a3e]",
  LOW: "bg-[#e9efe7] text-[#728c72]",
};

export default function UpcomingAssignments({
  assignments = [],
  loading = false,
}) {
  return (
    <section className="rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Due Dates
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Upcoming Assignments
      </h2>

      <div className="mt-4">
        {loading && assignments.length === 0 ? (
          <p className="py-2 text-[10px] text-[#9aa3a8]">
            Loading assignments...
          </p>
        ) : assignments.length === 0 ? (
          <p className="py-2 text-[10px] text-[#9aa3a8]">No assignments yet.</p>
        ) : (
          assignments.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 py-3 ${
                index !== assignments.length - 1
                  ? "border-b border-[#f0ece7]"
                  : ""
              }`}
            >
              {item.completed ? (
                <CheckCircle2 size={15} className="shrink-0 text-[#91a98f]" />
              ) : (
                <Circle size={15} className="shrink-0 text-[#a9b4bb]" />
              )}

              <div className="min-w-0 flex-1">
                <p
                  className={`text-[10px] font-semibold ${
                    item.completed
                      ? "text-[#92999d] line-through"
                      : "text-[#465159]"
                  }`}
                >
                  {item.title}
                </p>

                <p className="mt-0.5 text-[8px] text-[#9aa3a8]">
                  {item.course && (
                    <>
                      <span className="text-[#7697b5]">{item.course}</span>
                      <span className="mx-1.5">•</span>
                    </>
                  )}
                  {item.dueLabel}
                </p>
              </div>

              {priorityStyles[item.priority] && (
                <span
                  className={`rounded-md px-2 py-1 text-[7px] font-bold ${priorityStyles[item.priority]}`}
                >
                  {item.priority}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
