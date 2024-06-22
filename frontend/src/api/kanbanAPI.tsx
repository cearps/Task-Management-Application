import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class KanbanAPI {
  async getKanbanBoards() {
    return axios.get(`${baseUrl}/kanban-board`);
  }
}
