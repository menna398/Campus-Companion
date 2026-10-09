import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useCourseStore from "../../store/courseStore";
import useNoteStore from "../../store/noteStore";

const EMPTY_FORM = {
  title: "",
  courseId: "",
  date: "",
  description: "",
  notebookColor: "#6F91B5",
  sectionTitle: "",
  points: "",
  code: "",
};

function getTodayDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getShortDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

function getCourseId(course) {
  return course?.id || course?._id || "";
}

export default function NoteModal({ isOpen, onClose, note = null }) {
  const { courses } = useCourseStore();
  const { addNote, editNote, saving } = useNoteStore();

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) return;

    if (note) {
      const course = courses.find(
        (item) => item.code === note.courseCode && note.courseCode,
      );

      setFormData({
        title: note.title || "",
        courseId: course ? String(getCourseId(course)) : "",
        date: note.date || getShortDate(),
        description: note.description || "",
        notebookColor: note.notebookColor || "#6F91B5",
        sectionTitle: (note.sections || [])
          .map((section) => section.title)
          .join("\n"),
        points: (note.sections || [])
          .flatMap((section) => section.points || [])
          .join("\n"),
        code: note.code || "",
      });
    } else {
      setFormData({
        ...EMPTY_FORM,
        date: getShortDate(),
      });
    }
  }, [isOpen, note, courses]);

  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please enter a title for your note.",
      });
      return;
    }

    if (!formData.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Please enter the note description.",
      });
      return;
    }

    const selectedCourse = courses.find(
      (course) => String(getCourseId(course)) === String(formData.courseId),
    );

    const points = formData.points
      .split("\n")
      .map((point) => point.trim())
      .filter(Boolean);

    const sectionTitles = formData.sectionTitle
      .split("\n")
      .map((title) => title.trim())
      .filter(Boolean);

    const sections =
      points.length > 0 || sectionTitles.length > 0
        ? [
            {
              title: sectionTitles[0] || "Key Points",
              points,
            },
            ...sectionTitles.slice(1).map((title) => ({
              title,
              points: [],
            })),
          ]
        : [];

    const noteData = {
      title: formData.title.trim(),
      courseCode: selectedCourse?.code || "",
      courseName: selectedCourse
        ? selectedCourse.title || selectedCourse.name || ""
        : "",
      notebookColor: selectedCourse?.color || formData.notebookColor,
      date: formData.date.trim() || getShortDate(),
      lastEdited: getTodayDate(),
      description: formData.description.trim(),
      sections,
      code: formData.code,
    };

    try {
      if (note) {
        await editNote(note.id, noteData);
      } else {
        await addNote({
          ...noteData,
          notebookCount: 0,
        });
      }

      await Swal.fire({
        icon: "success",
        title: note ? "Note Updated" : "Note Added",
        text: note
          ? "Your note has been updated successfully."
          : "Your note has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save the note.",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E8E3DD] bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#26364A]">
              {note ? "Edit Note" : "Add New Note"}
            </h2>

            <p className="mt-1 text-xs text-[#697586]">
              {note
                ? "Update your note details."
                : "Create a course note or a general note."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg px-2 py-1 text-lg text-[#9AA3AD] hover:bg-[#FAF8F5]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Note Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter note title"
              className="w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm text-[#26364A] outline-none focus:border-[#C9BBAA]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#526274]">
                Course
              </label>

              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm text-[#26364A] outline-none focus:border-[#C9BBAA]"
              >
                <option value="">General Note (No Course)</option>

                {courses.map((course) => (
                  <option key={getCourseId(course)} value={getCourseId(course)}>
                    {course.code} — {course.title || course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#526274]">
                Date
              </label>

              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Oct 14"
                className="w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm text-[#26364A] outline-none focus:border-[#C9BBAA]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Write your note..."
              className="w-full resize-y rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm leading-relaxed text-[#26364A] outline-none focus:border-[#C9BBAA]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Section Titles (optional)
            </label>

            <textarea
              name="sectionTitle"
              value={formData.sectionTitle}
              onChange={handleChange}
              rows={2}
              placeholder={"Key Concepts:\nExamples:"}
              className="w-full resize-y rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm text-[#26364A] outline-none focus:border-[#C9BBAA]"
            />

            <p className="mt-1 text-[10px] text-[#9AA3AD]">
              Enter one title per line. The first title is used for the points
              below.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Key Points (optional)
            </label>

            <textarea
              name="points"
              value={formData.points}
              onChange={handleChange}
              rows={4}
              placeholder={"First point\nSecond point\nThird point"}
              className="w-full resize-y rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-sm text-[#26364A] outline-none focus:border-[#C9BBAA]"
            />

            <p className="mt-1 text-[10px] text-[#9AA3AD]">
              Enter each point on a separate line.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#526274]">
              Code (optional)
            </label>

            <textarea
              name="code"
              value={formData.code}
              onChange={handleChange}
              rows={4}
              placeholder="Write code or a formula..."
              className="w-full resize-y rounded-lg border border-[#E8E3DD] bg-[#FAF8F5] px-3 py-2.5 font-mono text-xs text-[#26364A] outline-none focus:border-[#C9BBAA]"
            />
          </div>

          {!formData.courseId && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#526274]">
                Note Color
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="notebookColor"
                  value={formData.notebookColor}
                  onChange={handleChange}
                  className="h-9 w-12 cursor-pointer rounded border border-[#E8E3DD]"
                />

                <span className="text-xs text-[#9AA3AD]">
                  {formData.notebookColor}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-[#EEE9E3] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#E8E3DD] px-4 py-2.5 text-xs font-medium text-[#526274] hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#26364A] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
