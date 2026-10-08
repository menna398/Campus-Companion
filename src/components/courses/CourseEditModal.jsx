import { useEffect, useState } from "react";
import useCourseStore from "../../store/courseStore";

export default function CourseEditModal({ course, isOpen, onClose }) {
  const { updateCourse, updating } = useCourseStore();

  const [formData, setFormData] = useState({
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
    progress: 0,
    nextClass: "",
    color: "",
    professorImage: "",
    description: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        code: course.code || "",
        title: course.title || "",
        professor: course.professor || "",
        location: course.location || "",

        schedule: {
          day: course.schedule?.day || "",
          startTime: course.schedule?.startTime || "",
          endTime: course.schedule?.endTime || "",
        },

        credits: course.credits ?? "",
        progress: course.progress ?? 0,
        nextClass: course.nextClass || "",
        color: course.color || "",
        professorImage: course.professorImage || "",
        description: course.description || "",
      });
    }
  }, [course]);

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

  const handleProgressChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      progress: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(course.id, {
        code: formData.code,
        title: formData.title,
        professor: formData.professor,
        location: formData.location,

        schedule: {
          day: formData.schedule.day,
          startTime: formData.schedule.startTime,
          endTime: formData.schedule.endTime,
        },

        credits: formData.credits,
        progress: formData.progress,
        nextClass: formData.nextClass,
        color: formData.color,
        professorImage: formData.professorImage,
        description: formData.description,
      });

      onClose();
    } catch (error) {
      // Error is already handled inside the store.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e7e3de] bg-white p-6 shadow-xl">
        {/* Header */}

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#273545]">
              Edit Course
            </h2>

            <p className="mt-1 text-[10px] text-[#89949d]">
              Update your course information and progress.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-lg text-[#89949d] hover:bg-[#f4f3f0]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Course Code */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Course Code
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Course Title */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Professor */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Professor
              </label>

              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Location */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Day */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Day
              </label>

              <select
                name="day"
                value={formData.schedule.day}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
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

            {/* Credits */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Credits
              </label>

              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Start Time */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.schedule.startTime}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* End Time */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.schedule.endTime}
                onChange={handleScheduleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Next Class */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Next Class
              </label>

              <input
                type="text"
                name="nextClass"
                value={formData.nextClass}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>

            {/* Professor Image */}

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Professor Image
              </label>

              <input
                type="text"
                name="professorImage"
                value={formData.professorImage}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
              />
            </div>
          </div>

          {/* Description */}

          <div className="mt-4">
            <label className="mb-1 block text-[9px] font-medium text-[#687681]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#91aa91]"
            />
          </div>

          {/* Progress */}

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[9px] font-medium text-[#687681]">
                Course Progress
              </label>

              <span className="text-[10px] font-semibold text-[#6f8c6f]">
                {formData.progress}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleProgressChange}
              className="w-full accent-[#91aa91]"
            />
          </div>

          {/* Color */}

          <div className="mt-5">
            <label className="mb-2 block text-[9px] font-medium text-[#687681]">
              Course Color
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                name="color"
                value={formData.color || "#91aa91"}
                onChange={handleChange}
                className="h-8 w-12 cursor-pointer rounded border border-[#e1ddd7]"
              />

              <span className="text-[10px] text-[#89949d]">
                {formData.color}
              </span>
            </div>
          </div>

          {/* Actions */}

          <div className="mt-7 flex justify-end gap-3 border-t border-[#eeeae5] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="rounded-lg px-4 py-2 text-[10px] text-[#687681] hover:bg-[#f4f3f0]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-[#91aa91] px-5 py-2 text-[10px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
