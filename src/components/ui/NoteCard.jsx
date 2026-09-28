export default function NoteCard({ note, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-[#E8E3DD] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#D6CCC0] hover:shadow-md"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className="text-[9px] font-medium"
          style={{ color: note.notebookColor }}
        >
          {note.courseCode}
        </span>

        <span className="text-[9px] text-[#9AA3AD]">{note.date}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold leading-snug text-[#26364A]">
        {note.title}
      </h3>

      {/* Preview */}
      <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-[#697586]">
        {note.description}
      </p>
    </button>
  );
}
