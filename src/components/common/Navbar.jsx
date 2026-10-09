import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fullName = user?.fullName || "Student";

  const firstLetter = fullName.trim().charAt(0).toUpperCase();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#eee8df] bg-[#fffdf9]">
      <div className="mx-auto flex min-h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-7">
        {/* Logo */}
        <NavLink
          to="/dashboard"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5 no-underline"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#7395b8] text-white">
            <BookOpen size={16} strokeWidth={2} />
          </div>

          <span className="font-serif text-[17px] font-semibold text-[#263238] sm:text-[18px]">
            Campus Companion
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-[9px] px-2.5 py-2 text-[12px] font-medium no-underline transition-all duration-200 xl:px-3 xl:text-[13px]
                ${
                  isActive
                    ? "bg-[#f8e3d4] font-semibold text-[#c86d3d]"
                    : "text-[#53606b] hover:-translate-y-[1px] hover:bg-[#faf0e8] hover:text-[#d77b4d]"
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
        <div className="flex shrink-0 items-center gap-2">
          {/* Profile */}
          <NavLink
            to="/profile"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-[10px] p-[5px] no-underline transition-colors duration-200 hover:bg-[#faf0e8]"
          >
            {/* User Initial */}
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#7395b8] text-[13px] font-semibold text-white">
              {firstLetter}
            </div>

            {/* User Information */}
            <div className="hidden flex-col gap-[2px] sm:flex">
              <span className="max-w-[130px] truncate text-[12px] font-semibold text-[#30383e]">
                {fullName}
              </span>

              <span className="text-[10px] text-[#8a9298]">
                {user?.studentId || "Student"}
              </span>
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-[9px] text-[#53606b] transition-colors hover:bg-[#faf0e8] hover:text-[#d77b4d] lg:hidden"
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={1.8} />
            ) : (
              <Menu size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          overflow-hidden border-t border-[#eee8df] bg-[#fffdf9] transition-all duration-300 lg:hidden
          ${
            isMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }
        `}
      >
        <div className="px-4 pb-4 pt-3 sm:px-6">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-[10px] px-3 py-2.5 text-center text-[13px] font-medium no-underline transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#f8e3d4] font-semibold text-[#c86d3d]"
                      : "text-[#53606b] hover:bg-[#faf0e8] hover:text-[#d77b4d]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
