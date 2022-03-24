//Third-party
import { useEffect } from 'react';
import { CSSProperties } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import React from 'react';
import {
  Button,
  TextField,
} from '@mui/material';

//First-party
import '../App.css';
import { IBoard, IBoardColumn, ITaskInterface } from '../models/board.models';
import BoardService from '../services/BoardService';
import Task from './Task';

interface ITaskListProps {
  board: IBoard;
  column: IBoardColumn;
  boardChanged: Function;
}

function TaskList(props: ITaskListProps) {
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState({} as ITaskInterface);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = (column) => {
    console.log(column);
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      description: '',
      severity: 2,
      client: '',
      status: { columnId: column.id, statusName: column.name }
    };
    BoardService.insertTask(props.board.boardId, column.id, newTask);
    props.boardChanged();
    resetForm();
  }

  const openTask = (task) => {
    console.log(task);
    setSelectedTask(task);
    setOpen(true);
  };

  const resetForm = () => {
    setNewTaskTitle('');
  };

  const handleText = event => {
    const text = event.target.value
    setNewTaskTitle(text);
  };


  useEffect(() => {

  }, [props.column])


  return (
    <div style={taskListContainer}>
      {props.column.tasks?.map((task) => {
        return (
          <div onClick={() => openTask(task)} key={task.id} style={taskContainer}>
            <span style={task}>{task.title} {open}</span>
          </div>
        )
      })}
      <div style={taskInputContainer}>
        <TextField style={{ width: 275 }} id="outlined-basic" value={newTaskTitle} onChange={e => handleText(e)} label="Enter Task Title" variant="outlined" />
      </div>
      <div style={addTaskContainer}>
        <Button disabled={!newTaskTitle} variant="contained" size="small" onClick={() => handleAddTask(props.column)}>ADD TASK</Button>
      </div>
      <Task handleOpen={handleOpen} handleClose={handleClose} open={open} board={props.board} boardChanged={props.boardChanged} selectedTask={selectedTask} column={props.column} />
    </div>
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


export default TaskList;