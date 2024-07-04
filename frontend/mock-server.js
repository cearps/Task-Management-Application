import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.get("/boards/:id/tasks", (req, res) => {
  const { id } = req.params;
  const board = router.db.get("boards").getById(id).value();
  const tasks = router.db.get("tasks").filter({ boardId: board.id }).value();
  res.jsonp(tasks);
});

server.get("/boards/:id/tasks/:categoryId", (req, res) => {
  const { id, categoryId } = req.params;
  const board = router.db.get("boards").getById(id).value();
  const boardCategory = router.db
    .get("taskCategories")
    .getById(categoryId)
    .value();
  const tasks = router.db
    .get("tasks")
    .filter({ boardId: board.id, taskCategoryId: boardCategory.id })
    .value();
  res.jsonp(tasks);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
