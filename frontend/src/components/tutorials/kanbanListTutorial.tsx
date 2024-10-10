import { BaseTutorial } from "./baseTutorial";
import React from "react";

class KanbanListTutorialNoBoard extends React.Component {
  state = {
    steps: [
      {
        target: "#add-board-button",
        content:
          "Click here to create a board. Boards are used to organize your tasks.",
      },
    ],
  };

  render() {
    return <BaseTutorial steps={this.state.steps} />;
  }
}

class KanbanListTutorialFirstBoard extends React.Component {
  state = {
    steps: [
      {
        target: ".board-card",
        content: "Here is your board.  Clicking on the board will open it.",
      },
      {
        target: "#update-users-button",
        content:
          "Click here to add or remove users from the board by user tag.",
      },
      {
        target: "#edit-board-button",
        content: "Click here to edit you board.",
      },
      {
        target: "#delete-board-button",
        content: "Click here to delete your board.",
      },
    ],
  };

  render() {
    return <BaseTutorial steps={this.state.steps} />;
  }
}

export { KanbanListTutorialNoBoard, KanbanListTutorialFirstBoard };
