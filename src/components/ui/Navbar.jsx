import { NavLink, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Courses", path: "/courses" },
  { name: "Assignments", path: "/assignments" },
  { name: "Exams", path: "/exams" },
  { name: "Schedule", path: "/schedule" },
  { name: "Notes", path: "/notes" },
  { name: "Events", path: "/events" },
];

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const fullName = user?.fullName || "Student";

  const firstLetter = fullName.trim().charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#eee8df] bg-[#fffdf9]">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-7">
        {/* Logo */}
        <NavLink
          to="/dashboard"
          className="flex min-w-[210px] items-center gap-2.5 no-underline"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#7395b8] text-white">
            <BookOpen size={16} strokeWidth={2} />
          </div>

          <span className="font-serif text-[17px] font-semibold text-[#263238]">
            Campus Companion
          </span>
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-[9px] px-3 py-2 text-[13px] font-medium no-underline transition-all duration-200
                ${
                  isActive
                    ? "bg-[#f8e3d4] font-semibold text-[#c86d3d]"
                    : "text-[#53606b] hover:bg-[#faf0e8] hover:text-[#d77b4d] hover:-translate-y-[1px]"
                }`
              }
            >
              {item.name}

              {/* Active underline */}
              <span
                className={`
                  absolute -bottom-[7px] left-1/2 h-[2px] w-[18px]
                  -translate-x-1/2 rounded-full bg-[#d77b4d]
                  transition-opacity duration-200
                  ${
                    location.pathname === item.path
                      ? "opacity-100"
                      : "opacity-0"
                  }
                `}
              />
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex min-w-[210px] items-center justify-end gap-2">
          {/* Profile */}
          <NavLink
            to="/profile"
            className="ml-1 flex items-center gap-2 rounded-[10px] p-[5px] no-underline transition-colors duration-200 hover:bg-[#faf0e8]"
          >
            {/* User Initial */}
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#7395b8] text-[13px] font-semibold text-white">
              {firstLetter}
            </div>

            {/* User Information */}
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] font-semibold text-[#30383e]">
                {fullName}
              </span>

              <span className="text-[10px] text-[#8a9298]">
                {user?.studentId || "Student"}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
