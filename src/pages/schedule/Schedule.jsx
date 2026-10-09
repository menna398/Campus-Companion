import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import useCourseStore from "../../store/courseStore";
import useScheduleStore from "../../store/scheduleStore";

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function timeToMinutes(time) {
  if (!time) return null;

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    return null;
  }

  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  return hours * 60 + minutes;
}

function formatTime(time) {
  if (!time) return "";

  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return time.trim();

  let hours = Number(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  hours = String(hours).padStart(2, "0");

  return `${hours}:${minutes} ${period}`;
}

function getSlotMinutes(time) {
  return timeToMinutes(time);
}

function isValidTimeFormat(time) {
  return /^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i.test(time.trim());
}

function isAllowedTime(time) {
  const minutes = timeToMinutes(time);

  if (minutes === null) return false;

  const minTime = 8 * 60;
  const maxTime = 17 * 60;

  return minutes >= minTime && minutes <= maxTime;
}

export default function Schedule() {
  const { courses, fetchCourses } = useCourseStore();

  const {
    loading,
    error,
    saving,
    updating,
    fetchSchedule,
    addCourseToSchedule,
    updateSchedule,
    removeCourseFromSchedule,
  } = useScheduleStore();

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchSchedule();
  }, [fetchCourses, fetchSchedule]);

  const scheduledCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.schedule &&
        typeof course.schedule === "object" &&
        !Array.isArray(course.schedule) &&
        course.schedule.day &&
        course.schedule.startTime &&
        course.schedule.endTime,
    );
  }, [courses]);

  const availableCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        !course.schedule ||
        typeof course.schedule !== "object" ||
        Array.isArray(course.schedule) ||
        !course.schedule.day ||
        !course.schedule.startTime ||
        !course.schedule.endTime,
    );
  }, [courses]);

  function openAddModal() {
    setEditingCourse(null);
    setSelectedCourseId("");

    setFormData({
      day: "",
      startTime: "",
      endTime: "",
    });

    setShowModal(true);
  }

  function openEditModal(course) {
    setEditingCourse(course);
    setSelectedCourseId(course.id);

    setFormData({
      day: course.schedule?.day || "",
      startTime: course.schedule?.startTime || "",
      endTime: course.schedule?.endTime || "",
    });

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingCourse(null);
    setSelectedCourseId("");

    setFormData({
      day: "",
      startTime: "",
      endTime: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function hasTimeOverlap(courseId, day, startTime, endTime) {
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    if (newStart === null || newEnd === null) {
      return false;
    }

    return scheduledCourses.some((course) => {
      if (String(course.id) === String(courseId)) {
        return false;
      }

      if (course.schedule?.day !== day) {
        return false;
      }

      const existingStart = timeToMinutes(course.schedule.startTime);
      const existingEnd = timeToMinutes(course.schedule.endTime);

      if (existingStart === null || existingEnd === null) {
        return false;
      }

      return newStart < existingEnd && newEnd > existingStart;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.day) {
      Swal.fire({
        icon: "warning",
        title: "Missing Day",
        text: "Please select a day.",
      });
      return;
    }

    if (!formData.startTime.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Start Time",
        text: "Please enter a start time.",
      });
      return;
    }

    if (!formData.endTime.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing End Time",
        text: "Please enter an end time.",
      });
      return;
    }

    if (!isValidTimeFormat(formData.startTime)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Start Time",
        text: "Please enter the time in this format: 10:30 AM",
      });
      return;
    }

    if (!isValidTimeFormat(formData.endTime)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid End Time",
        text: "Please enter the time in this format: 10:30 AM",
      });
      return;
    }

    if (!isAllowedTime(formData.startTime)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Start Time",
        text: "The start time must be between 08:00 AM and 05:00 PM.",
      });
      return;
    }

    if (!isAllowedTime(formData.endTime)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid End Time",
        text: "The end time must be between 08:00 AM and 05:00 PM.",
      });
      return;
    }

    const startMinutes = timeToMinutes(formData.startTime);
    const endMinutes = timeToMinutes(formData.endTime);

    if (startMinutes === null || endMinutes === null) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Time",
        text: "Please enter valid times.",
      });
      return;
    }

    if (endMinutes <= startMinutes) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Time Range",
        text: "End time must be after start time.",
      });
      return;
    }

    const courseId = editingCourse ? editingCourse.id : selectedCourseId;

    if (!courseId) {
      Swal.fire({
        icon: "warning",
        title: "Select a Course",
        text: "Please select a course.",
      });
      return;
    }

    const startTime = formatTime(formData.startTime);
    const endTime = formatTime(formData.endTime);

    if (hasTimeOverlap(courseId, formData.day, startTime, endTime)) {
      Swal.fire({
        icon: "error",
        title: "Time Conflict",
        text: "This time overlaps with another course on the same day.",
      });
      return;
    }

    const scheduleData = {
      day: formData.day,
      startTime,
      endTime,
    };

    try {
      if (editingCourse) {
        await updateSchedule(editingCourse.id, scheduleData);

        await Swal.fire({
          icon: "success",
          title: "Schedule Updated",
          text: "The course schedule has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await addCourseToSchedule(selectedCourseId, scheduleData);

        await Swal.fire({
          icon: "success",
          title: "Course Added",
          text: "The course has been added to your schedule.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      closeModal();
      await fetchCourses();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save the schedule.",
      });
    }
  }

  async function handleDelete(course) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove from Schedule?",
      text: `${course.title || course.name} will be removed from the schedule.`,
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await removeCourseFromSchedule(course.id);

      await Swal.fire({
        icon: "success",
        title: "Removed",
        text: "The course has been removed from the schedule.",
        timer: 1500,
        showConfirmButton: false,
      });

      await fetchCourses();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to remove the course from the schedule.",
      });
    }
  }

  function getCourseForSlot(day, slot) {
    const slotMinutes = getSlotMinutes(slot);

    if (slotMinutes === null) {
      return null;
    }

    return scheduledCourses.find((course) => {
      if (course.schedule?.day !== day) {
        return false;
      }

      const start = getSlotMinutes(course.schedule.startTime);
      const end = getSlotMinutes(course.schedule.endTime);

      if (start === null || end === null) {
        return false;
      }

      return slotMinutes >= start && slotMinutes < end;
    });
  }

  function isCourseStart(course, slot) {
    const start = getSlotMinutes(course.schedule?.startTime);
    const slotMinutes = getSlotMinutes(slot);

    return start === slotMinutes;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A9AA5]">
              Weekly Planner
            </p>

            <h1 className="font-serif text-3xl font-semibold text-[#26343D]">
              Schedule
            </h1>

            <p className="mt-2 text-sm text-[#7B858C]">
              Organize your classes throughout the week.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-xl bg-[#344955] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263A45]"
          >
            + Add to Schedule
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E0D9] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A9AA5]">
              Scheduled Courses
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#26343D]">
              {scheduledCourses.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5E0D9] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A9AA5]">
              Available Courses
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#26343D]">
              {availableCourses.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5E0D9] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A9AA5]">
              Time Range
            </p>

            <p className="mt-2 text-lg font-semibold text-[#26343D]">
              08:00 AM - 05:00 PM
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-[#E5E0D9] bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#7B858C]">Loading schedule...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && scheduledCourses.length === 0 && (
          <div className="rounded-2xl border border-[#E5E0D9] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F4F5] text-2xl">
              +
            </div>

            <h2 className="font-serif text-xl font-semibold text-[#26343D]">
              No Courses Scheduled
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#7B858C]">
              Add one of your courses to the weekly schedule to keep everything
              organized.
            </p>

            <button
              onClick={openAddModal}
              className="mt-6 rounded-xl bg-[#344955] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263A45]"
            >
              Add Course
            </button>
          </div>
        )}

        {/* Desktop Schedule */}
        {!loading && !error && scheduledCourses.length > 0 && (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-[#E5E0D9] bg-white shadow-sm lg:block">
              <div className="grid grid-cols-[100px_repeat(7,minmax(120px,1fr))]">
                {/* Header */}
                <div className="border-b border-r border-[#E5E0D9] bg-[#FAF9F7] p-4" />

                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="border-b border-r border-[#E5E0D9] bg-[#FAF9F7] p-4 text-center last:border-r-0"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#697780]">
                      {day}
                    </p>
                  </div>
                ))}

                {/* Time Rows */}
                {TIME_SLOTS.map((slot) => (
                  <div key={slot} className="contents">
                    <div className="border-b border-r border-[#E5E0D9] bg-[#FAF9F7] px-3 py-5 text-center">
                      <span className="text-xs font-medium text-[#7B858C]">
                        {slot}
                      </span>
                    </div>

                    {DAYS.map((day) => {
                      const course = getCourseForSlot(day, slot);

                      return (
                        <div
                          key={`${day}-${slot}`}
                          className="relative min-h-[90px] border-b border-r border-[#E5E0D9] p-2 last:border-r-0"
                        >
                          {course && isCourseStart(course, slot) && (
                            <div
                              className="group relative h-full min-h-[74px] cursor-pointer rounded-xl border border-[#DCE5E9] bg-[#F3F7F8] p-3 transition hover:shadow-md"
                              onClick={() => openEditModal(course)}
                            >
                              <p className="pr-5 text-xs font-bold text-[#344955]">
                                {course.code}
                              </p>

                              <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-4 text-[#52616B]">
                                {course.title || course.name}
                              </p>

                              <p className="mt-2 text-[9px] font-semibold text-[#7B858C]">
                                {course.schedule.startTime} -{" "}
                                {course.schedule.endTime}
                              </p>

                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(course);
                                }}
                                className="absolute right-2 top-2 hidden rounded-full bg-white px-2 py-1 text-[10px] text-red-500 shadow-sm group-hover:block"
                              >
                                ×
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Schedule */}
            <div className="space-y-4 lg:hidden">
              {DAYS.map((day) => {
                const dayCourses = scheduledCourses.filter(
                  (course) => course.schedule?.day === day,
                );

                if (dayCourses.length === 0) {
                  return null;
                }

                return (
                  <div
                    key={day}
                    className="rounded-2xl border border-[#E5E0D9] bg-white p-5 shadow-sm"
                  >
                    <h2 className="mb-4 font-serif text-lg font-semibold text-[#26343D]">
                      {day}
                    </h2>

                    <div className="space-y-3">
                      {dayCourses
                        .sort(
                          (a, b) =>
                            getSlotMinutes(a.schedule.startTime) -
                            getSlotMinutes(b.schedule.startTime),
                        )
                        .map((course) => (
                          <div
                            key={course.id}
                            onClick={() => openEditModal(course)}
                            className="group relative cursor-pointer rounded-xl border border-[#DCE5E9] bg-[#F3F7F8] p-4 transition hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-bold text-[#344955]">
                                  {course.code}
                                </p>

                                <p className="mt-1 text-sm font-semibold text-[#52616B]">
                                  {course.title || course.name}
                                </p>

                                <p className="mt-2 text-xs font-medium text-[#7B858C]">
                                  {course.schedule.startTime} -{" "}
                                  {course.schedule.endTime}
                                </p>
                              </div>

                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(course);
                                }}
                                className="rounded-full bg-white px-2 py-1 text-xs text-red-500 shadow-sm"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#26343D]">
                    {editingCourse ? "Edit Schedule" : "Add to Schedule"}
                  </h2>

                  <p className="mt-1 text-sm text-[#7B858C]">
                    {editingCourse
                      ? "Update the course schedule."
                      : "Choose a course and set its schedule."}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="text-xl text-[#8A9AA5] transition hover:text-[#344955]"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Course */}
                {!editingCourse ? (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#52616B]">
                      Course
                    </label>

                    {availableCourses.length === 0 ? (
                      <div className="rounded-xl border border-[#E5E0D9] bg-[#FAF9F7] p-4">
                        <p className="text-sm font-semibold text-[#344955]">
                          No Courses Available
                        </p>

                        <p className="mt-1 text-xs text-[#7B858C]">
                          All your courses are already in the schedule.
                        </p>
                      </div>
                    ) : (
                      <select
                        name="courseId"
                        value={selectedCourseId}
                        onChange={(event) =>
                          setSelectedCourseId(event.target.value)
                        }
                        className="w-full rounded-xl border border-[#D9DEE3] bg-white px-4 py-3 text-sm outline-none focus:border-[#8AA8B8]"
                      >
                        <option value="">Select a course</option>

                        {availableCourses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.code} - {course.title || course.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#F3F7F8] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8A9AA5]">
                      Course
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#344955]">
                      {editingCourse.code} -{" "}
                      {editingCourse.title || editingCourse.name}
                    </p>
                  </div>
                )}

                {/* Day */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#52616B]">
                    Day
                  </label>

                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D9DEE3] bg-white px-4 py-3 text-sm outline-none focus:border-[#8AA8B8]"
                  >
                    <option value="">Select a day</option>

                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#52616B]">
                      Start Time
                    </label>

                    <input
                      type="text"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      placeholder="e.g. 10:30 AM"
                      className="w-full rounded-xl border border-[#D9DEE3] bg-white px-4 py-3 text-sm outline-none focus:border-[#8AA8B8]"
                    />

                    <p className="mt-1 text-[10px] text-[#8A9AA5]">
                      08:00 AM - 05:00 PM
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#52616B]">
                      End Time
                    </label>

                    <input
                      type="text"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      placeholder="e.g. 11:45 AM"
                      className="w-full rounded-xl border border-[#D9DEE3] bg-white px-4 py-3 text-sm outline-none focus:border-[#8AA8B8]"
                    />

                    <p className="mt-1 text-[10px] text-[#8A9AA5]">
                      08:00 AM - 05:00 PM
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-[#D9DEE3] px-5 py-3 text-sm font-semibold text-[#52616B] transition hover:bg-[#F8F6F3]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      saving ||
                      updating ||
                      (!editingCourse && availableCourses.length === 0)
                    }
                    className="rounded-xl bg-[#344955] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#263A45] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving || updating
                      ? "Saving..."
                      : editingCourse
                        ? "Update Schedule"
                        : "Add to Schedule"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
