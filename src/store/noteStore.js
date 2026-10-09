import { create } from "zustand";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

const useNoteStore = create((set) => ({
  notes: [],
  loading: false,
  saving: false,
  error: null,

  /* GET ALL NOTES */

  fetchNotes: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const notes = await getNotes();

      set({
        notes: Array.isArray(notes) ? notes : [],
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load notes.",
      });
    }
  },

  /* CREATE NOTE */

  addNote: async (noteData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const newNote = await createNote(noteData);

      set((state) => ({
        notes: [...state.notes, newNote],
        saving: false,
        error: null,
      }));

      return newNote;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add note.",
      });

      throw error;
    }
  },

  /* UPDATE NOTE */

  editNote: async (noteId, noteData) => {
    set({
      saving: true,
      error: null,
    });

    try {
      const updatedNote = await updateNote(noteId, noteData);

      set((state) => ({
        notes: state.notes.map((note) =>
          String(note.id) === String(noteId) ? updatedNote : note,
        ),
        saving: false,
        error: null,
      }));

      return updatedNote;
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update note.",
      });

      throw error;
    }
  },

  /* DELETE NOTE */

  removeNote: async (noteId) => {
    set({
      saving: true,
      error: null,
    });

    try {
      await deleteNote(noteId);

      set((state) => ({
        notes: state.notes.filter((note) => String(note.id) !== String(noteId)),
        saving: false,
        error: null,
      }));
    } catch (error) {
      set({
        saving: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete note.",
      });

      throw error;
    }
  },
}));

export default useNoteStore;
