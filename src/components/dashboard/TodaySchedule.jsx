const schedule = [
  {
    time: "09:00 AM",
    duration: "50 mins",
    course: "CS301 – Data Structures & Algorithms",
    location: "Room 402, Turing Hall",
    professor: "Prof. Evelyn Vance",
    color: "#6f91b2",
  },
  {
    time: "11:30 AM",
    duration: "80 mins",
    course: "MATH210 – Linear Algebra & Stats",
    location: "Auditorium 2, Science Block",
    professor: "Dr. Liam Mercer",
    color: "#91a98f",
  },
  {
    time: "02:00 PM",
    duration: "90 mins",
    course: "LIT150 – Classical Literature & Rhetoric",
    location: "Library West Wing",
    professor: "Prof. Charles Hawthorne",
    color: "#c49aaa",
  },
];

export default function TodaySchedule() {
  return (
    <section className="relative rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <div className="absolute right-4 top-0 h-[22px] w-2.5 rounded-b-sm bg-[#6f91b2]" />

      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Syllabus Flow
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Today's Schedule
      </h2>

      <div className="mt-5 space-y-4">
        {schedule.map((item) => (
          <div key={item.time} className="flex gap-4">
            <div className="w-16 shrink-0 text-right">
              <p className="text-[11px] font-semibold text-[#35424b]">
                {item.time}
              </p>

              <p className="mt-0.5 text-[9px] text-[#9ca6ad]">
                {item.duration}
              </p>
            </div>

            <div
              className="border-l-2 pl-4"
              style={{ borderColor: item.color }}
            >
              <p className="text-[12px] font-semibold text-[#35424b]">
                {item.course}
              </p>

              <p className="mt-0.5 text-[9px] text-[#8c969d]">
                {item.location} • {item.professor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
