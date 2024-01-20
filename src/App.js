import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './Components/TaskList.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const date = new Date().toLocaleDateString();
    const newTaskObject = { id: Date.now(), text: newTask, date, completed: false };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'completed') {
      return task.completed;
    } else if (filterStatus === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const incompleteTasksCount = tasks.length - completedTasksCount;

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div>
        <label>Show:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
      </div>
      <div>
        <p>Completed Tasks: {completedTasksCount}</p>
        <p>Incomplete Tasks: {incompleteTasksCount}</p>
      </div>
      <input
        type="text"
        placeholder="Add Task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className='add' onClick={addTask}>Add</button>

      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
};

export default App;
