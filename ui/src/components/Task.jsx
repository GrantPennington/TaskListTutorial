import { Button, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTaskForm from './UpdateTaskForm';
import classnames from 'classnames';
import axios from 'axios';
import { API_URL } from '../utils';

const Task = ({ task, fetchTasks }) => {
    const { id, name, completed } = task;
    const [isComplete, setIsComplete] = useState(completed);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleUpdateTaskCompletion = async () => {
        try {
            await axios.put(API_URL, {
                id, name, completed: !isComplete
            });
            setIsComplete((prev) => !prev);
        } catch(err) {
            console.log(err);
        }
    };

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`${API_URL}/${task.id}`);

            await fetchTasks();
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="task">
            <div className={classnames("flex", {
                done: isComplete
            })}>
                <Checkbox 
                    checked={isComplete}
                    onChange={handleUpdateTaskCompletion}
                />
                <Typography variant="overline" fontSize="large">{name}</Typography>
            </div>
            <div className={'taskButtons'}>
                <Button 
                    variant="contained"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <EditIcon />
                </Button>
                <Button 
                    variant="contained"
                    onClick={handleDeleteTask}
                    color="error"
                >
                    <DeleteIcon />
                </Button>
            </div>
            <UpdateTaskForm
                fetchTasks={fetchTasks}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                task={task}
            />
        </div>
    )
}

export default Task
