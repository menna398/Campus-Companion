export default function TodaySchedule({ items = [], loading = false }) {
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
        {loading && items.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">Loading schedule...</p>
        ) : items.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">
            No classes scheduled for today.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 shrink-0 text-right">
                <p className="text-[11px] font-semibold text-[#35424b]">
                  {item.time}
                </p>

                {item.duration && (
                  <p className="mt-0.5 text-[9px] text-[#9ca6ad]">
                    {item.duration}
                  </p>
                )}
              </div>

              <div
                className="border-l-2 pl-4"
                style={{ borderColor: item.color }}
              >
                <p className="text-[12px] font-semibold text-[#35424b]">
                  {item.course}
                </p>

                {item.details && (
                  <p className="mt-0.5 text-[9px] text-[#8c969d]">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
