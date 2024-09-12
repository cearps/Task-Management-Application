import { useState, useEffect } from "react";
import KanbanColumn from "./kanban-column";
import { KanbanBoard, KanbanTask } from "../../utilities/types";
import DetailedTaskView from "./kanban-task-detail";
import AddTaskForm from "../forms/add-task-form";
import TaskAPI from "../../api/taskAPI";
import { kanbanColumns } from "../../utilities/kanban-category-mapping";

export default function KanbanDisplay({ kanban }: { kanban: KanbanBoard }) {
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [progress, setProgress] = useState(0);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<KanbanTask[]>(kanban.tasks); // Maintain local state for tasks

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

  // Define handleAddTask to send task data to the backend and update the task list
  const handleAddTask = async (taskData: {
    name: string;
    description: string;
    dueDate: string;
    urgency: number;
    boardId: number;
  }) => {
    try {
      // Log the task data being sent
      console.log("Task data being sent to backend:", taskData);
  
      //Call the API to create the task
      const newTask = await TaskAPI.createTask(taskData.boardId.toString(), {});

      //update the task with the proper details
      const updatedTask = await TaskAPI.updateTask(newTask.id, taskData);
  
      //Log the response from the backend
      console.log("Updated task response from backend:", updatedTask);
  
      // Update the task state with the new task
      setTasks((prevTasks) => [...prevTasks, updatedTask]);
  
      setIsTaskModalOpen(false); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
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

      {selectedTask && (
        <DetailedTaskView task={selectedTask} onClose={handleTaskClose} />
      )}


      <AddTaskForm
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleAddTask}
        boardId={kanban.id} 
      />
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
