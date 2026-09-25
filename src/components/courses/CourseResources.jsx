import { useOutletContext } from "react-router-dom";

export default function CourseResources() {
  const { course } = useOutletContext();

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            Syllabus & Resources
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Course materials and useful resources
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white"
        >
          + Add Resource
        </button>
      </div>

      <div className="space-y-3">
        {course.resources.map((resource) => (
          <div
            key={resource.id}
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-[#e7e3de]
              bg-white
              p-4
              transition
              hover:bg-[#fdfcf9]
            "
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1f4f6] text-[#7094b8]">
                📄
              </div>

              <div>
                <h3 className="text-[10px] font-semibold text-[#3d4a55]">
                  {resource.title}
                </h3>

                <p className="mt-1 text-[8px] text-[#89949d]">
                  {resource.type} • {resource.size}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-[9px] text-[#596773] hover:bg-[#f5f4f1]"
              >
                Edit
              </button>

              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-[9px] text-[#a06464] hover:bg-[#fff5f5]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
