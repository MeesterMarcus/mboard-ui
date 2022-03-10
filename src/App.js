import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BoardContainer from './components/BoardContainer';


function App() {

  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    const newColumn = {name: newColumnName};
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

  return (
    <div className="App">
      <div>
        Mboards {newColumnName}
      </div>
      <TextField id="outlined-basic" value={newColumnName} onChange={e => handleText(e)} label="Outlined" variant="outlined" />
      <Button variant="contained" onClick={addColumn}>Add Column</Button>
      <BoardContainer columns={columns} />
    </div>
  );
}

export default App;
