import { useEffect, useState } from "react";
import KanbanCard from "./kanban-task-card";
import { KanbanBoard, KanbanTask } from "../../utilities/types";

export default function KanbanColumn({
  title,
  taskCategoryId,
  kanban,
  setActiveTaskMethod,
  provided,
  snapshot,
}: {
  title: string;
  taskCategoryId: string;
  kanban: KanbanBoard;
  setActiveTaskMethod: (task: KanbanTask) => () => void;
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
    <div className="bg-yellow-400 rounded-lg p-2">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div
        className="space-y-2 rounded-lg"
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{
          background: snapshot.isDraggingOver ? "lightyellow" : "",
          padding: 4,
          minHeight: 200,
        }}
      >
        {provided.placeholder}
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            setActiveTaskMethod={setActiveTaskMethod}
          />
        ))}
      </div>
    </div>
  );
}
