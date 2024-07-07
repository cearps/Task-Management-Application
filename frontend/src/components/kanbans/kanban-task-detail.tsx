import { Task, User } from "./types";
import { useEffect, useRef, useState } from "react";
import urgencyToColour from "../../utilities/urgency-colour-mapping";
import { getTaskStatus } from "../../utilities/kanban-category-mapping";
import TaskAPI from "../../api/taskAPI";

const DetailedTaskView = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [assignedUsers, setAssignedUsers] = useState([] as User[]);

  useEffect(() => {
    TaskAPI.getTaskAssigneesObservable(`${task.id}`).subscribe((response) => {
      console.log(response.data);
      setAssignedUsers(response.data);
    });
  }, []);

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={cardRef}
        className="bg-[#2e223b] text-white rounded-lg p-6 shadow-md w-3/4 text-left"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{task.name}</h2>
          <button className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Urgency:</span>
          <span
            className={`w-3 h-3 inline-block mx-2 rounded-full ${urgencyToColour(
              task.urgency
            )}`}
          ></span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Due date:</span>
          <span className="ml-2">{task.dueDate}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Description:</span>
          <p>{task.description}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Assigned to:</span>{" "}
          <p>
            {assignedUsers.map((user) => (
              <span key={user.id} className="mx-2">
                {user.username}
              </span>
            ))}
          </p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Status:</span>{" "}
          <p>{getTaskStatus(task.taskCategoryId)}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Comments:</span>
          {/* <p>{task.comments}</p> */}
        </div>
        <textarea
          placeholder="Leave a comment..."
          className="w-full p-2 rounded"
        ></textarea>
        <button className="mt-2 bg-orange-500 text-white p-2 rounded">
          Comment
        </button>
      </div>
    </div>
  );
};

export default DetailedTaskView;
