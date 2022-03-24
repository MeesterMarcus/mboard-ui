//Third-party
import { useEffect } from 'react';
import { CSSProperties } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SxProps,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';

//First-party
import '../App.css';
import { IBoard, IBoardColumn, ITaskInterface } from '../models/board.models';
import BoardService from '../services/BoardService';

interface ITaskProps {
  selectedTask: ITaskInterface;
  board: IBoard;
  boardChanged: Function;
  column: IBoardColumn;
  open: boolean;
  handleOpen: Function;
  handleClose: Function;
}

function Task(props: ITaskProps) {
  const [selectedTask, setSelectedTask] = useState(props.selectedTask);
  

  const handleDescriptionChange = event => {
    const text = event.target.value
    setSelectedTask(prevTask => ({
      ...prevTask,
      description: text
    }));
  };

  const handleSeverityChange = event => {
    const level = parseInt(event.target.value)
    console.log(level);
    setSelectedTask(prevTask => ({
      ...prevTask,
      severity: level
    }));
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const newCol = props.board.columns.find(c => c.id === newStatus);
    const newColName = newCol.name;
    setSelectedTask(prevTask => ({
      ...prevTask,
      status: { columnId: newStatus, statusName: newColName }
    }));
  }

  const handleClientChange = event => {
    const text = event.target.value
    console.log(text);
    setSelectedTask(prevTask => ({
      ...prevTask,
      client: text
    }));
  };

  const handleTitleChange = event => {
    const text = event.target.value
    console.log(text);
    setSelectedTask(prevTask => ({
      ...prevTask,
      title: text
    }));
  };

  const saveAndCloseTask = (task) => {
    BoardService.updateTask(props.board.boardId, task);
    props.boardChanged();
    props.handleClose();
  };

  //TODO: add another modal for confirmation
  const deleteAndCloseTask = (task) => {
    console.log(task);
    BoardService.deleteTask(props.board.boardId, task);
    props.boardChanged();
    props.handleClose();
  }

  const handleClose = () => {
    props.handleClose();
  }

  useEffect(() => {
    setSelectedTask(props.selectedTask);
  }, [props.selectedTask])


  return (
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
        <div>
            <FormControl margin='normal' fullWidth>
              <TextField id="outlined-basic" value={selectedTask.title} onChange={e => handleTitleChange(e)} label="Title"  variant="outlined" />
            </FormControl>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
              <FormControl margin='normal' >
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  style={{ minWidth: 150 }}
                  labelId="status-select"
                  id="status-select"
                  value={selectedTask.status?.columnId}
                  label="Status"
                  onChange={e => handleStatusChange(e)}
                >
                  {props.board.columns?.map((column) => {
                    //@ts-ignore
                    return <MenuItem key={column.id} value={column.id}>{column.name}</MenuItem>
                  })}

                </Select>
              </FormControl>
            </div>
            <div style={{ marginLeft: 35 }}>
              <FormControl margin='normal'>
                <InputLabel id="severity-select-label">Severity</InputLabel>
                <Select
                  style={{ minWidth: 115 }}
                  labelId="severity-select"
                  id="severity-select"
                  value={selectedTask.severity}
                  label="Severity"
                  onChange={e => handleSeverityChange(e)}
                >
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                  <MenuItem value={4}>Urgent</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description:
          </Typography>
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
          <div>
            <FormControl margin='normal'>
              <TextField id="outlined-basic" value={selectedTask.client} onChange={e => handleClientChange(e)} label="Client" variant="outlined" />
            </FormControl>
          </div>
          <div style={{ marginTop: 10 }}>
            <Button variant="contained" color="error" size="small" onClick={() => deleteAndCloseTask({ ...selectedTask })}>DELETE TASK</Button>
          </div>

          <div style={saveTaskContainer}>
            <Button variant="contained" size="small" onClick={() => saveAndCloseTask({ ...selectedTask })}>SAVE</Button>
          </div>
        </Box>
      </Modal>
  );
}

// styles
const taskListContainer: CSSProperties = {
  margin: 15,
  backgroundColor: '#EBECF0',
}

const taskContainer: CSSProperties = {
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

const taskInputContainer: CSSProperties = {
  marginTop: 20,
}

const addTaskContainer: CSSProperties = {
  marginTop: 25,
}

const saveTaskContainer: CSSProperties = {
  marginTop: 25,
  display: 'flex',
  justifyContent: 'flex-end',
}

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default Task;