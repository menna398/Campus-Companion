import { Circle, CheckCircle2 } from "lucide-react";

const assignments = [
  {
    title: "Implement AVL Tree Rotations",
    course: "CS301",
    due: "Due in 2 days (Oct 17)",
    priority: "HIGH",
    color: "red",
  },
  {
    title: "Linear Independence Problem Set",
    course: "MATH210",
    due: "Due in 5 days (Oct 20)",
    priority: "MEDIUM",
    color: "yellow",
  },
  {
    title: "Socrates Rhetoric Essay Draft",
    course: "LIT150",
    due: "Completed yesterday",
    priority: null,
    color: "green",
    completed: true,
  },
];

const priorityStyles = {
  red: "bg-[#fbe5e2] text-[#c87870]",
  yellow: "bg-[#fbf0d7] text-[#b48a3e]",
};

export default function UpcomingAssignments() {
  return (
    <section className="rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Due Dates
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Upcoming Assignments
      </h2>

      <div className="mt-4">
        {assignments.map((item, index) => (
          <div
            key={item.title}
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
                <span className="text-[#7697b5]">{item.course}</span>
                <span className="mx-1.5">•</span>
                {item.due}
              </p>
            </div>

            {item.priority && (
              <span
                className={`rounded-md px-2 py-1 text-[7px] font-bold ${priorityStyles[item.color]}`}
              >
                {item.priority}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
