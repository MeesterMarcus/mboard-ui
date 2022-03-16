//Third-party
import './App.css';
import { CSSProperties } from "react";
import React, { useEffect, useState } from 'react';
import BoardContainer from './components/BoardContainer';
import { v4 as uuidv4 } from 'uuid';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  TextField } 
  from '@mui/material';


//First-party
import { IBoard, IBoardColumn } from './models/board.models';
import BoardService from './services/BoardService';

function App() {

  const [board, setBoard] = useState({} as IBoard);
  const [columns, setColumns] = useState([] as Array<IBoardColumn>);
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    const newColumn: IBoardColumn = {
      id: uuidv4(),
      name: newColumnName,
      tasks: [],
    };
    setColumns(prev => [...prev, newColumn]);
    resetForm();
  };

  const resetForm = () => {
    setNewColumnName('');
  }

  const handleText = event => {
    const text = event.target.value
    setNewColumnName(text);
  }

  useEffect(() => {
    console.log("initializing board");
    initBoard();
  }, []);

  const initBoard = async () => {
    // const board = await BoardService.createBoard({
    //   id: uuidv4(),
    //   columns: [],
    // });
    const board = await BoardService.getBoard('2e1566ac-0376-4d1e-bde6-53610308ce88');
    console.log('fetched board:', board);
    setBoard(board.data);
  }

  useEffect(() => {
    if (columns.length > 0) {
      setBoard(prevBoard => ({
        ...prevBoard,
        columns: columns
      }))
    }
  }, [columns]);

  useEffect(() => {
    if (board) {
      console.log(board);
    }
  }, [board]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MBoards
            </Typography>
            <Button color="inherit" onClick={() => console.log('Login clicked')}>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={columnInputContainer}>
        <TextField sx={{input: {color: 'white'}}} id="outlined-basic" value={newColumnName} onChange={e => handleText(e)} label="Your column name" variant="outlined" />
        <Button disabled={!newColumnName} style={buttonContainer} variant="contained" onClick={addColumn}>Add Column</Button>
      </div>
      <BoardContainer board={board}/>
    </div>
  );
}

// Styles

const buttonContainer: CSSProperties = {
  marginLeft: 8,
  padding: 15,
}

const columnInputContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
}

export default App;
