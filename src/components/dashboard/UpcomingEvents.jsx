import { MapPin } from "lucide-react";

export default function UpcomingEvents({ events = [] }) {
  return (
    <section className="relative rounded-xl border border-[#eee8e1] bg-white p-5 shadow-[0_3px_12px_rgba(40,35,30,0.035)]">
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#91a0aa]">
        Student Life
      </p>

      <h2 className="font-serif text-[15px] font-semibold text-[#29343b]">
        Upcoming Events
      </h2>

      <div className="mt-4 space-y-3">
        {events.length === 0 ? (
          <p className="text-[10px] text-[#9aa3a8]">No upcoming events.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-[#f8eee4]">
                <span className="text-[7px] font-semibold text-[#c28a62]">
                  {event.month}
                </span>

                <span className="font-serif text-base font-semibold leading-none text-[#5b6265]">
                  {event.day}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-[10px] font-semibold text-[#465159]">
                  {event.title}
                </h3>

                <p className="mt-1 flex items-center gap-1 text-[8px] text-[#929ca2]">
                  <MapPin size={9} className="shrink-0" />
                  <span className="truncate">
                    {[event.location, event.time].filter(Boolean).join(" • ")}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
