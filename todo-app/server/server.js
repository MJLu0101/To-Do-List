const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://lmj3326679252:potato1171849344@cluster0.h4khi.mongodb.net/todolist?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Task schema models
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        isCompleted: {
            type: Boolean, 
            default: false 
        }
    },
    {   
        autoIndex:true,
        timestamps: true,
    }
);

const Task = mongoose.model('Task', taskSchema);

// REST API routes

/**
 * GET /tasks
 * Fetch all tasks
 */

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

/**
 * POST /tasks
 * Create a new task
 */
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const task = new Task({ title, description, isCompleted, createdAt: new Date(), updatedAt: new Date() });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ error: 'Failed to create task' });
  }
});
// Route to render the form with the last post data
app.get('/tasks/new', async (req, res) => {
  try {
    const lastTask = await Task.findOne().sort({ createdAt: -1 }); // Sort by createdAt in descending order to get the last created task
    res.json(lastTask);  // Return the most recent task
  } catch (err) {
    console.error('Error fetching last task:', err);
    res.status(500).json({ error: 'Failed to fetch last task' });
  }
});

/**
 * PUT /tasks/:id
 * Update an existing task by ID
 */
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, isCompleted },
      { new: true } // Return updated document
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ error: 'Failed to update task' });
  }
});

/**
 * DELETE /tasks/:id
 * Delete a task by ID
 */
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
