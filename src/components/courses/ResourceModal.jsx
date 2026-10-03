import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  type: "",
  size: "",
  url: "",
};

export default function ResourceModal({
  isOpen,
  onClose,
  onSave,
  resource,
  saving,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title || "",
        type: resource.type || "",
        size: resource.size || "",
        url: resource.url || "",
      });
    } else {
      setFormData(initialForm);
    }

    setUrlError("");
  }, [resource, isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "url") {
      setUrlError("");
    }
  };

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;
    if (!formData.type.trim()) return;
    if (!formData.size.trim()) return;

    if (!formData.url.trim()) {
      setUrlError("Resource URL is required.");
      return;
    }

    if (!isValidUrl(formData.url.trim())) {
      setUrlError(
        "Please enter a valid URL starting with http:// or https://.",
      );
      return;
    }

    await onSave({
      title: formData.title.trim(),
      type: formData.type.trim(),
      size: formData.size.trim(),
      url: formData.url.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e7e3de] bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="font-serif text-xl font-bold text-[#273545]">
            {resource ? "Edit Resource" : "Add Resource"}
          </h2>

          <p className="mt-1 text-[10px] text-[#89949d]">
            {resource
              ? "Update the resource information."
              : "Add a new course resource."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Resource Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Course Lecture 1"
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none transition placeholder:text-[#a7afb5] focus:border-[#7094b8] focus:bg-white"
            />
          </div>

          {/* Type */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Resource Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none transition focus:border-[#7094b8] focus:bg-white"
            >
              <option value="">Select type</option>
              <option value="PDF">PDF</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="Presentation">Presentation</option>
              <option value="Video">Video</option>
              <option value="Link">Link</option>
              <option value="Document">Document</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Size */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Size
            </label>

            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g. 2.4 MB"
              disabled={saving}
              className="w-full rounded-lg border border-[#e1ddd7] bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none transition placeholder:text-[#a7afb5] focus:border-[#7094b8] focus:bg-white"
            />
          </div>

          {/* URL */}

          <div>
            <label className="mb-1.5 block text-[9px] font-semibold text-[#596773]">
              Resource URL
            </label>

            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com/resource"
              disabled={saving}
              className={`w-full rounded-lg border bg-[#faf9f7] px-3 py-2.5 text-[10px] text-[#3d4a55] outline-none transition placeholder:text-[#a7afb5] focus:bg-white ${
                urlError
                  ? "border-[#c98b8b] focus:border-[#c98b8b]"
                  : "border-[#e1ddd7] focus:border-[#7094b8]"
              }`}
            />

            {urlError ? (
              <p className="mt-1.5 text-[8px] text-[#a06464]">{urlError}</p>
            ) : (
              <p className="mt-1.5 text-[8px] text-[#89949d]">
                Add the link where students can access this resource.
              </p>
            )}
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-[#e1ddd7] px-4 py-2 text-[10px] font-semibold text-[#596773] transition hover:bg-[#f5f4f1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                !formData.title.trim() ||
                !formData.type.trim() ||
                !formData.size.trim() ||
                !formData.url.trim()
              }
              className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#6285a8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : resource
                  ? "Save Changes"
                  : "Add Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
