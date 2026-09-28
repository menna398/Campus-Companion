import { useMemo, useState } from "react";
import NoteCard from "../../components/ui/NoteCard";
import { notes as notesData, notebooks } from "../../data/notesData";

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

export default function Notes() {
  const [allNotes, setAllNotes] = useState(notesData);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return allNotes;
    }

    return allNotes.filter((note) => {
      const searchableContent = [
        note.title,
        note.description,
        note.courseCode,
        note.courseName,
        note.lastEdited,
        note.code,
        ...note.sections.flatMap((section) => [
          section.title,
          ...section.points,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(query);
    });
  }, [allNotes, search]);

  const handleAddNote = () => {
    console.log("Add new note");
  };

  const handleEditNote = () => {
    if (!selectedNote) return;

    console.log("Edit note:", selectedNote);
  };

  const handleDeleteNote = () => {
    if (!selectedNote) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    setAllNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== selectedNote.id),
    );

    setSelectedNote(null);
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

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

          {/* Add New Note */}
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
              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full rounded-lg border border-[#E8E3DD] bg-[#FAF9F7] py-2.5 pl-9 pr-3 text-xs text-[#26364A] outline-none transition placeholder:text-[#A0A8B0] focus:border-[#C9BBAA]"
              />
            </div>

            {/* Search hint */}
            <p className="mt-2 text-[9px] leading-relaxed text-[#9AA3AD]">
              Search by title, course, or anything inside a note.
            </p>

            {/* Notebooks */}
            <div className="mt-6">
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-wide text-[#7C8996]">
                Notebooks
              </h2>

              <div className="space-y-1">
                {notebooks.map((notebook) => (
                  <button
                    key={notebook.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition hover:bg-[#FAF8F5]"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: notebook.color,
                        }}
                      />

                      <span className="truncate text-[11px] font-medium text-[#526274]">
                        {notebook.code} — {notebook.name}
                      </span>
                    </div>

                    <span className="ml-2 text-[9px] text-[#9AA3AD]">
                      {notebook.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <section className="min-w-0">
            {!selectedNote ? (
              /* =========================
                 NOTES GRID
              ========================= */
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[10px] font-medium uppercase tracking-wide text-[#81909D]">
                    Recently Viewed Notes
                  </h2>

                  <span className="text-[9px] text-[#9AA3AD]">
                    {filteredNotes.length} notes
                  </span>
                </div>

                {filteredNotes.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
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
                      Try searching with another title or keyword.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* =========================
                 OPEN NOTE
              ========================= */
              <article className="rounded-2xl border border-[#E8E3DD] bg-white p-5 shadow-sm sm:p-7">
                {/* Note Header */}
                <div className="mb-5 flex items-center justify-between border-b border-[#EEE9E3] pb-4">
                  <div className="flex items-center gap-2">
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={handleEditNote}
                      title="Edit note"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#526274] transition hover:border-[#C9BBAA] hover:bg-[#F3EEE8]"
                    >
                      <EditIcon />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={handleDeleteNote}
                      title="Delete note"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED6] bg-[#FAF8F5] text-[#A96B6B] transition hover:border-[#D8BABA] hover:bg-[#F8EEEE]"
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  {/* Close */}
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
                  <span className="rounded bg-[#EEF4F8] px-2 py-1 text-[9px] font-medium text-[#6F91B5]">
                    {selectedNote.courseCode}
                  </span>

                  <span className="text-[9px] text-[#9AA3AD]">
                    Last edited: {selectedNote.lastEdited}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl font-semibold leading-tight text-[#26364A] sm:text-3xl">
                  {selectedNote.title}
                </h1>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-[#697586] sm:text-sm">
                  {selectedNote.description}
                </p>

                {/* Sections */}
                <div className="mt-5 space-y-5">
                  {selectedNote.sections.map((section, index) => (
                    <div key={index}>
                      <h2 className="mb-2 text-sm font-semibold text-[#526274]">
                        {section.title}
                      </h2>

                      <ul className="space-y-1.5">
                        {section.points.map((point, pointIndex) => (
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
    </div>
  );
}
