import KanbanColumn from "./kanban-column";
import { Kanban } from "./types";

export default function KanbanDisplay({ kanban }: { kanban: Kanban }) {
  const columns = [
    { title: "Task Backlog", taskCategoryId: "1" },
    { title: "In Progress", taskCategoryId: "2" },
    { title: "In Review", taskCategoryId: "3" },
    { title: "Complete", taskCategoryId: "4" },
  ];

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
          />
        ))}
      </div>
    </div>
  );
}
