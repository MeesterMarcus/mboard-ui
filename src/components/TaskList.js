import { useEffect } from 'react';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';



function TaskList(props) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleAddTask = (column) => {
    console.log(column);
    column.tasks.push({
      id: uuidv4(),
      title: newTaskTitle,
      description: 'sample description',
      severity: '',
      client: '',
    });
    resetForm();
  }

  const openTask = (task) => {
    console.log(task);
    setSelectedTask(task);
    handleOpen();
  };

  const resetForm = () => {
    setNewTaskTitle('');
  }

  const handleText = event => {
    const text = event.target.value
    setNewTaskTitle(text);
  }

  const handleDescriptionChange = event => {
    const text = event.target.value
    setSelectedTask(prevTask => ({
      ...prevTask,
      description: text
    }));
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
        <TextField style={{ width: 275 }} id="outlined-basic" value={newTaskTitle} onChange={e => handleText(e)} label="Enter Task Title" variant="outlined" />
      </div>
      <div style={addTaskContainer}>
        <Button variant="contained" size="small" onClick={() => handleAddTask(props.column)}>ADD TASK</Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedTask.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>Description:</div>
            <div>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                value={selectedTask.description}
                onChange={event => handleDescriptionChange(event)}
                placeholder="Enter description of task here..."
                style={{ width: 350 }}
              />
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>Client:</div>
            <div>
              {selectedTask.client}
            </div>
          </Typography>
          <div style={saveTaskContainer}>
            <Button variant="contained" size="small" onClick={() => console.log('saving task...')}>SAVE</Button>
          </div>
        </Box>
      </Modal>

    </div>
  );
}

// styles
const taskListContainer = {
  margin: 15,
  backgroundColor: '#EBECF0',
}

const taskContainer = {
  textAlign: 'left',
  borderWidth: 2,
  borderRadius: 5,
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

const saveTaskContainer = {
  marginTop: 25,
  display: 'flex',
  justifyContent: 'flex-end',
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default TaskList;