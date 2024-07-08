import { useState } from "react";
import KanbanColumn from "./kanban-column";
import { Kanban, Task } from "../../utilities/types";
import DetailedTaskView from "./kanban-task-detail";
import { kanbanColumns } from "../../utilities/kanban-category-mapping";

export default function KanbanDisplay({ kanban }: { kanban: Kanban }) {
  const [selectedTask, setSelectedTask] = useState(null as Task | null);

  const setActiveTaskMethod = (task: Task) => () => {
    setSelectedTask(task);
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{kanban.name}</h1>
        <div className="space-x-4">
          <span>START DATE: {kanban.startDate}</span>
          <span>TODAY'S DATE: {}</span>
          <span>DUE DATE: {kanban.dueDate}</span>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        {kanbanColumns.map((column) => (
          <KanbanColumn
            key={column.taskCategoryId}
            title={column.title}
            taskCategoryId={`${column.taskCategoryId}`}
            kanbanId={kanban.id.toString()}
            setActiveTaskMethod={setActiveTaskMethod}
          />
        ))}
      </div>
      {selectedTask && (
        <DetailedTaskView task={selectedTask} onClose={handleTaskClose} />
      )}
    </div>
  );
}
