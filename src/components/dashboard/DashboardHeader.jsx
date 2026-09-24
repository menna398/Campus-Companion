import { CalendarDays } from "lucide-react";
import QuickAction from "./QuickAction"

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[#7893ae]">
          Thursday, October 15, 2026
        </p>

        <h1 className="font-serif text-3xl font-semibold leading-tight text-[#263238] md:text-4xl">
          Good morning, Sarah
        </h1>

        <p className="mt-1 text-xs text-[#7c8790]">
          Academic Year 2026/2027
          <span className="mx-1.5 text-[#c9c2ba]">•</span>
          <span className="text-[#6f91b2]">Fall Semester</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <QuickAction icon="note" label="New Note" color="purple" />

        <QuickAction icon="task" label="Add Task" color="peach" />

        <QuickAction icon="schedule" label="View Schedule" color="blue" />

        <QuickAction icon="room" label="Find Room" color="sage" />
      </div>
    </div>
  );
}
