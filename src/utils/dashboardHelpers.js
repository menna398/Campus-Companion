/*
 * Dashboard helpers
 *
 * Pure functions that turn the raw data coming from the backend
 * (courses, assignments, exams, schedule, events) into what the
 * dashboard cards display.
 */

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const COLOR_MAP = {
  blue: "#6f91b2",
  green: "#91a98f",
  sage: "#91a98f",
  purple: "#c49aaa",
  orange: "#e5b58f",
  peach: "#e5b58f",
  red: "#c87870",
  yellow: "#b48a3e",
  neutral: "#a9b4bb",
};

/*
 * Semester calendar (edit these to match your university).
 * month is 0-based: 8 = September, 1 = February, 6 = July.
 */
const SEMESTERS = {
  fall: { name: "Fall Semester", month: 8, day: 15, weeks: 15 },
  spring: { name: "Spring Semester", month: 1, day: 15, weeks: 15 },
  summer: { name: "Summer Semester", month: 6, day: 1, weeks: 8 },
};

/* ------------------------------------------------------------------ */
/* Generic helpers                                                      */
/* ------------------------------------------------------------------ */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysBetween(from, to) {
  return Math.round((startOfDay(to) - startOfDay(from)) / 86400000);
}

// Supports "2026-10-17" (as a LOCAL date) and "October 22, 2026".
export function parseDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const text = String(value).trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (iso) {
    return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  }

  const parsed = new Date(text);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// "09:00", "9:00 AM", "02:00 PM" -> minutes since midnight
export function parseTimeToMinutes(time) {
  if (!time || typeof time !== "string") return null;

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  if (hours > 23 || minutes > 59) return null;

  return hours * 60 + minutes;
}

// 840 -> "02:00 PM"
export function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function resolveColor(color, fallback = "#6f91b2") {
  if (!color) return fallback;

  const text = String(color);

  if (text.startsWith("#") || text.startsWith("rgb")) return text;

  return COLOR_MAP[text.toLowerCase()] || fallback;
}

/* ------------------------------------------------------------------ */
/* Header                                                               */
/* ------------------------------------------------------------------ */

export function getTodayName(date = new Date()) {
  return DAY_NAMES[date.getDay()];
}

export function formatLongDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

export function getFirstName(fullName = "") {
  return String(fullName).trim().split(" ")[0] || "";
}

export function getSemesterInfo(now = new Date()) {
  const year = now.getFullYear();

  const candidates = [
    { key: "fall", year: year - 1 },
    { key: "spring", year },
    { key: "summer", year },
    { key: "fall", year },
  ]
    .map((item) => {
      const config = SEMESTERS[item.key];

      return {
        ...item,
        config,
        start: new Date(item.year, config.month, config.day),
      };
    })
    .filter((item) => item.start <= now)
    .sort((a, b) => b.start - a.start);

  const current = candidates[0];
  const { config } = current;

  const daysElapsed = daysBetween(current.start, now);
  const totalDays = config.weeks * 7;

  const ended = daysElapsed >= totalDays;
  const week = clamp(Math.floor(daysElapsed / 7) + 1, 1, config.weeks);

  return {
    name: config.name,
    academicYear:
      current.key === "fall"
        ? `${current.year}/${current.year + 1}`
        : `${current.year - 1}/${current.year}`,
    progress: clamp(Math.round((daysElapsed / totalDays) * 100), 0, 100),
    ended,
    week,
    totalWeeks: config.weeks,
  };
}

/* ------------------------------------------------------------------ */
/* Today's schedule                                                     */
/* ------------------------------------------------------------------ */

export function buildTodaySchedule(schedule, now = new Date()) {
  const today = getTodayName(now).toLowerCase();

  return schedule
    .filter((item) => String(item.day || "").toLowerCase() === today)
    .map((item) => {
      const start = parseTimeToMinutes(item.startTime);
      const end = parseTimeToMinutes(item.endTime);

      const code = item.courseCode || item.shortTitle || "";
      const name = item.courseName || item.title || "";

      return {
        id: item.id || item._id,
        sortKey: start ?? 0,
        time: start !== null ? formatMinutes(start) : item.startTime || "",
        duration:
          start !== null && end !== null && end > start
            ? `${end - start} mins`
            : "",
        course:
          code && name && code !== name ? `${code} – ${name}` : name || code,
        details: [item.room || item.location, item.professor]
          .filter(Boolean)
          .join(" • "),
        color: resolveColor(item.color),
      };
    })
    .sort((a, b) => a.sortKey - b.sortKey);
}

/* ------------------------------------------------------------------ */
/* Assignments                                                          */
/* ------------------------------------------------------------------ */

function getAssignmentDue(assignment) {
  return (
    assignment.dueDate ||
    assignment.due ||
    assignment.deadline ||
    assignment.date ||
    null
  );
}

export function isAssignmentCompleted(assignment) {
  if (assignment.completed === true || assignment.isCompleted === true) {
    return true;
  }

  return ["completed", "done", "submitted"].includes(
    String(assignment.status || "").toLowerCase(),
  );
}

function formatShortDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDueLabel(due, now = new Date()) {
  if (!due) return "No due date";

  const days = daysBetween(now, due);
  const shortDate = formatShortDate(due);

  if (days < 0) {
    const late = Math.abs(days);

    return `Overdue by ${late} ${late === 1 ? "day" : "days"} (${shortDate})`;
  }

  if (days === 0) return "Due today";
  if (days === 1) return `Due tomorrow (${shortDate})`;

  return `Due in ${days} days (${shortDate})`;
}

export function buildUpcomingAssignments(assignments, limit = 4) {
  const mapped = assignments.map((assignment) => ({
    id: assignment.id || assignment._id,
    title: assignment.title || assignment.name || "Untitled assignment",
    course: assignment.courseCode || "",
    due: parseDate(getAssignmentDue(assignment)),
    completed: isAssignmentCompleted(assignment),
    priority: String(assignment.priority || "").toUpperCase(),
  }));

  const pending = mapped
    .filter((item) => !item.completed)
    .sort(
      (a, b) =>
        (a.due ? a.due.getTime() : Infinity) -
        (b.due ? b.due.getTime() : Infinity),
    );

  const completed = mapped
    .filter((item) => item.completed)
    .sort(
      (a, b) => (b.due ? b.due.getTime() : 0) - (a.due ? a.due.getTime() : 0),
    );

  return [...pending, ...completed].slice(0, limit).map((item) => ({
    id: item.id,
    title: item.title,
    course: item.course,
    completed: item.completed,
    priority: item.completed ? "" : item.priority,
    dueLabel: item.completed ? "Completed" : formatDueLabel(item.due),
  }));
}

/* ------------------------------------------------------------------ */
/* Exams                                                                */
/* ------------------------------------------------------------------ */

function getExamDateTime(exam) {
  const date = parseDate(exam.examDate || exam.date);

  if (!date) return null;

  const minutes = parseTimeToMinutes(exam.startTime || exam.time);

  if (minutes === null) return date;

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Math.floor(minutes / 60),
    minutes % 60,
  );
}

function getCountdown(date, now = new Date()) {
  const days = daysBetween(now, date);

  if (days <= 0) return { prefix: "", value: "Today" };
  if (days === 1) return { prefix: "", value: "Tomorrow" };

  return { prefix: "In", value: `${days} days` };
}

const EXAM_ACCENTS = ["blue", "sage", "peach"];

export function buildUpcomingExams(exams, courses, limit = 3) {
  const now = new Date();

  const courseByCode = new Map(
    courses
      .filter((course) => course.code)
      .map((course) => [course.code, course]),
  );

  return exams
    .map((exam) => ({ exam, start: getExamDateTime(exam) }))
    .filter(
      ({ exam, start }) =>
        start && (exam.status ? exam.status === "UPCOMING" : start >= now),
    )
    .sort((a, b) => a.start - b.start)
    .slice(0, limit)
    .map(({ exam, start }, index) => {
      const minutes = parseTimeToMinutes(exam.startTime || exam.time);
      const course = courseByCode.get(exam.courseCode);

      return {
        id: exam.id || exam._id,
        date: String(start.getDate()).padStart(2, "0"),
        month: start
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase(),
        course: exam.courseName || course?.title || course?.name || "Exam",
        code: exam.courseCode || "",
        time:
          minutes !== null
            ? formatMinutes(minutes)
            : exam.startTime || exam.time || "",
        location: exam.location || course?.location || "",
        countdown: getCountdown(start, now),
        accent: EXAM_ACCENTS[index % EXAM_ACCENTS.length],
      };
    });
}

/* ------------------------------------------------------------------ */
/* Events                                                               */
/* ------------------------------------------------------------------ */

export function buildUpcomingEvents(events, limit = 3) {
  const now = new Date();

  return events
    .map((event) => ({ event, date: parseDate(event.date) }))
    .filter(({ date }) => date && daysBetween(now, date) >= 0)
    .sort((a, b) => a.date - b.date)
    .slice(0, limit)
    .map(({ event, date }) => ({
      id: event.id || event._id,
      day: String(date.getDate()).padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      title: event.title,
      location: event.location || "",
      time: event.time || "",
    }));
}

/* ------------------------------------------------------------------ */
/* Course progress                                                      */
/* ------------------------------------------------------------------ */

// Uses course.progress if the backend stores it, otherwise the share
// of completed assignments for that course.
function getCourseProgress(course, assignments) {
  const explicit = Number(course.progress);

  if (
    course.progress !== undefined &&
    course.progress !== null &&
    course.progress !== "" &&
    !Number.isNaN(explicit)
  ) {
    return clamp(Math.round(explicit), 0, 100);
  }

  const courseId = String(course.id || course._id || "");

  const related = assignments.filter(
    (assignment) =>
      (assignment.courseId && String(assignment.courseId) === courseId) ||
      (assignment.courseCode && assignment.courseCode === course.code),
  );

  if (related.length === 0) return 0;

  const done = related.filter(isAssignmentCompleted).length;

  return Math.round((done / related.length) * 100);
}

export function buildCourseProgress(courses, assignments, limit = 6) {
  return courses.slice(0, limit).map((course) => {
    const title = course.title || course.name || course.code || "Course";

    return {
      id: course.id || course._id || course.code,
      name: course.code && course.title ? `${title} (${course.code})` : title,
      progress: getCourseProgress(course, assignments),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Academic snapshot                                                    */
/* ------------------------------------------------------------------ */

function getStanding(gpa) {
  if (gpa >= 3.5) return "Honors Standing";
  if (gpa >= 3.0) return "Good Standing";
  if (gpa >= 2.0) return "Satisfactory Standing";

  return "Needs Improvement";
}

export function buildSnapshotStats({ user, assignments, semester }) {
  const gpa = parseFloat(user?.gpa);
  const hasGpa = Number.isFinite(gpa);

  const doneAssignments = assignments.filter(isAssignmentCompleted).length;
  const totalAssignments = assignments.length;

  return [
    {
      key: "gpa",
      label: "GPA",
      value: hasGpa ? `${gpa.toFixed(2)} / 4.00` : "—",
      sub: hasGpa ? getStanding(gpa) : "Add it from your profile",
      progress: hasGpa ? clamp(Math.round((gpa / 4) * 100), 0, 100) : 0,
    },
    {
      key: "semester",
      label: "Semester Progress",
      value: `${semester.progress}%`,
      sub: semester.ended
        ? "Semester completed"
        : `Week ${semester.week} of ${semester.totalWeeks}`,
      progress: semester.progress,
    },
    {
      key: "assignments",
      label: "Assignments Done",
      value: `${doneAssignments} / ${totalAssignments}`,
      sub:
        totalAssignments === 0
          ? "No assignments yet"
          : `${totalAssignments - doneAssignments} still pending`,
      progress:
        totalAssignments === 0
          ? 0
          : Math.round((doneAssignments / totalAssignments) * 100),
    },
  ];
}
