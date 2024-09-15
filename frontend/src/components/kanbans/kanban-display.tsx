import { useState, useEffect } from "react";
import KanbanColumn from "./kanban-column";
import { KanbanBoard, KanbanTask } from "../../utilities/types";
import DetailedTaskView from "./kanban-task-detail";
import { kanbanColumns } from "../../utilities/kanban-category-mapping";
import { DragDropContext } from "react-beautiful-dnd";
import TaskAPI from "../../api/taskAPI";

export default function KanbanDisplay({
  kanban,
  setKanban,
}: {
  kanban: KanbanBoard;
  setKanban: (kanban: KanbanBoard) => void;
}) {
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date(kanban.startDate);
    const dueDate = new Date(kanban.dueDate);
    const currentDate = new Date();

    const totalDuration = dueDate.getTime() - startDate.getTime();
    const timeElapsed = currentDate.getTime() - startDate.getTime();
    const calculatedProgress = Math.min(
      100,
      Math.max(0, (timeElapsed / totalDuration) * 100)
    );

    setProgress(calculatedProgress);
  }, [kanban.startDate, kanban.dueDate]);

  const setActiveTaskMethod = (task: KanbanTask) => () => {
    setSelectedTask(task);
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = [...kanban.tasks];

    const task = newTasks.find((task) => task.id === parseInt(draggableId));
    if (!task) {
      return;
    }

    task.taskCategory = parseInt(destination.droppableId);

    // Update the task in the database
    TaskAPI.updateTaskObservable(task, kanban.id).subscribe({
      next: (response) => {
        if (response === null) {
          return;
        }
        console.log("Task updated successfully");
        // Update the state
        setKanban({
          ...kanban,
          tasks: newTasks,
        });
      },
      error: (error) => {
        console.error("Error updating task:", error);
      },
    });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <header className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-4xl font-bold">{kanban.name}</h1>
        <div className="flex justify-between w-full space-x-4 mt-4">
          <span>START DATE: {kanban.startDate}</span>
          <span>TODAY'S DATE: {new Date().toISOString().split("T")[0]}</span>
          <span>DUE DATE: {kanban.dueDate}</span>
        </div>
        <ProgressBar progress={progress} />
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {kanbanColumns.map((column) => (
            <KanbanColumn
              key={column.taskCategoryId}
              title={column.title}
              taskCategoryId={`${column.taskCategoryId}`}
              kanban={kanban}
              setActiveTaskMethod={setActiveTaskMethod}
            />
          ))}
        </div>
      </DragDropContext>
      {selectedTask && (
        <DetailedTaskView task={selectedTask} onClose={handleTaskClose} />
      )}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      style={{
        background: "#ddd",
        borderRadius: "4px",
        width: "100%",
        height: "10px",
        marginTop: "5px",
      }}
    >
      <div
        style={{
          background: progress > 80 ? "red" : "green",
          width: `${progress}%`,
          height: "100%",
          borderRadius: "10px",
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
