import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("https://localhost:32769/api/todo");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = { title, isComplete: false };
    await axios.post("https://localhost:32769/api/todo", newTodo);
    fetchTodos();
    setTitle("");
  };

  const toggleComplete = async (id, isComplete) => {
    await axios.put(`https://localhost:32769/api/todo/${id}`, {
      id,
      title: todos.find((todo) => todo.id === id).title,
      isComplete: !isComplete,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://localhost:32769/api/todo/${id}`);
    fetchTodos();
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.isComplete ? "completed" : ""}`}>
            <span onClick={() => toggleComplete(todo.id, todo.isComplete)}>
              {todo.title}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;