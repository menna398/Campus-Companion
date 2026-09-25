import { NavLink } from "react-router-dom";

export default function CourseTabs({ courseId }) {
  const tabs = [
    {
      name: "Overview",
      path: `/courses/${courseId}`,
      end: true,
    },
    {
      name: "Assignments",
      path: `/courses/${courseId}/assignments`,
    },
    {
      name: "Grades",
      path: `/courses/${courseId}/grades`,
    },
    {
      name: "Syllabus & Resources",
      path: `/courses/${courseId}/resources`,
    },
  ];

  return (
    <div className="mt-6 flex overflow-x-auto border-b border-[#e5e1dc]">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          end={tab.end}
          className={({ isActive }) =>
            `
              whitespace-nowrap
              border-b-2
              px-4
              pb-3
              text-[10px]
              font-medium
              transition-colors
              ${
                isActive
                  ? "border-[#7094b8] text-[#7094b8]"
                  : "border-transparent text-[#596773] hover:text-[#7094b8]"
              }
            `
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}
