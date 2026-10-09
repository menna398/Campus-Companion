import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useEventStore from "../../store/eventStore";

const CATEGORIES = ["Academic", "Social", "Sports", "Career", "Arts"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EMPTY_FORM = {
  title: "",
  category: "Academic",
  date: "",
  time: "",
  location: "",
  description: "",
  image: "",
};

// "2026-10-22" -> "October 22, 2026"
function formatDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");

  return `${MONTHS[Number(month) - 1]} ${day}, ${year}`;
}

// "18:00" -> "06:00 PM"
function formatTime(value) {
  if (!value) return "";

  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = String(hours % 12 || 12).padStart(2, "0");

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

const inputClass =
  "w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] px-3 py-2.5 text-xs text-[#26364A] outline-none transition placeholder:text-[#A0A8B0] focus:border-[#C9BBAA]";

const labelClass = "mb-1.5 block text-[10px] font-medium text-[#526274]";

export default function EventModal({ isOpen, onClose }) {
  const { addEvent, saving } = useEventStore();

  const [form, setForm] = useState(EMPTY_FORM);

  // Reset the form every time the modal opens.
  useEffect(() => {
    if (isOpen) setForm(EMPTY_FORM);
  }, [isOpen]);

  // Close on Escape + lock page scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape" && !saving) onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, saving, onClose]);

  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.date || !form.category) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter at least the title, category, and date.",
        confirmButtonColor: "#26364A",
      });
      return;
    }

    const payload = {
      title: form.title.trim(),
      category: form.category,
      date: formatDate(form.date),
      time: formatTime(form.time),
      location: form.location.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
    };

    try {
      await addEvent(payload);

      onClose();

      await Swal.fire({
        icon: "success",
        title: "Event Added",
        text: "The event has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (addError) {
      Swal.fire({
        icon: "error",
        title: "Add Failed",
        text: addError.message || "Failed to add the event.",
        confirmButtonColor: "#26364A",
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#26364A]/40 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E8E3DD] bg-white p-5 shadow-xl sm:p-6"
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id="event-modal-title"
              className="font-serif text-xl font-semibold text-[#26364A]"
            >
              Add New Event
            </h2>
            <p className="mt-1 text-[11px] text-[#697586]">
              Fill in the details of the campus event.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            title="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8] disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="event-title" className={labelClass}>
              Title *
            </label>
            <input
              id="event-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Annual Hackathon"
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="event-category" className={labelClass}>
              Category *
            </label>
            <select
              id="event-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date / Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="event-date" className={labelClass}>
                Date *
              </label>
              <input
                id="event-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="event-time" className={labelClass}>
                Time
              </label>
              <input
                id="event-time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="event-location" className={labelClass}>
              Location
            </label>
            <input
              id="event-location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. University Main Hall"
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="event-image" className={labelClass}>
              Image URL
            </label>
            <input
              id="event-image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="event-description" className={labelClass}>
              Description
            </label>
            <textarea
              id="event-description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="What is this event about?"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#E5DED6] bg-white px-4 py-2.5 text-xs font-medium text-[#526274] transition hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
