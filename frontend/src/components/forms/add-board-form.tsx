import { useState, useEffect, useRef } from "react";
import Button from "../buttons/button";

const AddBoardForm = ({
  onClose,
  onSubmit,
  errors,
  defaultValues,
}: {
  onClose: () => void;
  onSubmit: (name: string, dueDate: string, description: string) => void;
  errors?: string;
  defaultValues?: { name: string; dueDate: string; description: string };
}) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [dueDate, setDueDate] = useState(defaultValues?.dueDate || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, dueDate, description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        ref={cardRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {defaultValues ? "Edit Board" : "Create New Board"}
          </h2>
          <button className="text-red-500" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Board Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter board name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              {defaultValues ? "Update Board" : "Create Board"}
            </Button>
            <Button
              onClick={onClose}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-black"
            >
              Cancel
            </Button>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddBoardForm;
