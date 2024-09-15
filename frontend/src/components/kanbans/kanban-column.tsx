import { useEffect, useState } from "react";
import KanbanCard from "./kanban-task-card";
import { KanbanBoard, KanbanTask } from "../../utilities/types";
import { Droppable } from "react-beautiful-dnd";

const kanbanColumns = [
  { title: "To Do", taskCategoryId: "1" },
  { title: "In Progress", taskCategoryId: "2" },
  { title: "Done", taskCategoryId: "3" },
];

export default function KanbanColumn({
  title,
  taskCategoryId,
  kanban,
  setActiveTaskMethod,
}: {
  title: string;
  taskCategoryId: string;
  kanban: KanbanBoard;
  setActiveTaskMethod: (task: KanbanTask) => () => void;
}) {
  const [tasks, setTasks] = useState([] as KanbanTask[]);

  useEffect(() => {
    const tasks = kanban.tasks.filter(
      (task) => task.taskCategory === parseInt(taskCategoryId)
    );
    setTasks(tasks);
  }, [kanban.tasks, taskCategoryId]);

  return (
    <Droppable droppableId={taskCategoryId}>
      {(provided) => (
        <div
          className="bg-yellow-400 rounded-lg p-2"
          {...provided.innerRef}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                setActiveTaskMethod={setActiveTaskMethod}
              />
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
}
