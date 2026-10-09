import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import NoteCard from "../../components/notes/NoteCard";
import NoteModal from "../../components/notes/NoteModal";

import useNoteStore from "../../store/noteStore";
import useCourseStore from "../../store/courseStore";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function getNoteId(note) {
  return note?.id || note?._id;
}

export default function Notes() {
  const { notes, loading, error, fetchNotes, removeNote } = useNoteStore();

  const { courses, fetchCourses } = useCourseStore();

  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
    fetchCourses();
  }, [fetchNotes, fetchCourses]);

  // Keep the selected note in sync after editing.
  useEffect(() => {
    if (!selectedNote) return;

    const updatedNote = notes.find(
      (note) => String(getNoteId(note)) === String(getNoteId(selectedNote)),
    );

    if (updatedNote) {
      setSelectedNote(updatedNote);
    } else {
      setSelectedNote(null);
    }
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return notes;

    return notes.filter((note) => {
      const sections = Array.isArray(note.sections) ? note.sections : [];

      const searchableContent = [
        note.title,
        note.description,
        note.courseCode,
        note.courseName,
        note.lastEdited,
        note.date,
        note.code,
        ...sections.flatMap((section) => [
          section.title,
          ...(Array.isArray(section.points) ? section.points : []),
        ]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(query);
    });
  }, [notes, search]);

  const notebooks = useMemo(() => {
    return courses
      .filter((course) => course.code)
      .map((course) => {
        const courseNotes = notes.filter(
          (note) => note.courseCode === course.code,
        );

        return {
          id: course.id || course._id || course.code,
          code: course.code,
          name: course.title || course.name || course.code,
          color: course.color || courseNotes[0]?.notebookColor || "#6F91B5",
          count: courseNotes.length,
        };
      });
  }, [courses, notes]);

  function handleAddNote() {
    setEditingNote(null);
    setShowModal(true);
  }

  function handleEditNote() {
    if (!selectedNote) return;

    setEditingNote(selectedNote);
    setShowModal(true);
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Note?",
      text: "This note will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#A96B6B",
    });

    if (!result.isConfirmed) return;

    try {
      await removeNote(getNoteId(selectedNote));

      setSelectedNote(null);

      await Swal.fire({
        icon: "success",
        title: "Note Deleted",
        text: "The note has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (deleteError) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          deleteError.response?.data?.message ||
          deleteError.message ||
          "Failed to delete the note.",
      });
    }
  }

  function handleOpenNote(note) {
    setSelectedNote(note);
  }

  function handleCloseNote() {
    setSelectedNote(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingNote(null);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-[#26364A] sm:text-3xl">
              Notes
            </h1>

            <p className="mt-1 text-xs text-[#697586]">
              Keep your lectures, ideas, and study notes organized.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNote}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#1E2B3B] sm:w-auto"
          >
            <span className="text-base leading-none">+</span>
            Add New Note
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#E8E3DD] bg-white p-4 shadow-sm">
            {/* Search */}
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA3AD]">
                <SearchIcon />
              </div>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notes..."
                className="w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] py-2.5 pl-9 pr-3 text-xs text-[#26364A] outline-none transition placeholder:text-[#A0A8B0] focus:border-[#C9BBAA]"
              />
            </div>

            <p className="mt-2 text-[9px] leading-relaxed text-[#9AA3AD]">
              Search by title, course, or anything inside a note.
            </p>

            {/* Search Results / Notebooks */}
            {search.trim() ? (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="text-[10px] font-medium uppercase tracking-wide text-[#7C8996]">
                    Search Results
                  </h2>
                  <span className="text-[9px] text-[#9AA3AD]">
                    {filteredNotes.length}
                  </span>
                </div>

                {filteredNotes.length > 0 ? (
                  <div className="max-h-[420px] space-y-1 overflow-y-auto pr-1">
                    {filteredNotes.map((note) => (
                      <button
                        key={getNoteId(note)}
                        type="button"
                        onClick={() => handleOpenNote(note)}
                        className={`w-full rounded-lg border px-3 py-2.5 text-left transition ${
                          selectedNote &&
                          String(getNoteId(selectedNote)) ===
                            String(getNoteId(note))
                            ? "border-[#D6CCC0] bg-[#F3EEE8]"
                            : "border-transparent hover:border-[#E8E3DD] hover:bg-[#FAF9F7]"
                        }`}
                      >
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <span className="line-clamp-2 text-[11px] font-medium leading-snug text-[#26364A]">
                            {note.title || "Untitled Note"}
                          </span>
                          <span
                            className="mt-1 h-2 w-2 shrink-0 rounded-sm"
                            style={{
                              backgroundColor: note.notebookColor || "#6F91B5",
                            }}
                          />
                        </div>
                        <p className="line-clamp-2 text-[10px] leading-relaxed text-[#697586]">
                          {note.description || "No description"}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="truncate text-[9px] text-[#7C8996]">
                            {note.courseCode || "General Note"}
                          </span>
                          <span className="shrink-0 text-[9px] text-[#9AA3AD]">
                            {note.date || note.lastEdited || ""}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#DDD5CC] px-3 py-5 text-center">
                    <p className="text-[11px] font-medium text-[#526274]">
                      No notes found
                    </p>
                    <p className="mt-1 text-[10px] text-[#9AA3AD]">
                      Try another title, course, or keyword.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="mb-3 text-[10px] font-medium uppercase tracking-wide text-[#7C8996]">
                  Notebooks
                </h2>
                <div className="space-y-1">
                  {notebooks.map((notebook) => (
                    <div
                      key={notebook.id}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-sm"
                          style={{ backgroundColor: notebook.color }}
                        />
                        <span className="truncate text-[11px] font-medium text-[#526274]">
                          {notebook.code} — {notebook.name}
                        </span>
                      </div>
                      <span className="ml-2 text-[9px] text-[#9AA3AD]">
                        {notebook.count}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg px-2.5 py-2">
                    <span className="text-[11px] font-medium text-[#526274]">
                      General Notes
                    </span>
                    <span className="text-[9px] text-[#9AA3AD]">
                      {notes.filter((note) => !note.courseCode).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Area */}
          <section className="min-w-0">
            {!selectedNote ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[10px] font-medium uppercase tracking-wide text-[#81909D]">
                    Recently Viewed Notes
                  </h2>

                  <span className="text-[9px] text-[#9AA3AD]">
                    {notes.length} notes
                  </span>
                </div>

                {loading ? (
                  <div className="rounded-2xl border border-[#E8E3DD] bg-white px-6 py-16 text-center">
                    <p className="text-xs text-[#697586]">Loading notes...</p>
                  </div>
                ) : error ? (
                  <div className="rounded-2xl border border-red-100 bg-white px-6 py-10 text-center">
                    <p className="text-sm font-medium text-red-600">
                      Failed to load notes
                    </p>

                    <p className="mt-2 text-xs text-[#697586]">{error}</p>

                    <button
                      type="button"
                      onClick={fetchNotes}
                      className="mt-4 rounded-lg bg-[#26364A] px-4 py-2 text-xs text-white"
                    >
                      Try Again
                    </button>
                  </div>
                ) : notes.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => (
                      <NoteCard
                        key={getNoteId(note)}
                        note={{
                          ...note,
                          courseCode: note.courseCode || "General",
                          notebookColor: note.notebookColor || "#6F91B5",
                        }}
                        onClick={() => handleOpenNote(note)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#DDD5CC] bg-white px-6 py-16 text-center">
                    <p className="text-sm font-medium text-[#526274]">
                      No notes found
                    </p>

                    <p className="mt-1 text-xs text-[#9AA3AD]">
                      Create your first note to get started.
                    </p>

                    {
                      <button
                        type="button"
                        onClick={handleAddNote}
                        className="mt-4 rounded-lg bg-[#26364A] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#1E2B3B]"
                      >
                        Add New Note
                      </button>
                    }
                  </div>
                )}
              </>
            ) : (
              <article className="rounded-2xl border border-[#E8E3DD] bg-white p-5 shadow-sm sm:p-7">
                {/* Note Header */}
                <div className="mb-5 flex items-center justify-between border-b border-[#EEE9E3] pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleEditNote}
                      title="Edit note"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
                    >
                      <EditIcon />
                    </button>

                    <button
                      type="button"
                      onClick={handleDeleteNote}
                      title="Delete note"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#A96B6B] transition hover:border-[#D8BABA] hover:bg-[#F8EEEE]"
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseNote}
                    title="Close note"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Note Meta */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-2 py-1 text-[9px] font-medium"
                    style={{
                      backgroundColor: `${selectedNote.notebookColor || "#6F91B5"}20`,
                      color: selectedNote.notebookColor || "#6F91B5",
                    }}
                  >
                    {selectedNote.courseCode || "General Note"}
                  </span>

                  {selectedNote.courseName && (
                    <span className="text-[9px] text-[#697586]">
                      {selectedNote.courseName}
                    </span>
                  )}

                  <span className="text-[9px] text-[#9AA3AD]">
                    Last edited:{" "}
                    {selectedNote.lastEdited || selectedNote.date || "—"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl font-semibold leading-tight text-[#26364A] sm:text-3xl">
                  {selectedNote.title}
                </h1>

                {/* Description */}
                <p className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-[#697586] sm:text-sm">
                  {selectedNote.description}
                </p>

                {/* Sections */}
                <div className="mt-5 space-y-5">
                  {(Array.isArray(selectedNote.sections)
                    ? selectedNote.sections
                    : []
                  ).map((section, index) => (
                    <div key={index}>
                      {section.title && (
                        <h2 className="mb-2 text-sm font-semibold text-[#526274]">
                          {section.title}
                        </h2>
                      )}

                      <ul className="space-y-1.5">
                        {(Array.isArray(section.points)
                          ? section.points
                          : []
                        ).map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="text-xs leading-relaxed text-[#697586]"
                          >
                            • {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Code */}
                {selectedNote.code && (
                  <pre className="mt-6 overflow-x-auto rounded-lg border border-[#E8E3DD] bg-[#FAF8F5] p-4 text-[10px] leading-relaxed text-[#526274]">
                    <code>{selectedNote.code}</code>
                  </pre>
                )}
              </article>
            )}
          </section>
        </div>
      </main>

      {/* Add / Edit Modal */}
      <NoteModal
        isOpen={showModal}
        note={editingNote}
        onClose={handleCloseModal}
      />
    </div>
  );
}
