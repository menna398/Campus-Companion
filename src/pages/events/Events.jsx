import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import EventCard from "../../components/events/EventCard";
import EventModal from "../../components/events/EventModal";

import useEventStore from "../../store/eventStore";

const categories = ["All", "Academic", "Social", "Sports", "Career", "Arts"];

function getEventId(event) {
  return event?.id || event?._id;
}

// "October 22, 2026" + "06:00 PM" -> timestamp (invalid dates go last)
function getEventTimestamp(event) {
  const base = Date.parse(event?.date);

  if (Number.isNaN(base)) return Number.MAX_SAFE_INTEGER;

  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(event?.time || "");

  if (!match) return base;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return base + (hours * 60 + minutes) * 60 * 1000;
}

export default function Events() {
  const { events, loading, error, fetchEvents, removeEvent } = useEventStore();

  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Always keep events sorted by date/time (soonest first).
  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b)),
    [events],
  );

  const filteredEvents =
    activeCategory === "All"
      ? sortedEvents
      : sortedEvents.filter((event) => event.category === activeCategory);

  function handleAddEvent() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleDeleteEvent(eventId) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Event?",
      text: "This event will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#A96B6B",
    });

    if (!result.isConfirmed) return;

    setDeletingId(eventId);

    try {
      await removeEvent(eventId);

      await Swal.fire({
        icon: "success",
        title: "Event Deleted",
        text: "The event has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (deleteError) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: deleteError.message || "Failed to delete the event.",
        confirmButtonColor: "#26364A",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#26364A] sm:text-3xl">
              Campus Events
            </h1>

            <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-[#697586] sm:text-xs">
              Discover academic, social, career, sports, and arts events
              happening around campus.
            </p>
          </div>

          {/* Add Event */}
          <button
            type="button"
            onClick={handleAddEvent}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] sm:w-auto"
          >
            <span className="text-base leading-none">+</span>
            Add Event
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-medium transition ${
                  isActive
                    ? "border-[#26364A] bg-[#26364A] text-white"
                    : "border-[#E5DED6] bg-white text-[#526274] hover:border-[#CFC4B8] hover:bg-[#FAF8F5]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Events */}
        <section className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-[#E8E3DD] bg-white px-6 py-16 text-center">
              <p className="text-xs text-[#697586]">Loading events...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-white px-6 py-10 text-center">
              <p className="text-sm font-medium text-red-600">
                Failed to load events
              </p>

              <p className="mt-2 text-xs text-[#697586]">{error}</p>

              <button
                type="button"
                onClick={fetchEvents}
                className="mt-4 rounded-lg bg-[#26364A] px-4 py-2 text-xs text-white"
              >
                Try Again
              </button>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={getEventId(event)}
                event={event}
                onDelete={handleDeleteEvent}
                deleting={String(deletingId) === String(getEventId(event))}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DDD5CC] bg-white px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#526274]">
                No events found
              </p>

              <p className="mt-1 text-xs text-[#9AA3AD]">
                {activeCategory === "All"
                  ? "Add your first event to get started."
                  : "There are no events in this category."}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Add Modal */}
      <EventModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
}
