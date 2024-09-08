import { useState, useEffect } from "react";
import Button from "../buttons/button"; 

const AddBoardForm = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, dueDate: string, description: string) => void;
  defaultValues?: { name: string; dueDate: string; description: string };
}) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [dueDate, setDueDate] = useState(defaultValues?.dueDate || "");
  const [description, setDescription] = useState(defaultValues?.description || "");

  useEffect(() => {
    setName(defaultValues?.name || "");
    setDueDate(defaultValues?.dueDate || "");
    setDescription(defaultValues?.description || "");
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, dueDate, description);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{defaultValues ? "Edit Board" : "Create New Board"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Board Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">{defaultValues ? "Update Board" : "Create Board"}</Button>
            <Button onClick={onClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-black">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoardForm;