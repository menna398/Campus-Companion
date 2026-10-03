import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import ResourceModal from "../../components/courses/ResourceModal";
import useCourseStore from "../../store/courseStore";

export default function CourseResources() {
  const { course } = useOutletContext();

  const { updateCourse, updating } = useCourseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = course.resources || [];

  const handleAddResource = () => {
    setSelectedResource(null);
    setIsModalOpen(true);
  };

  const handleEditResource = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (updating) return;

    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const handleSaveResource = async (resourceData) => {
    let updatedResources;

    if (selectedResource) {
      updatedResources = resources.map((resource) =>
        resource.id === selectedResource.id
          ? {
              ...resource,
              ...resourceData,
            }
          : resource,
      );
    } else {
      const newId =
        resources.length > 0
          ? Math.max(...resources.map((resource) => Number(resource.id))) + 1
          : 1;

      updatedResources = [
        ...resources,
        {
          ...resourceData,
          id: newId,
        },
      ];
    }

    try {
      await updateCourse(course.id, {
        resources: updatedResources,
      });

      setIsModalOpen(false);
      setSelectedResource(null);

      await Swal.fire({
        icon: "success",
        title: selectedResource ? "Resource Updated" : "Resource Added",
        text: selectedResource
          ? "The resource has been updated successfully."
          : "The resource has been added successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save the resource.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  const handleDeleteResource = async (resource) => {
    const result = await Swal.fire({
      title: "Delete Resource?",
      text: `Are you sure you want to delete "${resource.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#a06464",
      cancelButtonColor: "#89949d",
    });

    if (!result.isConfirmed) return;

    const updatedResources = resources.filter(
      (item) => item.id !== resource.id,
    );

    try {
      await updateCourse(course.id, {
        resources: updatedResources,
      });

      await Swal.fire({
        icon: "success",
        title: "Resource Deleted",
        text: "The resource has been deleted successfully.",
        confirmButtonColor: "#7094b8",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete the resource.",
        confirmButtonColor: "#a06464",
      });
    }
  };

  const handleOpenResource = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
          onClick={handleAddResource}
          className="rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white transition hover:bg-[#6285a8]"
        >
          + Add Resource
        </button>
      </div>

      {resources.length > 0 ? (
        <div className="space-y-3">
          {resources.map((resource) => (
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
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f4f6] text-sm text-[#7094b8]">
                  📄
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-[10px] font-semibold text-[#3d4a55]">
                    {resource.title}
                  </h3>

                  <p className="mt-1 text-[8px] text-[#89949d]">
                    {resource.type}
                    {resource.size ? ` • ${resource.size}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                {resource.url && (
                  <button
                    type="button"
                    onClick={() => handleOpenResource(resource.url)}
                    className="rounded-md px-3 py-1.5 text-[9px] font-medium text-[#7094b8] transition hover:bg-[#f1f4f6]"
                  >
                    Open
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleEditResource(resource)}
                  className="rounded-md px-3 py-1.5 text-[9px] text-[#596773] transition hover:bg-[#f5f4f1]"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteResource(resource)}
                  className="rounded-md px-3 py-1.5 text-[9px] text-[#a06464] transition hover:bg-[#fff5f5]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e7e3de] bg-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f4f6] text-lg">
            📄
          </div>

          <h3 className="mt-3 font-serif text-base font-bold text-[#273545]">
            No Resources Yet
          </h3>

          <p className="mt-1 text-[10px] text-[#89949d]">
            Add course materials and useful resources here.
          </p>

          <button
            type="button"
            onClick={handleAddResource}
            className="mt-4 rounded-lg bg-[#7094b8] px-4 py-2 text-[10px] text-white transition hover:bg-[#6285a8]"
          >
            + Add Resource
          </button>
        </div>
      )}

      <ResourceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveResource}
        resource={selectedResource}
        saving={updating}
      />
    </div>
  );
}
