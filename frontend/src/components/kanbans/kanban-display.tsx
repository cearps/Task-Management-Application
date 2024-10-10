import { useState, useEffect } from "react";
import KanbanColumn from "./kanban-column";
import { KanbanBoard, KanbanTask, UserInfo } from "../../utilities/types";
import DetailedTaskView from "./kanban-task-detail";
import AddTaskForm from "../forms/add-task-form";
import TaskAPI from "../../api/taskAPI";
import { kanbanColumns } from "../../utilities/kanban-category-mapping";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import UserAPI from "../../api/userAPI";
import ConfirmationModal from "../forms/confirmation-form";
import NotificationPopup from "../forms/notification-popup"; 
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
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [addTaskError, setAddTaskError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; isVisible: boolean; type: "success" | "error" | "info" }>({
    message: "",
    isVisible: false,
    type: "info"
  });
  

  useEffect(() => {
    const subscription = UserAPI.getUserObservable().subscribe({
      next: (user) => {
        setCurrentUser(user);
      },
      error: (error) => {
        console.error("Error fetching current user:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  
  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ message, isVisible: true, type });
    setTimeout(() => setNotification({ message: "", isVisible: false, type }), 3000);
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      TaskAPI.deleteTask(kanban.id, taskToDelete)
        .then(() => {
          setKanban({
            ...kanban,
            tasks: kanban.tasks.filter((task) => task.id !== taskToDelete),
          });
          setSelectedTask(null);
          setIsConfirmModalOpen(false);
          showNotification("Task deleted successfully", "success");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          
        });
    }
  };

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
    users: UserInfo[];
  }) => {
    const taskPayload: Partial<KanbanTask> = {
      name: taskData.name,
      description: taskData.description,
      dueDate: taskData.dueDate,
      urgency: taskData.urgency,
      taskCategory: 1, // default to backlog
      users: taskData.users,
    };

    TaskAPI.createTaskObservable(taskData.boardId, taskPayload).subscribe({
      next: (task) => {
        console.log("Task created:", task);
        setIsTaskModalOpen(false);
        showNotification("Task created successfully", "success");
      },
      error: (error) => {
        setAddTaskError(error.error.response.data);
        TaskAPI.deleteTask(kanban.id, error.task.id);
        console.error("Error creating task:", error);
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
        showNotification("Task updated successfully", "success");
      },
      error: (error) => {
        console.error("Error updating task:", error);
      },
    });
  };


  return (

    <div style={{ padding: "0 20px" }}>
    {/* Notification Popup */}
    <NotificationPopup
      message={notification.message}
      isVisible={notification.isVisible}
      onClose={() => setNotification({ ...notification, isVisible: false })}
      type={notification.type || "info"}
    />
    
      <header className="flex flex-col items-start mb-6 w-full">
        <h1 className="text-4xl font-bold break-words sm:max-w-full max-w-64">
          {kanban.name}
        </h1>
        <div className="flex justify-between text-sm mb-2 w-full space-x-4 mt-4">
          <span className="font-semibold">
            START DATE:{" "}
            <span style={{ whiteSpace: "nowrap" }}>{kanban.startDate}</span>
          </span>
          <span className="font-semibold">
            TODAY'S DATE:{" "}
            <span style={{ whiteSpace: "nowrap" }}>
              {new Date().toISOString().split("T")[0]}
            </span>
          </span>
          <span className="font-semibold">
            DUE DATE:{" "}
            <span style={{ whiteSpace: "nowrap" }}>{kanban.dueDate}</span>
          </span>
        </div>
        <ProgressBar progress={progress} />
        

        <div className="mt-4 w-full flex justify-start">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            onClick={() => setIsTaskModalOpen(true)}
          >
            Add Task
          </button>
        </div>
      </header>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-4 gap-4 min-w-256 mb-5">
          <DragDropContext onDragEnd={onDragEnd}>
            {kanbanColumns.map((column) => (
              <Droppable droppableId={column.taskCategoryId.toString()}>
                {(provided: any, snapshot: any) => (
                  <KanbanColumn
                    key={column.taskCategoryId}
                    title={column.title}
                    taskCategoryId={column.taskCategoryId.toString()}
                    kanban={kanban}
                    setActiveTaskMethod={setActiveTaskMethod}
                    currentUser={currentUser}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>

      {selectedTask && (
        <DetailedTaskView
          task={kanban.tasks.find((task) => task.id === selectedTask)!}
          onClose={handleTaskClose}
          board={kanban}
          onDeleteTask={handleDeleteTask}
        />
      )}

      {/* Task modal for adding new tasks */}
      {isTaskModalOpen && (
        <AddTaskForm
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleAddTask}
          board={kanban}
          errors={addTaskError}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
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
        height: "30px",
        marginTop: "5px",
      }}
    >
      <div
        data-testid="progressbar"
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
