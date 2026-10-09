import { create } from "zustand";

import { getEvents, createEvent, deleteEvent } from "../services/eventService";

function getEventId(event) {
  return event?.id || event?._id;
}

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

const useEventStore = create((set) => ({
  events: [],
  loading: false,
  saving: false,
  deleting: false,
  error: null,

  // Get all events
  // (only this action sets the page-level `error`)
  fetchEvents: async () => {
    set({ loading: true, error: null });

    try {
      const events = await getEvents();

      set({
        events: Array.isArray(events) ? events : [],
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Failed to load events."),
      });
    }
  },

  // Add event
  // Errors are thrown so the component can show them in a SweetAlert,
  // and they do NOT replace the whole page with the error screen.
  addEvent: async (eventData) => {
    set({ saving: true });

    try {
      const createdEvent = await createEvent(eventData);

      if (!createdEvent) {
        throw new Error("The server did not return the created event.");
      }

      set((state) => ({
        events: [
          {
            ...createdEvent,
            id: getEventId(createdEvent),
          },
          ...state.events,
        ],
        saving: false,
      }));

      return createdEvent;
    } catch (error) {
      set({ saving: false });

      error.message = getErrorMessage(error, "Failed to add event.");
      throw error;
    }
  },

  // Delete event
  removeEvent: async (eventId) => {
    set({ deleting: true });

    try {
      await deleteEvent(eventId);

      set((state) => ({
        events: state.events.filter(
          (event) => String(getEventId(event)) !== String(eventId),
        ),
        deleting: false,
      }));
    } catch (error) {
      set({ deleting: false });

      error.message = getErrorMessage(error, "Failed to delete event.");
      throw error;
    }
  },
}));

export default useEventStore;
