import { useState, useEffect } from "react";
import KanbanColumn from "./kanban-column";
import { KanbanBoard, KanbanTask } from "../../utilities/types";
import DetailedTaskView from "./kanban-task-detail";
import AddTaskForm from "../forms/add-task-form";
import TaskAPI from "../../api/taskAPI";
import { kanbanColumns } from "../../utilities/kanban-category-mapping";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

export default function KanbanDisplay({
  kanban,
  setKanban,
}: {
  kanban: KanbanBoard;
  setKanban: (kanban: KanbanBoard) => void;
}) {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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
    setSelectedTask(task.id);
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  const handleAddTask = async (taskData: {
    name: string;
    description: string;
    dueDate: string;
    urgency: number;
    boardId: number;
  }) => {
    const taskPayload: Partial<KanbanTask> = {
      name: taskData.name,
      description: taskData.description,
      dueDate: taskData.dueDate,
      urgency: taskData.urgency,
      taskCategory: 1, // default to backlog
    };

    TaskAPI.createTaskObservable(taskData.boardId, taskPayload).subscribe({
      next: (task) => {
        console.log("Task created:", task);
        setIsTaskModalOpen(false);
      },
      error: (error) => {
        console.error("Error creating task:", error);
      },
    });
  };

  const addComment = (comment: string, taskId: number) => {
    TaskAPI.addCommentObservable(kanban.id, taskId, { comment }).subscribe({
      next: (comment) => {
        console.log("Comment added:", comment);
      },
      error: (error) => {
        console.error("Error adding comment:", error);
      },
    });
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const updatedTasks = [...kanban.tasks];

    const task = updatedTasks.find((task) => task.id === parseInt(draggableId));
    if (!task) {
      return;
    }

    task.taskCategory = parseInt(destination.droppableId);

    TaskAPI.updateTaskObservable(kanban.id, task).subscribe({
      next: (updatedTask) => {
        console.log("Task updated:", updatedTask);
        setKanban({ ...kanban, tasks: updatedTasks });
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

        <div className="mt-4 w-full flex justify-start">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsTaskModalOpen(true)}
          >
            Add Task
          </button>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {kanbanColumns.map((column) => (
            <Droppable droppableId={column.taskCategoryId.toString()}>
              {(provided: any, snapshot: any) => (
                <KanbanColumn
                  key={column.taskCategoryId}
                  title={column.title}
                  taskCategoryId={column.taskCategoryId.toString()} // Ensure the task category ID is passed as a string
                  kanban={kanban}
                  setActiveTaskMethod={setActiveTaskMethod}
                  provided={provided}
                  snapshot={snapshot}
                />
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      {selectedTask && (
        <DetailedTaskView
          task={kanban.tasks.find((task) => task.id === selectedTask)!}
          onClose={handleTaskClose}
          addComment={addComment}
          board={kanban}
        />
      )}

      {isTaskModalOpen && (
        <AddTaskForm
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleAddTask}
          boardId={kanban.id}
        />
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
