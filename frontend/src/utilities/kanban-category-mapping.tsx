type column = {
  title: string;
  taskCategoryId: number;
};

const kanbanColumns: column[] = [
  { title: "Task Backlog", taskCategoryId: 1 },
  { title: "In Progress", taskCategoryId: 2 },
  { title: "In Review", taskCategoryId: 3 },
  { title: "Complete", taskCategoryId: 4 },
];

function getTaskStatus(taskCategoryId: number): string {
  return (
    kanbanColumns.find((column) => column.taskCategoryId === taskCategoryId)
      ?.title ?? ""
  );
}

export { kanbanColumns, getTaskStatus };
