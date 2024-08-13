import './App.css';
import AddTaskForm from './components/AddTaskForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Task from './components/Task';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const {data} = await axios.get(API_URL);

      setTasks(data);
    } catch(err) {
      // error
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => 
        <Task key={task.id} task={task} fetchTasks={fetchTasks} />
      )}
    </ThemeProvider>
  );
}