import { useEffect } from 'react';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function TaskList(props) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (column) => {
    console.log(column);
    column.tasks.push({
      id: uuidv4(),
      title: newTaskTitle
    });
    resetForm();
  }

  const openTask = (task) => {
    console.log(task);
  };

  const resetForm = () => {
    setNewTaskTitle('');
  }

  const handleText = event => {
    const text = event.target.value
    setNewTaskTitle(text);
  }

  useEffect(() => {

  }, [props.tasks, props.column])


  return (
    <div style={taskListContainer}>
      {props.column.tasks?.map((task) => {
        return (
          <div onClick={() => openTask(task)} key={task.id} style={taskContainer}>
            <span style={task}>{task.title}</span>
          </div>
        )
      })}
      <div style={taskInputContainer}>
        <TextField id="outlined-basic" value={newTaskTitle} onChange={e => handleText(e)} label="Enter Task Title" variant="outlined" />
      </div>
      <div style={addTaskContainer}>
        <Button variant="contained" size="small" onClick={() => handleAddTask(props.column)}>ADD TASK</Button>
      </div>

    </div>
  );
}

// styles
const taskListContainer = {
  margin: 15,
  backgroundColor: '#EBECF0',
}

const taskContainer = {
  borderWidth: 2,
  borderRadius: 8,
  borderStyle: 'solid',
  borderColor: '#EBECF0',
  backgroundColor: 'white',
  cursor: 'pointer',
  margin: 5,
  padding: 15,
}

const taskInputContainer = {
  marginTop: 20,
}

const addTaskContainer = {
  marginTop: 25,
}


export default TaskList;