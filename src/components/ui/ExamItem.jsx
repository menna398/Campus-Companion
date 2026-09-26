export default function ExamItem({
  date,
  month,
  type,
  courseCode,
  courseName,
  time,
  duration,
  location,
  professor,
  status,
  score,
  onEdit,
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-xl border border-[#E8E3DD] bg-white p-4 shadow-sm">
      {/* Date */}
      <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-[#F8F5F0]">
        <span className="text-[10px] font-medium uppercase text-[#7B8794]">
          {month}
        </span>

        <span className="text-lg font-semibold leading-none text-[#26364A]">
          {date}
        </span>
      </div>

      {/* Exam Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded bg-[#FCEFE5] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#B66B3D]">
            {type}
          </span>

          <span className="text-[10px] text-[#8A95A3]">{courseCode}</span>
        </div>

        <h3 className="text-sm font-semibold text-[#26364A]">{courseName}</h3>

        <p className="mt-1 text-[11px] text-[#697586]">
          {time} ({duration}) • {location} • {professor}
        </p>
      </div>

      {/* Status / Score */}
      <div className="mr-10 shrink-0 text-right">
        {score ? (
          <span className="rounded-lg bg-[#EDF5EC] px-3 py-2 text-xs font-semibold text-[#73936F]">
            {score}
          </span>
        ) : (
          <span
            className={`rounded-md px-2 py-1 text-[9px] font-semibold uppercase ${
              status === "starts"
                ? "bg-[#FCE4E4] text-[#C96A6A]"
                : "bg-[#FFF3CF] text-[#B88A2D]"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Edit Button */}
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-2.5 py-1.5 text-[10px] font-medium text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
      >
        Edit
      </button>
    </div>
  );
}
