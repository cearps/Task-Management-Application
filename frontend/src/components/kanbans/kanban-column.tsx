import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import KanbanCard from "./kanban-task-card";
import { Task } from "./types";

export default function KanbanColumn({
  title,
  taskCategoryId,
  kanbanId,
  setActiveTaskMethod,
}: {
  title: string;
  taskCategoryId: string;
  kanbanId: string;
  setActiveTaskMethod: (task: Task) => () => void;
}) {
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    KanbanAPI.getKanbanBoardTasksObservable(kanbanId, taskCategoryId).subscribe(
      (response) => {
        console.log(response.data);
        setTasks(response.data);
      }
    );
  }, []);

  return (
    <div className="bg-yellow-400 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <KanbanCard
          key={task.id}
          task={task}
          setActiveTaskMethod={setActiveTaskMethod}
        />
      ))}
    </div>
  );
}
