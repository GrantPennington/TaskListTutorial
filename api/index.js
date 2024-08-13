import express from 'express';
import { createTask, deleteTask, fetchTasks, updateTask } from './task.js';
import cors from 'cors';
import serverless from 'serverless-http';

const PORT = 5000;
const app = express();

app.use(express.json());

if (process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get('/', (req, res) => {
    res.send("Hello, World!");
})
// fetch tasks
app.get('/task', async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.send(tasks.Items);
    } catch(err) {
        res.status(400).send(`Error fetching tasks: ${err}`);
    }
})
// create a task
app.post('/task', async (req, res) => {
    try {
        const tasks = req.body;

        const response = await createTask(tasks);
        res.send(response);
    } catch(err) {
        res.status(400).send(`Error creating tasks: ${err}`);
    }
})
// update a task
app.put('/task', async (req, res) => {
    try {
        const tasks = await updateTask();
        res.send(tasks.Items);
    } catch(err) {
        res.status(400).send(`Error updating tasks: ${err}`);
    }
})
// delete a task
app.delete('/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteTask(id);

        res.send(response);
    } catch(err) {
        res.status(400).send(`Error deleting tasks: ${err}`);
    }
})

if (process.env.DEVELOPMENT) {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

export const handler = serverless(app);