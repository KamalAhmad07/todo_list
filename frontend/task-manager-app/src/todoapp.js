// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [deletedTask, setDeletedTask] = useState("");

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
    }
  };

  const addTask = async () => {
    if (task.trim() !== "") {
      try {
        await axios.post("http://localhost:3001/api/tasks", {
          task,
        });
        setTask("");
        getTasks(); // Refresh the task list after adding a task
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      setDeletedTask(id);
      getTasks(); // Refresh the task list after deleting a task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <h1 className="flex-start">Todo-List-App</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task" className="flex-start"
        />
        <button onClick={addTask} className="Button">Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((item) => (
          <div key={item.id} className="task-item">
        
            <li className="tasks">
              {item.name}
              <button onClick={() => deleteTask(item.id)} className="Button"> Delete</button>
            </li>
          </div>
        ))}
      </ul>
      {deletedTask && <p className="para">deleted successfully.</p>}
    </div>
  );
}

export default App;
