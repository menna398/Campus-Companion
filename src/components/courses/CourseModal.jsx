import { useEffect, useState } from "react";

const emptyCourse = {
  code: "",
  title: "",
  professor: "",
  location: "",
  schedule: {
    day: "",
    startTime: "",
    endTime: "",
  },
  credits: "",
  color: "#7094b8",
  professorImage: "",
  description: "",
  progress: 0,
  nextClass: "",
  objectives: [],
  gradeBreakdown: [],
  milestone: null,
  grades: [],
  resources: [],
};

export default function CourseModal({
  isOpen,
  onClose,
  onSave,
  course,
  saving,
}) {
  const [formData, setFormData] = useState(emptyCourse);

  const isEdit = Boolean(course);

  useEffect(() => {
    if (course) {
      setFormData({
        ...emptyCourse,
        ...course,
        schedule: {
          day: course.schedule?.day || "",
          startTime: course.schedule?.startTime || "",
          endTime: course.schedule?.endTime || "",
        },
      });
    } else {
      setFormData({
        ...emptyCourse,
        schedule: {
          day: "",
          startTime: "",
          endTime: "",
        },
      });
    }
  }, [course, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim() || !formData.title.trim()) {
      return;
    }

    const courseData = {
      ...formData,
      code: formData.code.trim(),
      title: formData.title.trim(),
      professor: formData.professor.trim(),
      location: formData.location.trim(),

      schedule: {
        day: formData.schedule.day.trim(),
        startTime: formData.schedule.startTime.trim(),
        endTime: formData.schedule.endTime.trim(),
      },

      credits: formData.credits.trim(),
      description: formData.description.trim(),
      nextClass: formData.nextClass.trim(),
      progress: Number(formData.progress) || 0,
    };

    await onSave(courseData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#273545]/30 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e7e3de] bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#eeeae5] px-5 py-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#273545]">
              {isEdit ? "Edit Course" : "Add New Course"}
            </h2>

            <p className="mt-1 text-[10px] text-[#89949d]">
              {isEdit
                ? "Update the course information."
                : "Add a new course to your academic curriculum."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#89949d] transition hover:bg-[#f5f4f1] hover:text-[#596773]"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Code + Title */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Course Code *
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. CS301"
                required
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Course Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Data Structures"
                required
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>
          </div>

          {/* Professor + Location */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Professor
              </label>

              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                placeholder="e.g. Dr. John Smith"
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Turing Hall 402"
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>
          </div>

          {/* Schedule + Credits */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Day
              </label>

              <select
                name="day"
                value={formData.schedule.day}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              >
                <option value="">Select day</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Credits
              </label>

              <input
                type="text"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>
          </div>

          {/* Start + End Time */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.schedule.startTime}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.schedule.endTime}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>
          </div>

          {/* Next Class + Progress */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Next Class
              </label>

              <input
                type="text"
                name="nextClass"
                value={formData.nextClass}
                onChange={handleChange}
                placeholder="e.g. Monday 10:00 AM"
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
                Progress (%)
              </label>

              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
              />
            </div>
          </div>

          {/* Color */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Course Color
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="h-9 w-12 cursor-pointer rounded-md border border-[#e3dfda] bg-white p-1"
              />

              <span className="text-[9px] text-[#89949d]">
                {formData.color}
              </span>
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short course description..."
              className="w-full resize-none rounded-lg border border-[#e3dfda] bg-white px-3 py-2.5 text-[10px] leading-5 text-[#273545] outline-none focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-2 border-t border-[#eeeae5] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-4 py-2 text-[10px] font-medium text-[#596773] transition hover:bg-[#f1efeb] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving || !formData.code.trim() || !formData.title.trim()
              }
              className="rounded-lg bg-[#7094b8] px-5 py-2 text-[10px] font-medium text-white transition hover:bg-[#6285a8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
