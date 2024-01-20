
import React from 'react';
import "./Task.css"

const Task = ({ task, onDelete, onToggle }) => (
  <div className={`task ${task.completed ? 'completed' : ''}`} onDoubleClick={() => onToggle(task.id)}>
    <h3>{task.text}</h3>
    <p>{task.date}</p>
    <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
    <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
  </div>
);

export default Task;
