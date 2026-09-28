import { useState } from "react";
import EventCard from "../../components/ui/EventCard";
import { eventsData } from "../../data/eventsData";

const categories = ["All", "Academic", "Social", "Sports", "Career", "Arts"];

export default function Events() {
  const [events, setEvents] = useState(eventsData);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((event) => event.category === activeCategory);

  const handleAddEvent = () => {
    console.log("Add new event");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventId),
    );
  };

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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={handleDeleteEvent}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DDD5CC] bg-white px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#526274]">
                No events found
              </p>

              <p className="mt-1 text-xs text-[#9AA3AD]">
                There are no events in this category.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
