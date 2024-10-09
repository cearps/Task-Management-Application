import { BaseTutorial } from "./baseTutorial";

import React from "react";

class KanbanDisplayTutorialNoTask extends React.Component {
  state = {
    steps: [
      {
        target: "#progress-bar",
        content:
          "This progress bar shows the time remaining until the due date of your kanban board.",
      },
      {
        target: "#add-task-button",
        content:
          "Click here to create a task. Tasks are used to organize your work.",
      },
      {
        target: ".kanban-column",
        content:
          "Here is where your tasks will appear. Click on a task to view it. You can also drag and drop tasks between columns.",
      },
    ],
  };

  render() {
    return <BaseTutorial steps={this.state.steps} />;
  }
}

export { KanbanDisplayTutorialNoTask };
