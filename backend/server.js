// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, name: "Task 1" },
  { id: 2, name: "Task 2" },
  { id: 3, name: "Task 3" },
];
let nextTaskId = 4;

app.get("/api/tasks", (req, res) => {
  res.json({ tasks });
});

app.post("/api/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: nextTaskId++, name: task };
    tasks.push(newTask);
    res.status(201).json({ message: "Task added successfully" });
  } else {
    res.status(400).json({ error: "Task is required" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === parseInt(id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
