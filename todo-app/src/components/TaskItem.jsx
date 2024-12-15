import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);

  const handleCheckboxChange = async () => {
    setIsCompleted(!isCompleted);
    await axios.put(`http://localhost:5000/tasks/${task._id}`, { ...task, isCompleted: !isCompleted });
    fetchTasks();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
    fetchTasks();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <div className="task-item">
        Status:
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className="checkbox"
      />
      <div className="task-content" style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-textarea"
            ></textarea>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </>
        )}
      </div>
      <div className="task-buttons">
        {isEditing ? (
          <button onClick={handleSave} className="save-button">Save</button>
        ) : (
          <button onClick={handleEdit} className="edit-button">Edit</button>
        )}
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

