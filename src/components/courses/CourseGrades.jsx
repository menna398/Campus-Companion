import { useOutletContext } from "react-router-dom";

export default function CourseGrades() {
  const { course } = useOutletContext();

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            Grades
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Academic performance for {course.code}
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white"
        >
          + Add Grade
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e7e3de] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-[#eeeae5] bg-[#fcfbf9]">
              <tr>
                <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                  Assessment
                </th>

                <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                  Score
                </th>

                <th className="px-5 py-4 text-left text-[9px] font-semibold text-[#687681]">
                  Weight
                </th>

                <th className="px-5 py-4 text-right text-[9px] font-semibold text-[#687681]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {course.grades.map((grade) => (
                <tr
                  key={grade.id}
                  className="border-b border-[#f0ede9] last:border-0"
                >
                  <td className="px-5 py-4">
                    <p className="text-[10px] font-semibold text-[#3d4a55]">
                      {grade.name}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[10px] text-[#596773]">
                      {grade.score}/{grade.total}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[10px] text-[#596773]">
                      {grade.weight}%
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
