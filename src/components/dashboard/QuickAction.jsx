import { FilePlus2, ClipboardPlus, CalendarDays, MapPin } from "lucide-react";

const icons = {
  note: FilePlus2,
  task: ClipboardPlus,
  schedule: CalendarDays,
  room: MapPin,
};

const colors = {
  purple: "bg-[#eee8f5] text-[#75658b]",
  peach: "bg-[#f8e8dc] text-[#c27b54]",
  blue: "bg-[#e4edf5] text-[#6385a5]",
  sage: "bg-[#e5eee4] text-[#708b70]",
};

export default function QuickAction({ icon, label, color }) {
  const Icon = icons[icon];

  return (
    <button
      type="button"
      className="group flex items-center gap-2 rounded-lg border border-[#eee9e2] bg-white px-3 py-2 text-[11px] font-medium text-[#39444c] shadow-[0_2px_8px_rgba(40,35,30,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e6d9ce] hover:shadow-[0_5px_15px_rgba(40,35,30,0.07)]"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded ${colors[color]}`}
      >
        <Icon size={11} strokeWidth={2} />
      </span>

      {label}
    </button>
  );
}
