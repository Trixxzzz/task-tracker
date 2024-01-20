
import React from 'react';
import Task from './Task';
import "./TaskList.css"

const TaskList = ({ tasks, onDelete, onToggle }) => (
  <div className="task-list">
    {tasks.map((task) => (
      <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
    ))}
  </div>
);

export default TaskList;