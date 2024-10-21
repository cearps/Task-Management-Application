import { useEffect, useState } from "react";
import KanbanCard from "./kanban-task-card";
import { KanbanBoard, KanbanTask, UserInfo } from "../../utilities/types";

/**
 * KanbanColumn component represents a single column in a Kanban board.
 * It displays a list of tasks for a specific category.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the column
 * @param {string} props.taskCategoryId - The ID of the task category
 * @param {KanbanBoard} props.kanban - The entire Kanban board data
 * @param {Function} props.setActiveTaskMethod - Function to set the active task
 * @param {UserInfo | null} props.currentUser - The current user information
 * @param {any} props.provided - Provided props from react-beautiful-dnd
 * @param {any} props.snapshot - Snapshot from react-beautiful-dnd
 */
export default function KanbanColumn({
  title,
  taskCategoryId,
  kanban,
  setActiveTaskMethod,
  currentUser,
  provided,
  snapshot,
}: {
  title: string;
  taskCategoryId: string;
  kanban: KanbanBoard;
  setActiveTaskMethod: (task: KanbanTask) => () => void;
  currentUser: UserInfo | null;
  provided: any;
  snapshot: any;
}) {
  // State to hold the tasks for this column
  const [tasks, setTasks] = useState([] as KanbanTask[]);

  // Effect to filter and sort tasks when kanban.tasks or taskCategoryId changes
  useEffect(() => {
    const tasks = kanban.tasks.filter(
      (task) => task.taskCategory === parseInt(taskCategoryId)
    );
    // Sort tasks by due date
    tasks.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setTasks(tasks);
  }, [kanban.tasks, taskCategoryId]);

  // Render the column
  return (
    <div className="bg-yellow-400 rounded-lg p-2 shadow-md kanban-column">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div
        className="space-y-2 rounded-lg"
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{
          background: snapshot.isDraggingOver ? "lightyellow" : "",
          padding: 4,
          minHeight: 100,
          height: "80%",
        }}
      >
        {provided.placeholder}
        {tasks
          .filter(
            (task) =>
              task.name !== undefined && task.name !== "" && task.name !== null
          )
          .map((task, index: number) => (
            // Render each task as a KanbanCard component
            <KanbanCard
              key={task.id} // Unique key for each task
              task={task}
              setActiveTaskMethod={setActiveTaskMethod}
              currentUser={currentUser}
              position={index} // Position of the task in the list
            />
          ))}
      </div>
    </div>
  );
}
