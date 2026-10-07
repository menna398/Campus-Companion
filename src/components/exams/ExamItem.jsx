import { useEffect, useState } from "react";

function getExamDateTime(examDate, startTime) {
  if (!examDate) return null;

  const [year, month, day] = examDate.split("-").map(Number);

  if (!year || !month || !day) return null;

  let hours = 23;
  let minutes = 59;

  if (startTime) {
    const timeMatch = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (timeMatch) {
      let parsedHours = Number(timeMatch[1]);
      minutes = Number(timeMatch[2]);

      const period = timeMatch[3].toUpperCase();

      if (period === "PM" && parsedHours !== 12) {
        parsedHours += 12;
      }

      if (period === "AM" && parsedHours === 12) {
        parsedHours = 0;
      }

      hours = parsedHours;
    }
  }

  const examDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return Number.isNaN(examDateTime.getTime()) ? null : examDateTime;
}

function getExamCountdown(examDate, startTime) {
  const examDateTime = getExamDateTime(examDate, startTime);

  if (!examDateTime) {
    return {
      label: "Upcoming",
      isClose: false,
      isCompleted: false,
    };
  }

  const now = new Date();
  const difference = examDateTime.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      label: "Completed",
      isClose: false,
      isCompleted: true,
    };
  }

  const totalHours = difference / (1000 * 60 * 60);

  const totalDays = Math.ceil(totalHours / 24);

  if (totalHours < 24) {
    const hoursLeft = Math.ceil(totalHours);

    return {
      label: `Starts in ${hoursLeft}h`,
      isClose: true,
      isCompleted: false,
    };
  }

  if (totalDays === 1) {
    return {
      label: "Tomorrow",
      isClose: true,
      isCompleted: false,
    };
  }

  if (totalDays <= 3) {
    return {
      label: `${totalDays} days left`,
      isClose: true,
      isCompleted: false,
    };
  }

  return {
    label: "Upcoming",
    isClose: false,
    isCompleted: false,
  };
}

export default function ExamItem({
  examDate,
  type,
  courseCode,
  courseName,
  startTime,
  duration,
  professor,
  onEdit,
  onDelete,
}) {
  const [countdown, setCountdown] = useState(() =>
    getExamCountdown(examDate, startTime),
  );

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getExamCountdown(examDate, startTime));
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 60 * 1000);

    return () => clearInterval(interval);
  }, [examDate, startTime]);

  const dateObject = examDate ? new Date(`${examDate}T00:00:00`) : null;

  const day = dateObject ? dateObject.getDate() : "--";

  const month = dateObject
    ? dateObject.toLocaleString("en-US", {
        month: "short",
      })
    : "---";

  /*
   * Card styling based on exam state
   */
  const cardClassName = countdown.isCompleted
    ? "border-[#DDEBDD] bg-[#F5FAF4]"
    : countdown.isClose
      ? "border-[#F2D1D1] bg-[#FFF7F7]"
      : "border-[#E8E3DD] bg-white";

  const dateBoxClassName = countdown.isCompleted
    ? "bg-[#E8F3E7]"
    : countdown.isClose
      ? "bg-[#FCE8E8]"
      : "bg-[#F8F5F0]";

  const dateTextClassName = countdown.isCompleted
    ? "text-[#73936F]"
    : countdown.isClose
      ? "text-[#C96A6A]"
      : "text-[#26364A]";

  return (
    <div
      className={`rounded-xl border p-3 shadow-sm transition sm:p-4 ${cardClassName}`}
    >
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        {/* Date */}
        <div
          className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg sm:h-14 sm:w-14 ${dateBoxClassName}`}
        >
          <span
            className={`text-[9px] font-medium uppercase sm:text-[10px] ${
              countdown.isCompleted
                ? "text-[#73936F]"
                : countdown.isClose
                  ? "text-[#C96A6A]"
                  : "text-[#7B8794]"
            }`}
          >
            {month}
          </span>

          <span
            className={`text-base font-semibold leading-none sm:text-lg ${dateTextClassName}`}
          >
            {day}
          </span>
        </div>

        {/* Exam Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide sm:px-2 sm:text-[9px] ${
                countdown.isCompleted
                  ? "bg-[#E6F0E4] text-[#73936F]"
                  : countdown.isClose
                    ? "bg-[#FBE3E3] text-[#C96A6A]"
                    : "bg-[#FCEFE5] text-[#B66B3D]"
              }`}
            >
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
            {startTime || "Time not set"}

            {duration && ` (${duration})`}

            <span className="hidden sm:inline">{" • "}</span>

            <span className="block sm:inline">
              {professor || "Professor not available"}
            </span>
          </p>

          {/* Mobile Status */}
          <div className="mt-2 sm:hidden">
            <span
              className={`inline-block rounded-md px-2 py-1 text-[8px] font-semibold uppercase ${
                countdown.isCompleted
                  ? "bg-[#E6F0E4] text-[#73936F]"
                  : countdown.isClose
                    ? "bg-[#FCE4E4] text-[#C96A6A]"
                    : "bg-[#FFF3CF] text-[#B88A2D]"
              }`}
            >
              {countdown.label}
            </span>
          </div>
        </div>

        {/* Desktop Status */}
        <div className="hidden shrink-0 sm:block">
          <span
            className={`rounded-md px-2 py-1 text-[9px] font-semibold uppercase ${
              countdown.isCompleted
                ? "bg-[#E6F0E4] text-[#73936F]"
                : countdown.isClose
                  ? "bg-[#FCE4E4] text-[#C96A6A]"
                  : "bg-[#FFF3CF] text-[#B88A2D]"
            }`}
          >
            {countdown.label}
          </span>
        </div>

        {/* Edit */}
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-2.5 py-1.5 text-[10px] font-medium text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
        >
          Edit
        </button>

        {/* Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="shrink-0 rounded-lg border border-[#F0D6D6] bg-[#FFF8F8] px-2.5 py-1.5 text-[10px] font-medium text-[#C96A6A] transition hover:border-[#E8BABA] hover:bg-[#FCEEEE]"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
