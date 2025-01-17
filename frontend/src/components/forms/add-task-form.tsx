import { useEffect, useState, useRef } from "react";
import { KanbanBoard, UserInfo } from "../../utilities/types";
import Select from "react-select";

const AddTaskForm = ({
  onClose,
  onSubmit,
  board,
  errors,
}: {
  onClose: () => void;
  onSubmit: (taskData: any) => void;
  board: KanbanBoard;
  errors: string | null;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [urgency, setUrgency] = useState<number>(1);
  const [users, setUsers] = useState([] as UserInfo[]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the form values before submitting
    console.log("Submitting task form with values:", {
      name,
      description,
      dueDate,
      urgency,
    });
    const taskData = {
      name,
      description,
      dueDate,
      urgency,
      taskCategory: 1, // default to
      users: users,
      boardId: board.id,
    };
    onSubmit(taskData);
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        ref={cardRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Task</h2>
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
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="task-name"
            >
              Task Name
            </label>
            <input
              id="task-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="urgency"
            >
              Urgency
            </label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(Number(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={3}>Low</option>
              <option value={2}>Medium</option>
              <option value={1}>High</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="assignTo"
            >
              Assign to
            </label>
            <Select
              id="assignTo"
              isMulti
              options={board.users.map((user) => ({
                value: user.id,
                label: user.userTag,
              }))}
              onChange={(selected) =>
                setUsers(
                  selected.map((user) => ({
                    id: user.value,
                    userTag: user.label,
                  }))
                )
              }
              className="focus:outline-none"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  color: "black",
                  borderColor: state.isFocused ? "white" : provided.borderColor, // Change border color on focus
                  boxShadow: state.isFocused
                    ? "0 0 0 1px white"
                    : provided.boxShadow, // Optional: remove default blue shadow
                  "&:hover": {
                    borderColor: "white", // Ensure white border on hover as well
                  },
                }),
                option: (provided) => ({
                  ...provided,
                  color: "black",
                }),
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Add Task"
            >
              Add Task
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
