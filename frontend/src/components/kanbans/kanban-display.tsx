import { useState } from "react";
import KanbanColumn from "./kanban-column";
import { Kanban, Task } from "./types";
import DetailedTaskView from "./kanban-task-detail";

export default function KanbanDisplay({ kanban }: { kanban: Kanban }) {
  const [selectedTask, setSelectedTask] = useState(null as Task | null);

  const columns = [
    { title: "Task Backlog", taskCategoryId: "1" },
    { title: "In Progress", taskCategoryId: "2" },
    { title: "In Review", taskCategoryId: "3" },
    { title: "Complete", taskCategoryId: "4" },
  ];

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
        {columns.map((column) => (
          <KanbanColumn
            key={column.taskCategoryId}
            title={column.title}
            taskCategoryId={column.taskCategoryId}
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
