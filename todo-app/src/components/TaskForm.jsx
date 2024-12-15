import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const taskData = { title, description, isCompleted };
      await axios.post('http://localhost:5000/tasks', taskData);
      setTitle('');
      setDescription('');
      setIsCompleted(false);
      fetchTasks();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-textarea"
      ></textarea>
      <button type="submit" className="form-button">Add Task</button>
    </form>
  );
};

export default TaskForm;
