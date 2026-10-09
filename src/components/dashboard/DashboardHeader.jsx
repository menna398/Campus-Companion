import { useNavigate } from "react-router-dom";

import QuickAction from "./QuickAction";

export default function DashboardHeader({
  userName,
  greeting,
  dateLabel,
  academicYear,
  semesterName,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[#7893ae]">
          {dateLabel}
        </p>

        <h1 className="font-serif text-3xl font-semibold leading-tight text-[#263238] md:text-4xl">
          {greeting}
          {userName ? `, ${userName}` : ""}
        </h1>

        <p className="mt-1 text-xs text-[#7c8790]">
          Academic Year {academicYear}
          <span className="mx-1.5 text-[#c9c2ba]">•</span>
          <span className="text-[#6f91b2]">{semesterName}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <QuickAction
          icon="note"
          label="New Note"
          color="purple"
          onClick={() => navigate("/notes")}
        />

        <QuickAction
          icon="task"
          label="Add Task"
          color="peach"
          onClick={() => navigate("/assignments")}
        />

        <QuickAction
          icon="schedule"
          label="View Schedule"
          color="blue"
          onClick={() => navigate("/schedule")}
        />
      </div>
    </div>
  );
}
