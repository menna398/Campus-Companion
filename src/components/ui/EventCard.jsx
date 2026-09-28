export default function EventCard({ event, onDelete }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E8E3DD] bg-white shadow-sm transition hover:border-[#D9D0C6] hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-64 lg:w-72">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          {/* Top */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-block rounded-md bg-[#F6F1EB] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#8A7562]">
                {event.category}
              </span>

              <h2 className="mt-3 font-serif text-xl font-semibold leading-tight text-[#26364A] sm:text-2xl">
                {event.title}
              </h2>
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onDelete(event.id)}
              title="Delete event"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8E0D8] bg-[#FAF8F5] text-[#A96B6B] transition hover:border-[#D8BABA] hover:bg-[#F8EEEE]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4"
              >
                <path d="M4 7h16" />
                <path d="M10 11v6M14 11v6" />
                <path d="M6 7l1 14h10l1-14" />
                <path d="M9 7V4h6v3" />
              </svg>
            </button>
          </div>

          {/* Date / Time / Location */}
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-[#718096] sm:text-[11px]">
            <span>{event.date}</span>
            <span>•</span>
            <span>{event.time}</span>
            <span>•</span>
            <span>{event.location}</span>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[#697586] sm:text-sm">
            {event.description}
          </p>
        </div>
      </div>
    </article>
  );
}
