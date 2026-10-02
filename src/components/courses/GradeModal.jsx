import { useEffect, useState } from "react";

export default function GradeModal({ isOpen, onClose, onSave, grade, saving }) {
  const [formData, setFormData] = useState({
    name: "",
    score: "",
    total: "",
    weight: "",
  });

  useEffect(() => {
    if (grade) {
      setFormData({
        name: grade.name || "",
        score: grade.score ?? "",
        total: grade.total ?? "",
        weight: grade.weight ?? "",
      });
    } else {
      setFormData({
        name: "",
        score: "",
        total: "",
        weight: "",
      });
    }
  }, [grade, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const score = Number(formData.score);
    const total = Number(formData.total);
    const weight = Number(formData.weight);

    if (!formData.name.trim()) {
      return;
    }

    if (score < 0 || total <= 0 || weight < 0) {
      return;
    }

    if (score > total) {
      return;
    }

    onSave({
      ...(grade ? { id: grade.id } : {}),
      name: formData.name.trim(),
      score,
      total,
      weight,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e7e3de] bg-white p-6 shadow-xl">
        {/* Header */}

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#273545]">
              {grade ? "Edit Grade" : "Add Grade"}
            </h2>

            <p className="mt-1 text-[10px] text-[#89949d]">
              {grade
                ? "Update the assessment information."
                : "Add a new assessment to this course."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md px-2 py-1 text-lg text-[#89949d] hover:bg-[#f4f3f0]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Assessment Name */}

          <div>
            <label className="mb-1 block text-[9px] font-medium text-[#687681]">
              Assessment
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Quiz 1"
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#7094b8]"
            />
          </div>

          {/* Score / Total */}

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Score
              </label>

              <input
                type="number"
                name="score"
                min="0"
                value={formData.score}
                onChange={handleChange}
                placeholder="18"
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#7094b8]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[9px] font-medium text-[#687681]">
                Total
              </label>

              <input
                type="number"
                name="total"
                min="1"
                value={formData.total}
                onChange={handleChange}
                placeholder="20"
                className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#7094b8]"
              />
            </div>
          </div>

          {/* Weight */}

          <div className="mt-4">
            <label className="mb-1 block text-[9px] font-medium text-[#687681]">
              Weight (%)
            </label>

            <input
              type="number"
              name="weight"
              min="0"
              max="100"
              value={formData.weight}
              onChange={handleChange}
              placeholder="10"
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2 text-xs text-[#273545] outline-none focus:border-[#7094b8]"
            />
          </div>

          {/* Actions */}

          <div className="mt-7 flex justify-end gap-3 border-t border-[#eeeae5] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-[10px] text-[#687681] hover:bg-[#f4f3f0]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#7094b8] px-5 py-2 text-[10px] font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : grade ? "Save Changes" : "Add Grade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
