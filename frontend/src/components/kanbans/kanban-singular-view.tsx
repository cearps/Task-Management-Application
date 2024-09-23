import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import Loader from "../loaders/loader";
import { KanbanBoard } from "../../utilities/types";
import KanbanDisplay from "./kanban-display";

export default function KanbanSingularView({ id }: { id: string }) {
  const [kanban, setKanban] = useState<KanbanBoard | undefined>(undefined);

  useEffect(() => {
    const subscription = KanbanAPI.getKanbanBoardObservable(id).subscribe({
      next: (board) => {
        if (board === null) {
          return;
        }
        setKanban(board);
      },
      error: (error) => {
        console.error(`Error fetching Kanban board with id ${id}:`, error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  return kanban ? (
    <KanbanDisplay kanban={kanban} setKanban={setKanban} />
  ) : (
    <Loader />
  );
}
