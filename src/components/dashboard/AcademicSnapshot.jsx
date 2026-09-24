import { Award, BookOpenCheck, GraduationCap } from "lucide-react";

const stats = [
  {
    value: "3.75 / 4.00",
    label: "GPA",
    sub: "Honors Standing",
    icon: Award,
    color: "text-[#6f91b2]",
    bg: "bg-[#eaf0f5]",
    progress: 92,
  },
  {
    value: "65%",
    label: "Semester Progress",
    sub: "Week 10 of 15 Completed",
    icon: BookOpenCheck,
    color: "text-[#91a98f]",
    bg: "bg-[#e9efe7]",
    progress: 65,
  },
  {
    value: "45 / 120",
    label: "Credits",
    sub: "Sophomore Requirement Met",
    icon: GraduationCap,
    color: "text-[#a08cae]",
    bg: "bg-[#eeeaf1]",
    progress: 38,
  },
];

export default function AcademicSnapshot() {
  return (
    <section className="rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Performance Hub
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Academic Snapshot
      </h2>

      <div className="mt-5 grid grid-cols-1 divide-y divide-[#eee9e3] md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 md:px-5 md:py-0 first:md:pl-0 last:md:pr-0"
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#e6e1da]">
                <div
                  className={`absolute inset-0 rounded-full border-2 border-transparent ${stat.color}`}
                  style={{
                    clipPath: `inset(${100 - stat.progress}% 0 0 0)`,
                  }}
                />

                <span className="text-[9px] font-semibold text-[#59636a]">
                  {stat.progress}%
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <Icon size={11} className={stat.color} strokeWidth={2} />

                  <span className="text-[11px] font-semibold text-[#465159]">
                    {stat.label}
                  </span>
                </div>

                <p className="text-[10px] font-semibold text-[#303a41]">
                  {stat.value}
                </p>

                <p className="text-[8px] text-[#9aa3a8]">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
