import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  courseId: "",
  courseCode: "",
  status: "NOT STARTED",
  dueDate: "",
  priority: "MEDIUM",
  description: "",
};

export default function AssignmentModal({
  isOpen,
  onClose,
  onSave,
  assignment,
  courses,
  defaultCourseId = "",
  defaultCourseCode = "",
  saving,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || "",
        courseId: assignment.courseId || "",
        courseCode: assignment.courseCode || "",
        status: assignment.status || "NOT STARTED",
        dueDate: assignment.dueDate || "",
        priority: assignment.priority || "MEDIUM",
        description: assignment.description || "",
      });
    } else {
      setFormData({
        ...initialForm,
        courseId: defaultCourseId,
        courseCode: defaultCourseCode,
      });
    }
  }, [assignment, isOpen, defaultCourseId, defaultCourseCode]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "courseId") {
      const selectedCourse = courses.find((course) => course.id === value);

      setFormData((current) => ({
        ...current,
        courseId: value,
        courseCode: selectedCourse?.code || current.courseCode,
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;
    if (!formData.courseId) return;
    if (!formData.dueDate.trim()) return;

    await onSave({
      title: formData.title.trim(),
      courseId: formData.courseId,
      courseCode: formData.courseCode,
      status: formData.status,
      dueDate: formData.dueDate.trim(),
      priority: formData.priority,
      description: formData.description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e7e3de] bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            {assignment ? "Edit Assignment" : "Add Assignment"}
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            {assignment
              ? "Update the assignment information."
              : "Add a new assignment to your course."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Assignment Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Algorithms Assignment 1"
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            />
          </div>

          {/* COURSE */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Course
            </label>

            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            >
              <option value="">Select course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} — {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            >
              <option value="NOT STARTED">NOT STARTED</option>

              <option value="WORKING">WORKING</option>

              <option value="DONE">DONE</option>
            </select>
          </div>

          {/* DUE DATE */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Due Date
            </label>

            <input
              type="text"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder="e.g. Oct 25, 2026"
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            />
          </div>

          {/* PRIORITY */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Assignment description..."
              rows={3}
              disabled={saving}
              className="w-full resize-none rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none focus:border-[#7094b8] focus:bg-white"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e1ddd7] px-4 py-2 text-[10px] font-semibold text-[#596773] hover:bg-[#f5f4f1]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                !formData.title.trim() ||
                !formData.courseId ||
                !formData.dueDate.trim()
              }
              className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] font-semibold text-white hover:bg-[#6285a8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : assignment
                  ? "Save Changes"
                  : "Add Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
