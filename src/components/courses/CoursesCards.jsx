import { Link } from "react-router-dom";

export default function CoursesCards({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="
        group
        relative
        block
        overflow-hidden
        rounded-xl
        border
        border-[#e7e3de]
        bg-white
        p-4
        no-underline
        shadow-[0_2px_8px_rgba(0,0,0,0.03)]
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:scale-[1.015]
        hover:bg-[#fdfcf9]
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]
      "
    >
      <div
        className="absolute right-4 top-0 h-6 w-3 rounded-b-[3px]"
        style={{ backgroundColor: course.color }}
      />

      <span className="mb-1 block text-[9px] text-[#82909c]">
        {course.code}
      </span>

      <h3 className="mb-3 font-serif text-[15px] font-bold text-[#273545]">
        {course.title}
      </h3>

      <p className="mb-2 text-[9.5px] text-[#667583]">
        {course.professor} • {course.location}
      </p>

      <p className="mb-4 text-[9px] text-[#8a97a3]">{course.schedule}</p>

      <div className="mb-1.5 flex justify-between text-[8.5px] font-semibold">
        <span className="text-[#66727d]">Syllabus Progress</span>

        <span className="text-[#3c4650]">{course.progress}%</span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-[#f1f0ed]">
        <div
          className="h-full rounded-full bg-[#91ae91]"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-[8.5px] text-[#687681]">
        <span
          className="h-[5px] w-[5px] rounded-full"
          style={{ backgroundColor: course.color }}
        />
        Next: {course.nextClass}
      </p>
    </Link>
  );
}
