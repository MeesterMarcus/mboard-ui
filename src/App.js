import './App.css';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BoardContainer from './components/BoardContainer';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    const newColumn = {
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

  const initBoard = () => {
    setBoard({
      id: uuidv4(),
      columns: [],
    })
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={columnInputContainer}>
        <TextField id="outlined-basic" value={newColumnName} onChange={e => handleText(e)} label="Your column name" variant="outlined" />
        <Button style={buttonContainer} variant="contained" onClick={addColumn}>Add Column</Button>
      </div>

      <BoardContainer board={board}/>
    </div>
  );
}

// Styles

const buttonContainer = {
  marginLeft: 8,
  padding: 15,
}

const columnInputContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
}

export default App;
