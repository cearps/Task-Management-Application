import { KanbanTask } from "../../utilities/types";
import { useEffect, useRef } from "react";
import urgencyToColour from "../../utilities/urgency-colour-mapping";
import { getTaskStatus } from "../../utilities/kanban-category-mapping";
// import TaskAPI from "../../api/taskAPI";
import KanbanTaskComment from "./kanban-task-comment";

const DetailedTaskView = ({
  task,
  onClose,
}: {
  task: KanbanTask;
  onClose: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // const [assignedUsers, setAssignedUsers] = useState([] as User[]);
  // const [comments, setComments] = useState([] as Comment[]);

  useEffect(() => {
    // const subscription = TaskAPI.getTaskAssigneesObservable(
    //   `${task.id}`
    // ).subscribe((response) => {
    //   console.log(response.data);
    //   setAssignedUsers(response.data);
    // });
    // return () => {
    //   subscription.unsubscribe();
    // };
  });

  useEffect(() => {
    // const subscription = TaskAPI.getTaskCommentsObservable(
    //   `${task.id}`
    // ).subscribe((response) => {
    //   console.log(response.data);
    //   setComments(response.data);
    // });
    // return () => {
    //   subscription.unsubscribe();
    // };
  });

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
    <div className="fixed inset-0 flex items-center rounded-lg justify-center bg-black bg-opacity-50">
      <div
        ref={cardRef}
        className="bg-[#2e223b] text-white rounded-lg p-6 shadow-md w-3/4 text-left overflow-hidden"
        style={{ maxHeight: "95vh" }}
      >
        {" "}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{task.name}</h2>
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
        <div
          className="custom-scrollbar overflow-y-auto pb-5 mb-10"
          style={{
            maxHeight: "75vh",
          }}
        >
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
              {/* {task.users.map((user) => (
                <span key={user.id} className="mx-2">
                  {user.userTag}
                </span>
              ))} */}
            </p>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Status:</span>{" "}
            <p>{getTaskStatus(task.taskCategory)}</p>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Comments:</span>
            <div className="p-2">
              {task.comments.map((comment) => (
                <KanbanTaskComment key={comment.id} comment={comment} />
              ))}
              <textarea
                placeholder="Leave a comment..."
                className="w-full p-2 rounded"
              ></textarea>
              <button className="mt-2 bg-orange-500 text-white p-2 rounded">
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
