import { useEffect, useState } from "react";
import KanbanCard from "./kanban-task-card";
import { KanbanBoard, KanbanTask, UserInfo } from "../../utilities/types";

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
  const [tasks, setTasks] = useState([] as KanbanTask[]);

  useEffect(() => {
    const tasks = kanban.tasks.filter(
      (task) => task.taskCategory === parseInt(taskCategoryId)
    );
    // sort tasks by due date
    tasks.sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setTasks(tasks);
  }, [kanban.tasks, taskCategoryId]);

  return (
    <div className="bg-yellow-400 rounded-lg p-2 shadow-md">
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
        {tasks.map((task, index: number) => (
          <KanbanCard
            key={task.id} // Add key prop with task id
            task={task}
            setActiveTaskMethod={setActiveTaskMethod}
            currentUser={currentUser}
            position={index} // Add position prop with the index
          />
        ))}
      </div>
    </div>
  );
}
