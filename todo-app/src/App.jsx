import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className='backendcheck'>
        *Click one of the links to check backend*
        <div className='backendlinks'>
          <a href='http://localhost:5000/tasks' target='_blank' rel='noopener noreferrer'>View REST API (GET /tasks)</a>
          <a href='http://localhost:5000/tasks/new' target='_blank' rel='noopener noreferrer'>View Last Task Post(GET /tasks/new)</a>
          <a href='http://localhost:5000/tasks/:id' target='_blank' rel='noopener noreferrer'>Update Task (PUT /tasks/:id)</a>
          <a href='http://localhost:5000/tasks/:id' target='_blank' rel='noopener noreferrer'>Delete Task (DELETE /tasks/:id)</a>
        </div>
      </div>
      <TaskForm fetchTasks={fetchTasks} />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default App;
