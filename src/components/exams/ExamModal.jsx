import { useEffect, useState } from "react";

export default function ExamModal({
  isOpen,
  onClose,
  onSubmit,
  exam,
  courses,
  saving,
}) {
  const isEditing = Boolean(exam);

  const [formData, setFormData] = useState({
    courseId: "",
    examDate: "",
    startTime: "",
    type: "Midterm",
    duration: "",
  });

  useEffect(() => {
    if (exam) {
      setFormData({
        courseId: exam.courseId || "",
        examDate: exam.examDate || "",
        startTime: convertTimeForInput(exam.startTime),
        type: exam.type || "Midterm",
        duration: exam.duration || "",
      });
    } else {
      setFormData({
        courseId: "",
        examDate: "",
        startTime: "",
        type: "Midterm",
        duration: "",
      });
    }
  }, [exam, isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.courseId) {
      return;
    }

    if (!formData.examDate) {
      return;
    }

    await onSubmit({
      courseId: formData.courseId,
      examDate: formData.examDate,
      startTime: convertTimeForApi(formData.startTime),
      type: formData.type,
      duration: formData.duration,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#E8E3DD] bg-white p-5 shadow-xl sm:p-6">
        {/* Header */}

        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#26364A]">
              {isEditing ? "Edit Exam" : "Add Exam"}
            </h2>

            <p className="mt-1 text-xs text-[#697586]">
              {isEditing
                ? "Update the exam information."
                : "Add a new exam to your semester."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-lg text-[#697586] transition hover:bg-[#F5F2EE]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course */}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Course
            </label>

            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#26364A] outline-none transition focus:border-[#B8A895]"
              required
            >
              <option value="">Select a course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title || course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Exam Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#26364A] outline-none focus:border-[#B8A895]"
            >
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
              <option value="Quiz">Quiz</option>
              <option value="Practical">Practical</option>
              <option value="Assignment">Assignment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date + Time */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#526274]">
                Exam Date
              </label>

              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#26364A] outline-none focus:border-[#B8A895]"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#526274]">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#26364A] outline-none focus:border-[#B8A895]"
              />
            </div>
          </div>

          {/* Duration */}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 120 mins"
              className="w-full rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-3 py-2.5 text-xs text-[#26364A] outline-none placeholder:text-[#A1A9B3] focus:border-[#B8A895]"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E5DED6] bg-[#FAF8F5] px-4 py-2 text-xs font-medium text-[#526274] transition hover:bg-[#F3EEE8]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#26364A] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#1E2B3B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function convertTimeForApi(time) {
  if (!time) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  let displayHours = hours % 12;

  if (displayHours === 0) {
    displayHours = 12;
  }

  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${period}`;
}

function convertTimeForInput(time) {
  if (!time) {
    return "";
  }

  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) {
    return "";
  }

  let hours = Number(match[1]);

  const minutes = match[2];

  const period = match[3].toUpperCase();

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}
