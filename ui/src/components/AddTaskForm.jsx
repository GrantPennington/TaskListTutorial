import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { API_URL } from '../utils';

const AddTaskForm = ({ fetchTasks }) => {
    const [task, setTask] = useState("");

    const handleAddTask = async () => {
        console.log(task);
        try {
            await axios.post(API_URL, {
                name: task,
                completed: false,
            });

            await fetchTasks();

            setTask("");
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography
                align="center"
                variant="h2"
                paddingTop={2}
                paddingBottom={2}
            >
                My Task List
            </Typography>
            <TextField 
                size="sm" label="Task" variant="outlined" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="outlined" onClick={handleAddTask} disabled={!task.length}>
                <AddIcon />
            </Button>
        </Box>
    )
}

export default AddTaskForm
