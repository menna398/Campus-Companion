import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { initialSchedule } from "../../data/scheduleData";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const colorClasses = {
  blue: {
    bg: "bg-[#7094b8]",
    text: "text-white",
    border: "border-[#7094b8]",
  },

  orange: {
    bg: "bg-[#efc49f]",
    text: "text-[#263548]",
    border: "border-[#efc49f]",
  },

  green: {
    bg: "bg-[#91a98e]",
    text: "text-white",
    border: "border-[#91a98e]",
  },

  purple: {
    bg: "bg-[#bca9ce]",
    text: "text-white",
    border: "border-[#bca9ce]",
  },

  neutral: {
    bg: "bg-white",
    text: "text-[#263548]",
    border: "border-dashed border-[#9ba9b5]",
  },
};

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getCurrentDay() {
  const today = new Date().getDay();

  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return dayMap[today];
}

export default function Schedule() {
  // =========================
  // SCHEDULE STATE
  // =========================

  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("weeklySchedule_v2");

    return savedSchedule ? JSON.parse(savedSchedule) : initialSchedule;
  });

  // =========================
  // UI STATE
  // =========================

  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");

  const [editingEvent, setEditingEvent] = useState(null);

  // =========================
  // FORM STATE
  // =========================

  const emptyForm = {
    title: "",
    day: "Saturday",
    startTime: "09:00",
    endTime: "10:00",
    room: "",
    color: "blue",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // CURRENT DAY
  // =========================

  const today = useMemo(() => getCurrentDay(), []);

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem("weeklySchedule_v2", JSON.stringify(schedule));
  }, [schedule]);

  // =========================
  // OPEN ADD MODAL
  // =========================

  const handleOpenAdd = () => {
    setModalMode("add");

    setEditingEvent(null);

    setFormData({
      ...emptyForm,
    });

    setIsModalOpen(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleOpenEdit = (event) => {
    setModalMode("edit");

    setEditingEvent(event);

    setFormData({
      title: event.title,
      day: event.day,
      startTime: event.startTime,
      endTime: event.endTime,
      room: event.room,
      color: event.color || "blue",
    });

    setIsModalOpen(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setEditingEvent(null);

    setFormData({
      ...emptyForm,
    });
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD / EDIT COURSE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic time validation
    if (timeToMinutes(formData.endTime) <= timeToMinutes(formData.startTime)) {
      Swal.fire({
        title: "Invalid Time",
        text: "End time must be later than start time.",
        icon: "error",
        confirmButtonColor: "#7094b8",
      });

      return;
    }

    // =========================
    // EDIT
    // =========================

    if (modalMode === "edit" && editingEvent) {
      setSchedule((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                title: formData.title,
                shortTitle: formData.title,
                day: formData.day,
                startTime: formData.startTime,
                endTime: formData.endTime,
                room: formData.room,
                color: formData.color,
              }
            : event,
        ),
      );

      handleCloseModal();

      await Swal.fire({
        title: "Updated!",
        text: "The course has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#7094b8",
      });

      return;
    }

    // =========================
    // ADD
    // =========================

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      shortTitle: formData.title,
      room: formData.room,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      color: formData.color,
    };

    setSchedule((prev) => [...prev, newEvent]);

    handleCloseModal();

    await Swal.fire({
      title: "Course Added!",
      text: "The course has been added to your weekly schedule.",
      icon: "success",
      confirmButtonColor: "#7094b8",
    });
  };

  // =========================
  // DELETE COURSE
  // =========================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Remove this course?",
      text: "This course will be removed from your weekly schedule.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#263548",
      cancelButtonColor: "#94a3b8",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setSchedule((prev) => prev.filter((event) => event.id !== id));

    await Swal.fire({
      title: "Removed!",
      text: "The course was removed from your schedule.",
      icon: "success",
      confirmButtonColor: "#7094b8",
    });
  };

  // =========================
  // EVENT POSITION
  // =========================

  const getEventStyle = (event) => {
    const startMinutes = timeToMinutes(event.startTime);

    const endMinutes = timeToMinutes(event.endTime);

    const firstSlot = timeToMinutes("08:00");

    const top = ((startMinutes - firstSlot) / 60) * 75;

    const height = ((endMinutes - startMinutes) / 60) * 75;

    return {
      top: `${top}px`,
      height: `${Math.max(height - 6, 55)}px`,
    };
  };

  return (
    <div className="min-h-screen w-full bg-[#faf9f7] px-4 py-6 sm:px-6 lg:px-8">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#263548] sm:text-3xl">
            Weekly Schedule
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748b] sm:text-sm">
            Your synchronous learning events, office hours, and study sessions
          </p>
        </div>

        {/* HEADER BUTTONS */}

        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          {/* ADD COURSE */}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="w-full rounded-md bg-[#263548] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#33465c] sm:w-auto"
          >
            + Add Course to Schedule
          </button>

          {/* EDIT SCHEDULE */}

          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className={`w-full rounded-md px-5 py-2.5 text-xs font-medium transition sm:w-auto ${
              isEditing
                ? "bg-[#e9edf2] text-[#263548]"
                : "bg-[#7094b8] text-white hover:bg-[#6287ad]"
            }`}
          >
            {isEditing ? "Done Editing" : "Edit Week Schedule"}
          </button>
        </div>
      </div>

      {/* =========================
          CALENDAR
      ========================= */}

      <div className="w-full overflow-x-auto rounded-xl border border-[#e5e1dc] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="min-w-[1180px] p-4 sm:p-5">
          {/* =========================
              DAY HEADERS
          ========================= */}

          <div className="grid grid-cols-[65px_repeat(7,minmax(150px,1fr))]">
            {/* Empty corner */}

            <div />

            {days.map((day) => {
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`flex h-12 items-center justify-center rounded-t-lg transition ${
                    isToday
                      ? "bg-[#f1efeb] text-[#6388af]"
                      : "bg-white text-[#263548]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold">{day}</span>

                    {isToday && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7094b8]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================
              CALENDAR BODY
          ========================= */}

          <div className="grid grid-cols-[65px_repeat(7,minmax(150px,1fr))]">
            {/* =========================
                TIME COLUMN
            ========================= */}

            <div className="relative">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-[75px] border-b border-[#eeeae5] pr-2 pt-1 text-right text-[9px] text-[#8090a0]"
                >
                  {formatTime(time)}
                </div>
              ))}
            </div>

            {/* =========================
                DAYS
            ========================= */}

            {days.map((day) => {
              const isToday = day === today;

              const dayEvents = schedule.filter((event) => event.day === day);

              return (
                <div
                  key={day}
                  className={`relative border-l border-[#eeeae5] ${
                    isToday ? "bg-[#f7f5f2]" : "bg-white"
                  }`}
                >
                  {/* TIME GRID */}

                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="h-[75px] border-b border-[#eeeae5]"
                    />
                  ))}

                  {/* =========================
                      EVENTS
                  ========================= */}

                  {dayEvents.map((event) => {
                    const colors =
                      colorClasses[event.color] || colorClasses.blue;

                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1.5 right-1.5 overflow-hidden rounded-md border px-2.5 py-2 shadow-sm transition-all hover:shadow-md ${colors.bg} ${colors.text} ${colors.border}`}
                        style={getEventStyle(event)}
                      >
                        <div className="flex h-full flex-col">
                          {/* EVENT TOP */}

                          <div className="flex items-start justify-between gap-1">
                            <p className="min-w-0 truncate text-[10px] font-semibold">
                              {event.shortTitle || event.title}
                            </p>

                            {/* EDIT / DELETE */}

                            {isEditing && (
                              <div className="flex shrink-0 gap-1">
                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(event)}
                                  title="Edit course"
                                  className="rounded bg-white/80 p-1 text-[#263548] transition hover:bg-white"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-3 w-3"
                                  >
                                    <path d="M12 20h9" />

                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                  </svg>
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() => handleDelete(event.id)}
                                  title="Delete course"
                                  className="rounded bg-white/80 p-1 text-red-500 transition hover:bg-white"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-3 w-3"
                                  >
                                    <path d="M3 6h18" />

                                    <path d="M8 6V4h8v2" />

                                    <path d="M19 6l-1 14H6L5 6" />

                                    <path d="M10 11v5" />

                                    <path d="M14 11v5" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* LOCATION */}

                          <p className="mt-1 truncate text-[8px] opacity-90">
                            {event.room}
                          </p>

                          {/* TIME */}

                          <p className="mt-auto text-[8px] opacity-80">
                            {formatTime(event.startTime)} –{" "}
                            {formatTime(event.endTime)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#263548]/30 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-[#e5e1dc] bg-white p-5 shadow-xl sm:p-6">
            {/* MODAL HEADER */}

            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#8b9aaa]">
                  Weekly Schedule
                </p>

                <h2 className="mt-1 font-serif text-xl font-semibold text-[#263548]">
                  {modalMode === "add" ? "Add Course" : "Edit Course"}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-md p-1 text-[#94a3b8] transition hover:bg-[#f5f3f0] hover:text-[#263548]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18" />

                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* COURSE NAME */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                  Course Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. CSM414 – Software Engineering"
                  className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none transition placeholder:text-[#a0aab5] focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
                />
              </div>

              {/* DAY */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                  Day
                </label>

                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none transition focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* TIME */}

              <div className="grid grid-cols-2 gap-3">
                {/* START */}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                    Start Time
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none focus:border-[#7094b8]"
                  />
                </div>

                {/* END */}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                    End Time
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none focus:border-[#7094b8]"
                  />
                </div>
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                  Location
                </label>

                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                  placeholder="e.g. R-9201"
                  className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none transition placeholder:text-[#a0aab5] focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
                />
              </div>

              {/* COLOR */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#475569]">
                  Course Color
                </label>

                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#ddd8d2] bg-white px-3 py-2.5 text-sm text-[#263548] outline-none transition focus:border-[#7094b8] focus:ring-2 focus:ring-[#7094b8]/10"
                >
                  <option value="blue">Blue</option>

                  <option value="orange">Orange</option>

                  <option value="green">Green</option>

                  <option value="purple">Purple</option>

                  <option value="neutral">Neutral</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md border border-[#ddd8d2] px-4 py-2.5 text-sm font-medium text-[#475569] transition hover:bg-[#f7f5f2]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-[#263548] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#33465c]"
                >
                  {modalMode === "add" ? "Add Course" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
