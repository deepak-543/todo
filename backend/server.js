// my-todo-app/backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'todo-db.cllga0tifl8a.us-east-2.rds.amazonaws.com',
  user: 'todo_user',
  password: '-b9>8mB:KB|Ym|NcDE}bt9scyL4|',
  database: 'todo_app',
});

app.use(bodyParser.json());

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List app!'); // You can customize this response.
});

app.post('/api/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO tasks (description) VALUES (?)', [description]);
    res.json({ id: result.insertId, description, is_completed: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other routes and handlers as needed.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

