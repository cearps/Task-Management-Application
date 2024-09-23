import { useState, useEffect, useRef } from "react";
import { KanbanBoard, KanbanTask } from "../../utilities/types";
import urgencyToColour from "../../utilities/urgency-colour-mapping";
import { getTaskStatus } from "../../utilities/kanban-category-mapping";
import TaskAPI from "../../api/taskAPI";
import KanbanTaskComment from "./kanban-task-comment";
import Select from "react-select";

const DetailedTaskView = ({
  task,
  board,
  onClose,
  addComment,
}: {
  task: KanbanTask;
  board: KanbanBoard;
  addComment: (comment: string, taskId: number) => void;
  onClose: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<KanbanTask>(task);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await TaskAPI.updateTask(board.id, task.id, updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const createComment = (comment: string) => {
    // Logic to create a comment using the provided value
    addComment(comment, task.id);
  };

  return (
    <div className="fixed inset-0 flex items-center rounded-lg justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={cardRef}
        className="bg-[#2e223b] text-white rounded-lg p-6 shadow-md w-3/4 text-left overflow-hidden"
        style={{ maxHeight: "95vh" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedTask.name}
                onChange={handleInputChange}
                className="p-2 rounded text-black w-full"
              />
            ) : (
              task.name
            )}
          </h2>
          <div className="flex space-x-4">
            {isEditing ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit Task
              </button>
            )}
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
        </div>

        <div
          className="custom-scrollbar overflow-y-auto pb-5 mb-10"
          style={{ maxHeight: "75vh" }}
        >
          <div className="mb-4">
            <span className="font-semibold">Urgency:</span>
            {isEditing ? (
              <select
                name="urgency"
                value={updatedTask.urgency}
                onChange={handleInputChange}
                className="p-2 rounded text-black"
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            ) : (
              <span
                className={`w-3 h-3 inline-block mx-2 rounded-full ${urgencyToColour(
                  task.urgency
                )}`}
              ></span>
            )}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Due date:</span>
            {isEditing ? (
              <input
                type="date"
                name="dueDate"
                value={updatedTask.dueDate}
                onChange={handleInputChange}
                className="p-2 rounded text-black"
              />
            ) : (
              <span className="ml-2">{task.dueDate}</span>
            )}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Description:</span>
            {isEditing ? (
              <textarea
                name="description"
                value={updatedTask.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-black"
              />
            ) : (
              <p>{task.description}</p>
            )}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Assigned to:</span>{" "}
            <p>
              {isEditing ? (
                <Select
                  isMulti
                  options={board.users.map((user) => ({
                    value: user.id,
                    label: user.userTag,
                  }))}
                  value={updatedTask.users.map((user) => ({
                    value: user.id,
                    label: user.userTag,
                  }))}
                  onChange={(selectedUsers) => {
                    setUpdatedTask((prevTask) => ({
                      ...prevTask,
                      users: selectedUsers.map((user) => ({
                        id: user.value,
                        userTag: user.label,
                      })),
                    }));
                  }}
                  className="focus:outline-none"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      color: "black",
                      borderColor: state.isFocused
                        ? "white"
                        : provided.borderColor, // Change border color on focus
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
              ) : (
                task.users &&
                task.users.map((user) => (
                  <span key={user.id} className="mr-2">
                    {user.userTag}
                  </span>
                ))
              )}
            </p>
          </div>

          <div className="mb-4">
            <span className="font-semibold">Status:</span>
            {isEditing ? (
              <select
                name="taskCategory"
                value={updatedTask.taskCategory}
                onChange={handleInputChange}
                className="p-2 rounded text-black"
              >
                <option value="1">Backlog</option>
                <option value="2">In Progress</option>
                <option value="3">In Review</option>
                <option value="4">Completed</option>
              </select>
            ) : (
              <p>{getTaskStatus(task.taskCategory)}</p>
            )}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Comments:</span>
            <div className="p-2">
              {task.comments.map((comment) => (
                <KanbanTaskComment key={comment.id} comment={comment} />
              ))}
              <textarea
                placeholder="Leave a comment..."
                name="comment"
                id="comment"
                className="w-full p-2 rounded text-black"
              ></textarea>
              <button
                className="mt-2 bg-orange-500 text-white p-2 rounded"
                onClick={() => {
                  const comment = document.getElementById(
                    "comment"
                  ) as HTMLTextAreaElement;
                  if (comment) {
                    createComment(comment.value);
                    comment.value = "";
                  }
                }}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedTaskView;
