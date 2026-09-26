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
    <div className="rounded-xl border border-[#E8E3DD] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        {/* Date */}
        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#F8F5F0] sm:h-14 sm:w-14">
          <span className="text-[9px] font-medium uppercase text-[#7B8794] sm:text-[10px]">
            {month}
          </span>

          <span className="text-base font-semibold leading-none text-[#26364A] sm:text-lg">
            {date}
          </span>
        </div>

        {/* Exam Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="rounded bg-[#FCEFE5] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#B66B3D] sm:px-2 sm:text-[9px]">
              {type}
            </span>

            <span className="truncate text-[9px] text-[#8A95A3] sm:text-[10px]">
              {courseCode}
            </span>
          </div>

          <h3 className="text-xs font-semibold leading-snug text-[#26364A] sm:text-sm">
            {courseName}
          </h3>

          <p className="mt-1 text-[9px] leading-relaxed text-[#697586] sm:text-[11px]">
            {time}
            {duration && ` (${duration})`}
            <span className="hidden sm:inline"> • </span>

            <span className="block sm:inline">{location}</span>

            <span className="hidden sm:inline"> • </span>

            <span className="block sm:inline">{professor}</span>
          </p>

          {/* Mobile Status */}
          <div className="mt-2 sm:hidden">
            {score ? (
              <span className="inline-block rounded-lg bg-[#EDF5EC] px-3 py-1.5 text-[10px] font-semibold text-[#73936F]">
                {score}
              </span>
            ) : (
              <span
                className={`inline-block rounded-md px-2 py-1 text-[8px] font-semibold uppercase ${
                  status === "Starts in 2h"
                    ? "bg-[#FCE4E4] text-[#C96A6A]"
                    : "bg-[#FFF3CF] text-[#B88A2D]"
                }`}
              >
                {status}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Status */}
        <div className="hidden shrink-0 sm:block">
          {score ? (
            <span className="rounded-lg bg-[#EDF5EC] px-3 py-2 text-xs font-semibold text-[#73936F]">
              {score}
            </span>
          ) : (
            <span
              className={`rounded-md px-2 py-1 text-[9px] font-semibold uppercase ${
                status === "Starts in 2h"
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
          className="shrink-0 rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-2.5 py-1.5 text-[10px] font-medium text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
